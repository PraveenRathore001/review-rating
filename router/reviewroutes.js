const express=require('express')
const router=express()
// const auth=require('../middleware/jwtverify')

const controller=require('../Controller/review')




router.post('/creview',controller.addreview)


module.exports=router