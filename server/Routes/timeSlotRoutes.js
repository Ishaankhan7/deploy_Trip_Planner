const express = require('express');
const router = express.Router();
const {
  createTimeSlot,
  bookTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
  getAvailableTimeSlots,
    cancelBooking,
} = require('../Controllers/timeSlotController');
const verifyToken = require('../Middleware/verifyToken');
const verifyRole = require('../Middleware/verifyRole');

// Guide: Create Time Slot
router.post('/time-slot', verifyToken,verifyRole('guide'), createTimeSlot);

// User: Book Time Slot
router.post('/time-slot/book/:timeSlotId', verifyToken,verifyRole('user') ,bookTimeSlot);

// Guide: Update Time Slot
router.put('/time-slot/:timeSlotId', verifyToken,verifyRole('guide') ,updateTimeSlot);

// Guide: Delete Time Slot
router.delete('/time-slot/:timeSlotId', verifyToken,verifyRole('guide'), deleteTimeSlot);

// Get Available Time Slots
router.get('/time-slots', getAvailableTimeSlots);

// User: Cancel Booking
router.put('/cancel-booking/:timeSlotId',verifyToken,verifyRole('user') , cancelBooking);

module.exports = router;
