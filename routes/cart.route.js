const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const cartController = require('../controllers/cart.controller')

router.post('/', authController.authorize, cartController.addToCart)
router.patch('/:cartId', authController.authorize, cartController.updateCart)
router.delete('/', authController.authorize, cartController.removeFromCart)
router.get('/', authController.authorize, cartController.getCart)

module.exports = router