var fs = require('fs');
const db = require("../database/models");
const bcrypt = require("bcrypt")
const { check, validationResult, body } = require('express-validator');
const Op = db.Sequelize.Op;

const userMiddleware = {
    checkUser : (req,res,next) => {

        db.Usuarios.findOne({
            where: {
                email: req.body.email,
                estado: 1
            }
        })
        .then((resultado) => {
            if (resultado) { // si existe usuario chequea contraseña
                if ( bcrypt.compareSync(req.body.password, resultado.password) ) { // si contraseña es correcta, loguea al usuario
                    req.session.loggedIn = true;
                    req.session.usuario = resultado;
                    next()
                } else {
                    req.session.loggedIn = false;
                    var usuario = 'ningunUsuarioLogueado' 
                    mensaje=[{msg: 'Usuario y/o contraseña incorrectos.'}]
                    res.render('users/login', { // si contraseña no es correcta, vuelve al login
                        mensaje,
                        usuario
                    })
                }
            } else { // si no existe usuario vuelve al login
                req.session.loggedIn = false;
                var usuario = 'ningunUsuarioLogueado';
                mensaje=[{msg: 'Usuario y/o contraseña incorrectos.'}]
                res.render('users/login', {
                    mensaje,
                    usuario
                })
            }
        })
    },  checkUserEdit : (req,res,next) => {
        console.log("estoy en CheckUserEdit")
        let userId = req.session.usuario.id;
        db.Usuarios.findOne({
            where: {
                id : userId,
                estado: 1
            }
        })
        .then((resultado) => {
            if (resultado) { // si existe usuario chequea contraseña
                if ( bcrypt.compareSync(req.body.oldpassword, resultado.password) ) {
                    console.log("Contraseña correcta") // si contraseña es correcta, que pase
                    next()
                } else {
                    mensaje=[{msg: 'Contraseña incorrecta.'}]//si no pasa que la escriba de nuevo.
                    res.render('users/userEditUser', {userEdit: req.session.usuario, usuario: req.usuarioLogueado, mensaje})
                    
                }
            } else { // si no existe usuario vuelve al login por algo raro vuelve al login.
                req.session.loggedIn = false;
                var usuario =  req.usuarioLogueado;
                mensaje=[{msg: 'Usuario y/o contraseña incorrectos.'}]
                res.render('users/login', {
                    mensaje,
                    usuario
                })
            }
        })
    },
    checkLoginErrors: (req,res,next) => {
        let errors = validationResult(req);
         
        if (!errors.isEmpty()) {
            let usuario = 'ningunUsuarioLogueado'
            return res.render('users/login', {
                mensaje: errors.errors, 
                usuario 
            });
        } else {
            next()
        }           
    },
    
    checkRegisterErrors : (req,res,next) => {
        let errors = validationResult(req);
         
        if (!errors.isEmpty()) {
            let usuario = 'ningunUsuarioLogueado'
            return res.render('users/register', {
                mensaje: errors.errors, usuario 
            });
        } else {
            next()
        }           
    },
    
    checkContactError : (req,res,next) => {
        let errors = validationResult(req);
         
        if (!errors.isEmpty()) {
            let usuario = 'ningunUsuarioLogueado'
            return res.render('contacto', {
                mensaje: errors.errors, usuario 
            });
        } else {
            next()
        }           
    },
    checkUserExistance : (req,res,next) => {

        db.Usuarios.findOne({
            where: {
                email: req.body.email,

            }
        })
        .then((resultado) => {
            if (resultado) {
                if(resultado.estado!=1){
                    var usuario = 'ningunUsuarioLogueado';
                    mensaje=[{msg:'Usuario dado de baja, registrarse con otro mail'}]
                return res.render('users/register', {
                    mensaje,
                    usuario
                })
                }else{
                var usuario = 'ningunUsuarioLogueado';
                mensaje=[{msg: 'Usuario ya existente.'}]
                return res.render('users/register', {
                    mensaje,
                    usuario
                })}       
            } else {
                next()
            }
        })
    },
    checkPassConfirmation : (req,res,next) => {
            if (req.body.password == req.body.confirmpassword) {
                next()
            } else {
                var usuario = 'ningunUsuarioLogueado';
                mensaje=[{msg: 'Contraseña y confirmación no coinciden.'}]
                res.render('users/register', {
                    mensaje,
                    usuario
                })
            }

         
    },
    checkPassConfirmationEdit : (req,res,next) => {
        if (req.body.password == req.body.confirmpassword) {
            next()
        } else {
            var usuario =  req.usuarioLogueado;
            mensaje=[{msg: 'Contraseña y confirmación no coinciden.'}]
            res.render('users/userEditUser', {
                mensaje,
                usuario
            })
        }

     
},

    checkCarrito : (req,res,next) => {
        let usuarioId = req.session.usuario.id
        db.Carritos.findOne({where : {
            id_usuario : usuarioId,
            estado : {[Op.substring]: "abierto"}
        }
        }).then(function(resultado){
            if (resultado){
                console.log('se encontro carrito');
                next() 
            }else{
                console.log('no se encontro carrito para el usuario ' + usuarioId )
                db.Carritos.create({
                    id_usuario : usuarioId,
                    estado : "abierto",
                    forma_pago : req.body.mediosPago,
                    forma_envio : req.body.mediosEnvio
                }).then(function(carrito){
                    console.log('se creo carrito');
                    next()
                })
            }
        })
    },
    checkEditUserErrors: (req,res,next) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('users/userEditUser', {
                userEdit: req.session.usuario, 
                usuario: req.session.usuario, 
                mensaje: errors.errors,})
        } else {
            next()
        }           
    }
}

module.exports = userMiddleware;