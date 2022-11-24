const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    categories: {
        type: Array,
    },
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, 
{ timestamps: true }
)

const productModel = mongoose.model('Product', productSchema)

module.exports = productModel