const express = require('express');
const router = express.Router();
const { getHealthSuggestions, getHealthData, deleteHealthData } = require('../Controllers/healthController');
const verifyToken = require('../Middleware/verifyToken');

// Health Suggestions Route
router.post('/health-suggestions', verifyToken, getHealthSuggestions);

router.get('/AI-response',getHealthData)

router.delete('/healthdata/:healthDataId', deleteHealthData);

module.exports = router;
