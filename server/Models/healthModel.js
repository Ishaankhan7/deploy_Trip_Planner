const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  healthCondition: { type: String, required: true },
  location: { type: String, required: true },
  medicine: [String],
  homemadeRemedy: [String],
  nearbyMedicalStores: [{
    Name: String,
    Address: String
  }],
  nearbyHospitals: [{
    Name: String,
    Address: String
  }],
  timestamp: { type: Date, default: Date.now },
  name: { type: String, required: true },
  userName: { type: String }
});

const HealthModel = mongoose.model('Health', healthSchema);
module.exports = HealthModel;
