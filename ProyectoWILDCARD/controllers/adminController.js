var fs = require('fs');
const db = require("../database/models");
const accesoMiddleware = require('../middlewares/accesoMiddleware');
const { productos } = require('./productosController');
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt")

var rawdata = fs.readFileSync(__dirname + "/../data/products.json");
let listaProductos = JSON.parse(rawdata);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const adminController = {
    list: (req, res, next) => {
        db.Usuarios.findAll()
        .then(function(users){
            console.log(users);
            res.render('admin/userlist', {users, usuario :req.usuarioLogueado})
        })
    },
    destroyUser : (req, res) => {
        var idUsers = req.params.id;
        db.Usuarios.destroy({
            where : {
                id : idUsers
            }
        }).then(function(resultado){
            res.redirect('/admin/userList')
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
            res.render('admin/userEdit', {
                userEdit, 
                usuario :req.usuarioLogueado,
                mensaje: "nada"})
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
            res.redirect('/admin/userList')
        })
    },
    listaProducto: (req, res, next) => {
        let page = 0;
        let offsetRecibed = 0;
        if(req.query.page){
            page = Number(req.query.page)
            offsetRecibed = page*10;
            page=Number(req.query.page)+1;
        let contarProductos = db.Productos.count({
            where:{
                activo: 1
            }
        });
        let mostrarProductos = db.Productos.findAll({
            where : {
                activo: 1
            },
            offset : offsetRecibed,
            limit : 10,
            include :[ 
            {association : "imagenes"}]}, {
            order: [
                ['nombre', 'ASC'],
                ],
        });
        let mostrarMarcas = db.Marcas.findAll();
        let mostrarTalles = db.Talles.findAll({
            order: [
                ['id', 'ASC'],
                ],
        });
        let mostrarColores = db.Colores.findAll();
        let mostrarCategorias = db.Categorias.findAll();

        Promise.all ([contarProductos, mostrarProductos, mostrarMarcas, mostrarTalles, mostrarColores, mostrarCategorias])
        .then(function([contarProductos, productos, marcas, talles, colores, categorias]){
        res.render('admin/listProducts', {contarProductos, productos : productos, marcas, talles, colores, categorias, page,  toThousand, 
            filtros:{
                usuario: 'todos',
                categoria: 'ningunacategoria',
                precio: [0,1000000],
                talle: 'ninguntalle',
                color: 'ninguncolor',
                marcas: 'ningunamarca'
            },
            usuario: req.usuarioLogueado
            });
        })
    }else{
        let contarProductos = db.Productos.count({
        where:{
            activo: 1
        }
    });
    let mostrarProductos = db.Productos.findAll({
        where : {
            activo: 1
        },
        offset : offsetRecibed,
        limit : 10,
        include :[ 
        {association : "imagenes"}]}, {
        order: [
            ['nombre', 'ASC'],
            ],
    });
    let mostrarMarcas = db.Marcas.findAll();
    let mostrarTalles = db.Talles.findAll({
        order: [
            ['id', 'ASC'],
            ],
    });
    let mostrarColores = db.Colores.findAll();
    let mostrarCategorias = db.Categorias.findAll();

    Promise.all ([contarProductos, mostrarProductos, mostrarMarcas, mostrarTalles, mostrarColores, mostrarCategorias])
    .then(function([contarProductos, productos, marcas, talles, colores, categorias]){
    res.render('admin/listProducts', {contarProductos, productos : productos, marcas, talles, colores, categorias, page, toThousand, 
        filtros:{
            usuario: 'todos',
            categoria: 'ningunacategoria',
            precio: [0,1000000],
            talle: 'ninguntalle',
            color: 'ninguncolor',
            marcas: 'ningunamarca'
        },
        usuario: req.usuarioLogueado
        });
    })}},
    listaProductoStock: (req, res, next) => {
        let page = 0;
        let offsetRecibed = 0;
        if(req.query.page){
            page = Number(req.query.page)
            offsetRecibed = page*20;
            page=Number(req.query.page)+1;
        let contarProductos = db.Productos.count({
        });
        let mostrarProductos = db.Productos.findAll({
            offset : offsetRecibed,
            limit : 20,
            order: [
                ['nombre', 'ASC'],
                ],
            include :[ 
                {association : "marcas"}, 
                {association : "talles"},
                {association : "colores"},
                {association : "categorias"}]
                
        });
        let mostrarMarcas = db.Marcas.findAll();
        let mostrarCategorias = db.Categorias.findAll();

        Promise.all ([contarProductos, mostrarProductos, mostrarMarcas, mostrarCategorias])
        .then(function([contarProductos, productos, marcas, categorias]){
            marcas.forEach(marca => {
                console.log(marca.nombre);
            });
        res.render('admin/listProductsStocks', {contarProductos, productos : productos, marcas, categorias, page,  toThousand, 
           
            usuario: req.usuarioLogueado
            });
        })
    }else{
        let contarProductos = db.Productos.count({
        });
        let mostrarProductos = db.Productos.findAll({
            offset : offsetRecibed,
            limit : 20,
            order: [
                ['nombre', 'ASC'],
                ],
            include :[ 
                {association : "marcas"}, 
                {association : "talles"},
                {association : "colores"},
                {association : "categorias"}]}, {
                order: [
                    ['nombre', 'ASC'],
                    ],
        });
        let mostrarMarcas = db.Marcas.findAll();
        let mostrarCategorias = db.Categorias.findAll();

        Promise.all ([contarProductos, mostrarProductos, mostrarMarcas, mostrarCategorias])
        .then(function([contarProductos, productos, marcas, categorias]){
            marcas.forEach(marca => {
                console.log(marca.nombre);
            });
            console.log(productos[0].marcas.nombre);
        res.render('admin/listProductsStocks', {contarProductos, productos, marcas, categorias, page,  toThousand, 

            usuario: req.usuarioLogueado
            });
    })}},


    nuevoProducto: (req, res, next) => {
        let mostrarMarcas = db.Marcas.findAll();
        let mostrarTalles = db.Talles.findAll({
            order: [
                ['id', 'ASC'],
                ],
        });
        let mostrarColores = db.Colores.findAll();
        Promise.all ([mostrarMarcas, mostrarTalles, mostrarColores])
        .then(function([marcas, talles, colores]){


            res.render('admin/newProduct', {marcas, talles, colores,usuario: req.usuarioLogueado,mensaje: 'nada'})
        })
        ;
    },
    nuevoProductoPost: (req, res, next) => {

        db.Productos.create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descuento: req.body.descuento,
            id_tipo: req.body.categoria,
            usuario: req.body.usuario,
            id_categoria: req.body.categorias,
            descripcion: req.body.descripcion,
            id_marca: req.body.marca,
            activo: 1
            
        })
        .then(function(){
            db.Productos.max('id').then(resultado => {
                for (var i = 0 ; i < req.body.talles.length ; i ++){
                    db.Producto_talle.create({
                        id_producto : resultado,
                        id_talle : req.body.talles[i]
                    })
                }
                }) 
        })
        .then(function(){
            db.Productos.max('id').then(resultado => {
                for (var i = 0 ; i < req.body.colores.length ; i ++){
                    db.Producto_color.create({
                        id_producto : resultado,
                        id_color : req.body.colores[i]
                    })
                }
                }) 
        })
        .then(function(){
            db.Productos.max('id').then(resultado => {
                for (var i = 0 ; i < req.files.length ; i ++){
                    db.Imagenes.create({
                       id_producto : resultado,
                        path : req.files[i].filename,
                       nombre : req.files[i].originalname
                    })
                }
                }) 
        })
        .then(function(){
            db.Productos.findAll({
                order: [
                    ['nombre', 'ASC'],
                    ],
            })
        })
        .then(function(productos){

            res.redirect('/admin/products');
        }) 
    },

    editarProducto: (req, res, next) => {
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
            res.render('admin/editProduct', {producto, marcas, talles, colores, tallesProducto, coloresProducto,usuario: req.usuarioLogueado, mensaje: "nada"})//enviamos a la vista los 4 objetos.
        });
    },
    agregarMarca: (req, res, next) =>{
        db.Marcas.findAll()//se buscan las marcas
        .then(function(marcas){
            res.render('admin/agregarMarcas',{
                marcas, usuario: req.usuarioLogueado
            })
        })

    },
    agregarMarcaPost: (req, res, next) =>{
        db.Marcas.create({
            nombre: req.body.marca
        })//se agregan marcas
        .then(function(marcas){
            console.log('La marca es ' + req.body.nuevaMarca);
            res.redirect('/admin/products/create')
        })

    },
    editarProductoPost: (req, res, next) => {
        db.Productos.update({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descuento: req.body.descuento,
            id_tipo: req.body.categoria,
            usuario: req.body.usuario,
            id_categoria:  req.body.categorias,
            descripcion: req.body.descripcion,
            id_marca: req.body.marca
            
        },{
            where :  {id: req.params.id}
        })
        
        .then(resultado => {
            for (var i = 0 ; i < req.body.talles.length ; i ++){
                db.Producto_talle.update({
                    id_talle : req.body.colores[i]
                },{
                    where :{id_producto : req.params.id

                    }
                })
            }
            }) 
            .then(resultado => {
                for (var i = 0 ; i < req.body.colores.length ; i ++){
                    db.Producto_color.update({
                        id_color : req.body.colores[i]
                    },{
                        where :{id_producto : req.params.id
    
                        }
                    })
                }
                }) .then(resultado => {
                    for (var i = 0 ; i < req.files.length ; i ++){
                        db.Imagenes.update({
                            path : req.files[i].filename,
                           nombre : req.files[i].originalname
                            }, {
                            where :{id_producto : req.params.id}
                                }
                        )
                    }
                    }) 
                .then(function(productos){

                        res.redirect("/admin/products");
                    }) 
    },
    cambioEstado:(req, res, next) => {
        db.Carritos.update({
            estado : req.body.estado
            
        },{
            where :  {id: req.params.id}
        }) .then(function(productos){

            res.redirect("/admin/carritosLista/" + req.params.id);
        }) 
    },
    destroy : (req, res) => {
            db.Producto_talle.destroy({
            where : {
                id_producto : req.params.id
            }})
            .then(function(){
                db.Producto_color.destroy({
                where : {
                    id_producto : req.params.id
                }})      
        }) 
        .then(function(){
            db.Imagenes.destroy({
            where : {
                id_producto : req.params.id
            }})
            .then(function(){
                db.Productos.destroy({
                where : {
                    id : req.params.id
                }})         
        })          
        }).then(function(){res.redirect ("/admin/products")})
    
    },
    softDelete: (req, res, next) => {

        db.Productos.update({
            activo : 0
        },{
            where :  {id: req.params.id}
        }).then( function(){
            db.Productos.findByPk(req.params.id)
            .then(productoborrado => {

                res.redirect("/admin/products")

            })
        })
        .catch(function(error){
            console.log(error);
        })

    },
    listaProductoFiltrados: (req, res, next) =>{
    let page = 0;
    let offsetRecibed = 0;

    console.log(req.body)

    var usuarioWhere;
    var categoriaWhere;
    var precioWhere;
    var talleWhere;
    var colorWhere;
    var marcasWhere;

    var usuarioFilter;
    var categoriaFilter;
    var precioFilter;
    var talleFilter;
    var colorFilter;
    var marcasFilter;

    usuarioFilter = req.body.persona
    if ( req.body.persona == 'todos' ) {
        usuarioWhere = { [Op.ne]: 'powerñlkajsdfjhxbcv' };
    } else {
        usuarioWhere = { [Op.eq]: req.body.persona };
    }

    
    if ( req.body.categoria ) {
        if ( typeof(req.body.categoria) == 'string' ) {
            categoriaWhere = { [Op.in]: [req.body.categoria] };
            categoriaFilter = [req.body.categoria];
        } else {
            categoriaWhere = { [Op.in]: req.body.categoria };
            categoriaFilter = req.body.categoria;
        }
    } else {
        categoriaWhere = { [Op.ne]: 'powerñlkajsdfjhxbcv' };
        categoriaFilter = 'null';
    }

    precioFilter = [req.body.preciomin, req.body.preciomax]
    precioWhere = { [Op.between]: [req.body.preciomin, req.body.preciomax] };

    if ( req.body.talles ) {
        if ( typeof(req.body.talles) == 'string' ) {
            talleWhere = { [Op.in]: [req.body.talles] };
            talleFilter = [req.body.talles]
        } else {
            talleWhere = { [Op.in]: req.body.talles };
            talleFilter = req.body.talles
        }
    } else {
        talleWhere = { [Op.ne]: 'powerñlkajsdfjhxbcv' };
        talleFilter = 'null'
    }

    if ( req.body.color ) {
        if ( typeof(req.body.color) == 'string' ) {
            colorWhere = { [Op.in]: [req.body.color] };
            colorFilter = [req.body.color]
        } else {
            colorWhere = { [Op.in]: req.body.color };
            colorFilter = req.body.color
        }
    } else {
        colorWhere = { [Op.ne]: 'powerñlkajsdfjhxbcv' };
        colorFilter = 'null'
    }

    if ( req.body.marcas ) {
        if ( typeof(req.body.marcas) == 'string' ) {
            marcasWhere = { [Op.in]: [req.body.marcas] };
            marcasFilter = [req.body.marcas]
        } else {
            marcasWhere = { [Op.in]: req.body.marcas };
            marcasFilter = req.body.marcas
        }
    } else {
        marcasWhere = { [Op.ne]: 'powerñlkajsdfjhxbcv' }; 
        marcasFilter = 'null'
    }
    if(req.query.page){
        page = Number(req.query.page)
        offsetRecibed = page*2;
        page=Number(req.query.page)+1;
    let contarProductos = db.Productos.count({include :[ 
        {association : "imagenes"},
        {association : "colores",
            where : {
                nombre: colorWhere,                
            },
        },
        {association : "marcas",
            where : {
                nombre: marcasWhere,                
            },
        },
        {association : "talles",
            where : {
                talle: talleWhere,                
            },
        },
        {association : "categorias",
            where : {
                nombre: categoriaWhere,                
            },
        },],
        where : {
            usuario: usuarioWhere,
            precio: precioWhere,
            activo: 1
        },
        order: [
            ['nombre', 'ASC'],
            ],
        distinct: 'id'
        });       

    let mostrarProductos = db.Productos.findAll({
        offset : offsetRecibed,
        limit : 10,
        include :[ 
        {association : "imagenes"},
        {association : "colores",
            where : {
                nombre: colorWhere,                
            },
        },
        {association : "marcas",
            where : {
                nombre: marcasWhere,                
            },
        },
        {association : "talles",
            where : {
                talle: talleWhere,                
            },
        },
        {association : "categorias",
            where : {
                nombre: categoriaWhere,                
            },
        },],
        where : {
            usuario: usuarioWhere,
            precio: precioWhere,
            activo: 1
        },
        order: [
            ['nombre', 'ASC'],
            ],
    })

    let mostrarMarcas = db.Marcas.findAll();
    let mostrarTalles = db.Talles.findAll({
        
        order: [
            ['id', 'ASC'],
            ],
    });
    let mostrarColores = db.Colores.findAll();
    let mostrarCategorias = db.Categorias.findAll();

    Promise.all ([contarProductos, mostrarProductos, mostrarMarcas, mostrarTalles, mostrarColores, mostrarCategorias])
    .then(function([contarProductos, productos, marcas, talles, colores, categorias]){
        console.log(contarProductos);
        res.render('admin/listProducts', {contarProductos, productos, marcas, talles, colores, categorias, page, toThousand,
            filtros:{
                usuario: usuarioFilter,
                categoria: categoriaFilter,
                precio: precioFilter,
                talle: talleFilter,
                color: colorFilter,
                marcas: marcasFilter
            },
            usuario: req.usuarioLogueado
        });
    })
    .catch(function(error){
        console.log(error);
    })}else{
    let contarProductos = db.Productos.count({include :[ 
        {association : "imagenes"},
        {association : "colores",
            where : {
                nombre: colorWhere,                
            },
        },
        {association : "marcas",
            where : {
                nombre: marcasWhere,                
            },
        },
        {association : "talles",
            where : {
                talle: talleWhere,                
            },
        },
        {association : "categorias",
            where : {
                nombre: categoriaWhere,                
            },
        },],
        where : {
            usuario: usuarioWhere,
            precio: precioWhere,
            activo: 1
        },
        order: [
            ['nombre', 'ASC'],
            ],
        distinct: 'id'
        });       

    let mostrarProductos = db.Productos.findAll({
        offset : offsetRecibed,
        limit : 10,
        include :[ 
        {association : "imagenes"},
        {association : "colores",
            where : {
                nombre: colorWhere,                
            },
        },
        {association : "marcas",
            where : {
                nombre: marcasWhere,                
            },
        },
        {association : "talles",
            where : {
                talle: talleWhere,                
            },
        },
        {association : "categorias",
            where : {
                nombre: categoriaWhere,                
            },
        },],
        where : {
            usuario: usuarioWhere,
            precio: precioWhere,
            activo: 1
        },
        order: [
            ['nombre', 'ASC'],
            ],
    })

    let mostrarMarcas = db.Marcas.findAll();
    let mostrarTalles = db.Talles.findAll({
        
        order: [
            ['id', 'ASC'],
            ],
    });
    let mostrarColores = db.Colores.findAll();
    let mostrarCategorias = db.Categorias.findAll();

    Promise.all ([contarProductos, mostrarProductos, mostrarMarcas, mostrarTalles, mostrarColores, mostrarCategorias])
    .then(function([contarProductos, productos, marcas, talles, colores, categorias]){
        console.log(contarProductos);
        res.render('admin/listProducts', {contarProductos, productos, marcas, talles, colores, categorias, page, toThousand,
            filtros:{
                usuario: usuarioFilter,
                categoria: categoriaFilter,
                precio: precioFilter,
                talle: talleFilter,
                color: colorFilter,
                marcas: marcasFilter
            },
            usuario: req.usuarioLogueado
        });
    })
    .catch(function(error){
        console.log(error);
    })}

    },
    listadoCarritos: (req, res, next) =>{
        let usuarioId = req.session.usuario.id;
        let mostrarCarritos = db.Carritos.findAll({
            
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
            include : [{association:"producto"}, {association:"carrito"}, {association:"talle"},
            {association:"color"}]})

        let mostrarColores = db.Colores.findAll();
        let mostrarUsuarios = db.Usuarios.findAll();
        let mostrarProductos = db.Productos.findAll({include : [{association:"imagenes"}]});
        
        Promise.all ([mostrarCarritos, mostrarCarritoProducto, mostrarMarcas, mostrarTalles, mostrarColores, mostrarUsuarios, mostrarProductos])
        .then(function([carritos, carritoProducto, marcas, talles, colores, usuarios, productos]){
            res.render('admin/listCarritos', {carritos, carritoProducto, marcas, talles, colores, usuarios, productos, toThousand,
                usuario: req.usuarioLogueado
            });
        })
        .catch(function(error){
            console.log(error);
        })

    },
    listadoCarrito: (req, res, next) =>{
        let usuarioId = req.session.usuario.id;
        let mostrarCarritos = db.Carritos.findAll({where : {
            id: req.params.id
        },
            
            include : [{association:"carrito_productos"}]})
        let mostrarMarcas = db.Marcas.findAll();//se buscan las marcas
        let mostrarTalles = db.Talles.findAll({//se buscan los talles
            order: [
                ['id', 'ASC'],
                ],
        });
        let mostrarCarritoProducto = db.Carrito_producto.findAll({where : {
            id_carrito : req.params.id}
            , 
            include : [{association:"producto"}, {association:"carrito"}, {association:"talle"},
            {association:"color"}]})

        let mostrarColores = db.Colores.findAll();
        let mostrarUsuarios = db.Usuarios.findAll();
        let mostrarProductos = db.Productos.findAll({include : [{association:"imagenes"}, {association:"marcas"}]});
        let mostrarStocks = db.Stocks.findAll();
        
        Promise.all ([mostrarCarritos, mostrarCarritoProducto, mostrarMarcas, mostrarTalles, mostrarColores, mostrarUsuarios, mostrarProductos, mostrarStocks])
        .then(function([carritos, carritoProducto, marcas, talles, colores, usuarios, productos, stocks]){
            res.render('admin/detalleCarritos', {carritos, carritoProducto, marcas, talles, colores, usuarios, productos, stocks, toThousand,
                usuario: req.usuarioLogueado
            });
        })
        .catch(function(error){
            console.log(error);
        })

    },
    agregarStocksId: (req, res, next) =>{
        db.Productos.findAll({include: [{association:"marcas"}, {association:"talles"}, {association:"colores"}],
       where: {
           id : req.params.id
       },
        limit: 1
       }).then(function (producto){
           console.log(producto);
           res.render('admin/agregarStocks', {producto, usuario:req.usuarioLogueado})
       }).catch(function(error){
           console.log(error);
       })
       },
    agregarStocks: (req, res, next) =>{
     db.Productos.findAll({include: [{association:"marcas"}, {association:"talles"}, {association:"colores"}],
    order :[['createdAt', 'DESC']],
     limit: 1
    }).then(function (producto){
        console.log(producto);
        res.render('admin/agregarStocks', {producto, usuario:req.usuarioLogueado})
    }).catch(function(error){
        console.log(error);
    })
    },  
    agregarStocksPost: (req, res, next) =>{
        console.log(req.params.id);
        console.log(req.body);
        for (let i = 0; i < req.body.talle.length; i++) {
            db.Stocks.create({
                id_talle : req.body.talle[i],
                id_color : req.body.colores[i],
                stock : req.body.stock[i],
                id_producto : req.params.id
            }).catch(function(error){
                console.log(error);
            })
           .then(function(result){res.redirect('../../admin/products');
            ;(console.log("el talle " + req.body.talle[i]+" de color "+req.body.colores[i]+" tiene un stock de: " + req.body.stock[i]));}) 
            
        }
    },
    editarStocks: (req, res, next) =>{
        console.log(req.params.id);
        console.log(req.body);
        for (let i = 0; i < req.body.talle.length; i++) {
            db.Stocks.create({
                id_talle : req.body.talle[i],
                id_color : req.body.colores[i],
                stock : req.body.stock[i],
                id_producto : req.params.id
            }).catch(function(error){
                console.log(error);
            })
           .then(function(result){res.redirect('../../admin/products');
            ;(console.log("el talle " + req.body.talle[i]+" de color "+req.body.colores[i]+" tiene un stock de: " + req.body.stock[i]));}) 
            
        }
    },
    verStocks: (req, res, next) =>{
            let mostrarStocks = db.Stocks.findAll({
            include : [{association:"producto"}, {association:"talle"},
            {association:"color"}],
            where : {
                id_producto: req.params.id,
            },})
            let mostrarMarcas = db.Marcas.findAll();
            let mostrarCarritoProducto = db.Carrito_producto.findAll({
                include : [{association:"carrito"}],
                where : {
                    id_producto : req.params.id
                }
            })
            Promise.all([mostrarStocks, mostrarMarcas, mostrarCarritoProducto])
            .then(function([stocks, marcas, carritoProducto]){
                console.log(stocks);
                res.render('admin/listStocks.ejs', {stocks, marcas, carritoProducto, toThousand,
                    usuario: req.usuarioLogueado
                })
    })},
    panelAdmin: (req, res, next) =>{
        res.render('admin/panelAdmin', {usuario:req.usuarioLogueado})
    }
}

module.exports = adminController;