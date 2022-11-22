const express = require('express')
const appError = require('./utils/appError')
const authRoute = require('./routes/user.route')
const productRoute = require('./routes/product.route')
const orderRoute = require('./routes/order.route')
const cartRoute = require('./routes/cart.route')

const app = express();

// app.use(cookie())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


// routes
app.use('/auth', authRoute )
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/cart', cartRoute)


app.get('/', (req,res)=>{
    res.status(200).json({
        status: 'success',
        message: 'Welcome to the zainaku shop API'
    })
})

app.all('*', ( req,res,next ) =>{
    res.status(500).json({
        message: `${req.url} not found on this resource`
    })
    return next(new appError(404, `${req.originalUrl} cannot be found in this application`))
})


module.exports = { app }