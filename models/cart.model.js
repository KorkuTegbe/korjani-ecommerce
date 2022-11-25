const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: { type: String, required: true},
            quantity: { type: Number, required: true, default: 1}
        }
    ],
}, 
{ timestamps: true }
)



cartSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const cartModel = mongoose.model('Cart', cartSchema)

module.exports = cartModel