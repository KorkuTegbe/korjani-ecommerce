const joi = require('joi')

const validateOrderMiddleware = async (req,res,next) =>{
    const orderPayload = req.body
    try {
        await orderValidator.validateAsync(orderPayload)
        next()
    } catch (err) {
        console.log(err)
        return res.status(406).json(err.details[0].message)
    }
}

const orderValidator = joi.object({
    userId: joi.string(),
        // .required(),
    products: joi.array()
        .required(),
    productId: joi.string(),
        // .required(),
    quantity: joi.number()
        .min(1),
        // .required(),
    address: joi.object()
        .required(),
    status: joi.string()
        .default('pending'),
    createdAt: joi.date()
        .default(Date.now()),
    lastUpdateAt: joi.date()
        .default(Date.now())
    
})


module.exports = validateOrderMiddleware