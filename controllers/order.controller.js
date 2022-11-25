const appError = require('../utils/appError') 
const Order = require('../models/order.model')

exports.createOrder = async (req,res,next) => {
    const {products,address} = req.body
    try{
        const order = new Order({
            userId: req.user.id,
            products,
            address
        })
        await order.save()
        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}

exports.updateOrder = async (req,res,next) => {
    
    try{
        //  1.get order id and search
        const {id} = req.params
        const body = req.body
        const order = await Order.findById(id)
        
        // when order is not found
        if(!order) return next(new appError(404, 'Product not found'))
        
        // is user order owner? do update
        if(order.userId == req.user.id){
            const update = await Order.findByIdAndUpdate(id, body, {
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

exports.deleteOrder = async (req,res,next) => {
    try{
        //  1.get order id and search
        const {id} = req.params
        // const body = req.body
        const order = await Order.findById(id)
        
        // when order is not found
        if(!order) return next(new appError(404, 'Product not found'))
        
        // is user order owner? do update
        if(order.userId == req.user.id){
            const deleted = await Order.findByIdAndDelete(id)
            
            res.status(200).json({
                status: 'success',
                data: {
                    message: `Order ${deleted.id} deleted `
                }
            })
        }else{
            return next(new appError(403, 'Unauthorized'))
        }
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getUserOrders = async (req,res) => {
    // TO DO
    // filtering,sorting,pagination
    try{
        // get userId
        const {userId} = req.params
        const { query } = req
        const { state, page = 1, per_page = 20 } = query

        const findQuery = {}

        if(state){
            findQuery.state = state
        }
        // query db to find all products with owner whose id is userId
        const orders = await Order.find({userId:userId})
        .find(findQuery)
        .skip(page)
        .limit(per_page)

        // response
        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: {
                orders
            }
        })
    }catch(err){
        return new appError(err.statusCode, err)
    }
}
    