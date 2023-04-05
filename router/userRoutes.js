const express=require('express')
const image= require('../middleware/photu')
const router=express()
const Controller=require('../Controller/userController')
const val=require('../middleware/validation')
const auth=require('../middleware/jwtverify')




router.post('/signup',image.single("profile_pic"),val.userval,Controller.usignup)
router.get('/login',Controller.ulogin)
router.post('/forgetpassword',Controller.uforgotpassword)
router.post('/resetpassword',Controller.resetPassword)
router.get('/getdata',auth.checkAuthUser,Controller.getdata)





module.exports = router