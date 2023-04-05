const multer=require('multer');
// const path= require('path');
const upload = multer({ 

    storage:multer.diskStorage({
           destination:(req,file,cb)=> {

            cb(null,"upload")
           },
           filename:(req,file,cb) =>
           {
            cb(null,file.fieldname+"-"+Date.now()+".jpg")
           }
    })
})


module.exports =upload