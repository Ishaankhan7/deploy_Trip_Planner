const { spawn } = require('child_process');
const Itinerary = require('../Models/itineraryModel');
const PartnerPreference = require('../Models/PartnerPreferenceModel');

const createTripPlan = async (req, res) => {
    const inputData = req.body;
    const userId = req.user.id; // Extract user ID from token

    try {
        // Spawn Python process
        const pythonProcess = spawn('python3', ['D:\\Projects\\Trip Planer\\server\\Python\\travel_planner.py']);

        // Send input data to the Python script
        pythonProcess.stdin.write(JSON.stringify(inputData));
        pythonProcess.stdin.end();

        let output = '';
        let error = '';

        // Collect stdout data from Python script
        pythonProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        // Collect stderr data from Python script
        pythonProcess.stderr.on('data', (data) => {
            error += data.toString();
        });

        // Handle process completion
        pythonProcess.on('close', async (code) => {
            if (code === 0) {
                try {
                    const response = JSON.parse(output);
                    if (response.status === 'success') {
                        // Save the response to the database with the userId
                        const newItinerary = new Itinerary({
                            userId: userId,
                            city: inputData.city,
                            interests: Array.isArray(inputData.interests) ? inputData.interests : inputData.interests.split(','),
                            startDate: inputData.start_date,
                            endDate: inputData.end_date,
                            totalMembers: inputData.num_men + inputData.num_women + inputData.num_others,
                            totalBudget: inputData.total_budget,
                            itinerary: response.itinerary,
                            wantsPartner: inputData.wantsPartner // 🔥 Now included
                        });

                        await newItinerary.save();

                        // 🔥 If wantsPartner is true, save partner preferences
                        if (inputData.wantsPartner && inputData.partnerPreferences) {
                            const newPartnerPreferences = new PartnerPreference({
                                itineraryId: newItinerary._id,
                                ...inputData.partnerPreferences
                            });

                            await newPartnerPreferences.save();
                        }

                        res.json({ itinerary: response.itinerary, wantsPartner: newItinerary.wantsPartner });
                    } else {
                        res.status(400).json({ error: response.message || 'An error occurred while generating the itinerary.' });
                    }
                } catch (err) {
                    res.status(500).json({ error: 'Error parsing Python response: ' + err.message });
                }
            } else {
                res.status(500).json({ error: error || 'An error occurred while running the Python script.' });
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to process the request: ' + err.message });
    }
};

module.exports = { createTripPlan }; 