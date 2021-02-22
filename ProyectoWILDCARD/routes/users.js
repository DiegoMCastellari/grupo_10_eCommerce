var express = require('express');
var router = express.Router();
const { check, validationResult, body } = require('express-validator');
const usersController = require('../controllers/usersContreller')
const userMiddleware = require('../middlewares/userMiddleware')
const accesoMiddleware = require('../middlewares/accesoMiddleware')


router.get('/register', accesoMiddleware.userSessionLogged, usersController.register);
router.post('/register', [
    check('fullname').isLength( {min:3} ).withMessage('Nombre - campo obligatorio mayor a 3 letras'),
    check('email').isEmail().withMessage('Email - El formato ingresado no es válido'),
    check('email').isLength( {min:3} ).withMessage('Email- campo obligatorio'),
    check('password').isLength( {min:6} ).withMessage('Contraseña - campo obligatorio mayor a 6 letras'),
    check('confirmpassword').isLength( {min:1} ).withMessage('Confimación de contraseña - campo obligatorio'),
], userMiddleware.checkRegisterErrors, userMiddleware.checkPassConfirmation, userMiddleware.checkUserExistance, usersController.store)

router.get('/login', accesoMiddleware.userSessionLogged, usersController.login);
router.post('/login', [
    check('email').isEmail().withMessage('Email - El formato ingresado no es válido'),
    check('email').isLength( {min:3} ).withMessage('Email- campo obligatorio'),
    check('password').isLength( {min:6} ).withMessage('Contraseña - campo obligatorio'),
], userMiddleware.checkLoginErrors, userMiddleware.checkUser, accesoMiddleware.userSessionLogged, usersController.loginOK);

/* router.get('/userList', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, usersController.list);

router.get('/userList/delete/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, usersController.destroy)

router.get('/userList/edit/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, usersController.editarUsuario);//ver
router.post('/userList/edit/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, usersController.editarUsuarioPost)
 */
router.get('/editar', accesoMiddleware.userSessionLogged, usersController.editarUsuarioUser);//ver
router.post('/editar', [
    check('fullname').isLength( {min:3} ).withMessage('Nombre - campo obligatorio mayor a 3 letras'),
    check('email').isEmail().withMessage('Email - El formato ingresado no es válido'),
    check('email').isLength( {min:3} ).withMessage('Email- campo obligatorio'),
    check('password').isLength( {min:6} ).withMessage('Contraseña - campo obligatorio mayor a 6 letras'),
    check('confirmpassword').isLength( {min:1} ).withMessage('Confimación de contraseña - campo obligatorio'),
], userMiddleware.checkEditUserErrors, accesoMiddleware.userSessionLogged, usersController.editarUsuarioUserPost)


router.get('/carrito/borrar/:id', accesoMiddleware.acceso,accesoMiddleware.userSessionLogged, usersController.borraDeCarrito);
router.get('/carrito/cantidad/:idBuscado/:cantidadBuscada/', accesoMiddleware.acceso,accesoMiddleware.userSessionLogged, usersController.cambiarCantidad);
router.get('/carrito/comprar/:id', accesoMiddleware.acceso,accesoMiddleware.userSessionLogged, usersController.finalizarCompra);
router.get('/carrito/verCarrito/', accesoMiddleware.acceso,accesoMiddleware.userSessionLogged, usersController.carritoVacio);
router.get('/carrito/:id?', accesoMiddleware.acceso,accesoMiddleware.userSessionLogged, usersController.carrito);
router.post('/carrito/:id?',accesoMiddleware.userSessionLogged, usersController.carrito);

router.get('/closesession', usersController.closeSession);

module.exports = router;
