const express = require("express");
const contactModel = require("../../models/Contact");
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  auth: {
    user: "",
    pass: "",
  },
});

router.post("/contact", async (req, res) => {
  const { name, email, mobile, description } = req.body;
  console.log(req.body);
  console.log("email:", email);

  const mailoptions = {
    from: "", // sender's email address
    to: "", // replace with the actual recipient's email address
    subject: "Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nDescription: ${description}`,
  };

  try {
    await transporter.sendMail(mailoptions);
    res.status(200).json({ message: "email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
