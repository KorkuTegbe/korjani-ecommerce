const router = require('express').Router()
const orderController = require('../controllers/order.controller')
const authController = require('../controllers/auth.controller')
const validateOrderInput = require('../validators/order.validator')

router.post('/', authController.authorize, validateOrderInput, orderController.createOrder)
router.patch('/:id', authController.authorize, orderController.updateOrder)
router.delete('/:id', authController.authorize, orderController.deleteOrder)
router.get('/:userId', orderController.getUserOrders)

module.exports = router