const UserModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../utils/email");
const { generateOTP } = require("../utils/otp");
const { AUTH_CONSTANTS } = require("../config/constants");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const otpCache = new Map();
const OTP_EXPIRY_MINUTES = 10;

const isOTPExpired = (expiresAt) => new Date() > new Date(expiresAt);

exports.signup = async (req, res) => {
  try {
    const { name, userName, email, password, confirmPassword, role } = req.body;

    if (
      !name ||
      !userName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({
      $or: [
        { email: email.toLowerCase() },
        { userName: userName.toLowerCase() },
      ],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or Username already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
    otpCache.set(email.toLowerCase(), {
      otp,
      expiresAt,
      hashedPassword,
      name,
      userName,
      role,
    });
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await UserModel.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { userName: identifier.toLowerCase() },
      ],
    }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Increment user's coins
    user.coins += 1; // Add 1 coin on successful sign-in
    await user.save();

    const token = jwt.sign(
      { id: user._id, userName: user.userName, role: user.role, name: user.name }, // ✅ Add name here
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );    
    const refreshToken = jwt.sign(
      { id: user._id, userName: user.userName, name: user.name }, // ✅ Add name here too
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "30d" }
    );
    

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({
        message: "Signin successful",
        token,
        refreshToken,
        user: { id: user._id, userName: user.userName, role: user.role },
      });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    let userEmail = null,
      cachedData = null;

    for (const [email, data] of otpCache.entries()) {
      if (data.otp === otp) {
        userEmail = email;
        cachedData = data;
        break;
      }
    }

    if (!cachedData || isOTPExpired(cachedData.expiresAt)) {
      otpCache.delete(userEmail);
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const { hashedPassword, name, userName, role } = cachedData;
    const newUser = await UserModel.create({
      name,
      userName: userName.toLowerCase(),
      email: userEmail.toLowerCase(),
      password: hashedPassword,
      role,
    });

    otpCache.delete(userEmail);
    const token = jwt.sign(
      { id: newUser._id, userName: newUser.userName, role: newUser.role, name: user.name  },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({
        message: "Registration successful",
        token,
        user: {
          id: newUser._id,
          userName: newUser.userName,
          role: newUser.role,
          name: newUser.name 
        },
      });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//resendotp
exports.resendOTP = async (req, res) => {
  try {
    // Extract email from user's session or token (Modify as needed)
    const userEmail = req.user?.email; // If using authentication middleware
    if (!userEmail) {
      return res
        .status(400)
        .json({ message: "User email not found in session." });
    }

    const lowerCaseEmail = userEmail.toLowerCase();
    const cachedData = otpCache.get(lowerCaseEmail);

    // Check if OTP request exists
    if (!cachedData) {
      return res
        .status(400)
        .json({ message: "No signup request found for this email." });
    }

    const { expiresAt } = cachedData;
    const currentTime = Date.now();
    const timeUntilExpiry = new Date(expiresAt).getTime() - currentTime;

    // Prevent resending OTP too soon
    if (timeUntilExpiry > OTP_EXPIRY_MINUTES * 60 * 1000 - 60 * 1000) {
      const remainingTime = Math.ceil(
        (timeUntilExpiry - (OTP_EXPIRY_MINUTES * 60 * 1000 - 60 * 1000)) / 1000
      );
      return res.status(429).json({
        message: `Please wait ${remainingTime} seconds before requesting a new OTP.`,
      });
    }

    // Generate and cache a new OTP
    const newOTP = generateOTP();
    const newExpiryTime = new Date(
      currentTime + OTP_EXPIRY_MINUTES * 60 * 1000
    );
    cachedData.otp = newOTP;
    cachedData.expiresAt = newExpiryTime;
    otpCache.set(lowerCaseEmail, cachedData);

    // Send the new OTP
    await sendOTPEmail(userEmail, newOTP);

    res.status(200).json({ message: "A new OTP has been sent to your email." });
  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    const user = await UserModel.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // Token valid for 15 minutes
    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/user/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const html = `<p>Click <a href="${resetUrl}">reset password</a> to reset your password. Please note that this link is valid for 15 minutes.</p>`;
    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html,
    });

    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }, // Check token expiration
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
