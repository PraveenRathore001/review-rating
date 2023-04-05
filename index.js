const express = require('express');
// const bodyParser = require("body-parser")

require('dotenv').config();
const app = express();
require('./model/mongoDB')

const Router=require('./router/userRoutes')
const routers=require('./router/companyroutes')
const routerss=require('./router/reviewroutes')

// app.use(bodyParser.json())
app.use(express.json());



const PORT=process.env.port
app.use('',Router)
app.use('',routers)
app.use('',routerss)
app.listen(PORT,(err)=>{
    if(err){
        console.log("server not started");
    }else{
    console.log(`listening on port ${PORT}`)
    }
})