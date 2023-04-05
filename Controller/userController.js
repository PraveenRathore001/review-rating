require("mongoose");
require('dotenv').config();
const Jwt = require("jsonwebtoken");
const Crypto = require("crypto");
const multer = require("multer");
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");

const schema = require("../model/usermodel");
const otpsche = require("../model/otpshema");
const usignup = async (req, res) => {
  try {
    const data = new schema(req.body);

    console.log(data, "fddf");

    const match = await schema.findOne({ email: data.email });
    console.log(match);
    if (match) {
      res.send("user already exists continue login");
      // console.log("");
    } else {
      const hash =  Crypto.createHmac("sha256", data.password).digest(
        "hex"
      );
      data.password = hash;
      const filePath = `/upload/${req.file.filename}`;
      data.profile_pic = filePath;
      const result = await data.save();
      res.json({
        message: result,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const ulogin = async (req, res) => {
  const data = await schema(req.body);
  const mail = await schema.findOne({ email: data.email });
  console.log(mail.email);
  if (mail == null) {
    res.send("user not found signup first");
  } else {
    const Hash = await Crypto.createHmac("sha256", data.password).digest("hex");
    data.password = Hash;
    if (mail.password == data.password) {
      const token = Jwt.sign({ _id: this._id }, process.env.secret_key, {
        expiresIn: "15d",
      });

      console.log(token);
      res.json({
        token: token,
        data: mail,
      });
    }
  }
};

// const verifytoken=(req,res,next)=>{
// const bearerheader = req.headers['authorization']
// if (typeof bearerheader!==undefined){
// const header= bearerheader.split("")
// const token=header[1]
// req.token=token
// next()
// }else{
//   res.send({message:'invalid token'})
// }

// }


const uforgotpassword = async (req, res) => {
  const data = new schema(req.body);
  const matchedemail = await schema.findOne({ email: data.email });
  if (matchedemail) {
    const otpmatch = new otpsche();

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    const mailsender = function () {
      let mailTransporter = nodemailer.createTransport({
        service: "outlook",
        auth: {
          user: "PraveenKumar@outlook.com",
          pass: "Rishabh@123",
        },
      });

      let mailDetails = {
        from: "rishabhshri20@outlook.com",
        to: data.email,
        subject: "email verify",
        text: `to verify your account the otp is ${otp}`,
      };

      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent successfully");
          res.json({
            message: "hi sent",
          });
        }
      });
    };
    mailsender();

    otpmatch.email = data.email;
    otpmatch.otp = otp;
    console.log(otpsche.email);

    await otpmatch.save();
  } else {
    res.send("plz signup first");
  }
};

const resetPassword = async (req, res) => {
  let data =req.body
  const matchedemail = await schema.findOne({ email: data.email });
  if (matchedemail) {
    if(req.body.password === req.body.confirmpassword){
     const hash= Crypto.createHmac("sha256", req.body.password).digest("hex");
      matchedemail.password =hash;
      console.log(matchedemail);
      await matchedemail.save()
      res.send(matchedemail);
    }

  }
};
const getdata = async (req, res) => {
        const {authorization} = req.headers;
        console.log(authorization,'dddd');
        try{
            console.log('hiiii');
            if (typeof authorization!==undefined){
               const header= authorization.split(" ")[1]
              const a= header.split(".")[1]
               console.log(header, 'praveen');
              //  console.log(a, "authorization");
               const decoded = Buffer.from(a,'base64').toString() ;
               console.log(decoded)

                // const decoded = Jwt.decode(header);
                // console.log(decoded,";jgeroigjeriog");
                const data=await schema.findOne({iat:decoded.iat})
                console.log(data);
                res.json({
                  data:data
                })
                // console.log(data);
            }
            else{
                          res.json({
                              status : 401,
                              message : "Authorization is Empty or Bearer"
                          })
                      }
           }catch(error){
                      res.json({
                          status : 400,
                          message : error.message
                      })
                  }
              }

module.exports = { usignup, ulogin, uforgotpassword,resetPassword,getdata };
