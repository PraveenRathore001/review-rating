require("mongoose");
const schema = require("../model/usermodel");
const Cschema = require("../model/companyschema");
const creview = require("../model/companyreview");

const addreview = async (req, res) => {
  try {
    const data = new creview(req.body);
    const userexist = await schema.findOne({ _id: data.userid });

    if (userexist) {
      const duplicate = await creview.findOne({ userid: req.body.userid });
      if (duplicate) {
        console.log(data);
        const duplicates = await creview.findOne({ Cname: req.body.Cname });
        if (duplicates) {
          console.log(duplicate);
          res.send("user already reviewed");
        } else {
          if (userexist.isactive == true && data.rating <= 5) {
            const companyexist = Cschema.findOne({ name: data.Cname });

            if (companyexist) {
              await data.save();
              res.json({
                data: data,
              });
            }
          } else {
            console.log("USER HAS BEEN BLOCKED ");
          }
        }
      } else {
        await data.save();
        res.json({
          data: data,
        });
      }
    } else {
      res.send("user not exist plz signup first");
    }
    
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { addreview };
