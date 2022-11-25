const appError = require('../utils/appError') 
const Cart = require('../models/cart.model')
const Product = require('../models/product.model')

exports.addToCart = async (req,res,next) => {
    const { products } = req.body
    try{
        const cart = new Cart({
            userId: req.user.id,
            products
        })
        cart.save()
        res.status(201).json({
            status: 'success',
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

exports.updateCart = async (req,res,next) => {
    const {body}  = req.body
    const { cartId } = req.params
    
    try{
        const cart = await Cart.findById(cartId)
        
        // when product is not found
        if(!cart) return next(new appError(404, 'not found'))

        // is user product owner? do update
        if(cart.userId == req.user.id){
            // console.log(`cartOwner: ${cart.userId}, id: ${req.user.id}`)
            const update = await Cart.findByIdAndUpdate(cartId, body, {
                new: true,
                runValidators: true,
            })

            res.status(200).json({
                status: 'success',
                data: {
                    update
                }
            })
        }else{
            return next(new appError(403, 'Unauthorized'))
        }
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
        const carts = await Cart.find()
        res.status(200).json({
            status: 'success',
            results: carts.length,
            data: {
                carts
            }
        })
    }catch(err){
        return new appError(err.statusCode, err)
    }
}
    