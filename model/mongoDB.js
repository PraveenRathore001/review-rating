const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.URL).then(()=>{
    console.log('database connected succesfully')
}).catch((err)=>{
    console.log('error in connection');
})