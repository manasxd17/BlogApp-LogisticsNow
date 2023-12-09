const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        sparse:true,
        validate:{
            validator:isEmail,
            message:"Invalid email."
        }
    },
    password:{
        type:String,
        required:true
    }
    },
    { timestamps:true }
)

const User = mongoose.model('User', userSchema)

module.exports = { User }