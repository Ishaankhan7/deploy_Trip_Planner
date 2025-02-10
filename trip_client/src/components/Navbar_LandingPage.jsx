import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar_LandingPage = () => {


    const handleClick = (event) => {
        event.preventDefault(); // Prevents immediate navigation
        alert("You haven't signed in!");
        
        // After the alert, navigate programmatically
        setTimeout(() => {
          window.location.href = "/main"; // Change this to the correct route
        }, 500);
      };
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    document.body.style.overflow = isNavOpen ? "unset" : "hidden";
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes rotateCoin {
        0% { transform: rotateY(0deg); }
        100% { transform: rotateY(360deg); }
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
      <nav className="bg-white shadow-lg rounded-[100px] mx-4 my-4 flex items-center justify-between px-6 py-2 relative">
        {/* Logo on the Left */}
        <div className="flex items-center">
          <img
            src="../public/safarsathi_logo.jpg"
            alt="Company Logo"
            className="w-16 h-16 rounded-full border-2 border-[#8F84A8]"
          />
          <h1 className="text-4xl font-bold text-black ml-3" style={{ textShadow: '5px 5px 5px #766992' }}>
            Safarsathi
          </h1>
        </div>

        {/* Centered Navigation Links */}
        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-6">
          <Link to="/main" className="text-black font-semibold text-2xl relative hover:scale-105 transition-all">
            Home
          </Link>
          <Link  onClick={handleClick}  className="text-black font-semibold text-2xl relative hover:scale-105 transition-all">
            Trip Planning
          </Link>
          <Link  onClick={handleClick}  className="text-black font-semibold text-2xl relative hover:scale-105 transition-all">
            Emergency
          </Link>
          <Link  onClick={handleClick}  className="text-black font-semibold text-2xl relative hover:scale-105 transition-all">
            Trip Organizer
          </Link>
        </div>

        {/* Sign In & Sign Up Buttons on the Right */}
        <div className="hidden lg:flex space-x-4">
          <Link to="/signin" className="px-6 py-2 text-lg font-semibold text-black border border-[#8F84A8] rounded-lg hover:bg-[#8F84A8] hover:text-white transition">
            Sign In
          </Link>
          <Link to="/signup" className="px-6 py-2 text-lg font-semibold text-white bg-[#1D3465] rounded-lg hover:bg-[#15274E] transition">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button (Right Side) */}
        <div className="lg:hidden z-50">
          <button
            onClick={toggleNav}
            className="text-black p-2 focus:outline-none transition-colors relative"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} size="2x" />
          </button>
        </div>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#1D3465] transform transition-transform duration-500 ease-in-out lg:hidden ${
          isNavOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <Link to="/main" className="text-white text-3xl hover:scale-110 transition-all" onClick={toggleNav}>
            Home
          </Link>
          <Link  onClick={handleClick}  className="text-white text-3xl hover:scale-110 transition-all">
            Trip Planning
          </Link>
          <Link   onClick={handleClick}  className="text-white text-3xl hover:scale-110 transition-all">
            Emergency
          </Link>
          <Link  onClick={handleClick} className="text-white text-3xl hover:scale-110 transition-all">
            Contact Us
          </Link>

          {/* Sign In & Sign Up Buttons in Mobile Menu */}
          <Link to="/" className="px-6 py-3 text-xl font-semibold text-white border border-white rounded-lg hover:bg-white hover:text-[#1D3465] transition" onClick={toggleNav}>
            Sign In
          </Link>
          <Link to="/signup" className="px-6 py-3 text-xl font-semibold text-white bg-[#15274E] rounded-lg hover:bg-[#0E1A34] transition" onClick={toggleNav}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar_LandingPage;
