const { GoogleGenerativeAI } = require('@google/generative-ai');
const HealthModel = require('../models/healthModel');
const jwt = require('jsonwebtoken');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

exports.getHealthSuggestions = async (req, res) => {
  const { healthCondition, location } = req.body; 

  try {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    let userId;
    let userName;
    let name;
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
      userId = decoded.id; 
      userName = decoded.userName; 
      name = decoded.name;
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    if (!name) {
      return res.status(400).json({ message: 'User name is required in the token.' });
    }

    const healthData = {
      healthCondition,
      location,
    };

    const prompt = `Please suggest the following based on the health condition "${healthCondition}" and location "${location}":

    1. Medicine Suggestions: A list of medicines that can help treat ${healthCondition}.
    2. Homemade Remedies: A list of any effective homemade remedies for ${healthCondition}.
    3. Nearby Medical Stores: Provide a list of nearby medical stores in ${location}, including their names and addresses.
    4. Nearby Hospitals: Provide a list of nearby hospitals in ${location}, including their names and addresses.

    Ensure all responses are in the following JSON format:

    {
      "Medicine": ["Data1", "Data2", "Data3"],
      "HomemadeRemedies": ["Remedy1", "Remedy2"],
      "NearbyMedicalStores": [
        { "Name": "Store1", "Address": "Address1" },
        { "Name": "Store2", "Address": "Address2" }
      ],
      "NearbyHospitals": [
        { "Name": "Hospital1", "Address": "Address1" },
        { "Name": "Hospital2", "Address": "Address2" }
      ]
    }

    Please do not include explanations or disclaimers. Provide only the data in the format specified above.`

    const result = await model.generateContent(prompt);
    let generatedResponse = result?.response?.text();

    generatedResponse = generatedResponse.replace(/```json|```/g, '').trim();

    let healthRecommendations;
    try {
      healthRecommendations = JSON.parse(generatedResponse);
    } catch (error) {
      console.error('Error parsing AI response:', generatedResponse, error);
      return res.status(400).json({
        message: 'AI response could not be parsed into JSON',
        aiResponse: generatedResponse,
      });
    }

    const healthEntry = new HealthModel({
      userId, 
      healthCondition,
      location,
      medicine: healthRecommendations.Medicine,
      homemadeRemedy: healthRecommendations.HomemadeRemedies,
      nearbyMedicalStores: healthRecommendations.NearbyMedicalStores,
      nearbyHospitals: healthRecommendations.NearbyHospitals,
      name, 
      userName,
    });

    const savedHealthEntry = await healthEntry.save();

    res.status(200).json({
      message: 'Health suggestions generated and saved successfully',
      savedHealthEntry,
    });
  } catch (error) {
    console.error('Error generating health suggestions:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};


exports.getHealthData = async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1]; 
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
      userId = decoded.id; 
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    const { page = 1, limit = 10 } = req.query; 
    
    const healthData = await HealthModel.find({ userId })
      .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit) 
      .limit(parseInt(limit));

    if (healthData.length === 0) {
      return res.status(404).json({ message: 'No health data found for this user.' });
    }

    res.status(200).json({
      message: 'Health data retrieved successfully.',
      healthData,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  } catch (error) {
    console.error('Error fetching health data:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.deleteHealthData = async (req, res) => {
  try {
    const { healthDataId } = req.params;
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1]; // Get token from cookies or headers
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    const healthEntry = await HealthModel.findOne({ _id: healthDataId, userId });

    if (!healthEntry) {
      return res.status(404).json({ message: 'Health data not found for this user.' });
    }

    await HealthModel.findByIdAndDelete(healthDataId);

    res.status(200).json({ message: 'Health data deleted successfully.' });
  } catch (error) {
    console.error('Error deleting health data:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};