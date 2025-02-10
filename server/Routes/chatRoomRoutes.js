const express = require("express");
const router = express.Router();
const { getMessages, sendMessage } = require("../Controllers/chatRoomController");
const verifyToken = require("../Middleware/verifyToken");

router.get("/chatRooms/:chatRoomId/getmessages", verifyToken, getMessages);
router.post("/chatRooms/:chatRoomId/sendmessages", verifyToken, sendMessage);

module.exports = router;
