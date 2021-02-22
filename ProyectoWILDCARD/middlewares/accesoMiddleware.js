var fs = require('fs');
const db = require("../database/models");
const { check, validationResult, body } = require('express-validator');
const multer = require('multer');

const accesoMiddleware = {
    acceso: (req,res,next) => {

        if ( req.session.usuario ) {
            next()
        } else {
            // req.session.error = 'Access denied!';
            res.render('users/login', {
                mensaje: 'Acceso denegado! Por favor, logueese',
                usuario: "ningunUsuarioLogueado"
            })
        }
    },
    accesoAdmin: (req,res,next) => {

        if ( req.session.usuario ){
            if ( req.session.usuario.permiso == 'admin' ) {
                next()
            } else {
                res.render('home',{
                    mensaje: 'nada',
                    usuario: req.session.usuario
                })
            }
        } else {
            res.render('users/login', {
                mensaje: 'Acceso denegado! Por favor, logueese',
                usuario: "ningunUsuarioLogueado"
            })
        }
    },
    userSessionLogged: (req,res,next) => {

        if ( req.session.usuario ) {
            req.usuarioLogueado = req.session.usuario
        } else {
            req.usuarioLogueado = "ningunUsuarioLogueado"
        }
        next()
    }
}

module.exports = accesoMiddleware;