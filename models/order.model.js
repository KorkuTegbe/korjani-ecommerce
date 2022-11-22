const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {
        // type: String,
        // required: true
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: { type: String, required: true},
            quantity: { type: Number, required: true, default: 1},
            // amount: { type: Number, required: true}
        }
    ],
    address: { type: Object},
    status: { type: String, default: 'pending'}
}, 
{ timestamps: true }
)


orderSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const orderModel = mongoose.model('Order', orderSchema)

module.exports = orderModel