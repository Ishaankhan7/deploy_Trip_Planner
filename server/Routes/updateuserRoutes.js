const express = require('express');
const router = express.Router();
const { updateUserInfo , verifyUpdatedEmail } = require('../Controllers/updatuserinfoController');
const verifyToken = require('../Middleware/verifyToken');

router.put('/update-user', verifyToken, updateUserInfo);
router.post('/verify-updated-email', verifyToken, verifyUpdatedEmail);

module.exports = router;