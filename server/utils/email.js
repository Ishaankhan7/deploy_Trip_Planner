const nodemailer = require('nodemailer');
const { AUTH_CONSTANTS } = require('../config/constants');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

exports.sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: 'englishworld909@gmail.com',
    to: email.trim(),
    subject: 'Email Verification OTP',
    text: `Your OTP is: ${otp}. It will expire in ${AUTH_CONSTANTS.OTP_EXPIRY_MINUTES} minutes.`
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};