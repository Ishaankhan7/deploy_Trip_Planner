const express = require('express');
const router = express.Router();
const verifyToken = require('../Middleware/verifyToken');
const { createTripPlan } = require('../Controllers/tripPlanController');
const { soloTrip } = require('../Controllers/soloTripController');

router.post('/api/trip-planner',verifyToken , createTripPlan);

router.post('/api/solo-trip', verifyToken, soloTrip);

module.exports = router;