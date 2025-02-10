const mongoose = require('mongoose');

const partnerPreferenceSchema = new mongoose.Schema({
    itineraryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary', required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Any'], required: true },
    ageRange: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    drinking: { type: String, enum: ['Yes', 'No', 'Occasionally'], required: true },
    smoking: { type: String, enum: ['Yes', 'No', 'Occasionally'], required: true },
    foodPreference: { type: String, enum: ['Veg', 'Non-Veg', 'Vegan', 'No Preference'], required: true },
    sleepingHabits: { type: String, enum: ['Early Riser', 'Night Owl', 'Flexible'], required: true },
    personalityType: { type: String, enum: ['Introvert', 'Extrovert', 'Flexible'], required: true },
    activityInterests: { type: [String], required: true },
    musicPreference: { type: String, enum: ['Loud Music', 'Calm Music', 'No Preference'], required: true },
    idVerificationRequired: { type: Boolean, default: false },
    emergencyContactSharing: { type: Boolean, default: false }
});

module.exports = mongoose.model('PartnerPreference', partnerPreferenceSchema);
