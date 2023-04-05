const jwt = require("jsonwebtoken")
require('dotenv').config();

const checkAuthUser = async (req,res,next)=>  {
    const {authorization} = req.headers;
    console.log(authorization,'dddd');
    try{
        // console.log('hiiii');
        if(authorization.startsWith("Bearer")){
           let token = authorization.split(".")[1];
           console.log(token ,"tokenn");

            if (typeof authorization!==undefined){
            const header= authorization.split(" ")
            console.log(header,"header");
            const token=header[1]
            console.log('hello',token);
            const auth = jwt.verify(token,process.env.secret_key) 
            console.log(auth,"fuyfuyfiy");
            next();
            }else{
            res.json({
                status : 401,
                message : "Authorization is Empty or Bearer"
            })
          }
        }else{
            console.log("authorization is empty or not defined")
        }
    }catch(error){
        res.json({
            status : 400,
            message : error.message
        })
    }
}


module.exports = {checkAuthUser}