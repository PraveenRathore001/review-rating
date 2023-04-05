require("mongoose");
require('dotenv').config();
const Jwt = require("jsonwebtoken");
const Crypto = require("crypto");
const multer = require("multer");

const schema = require("../model/usermodel");
const Cschema = require("../model/companyschema");




const companySUP=async(req,res)=>{
    const data=new Cschema(req.body)
    const isuserfirst=await schema.findOne({_id:data.userId})
    if(isuserfirst){           
        console.log("continue signup your company");
        const filePath = `/upload/${req.file.filename}`;
        console.log(filePath);
        data.companylogo = filePath;
        const token = Jwt.sign({ _id: this._id }, process.env.secret_key, {
            expiresIn: "15d",
          });
        console.log(data);
        await data.save()
        res.json({
            token:token,
            data:data
        })

    }else{
        res.send("first become a user")
       console.log("first become a user");
    }
}
const listcompany = async(req,res)=>{
   const aaa= await Cschema.find()
   console.log(aaa);
   res.send(aaa)
}

const updatecdata= async(req,res)=>{
  const dd=  await Cschema.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        
    })
    console.log(dd);
    dd.save()
}

module.exports={companySUP,listcompany,updatecdata}