import React from "react";
import Navbar_ContactUsPage from "../components/Navbar_ContactUsPage";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

function ContactusPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-[#1D3465] to-[#CDCED1]">
      <Navbar_ContactUsPage />

      {/* Main Coming Soon Section */}
      <div className="flex flex-col items-center mt-64 mb-64 justify-center flex-grow text-white text-center px-4">
        <motion.h1
          className="text-[80px] sm:text-6xl font-bold tracking-wider mb-8"
          animate={{ opacity: [0, 1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Coming Soon...
        </motion.h1>

        <p className="text-lg sm:text-xl text-gray-200 max-w-lg">
          We're working hard to bring you something amazing! Stay tuned for
          updates.
        </p>

        <button className="mt-6 px-6 py-3 bg-white text-[#1D3465] font-semibold text-lg rounded-full shadow-lg transition-transform duration-300 hover:scale-105">
          Notify Me
        </button>
      </div>

      <Footer />

      {/* Stylish Bottom Glow Effect */}
      {/* <div
        className="fixed bottom-0 w-full bg-white text-center z-0"
        style={{
          boxShadow: "0px 0px 400px 200px rgba(255, 255, 255, 0.8)",
        }}
      ></div> */}
    </div>
  );
}

export default ContactusPage;
