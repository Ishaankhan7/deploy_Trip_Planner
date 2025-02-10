const Itinerary = require('../Models/itineraryModel');
const PartnerPreference = require('../Models/PartnerPreferenceModel');
const ChatRoom = require('../Models/ChatRoomModel'); // Added for chat room functionality

exports.soloTrip = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from token

        // Fetch user's itinerary from the database
        const userItinerary = await Itinerary.findOne({ userId: userId });

        if (!userItinerary) {
            return res.status(404).json({ message: "No itinerary found for this user." });
        }

        // If the user wants a partner, save partner preferences with validation
        if (userItinerary.wantsPartner && req.body.partnerPreferences) {
            const validPreferences = validatePartnerPreferences(req.body.partnerPreferences);
            if (!validPreferences.success) {
                return res.status(400).json({ message: validPreferences.error });
            }

            const newPartnerPreferences = new PartnerPreference({
                itineraryId: userItinerary._id,
                ...req.body.partnerPreferences
            });
            await newPartnerPreferences.save();
        }

        // Find a matching travel partner
        const bestMatch = await findTravelPartner(userItinerary);

        if (bestMatch) {
            // Create a chat room for the matched users
            const chatRoom = new ChatRoom({
                users: [userId, bestMatch.userId] // No guide required
            });
            await chatRoom.save();
        
            return res.status(200).json({
                message: "Matching travel partner found! Chat room created.",
                partner: bestMatch,
                chatRoomId: chatRoom._id
            });
        }
        

        return res.status(200).json({
            message: "No match found, but your preferences are saved for future matching.",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Find Travel Partner with Enhanced Matching
const findTravelPartner = async (userItinerary) => {
    if (!userItinerary.wantsPartner) return null;

    const userPreferences = await PartnerPreference.findOne({ itineraryId: userItinerary._id });
    if (!userPreferences) return null;

    // Query potential partners (matching city and overlapping dates), but exclude the user’s own itinerary
    let query = {
        wantsPartner: true,
        city: userItinerary.city,
        startDate: { $lte: userItinerary.endDate },
        endDate: { $gte: userItinerary.startDate },
        _id: { $ne: userItinerary._id }  // Exclude the user's own itinerary
    };

    const potentialPartners = await Itinerary.find(query).populate('partnerPreferences');

    let bestMatch = null;
    let highestMatchScore = 0;

    for (let partnerItinerary of potentialPartners) {
        const partnerPreferences = await PartnerPreference.findOne({ itineraryId: partnerItinerary._id });

        if (partnerPreferences) {
            // Pre-filter incompatible partners
            if (userPreferences.foodPreference !== partnerPreferences.foodPreference && 
                userPreferences.foodPreference !== 'No Preference' && partnerPreferences.foodPreference !== 'No Preference') continue;

            if (userPreferences.personalityType !== partnerPreferences.personalityType && 
                userPreferences.personalityType !== 'Flexible' && partnerPreferences.personalityType !== 'Flexible') continue;

            const finalMatchScore = calculateMatchScore(userPreferences, partnerPreferences, userItinerary.interests, partnerItinerary.interests);

            if (finalMatchScore > highestMatchScore) {
                highestMatchScore = finalMatchScore;
                bestMatch = partnerItinerary;
            }
        }
    }

    return bestMatch;
};

// Enhanced Match Score Calculation
function calculateMatchScore(userPreferences, partnerPreferences, userInterests, partnerInterests) {
    let score = 0;

    const weights = {
        gender: 0.2,
        age: 0.15,
        drinking: 0.1,
        smoking: 0.1,
        foodPreference: 0.1,
        sleepingHabits: 0.1,
        personalityType: 0.1,
        activityInterests: 0.1,
        musicPreference: 0.05,
        interests: 0.1
    };

    // Gender Match
    if (userPreferences.gender === 'Any' || userPreferences.gender === partnerPreferences.gender) {
        score += weights.gender;
    }

    // Age Range Match
    if (
        partnerPreferences.ageRange.min <= userPreferences.ageRange.max &&
        partnerPreferences.ageRange.max >= userPreferences.ageRange.min
    ) {
        score += weights.age;
    }

    // Preference Matching with partial flexibility
    ['drinking', 'smoking', 'foodPreference', 'sleepingHabits', 'personalityType', 'musicPreference'].forEach((key) => {
        if (userPreferences[key] === partnerPreferences[key]) {
            score += weights[key];
        } else if (userPreferences[key] === 'Flexible' || partnerPreferences[key] === 'Flexible') {
            score += weights[key] * 0.5;  // Partial match for "Flexible"
        }
    });

    // Activity Interest Match (Cosine Similarity)
    const activityInterestScore = calculateCosineSimilarity(userPreferences.activityInterests, partnerPreferences.activityInterests) * weights.activityInterests;
    score += activityInterestScore;

    // General Interests Match (Jaccard Similarity)
    const interestScore = calculateJaccardSimilarity(userInterests, partnerInterests) * weights.interests;
    score += interestScore;

    return score * 100;  // Scale the score for better readability
}

// Optimized Cosine Similarity
function calculateCosineSimilarity(a, b) {
    if (!a.length || !b.length) return 0;
    
    const common = a.filter(value => b.includes(value)).length;
    return common / Math.sqrt(a.length * b.length);
}

// Jaccard Similarity for Interests
function calculateJaccardSimilarity(a, b) {
    if (!a.length || !b.length) return 0;

    const intersection = a.filter(value => b.includes(value)).length;
    const union = new Set([...a, ...b]).size;
    return intersection / union;
}

// Validation function for partner preferences (basic structure, adjust as necessary)
function validatePartnerPreferences(preferences) {
    const requiredFields = ['gender', 'ageRange', 'drinking', 'smoking', 'foodPreference', 'sleepingHabits', 'personalityType', 'activityInterests', 'musicPreference'];
    for (let field of requiredFields) {
        if (!preferences[field]) {
            return { success: false, error: `Missing required field: ${field}` };
        }
    }
    return { success: true };
}
