const axios = require("axios");

const PYTHON_API_URL = "http://172.16.155.92:8000/chat";

const chatBot = async (req, res) => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: "Message is required" });
    }

    
    const response = await axios.post(PYTHON_API_URL, { message: userMessage });

   

    res.json(response.data);
  } catch (error) {
    console.error("Error communicating with chatbot:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to get response from chatbot", details: error.message });
  }
};

module.exports = chatBot;
