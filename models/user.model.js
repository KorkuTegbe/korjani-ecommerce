const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, 
{ timestamps: true }
)

userSchema.pre(
    'save',
    async function (next) {
        if(!this.isModified('password'))  next();
        this.password = await bcrypt.hash(this.password, 12)
        next()
    }
)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})


const userModel = mongoose.model('User', userSchema)

module.exports = userModel