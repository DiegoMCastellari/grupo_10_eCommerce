var express = require('express');
var router = express.Router();
const path = require ('path');
const multer = require('multer');
const adminController = require('../controllers/adminController')
const accesoMiddleware = require('../middlewares/accesoMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

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

router.get('/', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.panelAdmin)

// USERS ADMIN
router.get('/userList', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.list);

router.get('/userList/delete/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.destroyUser)

router.get('/userList/edit/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.editarUsuario);//ver
router.post('/userList/edit/:id', [
    check('fullname').isLength( {min:3} ).withMessage('Nombre - campo obligatorio mayor a 3 letras'),
    check('email').isEmail().withMessage('Email - El formato ingresado no es válido'),
    check('email').isLength( {min:3} ).withMessage('Email- campo obligatorio'),
    check('password').isLength( {min:6} ).withMessage('Contraseña - campo obligatorio mayor a 6 letras'),
], adminMiddleware.checkEditUserErrors, accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.editarUsuarioPost)


// CARRITOS
router.get('/carritosLista', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.listadoCarritos);
router.get('/carritosLista/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.listadoCarrito);
router.post('/carritosLista/estado/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.cambioEstado);


router.get('/agregarStocks', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.agregarStocks);
router.get('/agregarStocks/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.agregarStocksId);
router.post('/agregarStocks/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.agregarStocksPost);

router.get('/productStocks', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.listaProductoStock);
router.get('/stocks/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.verStocks);

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
    ], adminMiddleware.checkNewProductErrors, accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged,adminController.nuevoProductoPost); //Acción de creación (a donde se envía el formulario)

router.get('/products/create/agregarMarca', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.agregarMarca);
router.post('/products/create/agregarMarca', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.agregarMarcaPost);

router.get('/products/:id/edit', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.editarProducto);
router.post('/products/:id', upload.any(), [
    check('nombre').isLength({min:3}).withMessage('Debe ingresar un nombre, mayor a 3 letras.'),
    check('marca').isInt({min:0}).withMessage('Debe seleccionar una marca.'),
    check('categoria').isInt({min:0}).withMessage('Debe selecionar una categoria.'),
    check('categorias').notEmpty().withMessage('Debe selecionar una subcategoría.'),
    check('talles').notEmpty().withMessage('Debe selecionar al menos un talle.'),
    check('colores').notEmpty().withMessage('Debe selecionar al menos un color.'),
    check('precio').isInt({min:0}).withMessage('El precio debe ser un número mayora 0.'),
    check('descuento').isInt({min:0}).withMessage('El descuento debe ser un número.'),
    check('descripcion').isLength({min:2,max:1000}).withMessage('Debe ingresar una descripción, con menos de 1000 caracteres.'),
    ], adminMiddleware.checkEditProductErrors, accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.editarProductoPost);

router.get('/products/delete/:id', accesoMiddleware.accesoAdmin, accesoMiddleware.userSessionLogged, adminController.softDelete); 

module.exports = router;