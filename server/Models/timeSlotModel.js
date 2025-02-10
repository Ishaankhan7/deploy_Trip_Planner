const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    time: { type: String, required: true }, // e.g., "10:00 AM - 11:00 AM"
    location: { type: String, required: true },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isBooked: { type: Boolean, default: false },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const TimeSlotModel = mongoose.model("TimeSlot", timeSlotSchema);
module.exports = TimeSlotModel;
