const mongoose=require('mongoose');


const companyreview= new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    Cname:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    like:{
        type:Boolean,
        default:false
    }
})
module.exports = mongoose.model('review', companyreview)