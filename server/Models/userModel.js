const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  userName: {
    type: String,
    required: function () {
      return !this.googleId;  
    },
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId; 
    },
  },
  role: {
    type: String,
    enum: ['user', 'guide'],
    default: 'user'
  },
  coins: {
    type: Number,
    default: 0, // Default coins count is 0
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
    select: false
  },
  googleId: { 
    type: String, 
    unique: true, 
    sparse: true, 
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {
  timestamps: true
});

userSchema.index({ email: 1, userName: 1 }, { unique: true });

const UserModel =  mongoose.models.User || mongoose.model('User', userSchema);
module.exports = UserModel;
