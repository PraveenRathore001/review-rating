const express=require('express')
const router=express()
const auth=require('../middleware/jwtverify')

const controller=require('../Controller/companycontroller')


const image= require('../middleware/photu')


router.post('/csignup',image.single("companylogo"),controller.companySUP)
router.get('/cgetlist',controller.listcompany)
router.patch('/cupdate/:id',auth.checkAuthUser,controller.updatecdata)



module.exports=router
