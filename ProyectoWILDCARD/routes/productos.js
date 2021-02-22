var express = require('express');
var router = express.Router();
const { check, validationResult, body } = require('express-validator');
const productoController = require('../controllers/productosController');
const accesoMiddleware = require('../middlewares/accesoMiddleware');
const userMiddleware = require('../middlewares/userMiddleware')

router.get('/', accesoMiddleware.userSessionLogged, productoController.productos);

router.get('/ofertas', accesoMiddleware.userSessionLogged, productoController.ofertas);

router.get('/ultimos', accesoMiddleware.userSessionLogged, productoController.loNuevo);
// post
// post
router.get('/search/:producto', accesoMiddleware.userSessionLogged, productoController.busquedaProductosGet);
router.post('/search/', accesoMiddleware.userSessionLogged, productoController.busquedaProductos);

router.post('/filtro', accesoMiddleware.userSessionLogged, productoController.filtro);
router.get('/accesorios', accesoMiddleware.userSessionLogged, productoController.accesorios);


router.get('/:id', accesoMiddleware.userSessionLogged, productoController.detalleProducto);
router.post('/:id', accesoMiddleware.acceso, accesoMiddleware.userSessionLogged, userMiddleware.checkCarrito, productoController.compraProducto);

module.exports = router;