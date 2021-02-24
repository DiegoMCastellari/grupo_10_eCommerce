const db = require("../database/models");
const Op = db.Sequelize.Op;

var APIController = {
    users: (req, res, next) => {
        db.Usuarios.findAll()
        .then( (result)=>{
            for (let i = 0; i < result.length; i++) {
                result[i].setDataValue('endpoint', "/api/users/" + result[i].id)  
            };
            let respuesta = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : result.length,
                    url : "/api/users"                
                },
                data : result
            }
            res.json(respuesta) 
        }).catch(function(error){
            console.log(error);
        })

    },
    productos: (req, res, next) => {
        db.Productos.findAll({ include :[ 
            {association : "marcas"}, 
            {association : "talles"},
            {association : "colores"},
            {association : "categorias"},
            {association : "imagenes"}],
        where : {
            activo : 1
        }})
        .then( (result)=>{
            for (let i = 0; i < result.length; i++) {
                result[i].setDataValue('endpoint', "/api/productos/" + result[i].id)  
            };
            let respuesta = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : result.length,
                    url : "/api/productos",
                    totalPrice : (result.map((products)=>products.precio)).reduce(function(a, b){ return a + b; })                
                },
                data : result
            }
            res.json(respuesta)
        }).catch(function(error){
            console.log(error);
        })
    },
    categories: (req, res, next) => {
        db.Categorias.findAll()
        .then( (result)=>{
            for (let i = 0; i < result.length; i++) {
                result[i].setDataValue('endpoint', "/api/categories/" + result[i].id)  
            };
            let respuesta = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : result.length,
                    url : "/api/categories"                
                },
                data : result
            }
            res.json(respuesta)
        }).catch(function(error){
            console.log(error);
        })
    },
    productosUltimo: (req, res, next) => {
        db.Productos.findAll({
            order :[['createdAt', 'DESC']],
            limit: 1,
            include :[ 
                {association : "imagenes"}]
        }).then( (result)=>{
            for (let i = 0; i < result.length; i++) {
                result[i].setDataValue('endpoint', "/api/productosUltimo/" + result[i].id)  
            };
            let respuesta = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : result.length,
                    url : "/api/productos"                
                },
                data : result
            }
            res.json(respuesta)
        }).catch(function(error){
            console.log(error);
        })
    },
    ventas: (req, res, next) => {

        db.Carritos.findAll({where : {
            estado : {[Op.substring]: "cerrado"}
        }}).then( (result)=>{
            for (let i = 0; i < result.length; i++) {
                result[i].setDataValue('endpoint', "/api/ventas/" + result[i].id)  
            };
            let respuesta = {
                meta:{
                    status : 200,
                    state : "OK",
                    total : result.length,
                    url : "/api/ventas"                
                },
                data : result
            }
            res.json(respuesta)
        }).catch(function(error){
            console.log(error);
        })
    },

}

module.exports = APIController;