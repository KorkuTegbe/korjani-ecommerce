const appError = require('../utils/appError') 
const Product = require('../models/product.model')
const moment = require('moment')


exports.createProduct =  async (req,res) => {
    const {name,desc,image,categories,size,color,price} = req.body
    console.log(req.file.path)
    try{
        const product = new Product({
            name,
            desc,
            image: req.file.path,
            categories,
            size,
            color,
            price,
            owner: req.user.id
        })
        await product.save()
        // response
        res.status(201).json({
            status: 'success',
            message: 'Product created',
            data: {
                product
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}

exports.updateProduct = async (req,res,next) => {
    
    try{
        //  1.get product id and search
        const {productId} = req.params
        const body = req.body
        const product = await Product.findById(productId)
        
        // when product is not found
        if(!productId) return next(new appError(404, 'Product not found'))

        // is user product owner? do update
        if(product.owner == req.user.id){
            const update = await Product.findByIdAndUpdate(productId, body, {
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
        res.json(err)
    }
}

exports.deleteProduct = async (req,res) => {
    try{
        //  1.get product id and search
        const {productId} = req.params
        const product = await Product.findById(productId)
        
        // when product is not found
        if(!productId) return next(new appError(404, 'Product not found'))

        // is user product owner? do update
        if(product.owner == req.user.id){
            const update = await Product.findByIdAndDelete(productId)

            res.status(200).json({
                status: 'success',
                data: {
                    name: `${product.name} deleted`
                }
            })
        }else{
            return next(new appError(403, 'Unauthorized'))
        }
    }catch(err){
        res.json(err)
    }
}

exports.getProducts = async (req,res) => {
    try{
        // const { query } = req
        const { name, 
            color, 
            price, 
            categories, size, createdAt, order_by, order = 'asc', page = 1, per_page = 2 } = req.query

        const findQuery = {}
        const sortQuery = {}
        
        if(name){
            findQuery.name = name
        }

        if(color){
            findQuery.color = color
        }

        if(price){
            findQuery.price = price
        }

        if(size){
            findQuery.size = size
        }

        if(categories){
            findQuery.categories = categories 
        }

        if(createdAt){
            findQuery.createdAt = {
                $gt: moment(createdAt).startOf('day').toDate(),
                $lt: moment(createdAt).endOf('day').toDate(),
            }
        }
        // // separate sort attributes by comma
        // const sortAttributes = order_by.split(',')

        // for(const attribute of sortAttributes){
        //     if(order === 'asc' && order_by){
        //     sortQuery[order_by] = 1
        //     }
        //     if(order === 'desc' && order_by){
        //         sortQuery[order_by] = -1
        //     }
        // }
        

        const products = await Product
        .find(findQuery)
        // .sort(sortQuery)
        // .limit(per_page)
        // .skip(page)
        // console.log(products)
        res.status(200).json({
            status: 'success',
            result: products.length,
            data: {
                products
            }
        })
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getProduct = async (req,res) => {
    try{
        const { productId } = req.params
        const product = await Product.findById(productId)
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        })
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getOwnerProducts = async (req,res) => {
    try{
        // get userId
        const {userId} = req.params
        const { query } = req
        const { name, page = 1, per_page = 20 } = query

        const findQuery = {}

        if(name){
            findQuery.name = name
        }

        if(category){
            // for ( const category in categories) { return category}
            // findQuery.categories = 
        }
        // query db to find all products with owner whose id is userId
        const products = await Product.find({owner:userId})
        .find(findQuery)
        .skip(page)
        .limit(per_page)

        // response
        res.status(200).json({
            status: 'success',
            results: products.length,
            data: {
                products
            }
        })
    }catch(err){
        return new appError(err.statusCode, err)
    }
}