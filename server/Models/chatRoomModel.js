const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  timeSlot: { type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot" }, // Optional for guide-user chats
  guide: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Not required for user-user chats
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }], // Supports multiple users in chat
  messages: [{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

module.exports = mongoose.models.ChatRoom || mongoose.model("ChatRoom", chatRoomSchema);
