var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");
const accesoMiddleware = require('../middlewares/accesoMiddleware')

/* GET home page. */
router.get('/', accesoMiddleware.userSessionLogged, indexController.home);
router.get('/ayuda', accesoMiddleware.userSessionLogged, indexController.ayuda);
router.get('/contactanos', accesoMiddleware.userSessionLogged, indexController.contacto);

router.post('/sendEmail', indexController.sendEmail);
/* router.get('localhost:3000', function(req, res, next) {
  res.render('home');
});

router.get('/productos', function(req, res, next) {
  res.render('productos', { title: 'Express' });
});
router.get('/detalleProducto', function(req, res, next) {
  res.render('productDetail', { title: 'Express' });
});

router.get('/header', function(req, res, next) {
  res.render('header.ejs', { title: 'Express' });
});

// MOVIDOS A CARPETA USERS Y ACCESO POR USERSCONTROLLER 
router.get('/register', function(req, res, next) {
  res.render('register.ejs');
});
router.get('/login', function(req, res, next) {
  res.render('login.ejs');
});
router.get('/carrito', function(req, res, next) {
  res.render('carrito.ejs', { title: 'Express' });
});


router.get('/nuevoProducto', function(req, res, next) {
  res.render('newProduct.ejs', { title: 'Express' });
}); */
module.exports = router;
