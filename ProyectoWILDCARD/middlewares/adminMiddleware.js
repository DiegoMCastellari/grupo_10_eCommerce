var fs = require('fs');
const db = require("../database/models");
const bcrypt = require("bcrypt")
const { check, validationResult, body } = require('express-validator');
const Op = db.Sequelize.Op;

const adminMiddleware = {
    checkEditUserErrors: (req,res,next) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            let userId = req.params.id;
            db.Usuarios.findOne({
                where: {
                    id: userId
                }
            })
            .then(function(userEdit){
                res.render('admin/userEdit', {
                    userEdit, 
                    usuario: req.session.usuario,
                    mensaje: errors.errors})
            })
        } else {
            next()
        }           
    },
    checkNewProductErrors : (req,res,next) => {
        let errors = validationResult(req);
        if ( req.session.usuario ) {
            req.usuarioLogueado = req.session.usuario
        } else {
            req.usuarioLogueado = "ningunUsuarioLogueado"
        }

        if (!errors.isEmpty()) {

            let mostrarMarcas = db.Marcas.findAll();
            let mostrarTalles = db.Talles.findAll({
                order: [
                    ['id', 'ASC'],
                    ],
            });
            let mostrarColores = db.Colores.findAll();

            Promise.all ([mostrarMarcas, mostrarTalles, mostrarColores])

            .then(function([marcas, talles, colores]){
                return res.render('admin/newProduct', {marcas, talles, colores,usuario: req.usuarioLogueado,mensaje: errors.errors})
            })
        } else {
            next()  
        }  
    },
    checkEditProductErrors: (req,res,next) => {
        let errors = validationResult(req);
        if ( req.session.usuario ) {
            req.usuarioLogueado = req.session.usuario
        } else {
            req.usuarioLogueado = "ningunUsuarioLogueado"
        }

        if (!errors.isEmpty()) {

            let mostrarProducto = db.Productos.findByPk(req.params.id, {//se busca el producto con el ID recibido por params
                include : [{association:"marcas"}, {association:"talles"}, {association:"colores"}, ]//se agrega la asociacion que esta en models
            })
            let mostrarMarcas = db.Marcas.findAll();//se buscan las marcas
            let mostrarTalles = db.Talles.findAll({//se buscan los talles
                order: [
                    ['id', 'ASC'],
                    ],
            });
            let mostrarColores = db.Colores.findAll();
            Promise.all([mostrarProducto, mostrarMarcas, mostrarTalles, mostrarColores])//se ejecutan la promesa cuando se cumplen las cuatro
            .then(function([producto, marcas, talles, colores]){//se comparten las 4 variables solo con las 4 ya culminadas.
                
                var tallesProducto = [];
                for ( let t=0; t<producto.talles.length; t++ ){
                    tallesProducto.push(producto.talles[t].talle)
                }
                var coloresProducto = [];
                for ( let t=0; t<producto.colores.length; t++ ){
                    coloresProducto.push(producto.colores[t].nombre)
                }
             /* console.log(producto.talles[0].talle); */
                res.render('admin/editProduct', {producto, marcas, talles, colores, tallesProducto, coloresProducto,usuario: req.usuarioLogueado, mensaje: errors.errors})//enviamos a la vista los 4 objetos.
            });
        } else {
            next()  
        }  
    }
}

module.exports = adminMiddleware;