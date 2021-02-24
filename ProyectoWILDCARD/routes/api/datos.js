var express = require('express');
var router = express.Router();
const APIController = require('../../controllers/APIController')

router.get('/users', APIController.users);
router.get('/productos', APIController.productos);
router.get('/productosUltimo', APIController.productosUltimo);
router.get('/ventas', APIController.ventas);
router.get('/ventas/:id', APIController.ventas);
router.get('/categories', APIController.categories);

module.exports = router;