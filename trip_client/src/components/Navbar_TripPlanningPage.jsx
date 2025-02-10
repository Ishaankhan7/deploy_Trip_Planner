import React, { useState, useEffect } from 'react';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Navbar_HomePage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    document.body.style.overflow = isNavOpen ? "unset" : "hidden";
  };

  const handleSignInOrSignUp = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000); // Hide popup after 4 seconds
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes rotateCoin {
        0% {
          transform: rotateY(0deg);
        }
        100% {
          transform: rotateY(360deg);
        }
      }
      .rotating-coin {
        animation: rotateCoin 2s linear infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div>
      <nav className="bg-white opacity-100 shadow-lg rounded-[100px] mx-4 my-4 absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-2">
        {/* Logo and Company Name */}
        <div className="flex items-center lg:ml-10">
          <img
            src="../public/safarsathi_logo.jpg"
            alt="Company Logo"
            className="w-16 h-16 rounded-full border-2 border-[#8F84A8] mr-3"
          />
          <h1 className="text-4xl font-bold text-black" style={{ textShadow: '5px 5px 5px #766992' }}>
            Safarsathi
          </h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden z-50">
          <button
            onClick={toggleNav}
            className="text-black p-2 focus:outline-none transition-colors relative"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon
              icon={isNavOpen ? faTimes : faBars}
              size="2x"
              className={isNavOpen ? 'text-white' : 'text-black'}
            />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex space-x-6">
          <Link
            to="/home"
            className="text-black font-semibold mt-6 text-2xl relative hover:scale-105 transition-all nav-link"
          >
            Home
            <span className="absolute inset-0 blur-md rounded-lg opacity-50"></span>
          </Link>
          <Link
            to={'/tripplanning'}
            className="text-black font-semibold text-3xl relative scale-110 transition-all nav-link"
          >
            Trip Planning
            <span className="absolute inset-0 blur-md bg-green-500 rounded-lg opacity-50"></span>
          </Link>
          <Link
            to={"/emergency"}
            className="text-black font-semibold text-2xl mt-6 relative hover:scale-105 transition-all nav-link"
          >
            Emergency
            <span className="absolute inset-0 blur-md text-3xl mt-6 rounded-lg opacity-50"></span>
          </Link>
          <Link
            to="/contact"
            className="text-black font-semibold mt-6 relative hover:scale-105 transition-all nav-link"
          >
            <span className="text-2xl">Trip Organizer</span>
            <span className="absolute inset-0 blur-md rounded-lg opacity-50"></span>
          </Link>
        </div>

        {/* Profile Section */}
        <div className="hidden lg:flex items-center mr-16">
          <img
            src="../public/man_4140048.png"
            alt="Profile"
            className="w-14 h-14 rounded-full border-2 border-[#8F84A8]"
          />
          <Link to={'/profile'}> <span className="text-black font-semibold text-2xl ml-3">John Doe</span></Link>
          <span className="text-3xl font-semibold text-black flex items-center ml-8">
            <span className="rotating-coin text-[60px]">🪙</span> <span className="ml-0 text-2xl lg:w-32 text-center lg:rounded-xl lg:bg-green-600"> 100 Coins </span>
          </span>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#1D3465] transform transition-transform duration-500 ease-in-out lg:hidden ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {/* Mobile Menu Links */}
          <div className="flex flex-col items-center space-y-8">
            <Link
              to="/home"
              className="text-white font-semibold text-4xl relative hover:scale-110 transition-all"
              onClick={toggleNav}
            >
              Home
              <span className="absolute inset-0 blur-md rounded-lg opacity-30"></span>
            </Link>
            <Link
              to="/tripplanning"
              className="text-white font-semibold text-3xl relative hover:scale-110 transition-all"
              onClick={toggleNav}
            >
              Trip Planning
              <span className="absolute inset-0 bg-green-500 blur-md rounded-lg opacity-30"></span>
            </Link>
            <Link
              to="/emergency"
              className="text-white font-semibold text-3xl relative hover:scale-110 transition-all"
              onClick={toggleNav}
            >
              Emergency
              <span className="absolute inset-0 blur-md rounded-lg opacity-30"></span>
            </Link>
            <Link
              to="/contact"
              className="text-white font-semibold text-3xl relative hover:scale-110 transition-all"
              onClick={toggleNav}
            >
              Contact Us
              <span className="absolute inset-0 blur-md rounded-lg opacity-30"></span>
            </Link>
          </div>

          {/* Mobile Profile Section */}
          <div className="absolute bottom-10 flex flex-col items-center">
            <img
              src="../public/man_4140048.png"
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-[#8F84A8] mb-3"
            />
            <Link to={'/profile'}> <span className="text-black font-semibold text-2xl ml-3">John Doe</span></Link>
            <span className="text-xl text-white font-semibold flex items-center mt-3">
              <span className="rotating-coin text-2xl">🪙</span> <span className="ml-2">100 Coins</span>
            </span>
          </div>
        </div>
      </div>

      {/* Popup Notification */}
      {showPopup && (
        <div className="top-20 absolute right-10 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          <span className="text-2xl text-white font-semibold flex items-center">
            <span className="rotating-coin">🪙</span> <span className="ml-2">+1 Coin</span>
          </span>
        </div>
      )}

      {/* Button for Testing Sign In/Sign Up */}
      {/* <div className="fixed bottom-5 left-5">
        <button
          onClick={handleSignInOrSignUp}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Simulate Sign In/Sign Up
        </button>   
      </div> */}
    </div>
  );
}

export default Navbar_HomePage;
