const appError = require('../utils/appError') 
const Cart = require('../models/cart.model')
const Product = require('../models/product.model')

exports.addToCart = async (req,res,next) => {
    const {products, productId,quantity} = req.body
    // const product = await Product.findById(productId)
    // console.log(products[0].productId)
    let product;
    for(let i = 0; i<products.length; i++){
        let product =  await Product.findById(products[i].productId)
        console.log(product.price)
    }
    
    
    try{
        const cart = new Cart({
            userId : req.user.id,
            products: {
                productId,
                quantity,
                amount: product.price * quantity
            }
        })
        // await cart.save()
        res.status(200).json({
            status: 'success',
            message: `${product.name} added to cart`,
            data: {
                cart
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}

exports.uodateCart = async (req,res,next) => {
    
    try{
        
    }catch(err){
        res.status(500).json(err)
    }
}

exports.removeFromCart = async (req,res,next) => {
    try{
        
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getCart = async (req,res) => {
    try{
        
    }catch(err){
        return new appError(err.statusCode, err)
    }
}
    