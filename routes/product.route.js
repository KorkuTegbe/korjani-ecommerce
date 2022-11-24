const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const productController = require('../controllers/product.controller')
const multer = require('../config/upload_image')
const validateInput = require('../validators/product.validator')


router.post('/', authController.authorize, multer.single('image'), validateInput, productController.createProduct)
router.patch('/:productId', authController.authorize, productController.updateProduct)
router.delete('/:productId', authController.authorize, productController.deleteProduct)
router.get('/', productController.getProducts)
router.get('/:productId', productController.getProducts)
router.get('/:userId', productController.getOwnerProducts)


module.exports = router