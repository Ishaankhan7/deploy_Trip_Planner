import React from 'react';
import { motion } from "framer-motion";
import Navbar_TripPlanningPage from '../components/Navbar_TripPlanningPage';
import Footer from '../components/Footer';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const BookGuidePage = () => {
  const [showGuides, setShowGuides] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowGuides(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1D3465] to-[#CDCED1] text-white">
      <Navbar_TripPlanningPage />
      
      <div className="flex flex-col items-center justify-center py-10 px-5">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-5xl mt-40 font-bold text-center mb-6"
        >
          Book a Guide for Your Next Adventure
        </motion.h1>

        {/* Booking Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          className="bg-white text-black p-8 rounded-2xl shadow-lg max-w-lg w-full"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Fill in Your Details</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="email" placeholder="Your Email" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="text" placeholder="Destination" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <input type="date" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            <textarea placeholder="Additional Requests" className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            <button type="submit" className="bg-blue-600 text-white py-3 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
              Find a Guide
            </button>
          </form>
        </motion.div>
      </div>

      {/* Guide List Section - Only show after form submission */}
      {showGuides && (
        <div className="py-10 px-5">
          <h2 className="text-3xl font-bold text-center mb-6">Available Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((guide) => (
              <motion.div 
                key={guide} 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}
                className="bg-white text-black p-5 rounded-2xl shadow-lg flex flex-col items-center"
              >
                <img src="https://source.unsplash.com/150x150/?person,travel" alt="Guide" className="rounded-full mb-4" />
                <h3 className="text-xl font-semibold">Guide {guide}</h3>
                <p className="text-center">Expert in historical sites and adventure tourism.</p>
                <Link to={'/chatwithyourguide'} className="mt-4 bg-yellow-400 text-black px-4 py-2 text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition">
                  Book this Guide
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default BookGuidePage;
