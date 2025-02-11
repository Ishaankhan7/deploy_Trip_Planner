const TimeSlotModel = require('../Models/timeSlotModel');
const ChatRoomModel = require("../Models/ChatRoomModel");
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const UserModel = require('../Models/userModel');
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

const sendEmails = async (mailOptions) => {
  try {
    await Promise.all(mailOptions.map((mail) => transporter.sendMail(mail)));
  } catch (error) {
    console.warn('Email error:', error.message);
  }
};

const sendResponseWithWarnings = (res, status, message, data = null, warnings = []) => {
  res.status(status).json({ message, data, warnings });
};

// Guide: Create Time Slot
exports.createTimeSlot = async (req, res) => {
  try {
    const { date, time, location } = req.body;
    const guideId = req.user.id;

    if (!date || !time || !location) {
      return res.status(400).json({ message: 'All fields (date, time, location) are required' });
    }

    const newTimeSlot = new TimeSlotModel({
      date,
      time,
      location,
      guide: guideId,
    });

    const savedSlot = await newTimeSlot.save();
    res.status(201).json({ message: 'Time slot created successfully', timeSlot: savedSlot });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// User: Book Time Slot
exports.bookTimeSlot = async (req, res) => {
  try {
    const { timeSlotId } = req.params;
    const userId = req.user.id;

    const timeSlot = await TimeSlotModel.findById(timeSlotId);
    if (!timeSlot) return res.status(404).json({ message: "Time slot not found" });
    if (timeSlot.isBooked) return res.status(400).json({ message: "Time slot already booked" });

    timeSlot.isBooked = true;
    timeSlot.bookedBy = userId;
    await timeSlot.save();

    const chatRoom = await ChatRoomModel.create({
      timeSlot: timeSlotId,
      guide: timeSlot.guide,
      user: userId,
      messages: [],
    });

    res.status(200).json({
      message: "Time slot booked successfully",
      chatRoomId: chatRoom._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Guide: Update Time Slot
exports.updateTimeSlot = async (req, res) => {
  try {
    const { timeSlotId } = req.params;
    const { date, time, location } = req.body;

    if (!date || !time || !location) {
      return res.status(400).json({ message: 'All fields (date, time, location) are required' });
    }

    const timeSlot = await TimeSlotModel.findOne({ _id: timeSlotId, guide: req.user.id });
    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    timeSlot.date = date;
    timeSlot.time = time;
    timeSlot.location = location;
    const updatedSlot = await timeSlot.save();

    const guide = await UserModel.findById(req.user.id);
    const mailOptions = [
      {
        from: process.env.NODEMAILER_EMAIL,
        to: guide.email,
        subject: 'Time Slot Updated',
        text: `Your time slot has been updated: \nDate: ${updatedSlot.date} \nTime: ${updatedSlot.time} \nLocation: ${updatedSlot.location}`,
      },
    ];

    const warnings = [];
    if (timeSlot.isBooked) {
      const user = await UserModel.findById(timeSlot.bookedBy);
      mailOptions.push({
        from: process.env.NODEMAILER_EMAIL,
        to: user.email,
        subject: 'Time Slot Updated',
        text: `The time slot you booked has been updated: \nDate: ${updatedSlot.date} \nTime: ${updatedSlot.time} \nLocation: ${updatedSlot.location}`,
      });
      warnings.push('This time slot is already booked. The user has been notified about the changes.');
    }

    await sendEmails(mailOptions);

    sendResponseWithWarnings(res, 200, 'Time slot updated successfully', updatedSlot, warnings);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Guide: Delete Time Slot
exports.deleteTimeSlot = async (req, res) => {
  try {
    const { timeSlotId } = req.params;

    const timeSlot = await TimeSlotModel.findOne({ _id: timeSlotId, guide: req.user.id });
    if (!timeSlot) {
      return res.status(404).json({ message: 'Time slot not found' });
    }

    const warnings = [];
    if (timeSlot.isBooked) {
      warnings.push('This time slot was booked. The user has been notified about the deletion.');
    }

    await TimeSlotModel.findByIdAndDelete(timeSlotId);

    const guide = await UserModel.findById(req.user.id);
    const mailOptions = [
      {
        from: process.env.NODEMAILER_EMAIL,
        to: guide.email,
        subject: 'Time Slot Deleted',
        text: 'Your time slot has been deleted.',
      },
    ];

    if (timeSlot.isBooked) {
      const user = await UserModel.findById(timeSlot.bookedBy);
      mailOptions.push({
        from: process.env.NODEMAILER_EMAIL,
        to: user.email,
        subject: 'Time Slot Deleted',
        text: 'The time slot you booked has been deleted.',
      });
    }

    await sendEmails(mailOptions);

    sendResponseWithWarnings(res, 200, 'Time slot deleted successfully', null, warnings);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Get Available Time Slots
exports.getAvailableTimeSlots = async (req, res) => {
  try {
    const availableSlots = await TimeSlotModel.find({ isBooked: false }).select('-__v');
    res.status(200).json({ message: 'Available time slots retrieved successfully', availableSlots });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// User: Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const { timeSlotId } = req.params;

    const timeSlot = await TimeSlotModel.findOne({ _id: timeSlotId, bookedBy: req.user.id });
    if (!timeSlot) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    timeSlot.isBooked = false;
    timeSlot.bookedBy = null;
    const updatedSlot = await timeSlot.save();

    const guide = await UserModel.findById(updatedSlot.guide);
    const mailOptions = [
      {
        from: process.env.NODEMAILER_EMAIL,
        to: guide.email,
        subject: 'Booking Canceled',
        text: `The booking for your time slot has been canceled by the user. \nDate: ${updatedSlot.date} \nTime: ${updatedSlot.time} \nLocation: ${updatedSlot.location}`,
      },
      {
        from: process.env.NODEMAILER_EMAIL,
        to: req.user.email,
        subject: 'Booking Canceled',
        text: `You have successfully canceled your booking for the following time slot: \nDate: ${updatedSlot.date} \nTime: ${updatedSlot.time} \nLocation: ${updatedSlot.location}`,
      },
    ];

    await sendEmails(mailOptions);

    res.status(200).json({ message: 'Booking canceled successfully', timeSlot: updatedSlot });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
