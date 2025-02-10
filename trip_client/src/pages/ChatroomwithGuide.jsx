import React, { useState } from 'react';
import { FaArrowLeft, FaPaperPlane, FaMicrophone, FaImage } from 'react-icons/fa';
import Navbar_TripPlanningPage from '../components/Navbar_TripPlanningPage';
import Footer from '../components/Footer';

const ChatroomwithGuide = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "guide" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I'm here to help!", sender: "guide" }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1D3465] to-[#CDCED1] text-white">
      <Navbar_TripPlanningPage />

      {/* Chat Container */}
      <div className="flex-grow flex flex-col items-center py-6 px-6 md:px-20 mt-40">
        <div className="w-full max-w-7xl bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col h-[900px] w-[90vw]">
          
          {/* Header */}
          <div className="flex items-center justify-between bg-[#1D3465] text-white p-4">
            <button className="flex items-center text-white hover:text-gray-300" onClick={() => window.history.back()}>
              <FaArrowLeft className="mr-2" /> Back
            </button>
            <div className="flex items-center">
              {/* <img src="https://via.placeholder.com/50" alt="Guide" className="w-12 h-12 rounded-full border border-white" /> */}
              <div className="ml-3">
                <p className="font-semibold">Guide Name</p>
                <p className="text-sm text-green-300">Online</p>
              </div>
            </div>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-grow p-5 space-y-4 overflow-y-auto h-full bg-gray-100">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}> 
                <div className={`px-5 py-3 rounded-lg shadow-md max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Chat Input */}
          <div className="flex items-center bg-white p-3 border-t">
            <button className="mr-3 text-gray-500 hover:text-gray-700">
              <FaImage size={24} />
            </button>
            <button className="mr-3 text-gray-500 hover:text-gray-700">
              <FaMicrophone size={24} />
            </button>
            <input
              type="text"
              className="flex-grow p-3 border rounded-lg focus:outline-none"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button className="ml-3 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg" onClick={sendMessage}>
              <FaPaperPlane size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChatroomwithGuide;
