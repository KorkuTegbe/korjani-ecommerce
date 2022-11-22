const router = require('express').Router()
const orderController = require('../controllers/order.controller')
const authController = require('../controllers/auth.controller')

router.post('/', authController.authorize, orderController.createOrder)
router.patch('/:id', authController.authorize, orderController.updateOrder)
router.delete('/:id', authController.authorize, orderController.deleteOrder)
router.get('/:userId', orderController.getUserOrders)

module.exports = router