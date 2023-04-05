const mongoose = require('mongoose')
const otpschema= new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    
    otp:{
        type:Number,
        required:true
    }
})


module.exports =mongoose.model('OTP',otpschema)