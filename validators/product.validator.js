const joi = require('joi')

const validateProductCreate = async (req,res,next) =>{
    const productPayload = req.body
    try {
        await productValidator.validateAsync(productPayload)
        next()
    } catch (err) {
        console.log(err)
        return res.status(406).json(err.details[0].message)
    }
}

const productValidator = joi.object({
    name: joi.string()
        .min(3)
        .max(30)
        .required(),
    desc: joi.string()
        .min(5)
        .max(100)
        .required(),
    // image: joi.string()
    //     .required(),
    price: joi.number()
        .min(1)
        .required(),
    size: joi.string()
        .min(3)
        .max(30)
        .required(),
    color: joi.string()
        .min(3)
        .max(30)
        .required(),
    // owner: joi.string()
    //     .required(),
    categories: joi.string(),
    createdAt: joi.date()
        .default(Date.now()),
    lastUpdateAt: joi.date()
        .default(Date.now())
    
})


module.exports = validateProductCreate