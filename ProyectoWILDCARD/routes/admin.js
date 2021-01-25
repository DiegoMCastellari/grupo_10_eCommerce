var express = require('express');
var router = express.Router();
const path = require ('path');
const multer = require('multer');
const adminController = require('../controllers/adminController')
const accesoMiddleware = require('../middlewares/accesoMiddleware')
const { check, validationResult, body } = require('express-validator');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/products')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

router.get('/carritosLista', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.listadoCarritos);
router.get('/carritosLista/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.listadoCarrito);
router.post('/carritosLista/estado/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.cambioEstado);

router.get('/stocks', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.verStocks);

router.get('/products', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.listaProducto);
router.post('/products', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.listaProductoFiltrados);

router.get('/products/create', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.nuevoProducto);
router.post('/products/create', upload.any(), [
    check('nombre').isLength({min:3}).withMessage('Debe ingresar un nombre, mayor a 3 letras.'),
    check('marca').isInt({min:0}).withMessage('Debe seleccionar una marca.'),
    check('categoria').isInt({min:0}).withMessage('Debe selecionar una categoria.'),
    check('categorias').notEmpty().withMessage('Debe selecionar una subcategoría.'),
    check('talles').notEmpty().withMessage('Debe selecionar al menos un talle.'),
    check('colores').notEmpty().withMessage('Debe selecionar al menos un color.'),
    check('precio').isInt({min:0}).withMessage('El precio debe ser un número mayora 0.'),
    check('descuento').isInt({min:0}).withMessage('El descuento debe ser un número.'),
    check('descripcion').isLength({min:2,max:1000}).withMessage('Debe ingresar una descripción, con menos de 1000 caracteres.'),
    ], accesoMiddleware.checkNewProductErrors,accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged,adminController.nuevoProductoPost); //Acción de creación (a donde se envía el formulario)

router.get('/products/create/agregarMarca', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.agregarMarca);
router.post('/products/create/agregarMarca', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.agregarMarcaPost);

router.get('/products/:id/edit', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.editarProducto);
router.post('/products/:id', upload.any(), accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.editarProductoPost);

router.get('/products/delete/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.softDelete); 

module.exports = router;