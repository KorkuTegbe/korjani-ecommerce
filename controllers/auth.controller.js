require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {promisify} = require('util')
const appError = require('../utils/appError') 
const User = require('../models/user.model')
const Product = require('../models/product.model')



exports.signup = async(req,res,next) => {
    const { username, email, password } = req.body
    try{
        // validate user input
        if(!(username && email && password)){
            res.status(400).json({
                status: 'error',
                message: 'All fields required'
            })
        }
        // check if user exists
        const oldUser = await User.findOne({ email })
        if(oldUser){
            res.status(400).json({
                status: 'error',
                message: 'User already exists. Login'
            })
        }
        // save user
        // const user = await User.create({
        //     username, email, password
        // })
        const user = new User({
            username: username,
            email: email,
            password: password
        })

        user.save()

        res.status(201).json({
            status: 'success',
            message: 'signup successful',
            data: {
                user
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'error',
            message: err
        })
    }
}

exports.login = async (req,res,next) => {
    const {username, email, password} = req.body
    try{
        // validate user input
        if(!(username && password)){
            res.status(400).json({
                status: 'error',
                message: 'All fields are required'
            })
        }
        // find user
        const user = await User.findOne({email})
        // compare passwords
        if(user && (await bcrypt.compare(password,user.password))){
            // create token
            const token = jwt.sign(
                { user_id: user._id },
                process.env.JWT_SECRET,
                {
                  expiresIn: process.env.JWT_EXPIRES
                }
            );

            const cookieOptions = {
                expires: new Date(
                    Date.now() + 1 * 60 * 60 * 1000
                ),
                httpOnly: true,
            };

            if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
            // send token to user
            res.cookie('jwt', token, cookieOptions)

            res.status(200).json({
                status: 'success',
                message: 'Login successful',
                data: {
                    userId: user.id,
                    email: user.email,
                    token
                }
            });
          }else{
            res.status(404).json({
                status: 'error',
                message: 'invalid login credentials',
            })
          }
        }catch(err){
            res.status(500).json({
                message: 'oops something went wrong',
                data: err
            })
        }
}

exports.authorize = async (req,res,next) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    try{
        if(!authHeader){
            return res.status(403).json({
                status: 403,
                message: "FORBIDDEN",
            });
        }
        // verify token
        const verify = jwt.verify(token, process.env.JWT_SECRET)

        const admin = await User.findById(verify.user_id)

        if(!admin){ return new appError(404, 'Session expired. Login again')}

        // add user to req
        req.user = admin
        next()

    }catch(err){
        res.status(500).json({
            message: 'error',
            data: err
        })
    }
}

// exports.modifyAccess = async (req,res,next) => {
//     const authHeader = req.headers.authorization
//     const token = authHeader.split(' ')[1]
//     const { productId } = req.params
//     try{
//         if(!authHeader){
//             return res.status(403).json({
//                 status: 403,
//                 message: "FORBIDDEN",
//             });
//         }
//         // verify token
//         const verify = jwt.verify(token, process.env.JWT_SECRET)

//         const admin = await User.findById(verify.user_id)

//         if(!admin){ return new appError(404, 'Session expired. Login again')}

//         // add user to req
//         req.user = admin
//         const product = await Product.findById(productId)
        
//         if(product.owner == req.user.id){
//             next()
//         }else {
//             return res.status(403).json({
//                 status: 403,
//                 message: "FORBIDDEN",
//             });
//         }

//     }catch(err){
//         res.status(500).json({
//             message: 'error',
//             data: err
//         })
//     }
// }

