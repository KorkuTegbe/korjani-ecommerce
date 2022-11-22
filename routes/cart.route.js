const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const cartController = require('../controllers/cart.controller')

router.post('/', authController.authorize, cartController.addToCart)

module.exports = router