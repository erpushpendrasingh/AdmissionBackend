const express = require("express");

const bcrypt = require("bcrypt");
const { UserModel } = require("../../models/User");

const router = express.Router();

router.post("/user/register", async (req, res) => {
  const {
    firstname,
    lastname,
    father_name,
    mother_name,
    mobile_num,
    dob,
    mail_id,
    password,
    city,
    state,
    exam_attempted,
  } = req.body;
  console.log(req.body)
  try {
    if (!mail_id) {
      return res.status(400).json({
        message: "mail id is required",
      });
    }
    let user = await UserModel.find({ mail_id });
    if (user.length > 0) {
      return res.status(400).json({
        message: "Mail Id already registered",
      });
    }
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        return res.status(400).json({
          error: err,
          message: "Somthing went wrong",
        });
      } else {
        const user = new UserModel({
          mail_id,
          password: secure_password,
          firstname,
          lastname,
          father_name,
          mother_name,
          mobile_num,
          dob,
          city,
          state,
          exam_attempted,
        });
        await user.save();
        res.status(201).json({
          message: "user register successfully",
          user: user,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/user/login",async(req,res)=>{
  const { mail_id, password } = req.body;
    try {
      const user = await UserModel.find({ mail_id });
  
      const hashed_pass = user[0]?.password;
      if (user.length > 0) {
        bcrypt.compare(password, hashed_pass, (err, result) => {
          if (result) {
            res.send({
              message: "Login Successful",
              user:user
            });
          } else {
            return res.status(400).json({
              error: err,
              message: "Wrong Credentials",
            });
          }
        });
      } else {
        res.status(400).json({
          error: err,
          message: "No user exists with this username id",
        });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
})

module.exports = router;
