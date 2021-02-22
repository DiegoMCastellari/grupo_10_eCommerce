const fs = require('fs');
const { UnsupportedMediaType } = require('http-errors');
const path = require('path');
const bcrypt = require("bcrypt")
const db = require("../database/models");
const Op = db.Sequelize.Op;
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

var usersFilePath = path.join(__dirname, '../data/users.json');
var users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

var carritosFilePath = path.join(__dirname, '../data/carritos.json');
var carritos = JSON.parse(fs.readFileSync(carritosFilePath, 'utf-8'));

const usersController = {
    register : (req, res, next) => {
        res.render('users/register.ejs', {
            mensaje: 'nada',
            usuario: req.usuarioLogueado
        })
    },
    store: (req, res, next) => {

        db.Usuarios.create({
            nombre: req.body.fullname,
            email: req.body.email,
            telefono: req.body.telefono,
            password:  bcrypt.hashSync(req.body.password, 10), //encripto la contraseña
            permiso: "externo"
        })
        res.render('users/login', {
            mensaje: 'Bienvenido '+req.body.fullname,
            usuario: "ningunUsuarioLogueado"
        });
    },
    login: (req, res, next) => {
        res.render('users/login.ejs', {
            mensaje: 'nada',
            usuario: req.usuarioLogueado
        });
    },
    loginOK: (req, res, next) => {
        res.render('home', {
            usuario: req.usuarioLogueado
        });
    },
/*   list: (req, res, next) => {
        db.Usuarios.findAll()
        .then(function(users){
            console.log(users);
            res.render('users/userlist', {users, usuario :req.usuarioLogueado})
        })
    },
     destroy : (req, res) => {
        var idUsers = req.params.id;
        db.Usuarios.destroy({
            where : {
                id : req.params.id
            }}).then(function(resultado){
                res.redirect('/users/userList')
            })
    },
    editarUsuario: (req, res, next) => {
        let userId = req.params.id;
        db.Usuarios.findOne({
            where: {
             id: userId
             }
            })
        .then(function(userEdit){
            console.log(userEdit);
            res.render('users/userEdit', {userEdit, usuario :req.usuarioLogueado})
        })
    }, 
    editarUsuarioPost: (req, res) => {
        let userId = req.params.id;
        db.Usuarios.update({
            permiso : req.body.permiso,
            nombre : req.body.fullname,
            email : req.body.email,
            telefono : req.body.telefono,
            password : bcrypt.hashSync(req.body.password, 10)
        },{
            where : {
                id : userId
            }
        }).then(function(resultado){
            res.redirect('/users/userList')
        })
    }, */
    carritoVacio :(req, res, next)=>{
        let usuarioId = req.session.usuario.id;
        db.Carritos.findOne({where :{
            id_usuario : usuarioId,
            estado : {[Op.substring]: "abierto"}
        }}).then(function(resultado){
            console.log(resultado);
            if (resultado){
                res.redirect('../../carrito')
            } else{
                
                res.redirect('/')
            }
        })
    },
    carrito: (req, res, next) => {
        let usuarioId = req.session.usuario.id;
        let mostrarCarrito = db.Carritos.findOne({where : {
            id_usuario : usuarioId,
            estado : {[Op.substring]: "abierto"}}
            , 
            include : [{association:"carrito_productos"}]})
        let mostrarMarcas = db.Marcas.findAll();//se buscan las marcas
        let mostrarTalles = db.Talles.findAll({//se buscan los talles
            order: [
                ['id', 'ASC'],
                ],
        });
        let mostrarCarritoProducto = db.Carrito_producto.findAll({where : {
            id_usuario : usuarioId}
            , 
            include : [{association:"producto"}, {association:"carrito", where:{ estado : {[Op.substring]: "abierto"}}}, {association:"talle"},
            {association:"color"}]})

        let mostrarColores = db.Colores.findAll();
        let mostrarProductos = db.Productos.findAll({include : [{association:"imagenes"}]});
        
        Promise.all ([mostrarCarrito, mostrarCarritoProducto, mostrarMarcas, mostrarTalles, mostrarColores, mostrarProductos])
        .then(function([carrito, carritoProducto, marcas, talles, colores, productos]){
            console.log(carrito);
            console.log(carritoProducto);
            console.log(productos);
            res.render('users/carrito', {carrito, carritoProducto, marcas, talles, colores, productos, toThousand,
                usuario: req.usuarioLogueado
            });
        })
        .catch(function(error){
            console.log(error);
        })
    },
    borraDeCarrito: (req,res,next) =>{
        db.Carrito_producto.destroy({
        where : {
            id : req.params.id
        }}).then(function(){ console.log('producto Borrado'); res.redirect ('/users/carrito')})
        .catch(function(error){
            console.log(error);
        })
    },
    cambiarCantidad: (req,res,next) =>{
        var cantidadNueva = req.params.cantidadBuscada;
        if (cantidadNueva <0){
            cantidadNueva = 1;
        
        var idBuscado = req.params.idBuscado;
        db.Carrito_producto.update({
            cantidad : cantidadNueva
        },{
        where : {
            id : idBuscado
        }}).then(function(){ console.log('modificado'); res.redirect ('/users/carrito')})
        .catch(function(error){
            console.log(error);
        })
    }else{
        var cantidadNueva = req.params.cantidadBuscada;
        var idBuscado = req.params.idBuscado;
        db.Carrito_producto.update({
            cantidad : cantidadNueva
        },{
        where : {
            id : idBuscado
        }}).then(function(){ console.log('modificado'); res.redirect ('/users/carrito')})
        .catch(function(error){
            console.log(error);
        })
    }},
    finalizarCompra: (req, res, next) =>{
        console.log(req.params.id);
        var arrayPrecios = [];
        var arrayIdProductos = [];
        let cambiarEstado = db.Carritos.update({
            estado: "pedido"
            
        },{
            where :  {id: req.params.id}
        })
        
     let buscarCarritoProducto =   db.Carrito_producto.findAll({
                where : {
                    id_carrito :req.params.id
                }
            })
        .then(function(resultado){
            for(i = 0; i < resultado.length; i++){
               db.Productos.findAll({
                where : {
                    id :resultado[i].id_producto
                }
            }).then(function(producto){
                producto.forEach(productos => {
                    arrayPrecios.push(productos.precio);
                    arrayIdProductos.push(productos.id);
                    db.Carrito_producto.update({
                        subtotal:(productos.precio)-(productos.precio*(productos.descuento/100))
                    },
                        {
                        where : {
                            id_carrito :req.params.id,
                            id_producto :productos.id
                        }
                    }).then(function(carrito){
                        console.log(carrito);
                    })                
                });
                
            })
            };
        })
        Promise.all ([cambiarEstado, buscarCarritoProducto])
        
        .then(function(){ console.log('Compra Finalizada'); res.render('users/comprado', {usuario :req.session.usuario.nombre,  mensaje: 'nada'})})
        .catch(function(error){
            console.log(error);
        })
    },
    closeSession: (req,res,next) => {
        req.usuarioLogueado = "ningunUsuarioLogueado";
        req.session.destroy();
        res.redirect('/')
    },
    editarUsuarioUser: (req, res, next) => {
        /* let userId = req.session.usuario.id;
        db.Usuarios.findOne({
            where: {
                    id: userId
                }
            })
        .then(function(userEdit){
            res.render('users/userEditUser', {userEdit, usuario: req.usuarioLogueado, mensaje: 'nada'})
        }) */

        res.render('users/userEditUser', {userEdit: req.session.usuario, usuario: req.usuarioLogueado, mensaje: 'nada'})
    }, 
    editarUsuarioUserPost: (req, res) => {
        let userId = req.session.usuario.id;
        db.Usuarios.update({
            nombre : req.body.fullname,
            email : req.body.email,
            telefono : req.body.telefono,
            password : bcrypt.hashSync(req.body.password, 10)
        },{
            where : {
                id : userId
            }
        }).then(function(resultado){
            db.Usuarios.findByPk(req.session.usuario.id)
            .then(function(resultado){
                req.session.loggedIn = true;
                req.session.usuario = resultado;
                res.redirect('/')
            })
        })
        
        
        
    }
};

module.exports = usersController;