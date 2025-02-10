const UserModel = require('../models/userModel');
const { sendOTPEmail } = require('../utils/email');
const { generateOTP } = require('../utils/otp');
const OTP_EXPIRY_MINUTES = 10;
const otpCache = new Map();
const isOTPExpired = (expiresAt) => new Date() > new Date(expiresAt);

exports.updateUserInfo = async (req, res) => {
  try {
    const userId = req.user.id; // Assume user ID is extracted from JWT
    const { newUserName, newEmail, newName } = req.body;

    if (!newUserName && !newEmail && !newName) {
      return res.status(400).json({ message: "At least one field is required to update." });
    }

    // Fetch user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Verify uniqueness for username
    if (newUserName) {
      const existingUserName = await UserModel.findOne({ userName: newUserName.toLowerCase() });
      if (existingUserName) {
        return res.status(400).json({ message: "Username already taken." });
      }
      user.userName = newUserName.toLowerCase();
    }

    // Update name directly
    if (newName) {
      user.name = newName;
    }

    // Handle email update with OTP verification
    if (newEmail) {
      const existingEmail = await UserModel.findOne({ email: newEmail.toLowerCase() });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already registered." });
      }

      // Generate OTP for email verification
      const otp = generateOTP();
      const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
      otpCache.set(newEmail.toLowerCase(), { otp, expiresAt, userId, newEmail });

      // Send verification email
      await sendOTPEmail(newEmail, otp);

      // Save changes for username and name immediately
      await user.save();

      return res.status(200).json({
        message: "Username and name updated successfully. OTP sent to your new email address. Please verify to complete the email update.",
      });
    }

    // Save user data if only username or name is updated
    await user.save();
    res.status(200).json({ message: "User info updated successfully." });
  } catch (error) {
    console.error("Update User Info error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


  exports.verifyUpdatedEmail = async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required." });
      }
  
      const cachedData = otpCache.get(email.toLowerCase());
      if (!cachedData) {
        return res.status(400).json({ message: "Invalid or expired OTP." });
      }
  
      const { otp: storedOTP, expiresAt, userId, newEmail } = cachedData;
  
      if (isOTPExpired(expiresAt)) {
        otpCache.delete(email.toLowerCase());
        return res.status(400).json({ message: "OTP has expired. Please request a new one." });
      }
  
      if (storedOTP !== otp) {
        return res.status(400).json({ message: "Invalid OTP." });
      }
  
      // Update email in the database
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      user.email = newEmail.toLowerCase();
      await user.save();
  
      otpCache.delete(email.toLowerCase()); // Clear OTP cache
  
      res.status(200).json({ message: "Email updated and verified successfully." });
    } catch (error) {
      console.error("Verify Updated Email error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  
  