const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const userController = require('../controller/user.controller');
const transporter = require('../config/email.config');

const userRouter = express.Router();

userRouter.get('/',authMiddleware.authUser,userController.checkBlackList);

userRouter.get("/test-email", async (req, res) => {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email",
      text: "SMTP working"
    });

    res.send("Email sent successfully");
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).send(err.message);
  }
});


module.exports = userRouter;