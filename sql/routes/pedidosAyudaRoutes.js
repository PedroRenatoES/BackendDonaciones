const express = require('express');
const PedidosDeAyudaController = require('../controllers/pedidosAyudaController');
const authenticateToken = require('../../middleware/authMiddleware');

const router = express.Router();

router.get('/', PedidosDeAyudaController.getAll);
router.get('/:id', PedidosDeAyudaController.getById);
router.post('/', PedidosDeAyudaController.create);
router.put('/:id', PedidosDeAyudaController.update);
router.delete('/:id', PedidosDeAyudaController.delete);

module.exports = router;
