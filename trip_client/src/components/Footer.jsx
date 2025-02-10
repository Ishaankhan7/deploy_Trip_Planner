import React from 'react'
import { useState } from 'react';

function Footer() {
  const [message, setMessage] = useState("");

  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log("Message submitted:", message);
    setMessage("");
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="mt-16 text-5xl text-center font-bold text-black relative inline-block"  style={{
        textShadow: '0px 7px 50px #90EE90, 0px 16px 80px #90EE90, 0px 22px 60px #90EE90',
      }}>
          VISIT US
        </h1>
      </div>

      <div className="mt-16 z-10 flex flex-col lg:flex-row items-center justify-center px-4 mb-32">
        {/* Left Half: Social Media Icons */}
        <div
          className="relative grid grid-cols-2 gap-4 lg:gap-8 w-full lg:w-1/2 lg:grid-cols-2 items-center justify-items-center"
          style={{ height: "auto" }}
        >
          {/* Icon: Instagram */}
          <div className="w-24 h-24 sm:w-28 sm:ml-16 sm:h-28 lg:w-32 lg:h-32 bg-[#EAE6F2] flex items-center justify-center rounded-full shadow-lg relative">
            <img src="../public/insta_img.png" alt="Instagram" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
            <p className="absolute mt-28 sm:mt-40 text-sm sm:text-base" style={{ fontFamily: 'Akaya Kanadaka, cursive' }}>
              safarsaathi_travel
            </p>
          </div>

          {/* Icon: Twitter */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 sm:mr-32 lg:h-32 bg-[#EAE6F2] flex items-center justify-center rounded-full shadow-lg relative">
            <img src="../public/x_img.png" alt="Twitter" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-24 lg:h-24" />
            <p className="absolute mt-28 sm:mt-40 text-sm sm:text-base" style={{ fontFamily: 'Akaya Kanadaka, cursive' }}>
              @safarSathi
            </p>
          </div>

          {/* Icon: LinkedIn */}
          <div className="w-24 h-24 sm:w-28 mt-4 sm:ml-16 sm:h-28 lg:w-32 lg:h-32 bg-[#EAE6F2] flex items-center justify-center rounded-full shadow-lg relative">
            <img src="../public/linkedin_img.png" alt="LinkedIn" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
            <p className="absolute mt-28 sm:mt-40 text-sm sm:text-base" style={{ fontFamily: 'Akaya Kanadaka, cursive' }}>
              @safarSathi
            </p>
          </div>

          {/* Icon: YouTube */}
          <div className="w-24 h-24 sm:w-28 mt-4 sm:h-28 sm:mr-32 lg:w-32 lg:h-32 bg-[#EAE6F2] flex items-center justify-center rounded-full shadow-lg relative">
            <img src="../public/yt_img.png" alt="YouTube" className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
            <p className="absolute mt-28 sm:mt-40 text-sm sm:text-base " style={{ fontFamily: 'Akaya Kanadaka, cursive' }}>
              @safarSathi
            </p>
          </div>
      </div>

      {/* Right Half: Company Logo and Details */}
      <div className="w-full lg:w-1/3 flex flex-col sm:mr-28 items-center lg:items-start justify-center mt-10 lg:mt-0">
        {/* Company Logo */}
        <div className="flex items-center mb-4 lg:ml-24 sm:flex-row flex-col">
          <img
            src="../public/safarsathi_logo.jpg"
            alt="Company Logo"
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-full border-4 border-[#8F84A8]"
          />
          <h1 className="text-xl sm:text-2xl lg:text-3xl  font-bold text-black lg:ml-4">Safarsathi</h1>
        </div>

        {/* Details Section */}
        <div className="w-full flex sm:flex-row lg:items-start sm:justify-between mt-6 sm:flex-nowrap flex-wrap">
          {/* Services Section */}
          <div className="mb-6 sm:mr-6 flex-1">
            <h2 className="text-lg sm:text-xl font-semibold text-black">SafarSathi</h2>
            <ul className="text-black mt-2">
              <li className="mb-1">Home</li>
              <li className="mb-1">About</li>
              <li className="mb-1">Trip</li>
              <li className="mb-1">Healthcare</li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="mb-6 sm:mr-6 flex-1">
            <h2 className="text-lg sm:text-xl font-semibold text-black">Services</h2>
            <ul className="text-black mt-2">
              <li className="mb-1">Service 1</li>
              <li className="mb-1">Service 2</li>
              <li className="mb-1">Service 3</li>
            </ul>
          </div>

          {/* Information Section */}
          <div className="mb-6 sm:mr-6 flex-1">
            <h2 className="text-lg sm:text-xl font-semibold text-black">Contact</h2>
            <ul className="text-black mt-2">
              <li className="mb-1">Email</li>
              <li className="mb-1">LinkedIn</li>
              <li className="mb-1">Instagram</li>
              <li className="mb-1">Twitter(X)</li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <p className="mt-8 text-xl text-black font-bold">Join Us Here</p>
        <form className="w-full max-w-sm mt-6 flex flex-col items-center" onSubmit={SubmitHandler}>
          <input
            type="text"
            placeholder="Enter your email"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#8F84A8]"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#8F84A8] text-white font-bold rounded-lg hover:bg-[#5E5F89] transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Footer
