

// const mailsender = function (otp) {
//     let mailTransporter = nodemailer.createTransport({
//       service: "outlook",
//       auth: {
//         user: "rishabhshri20@outlook.com",
//         pass: "Rishabh@123",
//       },
//     });

//     let mailDetails = {
//       from: "rishabhshri20@outlook.com",
//       to:schema.email,
//       subject: "email verify",
//       text: `to verify your account the otp is ${otp}`,
//     };

//     mailTransporter.sendMail(mailDetails, function (err, data) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("Email sent successfully");
//       }
//     });
//   };
//   module.exports = mailsender;