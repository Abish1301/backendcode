const express = require("express");
const router = express.Router();
const emailController = require('../controllers/emailController');
const { Otp ,Auth} = require('../models');
 
const Fields = ['email'];
 
router.post("/send-otp", emailController.createOTPRecord(Otp, Fields));
router.post("/verify-otp", emailController.verifyOTP(Otp, Fields));
router.post("/change-password", emailController.ChangePassword(Auth));
 
module.exports = router;
 
 