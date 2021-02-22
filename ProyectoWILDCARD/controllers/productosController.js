
var fs = require('fs');

const db = require ('../database/models');
const Op = db.Sequelize.Op;

var rawdata = fs.readFileSync(__dirname + "/../data/products.json");
let listaProductos = JSON.parse(rawdata);
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productoController = {
    productos: (req, res, next) => {
        let page = 0;
        let offsetRecibed = 0;
        let accesorio = 0;
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
            where: {
                activo: 1
            },
            offset : offsetRecibed,
            limit : 10,
            include :[ 
            {association : "imagenes"}]}, {
            order: [
                ['nombre', 'ASC'],
                ]
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
            console.log(contarProductos);
            res.render('products/productos', {contarProductos, productos : productos, marcas, talles, colores, categorias, accesorio, toThousand, page, 
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
        where: {
            activo: 1
        },
        offset : offsetRecibed,
        limit : 10,
        include :[ 
        {association : "imagenes"}]}, {
        order: [
            ['nombre', 'ASC'],
            ]
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
        res.render('products/productos', {contarProductos, productos : productos, marcas, talles, colores, categorias, accesorio, toThousand, page, 
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
    busquedaProductos: function(req, res, next){
        let page = 0;
        let offsetRecibed = 0;
        var busqueda = req.body.search;
        let contarProductos = db.Productos.count({
            where : {
                activo: 1,
                nombre : {[Op.substring]: busqueda}
            },
            order: [
                ['nombre', 'ASC'],
                ],
        });    
        let productos = db.Productos.findAll({include :[ 
            {association : "imagenes"}],
            where : {
                activo: 1,
                nombre : {[Op.substring]: busqueda}
            },
            offset : offsetRecibed,
            limit : 10,
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
        Promise.all ([contarProductos, productos, mostrarMarcas, mostrarTalles, mostrarColores, mostrarCategorias])
        .then(function([contarProductos, productos, marcas, talles, colores, categorias]){
            console.log(contarProductos);
            res.render('products/listadoBusqueda', {contarProductos, productos, marcas, talles, colores, categorias, page, toThousand, busqueda,
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
        .catch(function(error){
            console.log(error);
        })
    },
    busquedaProductosGet: function(req, res, next){
        let page = 0;
        let offsetRecibed = 0;
        var busqueda = req.params.producto;
        console.log(busqueda);
        if(req.query.page){
            page = Number(req.query.page)
            offsetRecibed = page*10;
            page=Number(req.query.page)+1;
            console.log(offsetRecibed);
        let contarProductos = db.Productos.count({
            where : {
                activo: 1,
                nombre : {[Op.substring]: busqueda}
            },
            order: [
                ['nombre', 'ASC'],
                ],
        });    
        let productos = db.Productos.findAll({include :[ 
            {association : "imagenes"}],
            where : {
                activo: 1,
                nombre : {[Op.substring]: busqueda}
            },
            offset : offsetRecibed,
            limit : 10,
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
        Promise.all ([contarProductos, productos, mostrarMarcas, mostrarTalles, mostrarColores, mostrarCategorias])
        .then(function([contarProductos, productos, marcas, talles, colores, categorias]){
            console.log(contarProductos);
            res.render('products/listadoBusqueda', {contarProductos, productos, marcas, talles, colores, categorias, page, busqueda, toThousand,
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
        .catch(function(error){
            console.log(error);
        })
    }else{
        let contarProductos = db.Productos.count({include :[ 
            {association : "imagenes"}],
            where : {
                nombre : {[Op.substring]: busqueda}
            },
            order: [
                ['nombre', 'ASC'],
                ],
        });    
        let productos = db.Productos.findAll({include :[ 
            {association : "imagenes"}],
            where : {
                activo: 1,
                nombre : {[Op.substring]: busqueda}
            },
            offset : offsetRecibed,
            limit : 10,
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
        Promise.all ([contarProductos, productos, mostrarMarcas, mostrarTalles, mostrarColores, mostrarCategorias])
        .then(function([contarProductos, productos, marcas, talles, colores, categorias]){

            res.render('products/listadoBusqueda', {contarProductos, productos, marcas, talles, colores, categorias, page, busqueda, toThousand,
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
        .catch(function(error){
            console.log(error);
        })
    }
    },
    ofertas: function(req, res, next){
        let page = 0;
        let offsetRecibed = 0;
        let accesorio =2;
        if(req.query.page){
            page = Number(req.query.page)
            offsetRecibed = page * 10;
            page=Number(req.query.page)+1;
        let contarProductos = db.Productos.count({
            where : {
                activo: 1,
                descuento : { [Op.gt]: 0.5 }
            },
            order: [
                ['nombre', 'ASC'],
                ],
        });
        let mostrarProductos = db.Productos.findAll({include :[ 
            {association : "imagenes"}],
            where : {
                activo: 1,
                descuento : { [Op.gt]: 0.5 }
            },
            offset : offsetRecibed,
            limit : 10,
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
            res.render('products/productos', {contarProductos, productos, marcas, talles, colores, categorias, accesorio, page, toThousand,
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
        where : {
            activo: 1,
            descuento : { [Op.gt]: 0.5 }
        },
        order: [
            ['nombre', 'ASC'],
            ],
    });
    let mostrarProductos = db.Productos.findAll({include :[ 
        {association : "imagenes"}],
        where : {
            activo: 1,
            descuento : { [Op.gt]: 0.5 }
        },
        offset : offsetRecibed,
        limit : 10,
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
        res.render('products/productos', {contarProductos, productos, marcas, talles, colores, accesorio, categorias, page, toThousand,
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
    accesorios: function(req, res, next){
        let accesorio = 1;
        let page = 0;
        let offsetRecibed = 0;
        if(req.query.page){
            page = Number(req.query.page)
            offsetRecibed = page*10;
            page=Number(req.query.page)+1;
        let contarProductos = db.Productos.count({  
            where : {
            id_tipo : 2,
            activo: 1
        },
        order: [
            ['nombre', 'ASC'],
            ],})
        let mostrarProductos = db.Productos.findAll({include :[ 
            {association : "imagenes"}],
            where : {
                id_tipo : 2,
                activo: 1
            },        
            offset : offsetRecibed,
            limit : 10,
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
            res.render('products/productos', {contarProductos, productos, marcas, talles, colores, categorias, page, accesorio, toThousand, 
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
    }else{ let contarProductos = db.Productos.count({  
        where : {
        id_tipo : 2,
        activo: 1
    },
    order: [
        ['nombre', 'ASC'],
        ],})
    let mostrarProductos = db.Productos.findAll({include :[ 
        {association : "imagenes"}],
        where : {
            id_tipo : 2,
            activo: 1
        },        
        offset : offsetRecibed,
        limit : 10,
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
        res.render('products/productos', {contarProductos, productos, marcas, talles, colores, categorias, accesorio, page, toThousand, 
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
    loNuevo: (req, res, next) =>{
        let accesorio = 0;
        let contarProductos = 9;
        let page = 0;
        let mostrarProductos = db.Productos.findAll({include :[ 
            {association : "imagenes"},
            {association : "marcas"},
            {association : "talles"},
            {association : "categorias"}] ,
            order: [
                ['createdAt', 'ASC'],
                ],
            limit : 10
        });
        let mostrarMarcas = db.Marcas.findAll();
        let mostrarTalles = db.Talles.findAll({
            
            order: [
                ['id', 'ASC'],
                ],
        });
        let mostrarCategorias = db.Categorias.findAll();
        let mostrarColores = db.Colores.findAll();
        Promise.all ([mostrarProductos, mostrarMarcas, mostrarTalles, mostrarColores, mostrarCategorias])
        .then(function([productos, marcas, talles, colores, categorias]){
            res.render('products/productos', {contarProductos, productos, marcas, talles, colores, categorias, page, accesorio, toThousand,
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
    },
    filtro: (req, res, next) =>{
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
            res.render('products/listadoBusqueda', {contarProductos, productos, marcas, talles, colores, categorias, page, toThousand,
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
            res.render('products/listadoBusqueda', {contarProductos, productos, marcas, talles, colores, categorias, page, toThousand,
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
    detalleProducto: (req, res, next) => {
        let productID = req.params.id;
        let productSelect = {};
        db.Productos.findByPk(req.params.id, {
            include : [{association:"talles"}, 
            {association:"colores"}, 
            {association:"imagenes"}, 
            {association:"marcas"},
            {association:"categorias"}]//se agrega la asociacion que esta en models
        })
        .then(function(producto){
            db.Productos.findAll({
                where : {
                    id_categoria : producto.categorias.id
                }
                , 
                    include : [{association:"talles"}, 
                    {association:"colores"}, 
                    {association:"imagenes"}, 
                    {association:"marcas"}],
            order: [
                ['nombre', 'ASC'],
                ],
            })
            .then(function(productos){
                res.render('products/productDetail', {producto, productos,  toThousand,
                    usuario: req.usuarioLogueado
                })
            })

        })
        .catch(function(error){
            console.log(error);
        })
    },
    compraProducto: (req, res, next) => {
        console.log('paso');
        let usuarioId = req.session.usuario.id
        db.Carritos.findOne({where : {
            id_usuario : usuarioId,
            estado : {[Op.substring]: "abierto"}
        }
        }).then(function(resultado){
                console.log('carrito encontrado, el id es '+ resultado.id);
                db.Carrito_producto.create({
                    id_carrito : resultado.id,
                    id_producto : req.params.id,
                    id_talle : req.body.talle,
                    id_color : req.body.color,
                    cantidad: req.body.cantidad,
                    id_usuario : usuarioId
                        }).then(function(resultado){
                            res.redirect('../users/carrito')
                        })})
            
                

    }
};

module.exports = productoController;