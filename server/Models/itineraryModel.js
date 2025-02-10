const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    city: { type: String, required: true },
    interests: { type: [String], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalMembers: { type: Number, required: true },
    totalBudget: { type: Number, required: true },
    itinerary: { type: String, required: true },
    wantsPartner: { type: Boolean, required: true }, // 🔥 Determines if a partner is needed
    partnerPreferences: { type: mongoose.Schema.Types.ObjectId, ref: 'PartnerPreference', default: null }, // 🔥 Reference to preferences
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Itinerary', itinerarySchema);
