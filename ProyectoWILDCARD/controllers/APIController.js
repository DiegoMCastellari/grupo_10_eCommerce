const db = require("../database/models");
const Op = db.Sequelize.Op;

var APIController = {
    users: (req, res, next) => {
        db.Usuarios.findAll()
        .then( (result)=>{
            console.log("STATUSSSSS");
            console.log(res.status);

            let datos = {
                url: "http://localhost:3000/api/users",
                status: "200",
                message: "OK",
                response:{
                    cantidadUsuarios: result.length                  
                }
            }
            res.json(datos)

        }).catch(function(error){
            console.log(error);
        })

    },
    productos: (req, res, next) => {
        db.Productos.findAll()
        .then( (result)=>{

            let datos = {
                url: "http://localhost:3000/api/productos",
                status: "200",
                message: "OK",
                response: {
                    cantidadProductos: result.length             
                }
            }
            res.json(datos)
        })
    },
    productosUltimo: (req, res, next) => {
        db.Productos.findAll({
            order :[['createdAt', 'DESC']],
            limit: 1
        }).then( (result)=>{

            let datos = {
                url: "http://localhost:3000/api/productosUltimo",
                status: "200",
                message: "OK",
                response: {
                    ultimoProducto: result             
                } 
            }
            res.json(datos)
        })
    },
    ventas: (req, res, next) => {

        db.Carritos.findAll({where : {
            estado : {[Op.substring]: "cerrado"}
        }}).then( (result)=>{

            let datos = {
                url: "http://localhost:3000/api/ventas",
                status: "200",
                message: "OK",
                response: {
                    cantidadVentas: result.length             
                }
            }
            res.json(datos)
        })
    }
}

module.exports = APIController;