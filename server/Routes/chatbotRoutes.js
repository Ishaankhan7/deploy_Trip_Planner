const express = require('express');
const router = express.Router();
const verifyToken = require("../Middleware/verifyToken");
const chatBot = require("../Controllers/chatbotController"); // Importing the function

router.post('/support/chatBot', verifyToken, chatBot); // Use the function directly

module.exports = router;
