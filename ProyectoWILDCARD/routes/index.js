var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");
const accesoMiddleware = require('../middlewares/accesoMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');
const { check, validationResult, body } = require('express-validator');

/* GET home page. */
router.get('/', accesoMiddleware.userSessionLogged, indexController.home);
router.get('/ayuda', accesoMiddleware.userSessionLogged, indexController.ayuda);
router.get('/contactanos', accesoMiddleware.userSessionLogged, indexController.contacto);

router.post('/sendEmail',[check('fullname').isLength( {min:3} ).withMessage('Nombre - campo obligatorio mayor a 3 letras'),
check('email').isEmail().withMessage('Email - El formato ingresado no es válido'),
check('email').isLength( {min:3} ).withMessage('Email- campo obligatorio'),
check('asunto').isLength( {min:3} ).withMessage('Asunto- campo obligatorio'),
check('msj').isLength( {min:10} ).withMessage('Mensaje- campo obligatorio, mayor a 10 caracteres.')], userMiddleware.checkContactError, indexController.sendEmail);

module.exports = router;
