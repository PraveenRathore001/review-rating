const mongoose = require('mongoose')
const userschema= new mongoose.Schema({
Uname:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
// profilepic:{
//     type:String
// },
mobileno:{
    type:Number,
    required:true
},
isactive:{
    type:Boolean,
    default:true
},
profile_pic : {
    type : String
 }

},

{timestamps: true}


)

module.exports=mongoose.model('User',userschema)