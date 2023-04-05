const Joi=require('joi');
// const schema = require("../model/userSchema")



const signupschema = Joi.object().keys({ 
    Uname:Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    // confirmpassword: Joi.string().required(),
    password:Joi.string().required(),
    mobileno:Joi.number().required(),
    isactive: Joi.boolean() 
})

const userval=async(req,res,next)=>{
const{Uname,email,password,mobileno}=req.body
console.log(Uname);
const hh ={Uname,email,password,mobileno}
const value= await signupschema.validate(hh);
// console.log(value,'value');
if (value.error) {
    res.status(400).json({
      status: "Failed",
      message: value.error.details[0].message
    });

    console.log(value.error);
}else{
console.log('valid data');
next()
}
}

module.exports={userval}