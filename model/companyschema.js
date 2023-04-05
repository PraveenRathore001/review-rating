const mongoose=require('mongoose');


const companyschema= new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },  
    name:{
        type:String,
        required:true,
    },
    companyadd:{
        type:String,
        required:true,
    },
  
    isactive:{
        type:Boolean,
        default:true
    },
    companylogo:{
        type:String
    }


})
module.exports =mongoose.model('company',companyschema)