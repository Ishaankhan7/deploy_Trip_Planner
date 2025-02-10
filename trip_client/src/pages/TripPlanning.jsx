import React from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar_TripPlanningPage from '../components/Navbar_TripPlanningPage';
import Footer from '../components/Footer';

function TripPlanning() {
  const [currentSection, setCurrentSection] = useState(1);
  const cards = [
    { id: 1, title: 'MATHURA', image: '../public/mathura.jpg' },
    { id: 2, title: 'AGRA', image: '../public/agra.jpg' },
    { id: 3, title: 'AYODHYA', image: '../public/ayodhya.jpg' },
    { id: 4, title: 'BANARAS', image: '../public/banaras.jpg' },
    { id: 5, title: 'DELHI', image: '../public/delhi.jpg' },
    { id: 6, title: 'LUCKNOW', image: '../public/lucknow.jpg' },
    { id: 7, title: 'PRAYAGRAJ', image: '../public/prayagraj.jpg' },
    { id: 8, title: 'UJJAIN', image: '../public/ujjain.jpg' },
    { id: 9, title: 'JAIPUR', image: '../public/jaipur.jpg' },
    { id: 10, title: 'MANALI', image: '' },
    { id: 11, title: 'MANALI', image: '' },
    { id: 12, title: 'MANALI', image: '' },
    { id: 13, title: 'MANALI', image: '' },
    { id: 14, title: 'MANALI', image: '' },
    { id: 15, title: 'MANALI', image: '' },
    { id: 16, title: 'MANALI', image: '' },
    { id: 17, title: 'MANALI', image: '' },
    { id: 18, title: 'MANALI', image: '' },
    { id: 19, title: 'MANALI', image: '' },
    { id: 20, title: 'MANALI', image: '' },
    { id: 21, title: 'MANALI', image: '' },
    { id: 22, title: 'MANALI', image: '' },
    { id: 23, title: 'MANALI', image: '' },
    { id: 24, title: 'MANALI', image: '' },
    { id: 25, title: 'MANALI', image: '' },
    { id: 26, title: 'MANALI', image: '' },
    { id: 27, title: 'MANALI', image: '' },
    { id: 28, title: 'MANALI', image: '' },
  ];

  // Divide cards into sections of 9 cards each
  const sections = [
    { id: 1, cards: cards.slice(0, 9) },
    { id: 2, cards: cards.slice(9, 18) },
    { id: 3, cards: cards.slice(19, 28) },
  ];

  const handleSectionChange = (sectionId) => {
    if (sectionId >= 1 && sectionId <= sections.length) {
      setCurrentSection(sectionId);
    }
  };

  const [message, setMessage] = useState('');
      
  const SubmitHandler = (e) => {
    e.preventDefault();
    const data = message;
    setMessage('');
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: `linear-gradient(to bottom, #1D3465 0%, #1D3465 60%, #CDCED1 100%)` }}>
      {/* Background Image */}
      <div className="w-full">
        <img
          className="w-full h-[700px] z-0"
          src="../public/download (6).jpeg"
          alt="Background"
        />
      </div>

      {/* Navbar */}
      <Navbar_TripPlanningPage/>

      <div className="w-[1000px] h-96 flex rounded-[40px] bg-white absolute top-[calc(100px+1rem)] left-1/2 transform -translate-x-1/2 z-10 mt-28">
        <div className="w-[170%] h-full flex flex-col">
          <div className='h-20 w-20 flex absolute'>
            <img src='https://s3-alpha-sig.figma.com/img/0a64/bb76/7eb883ad8ca934042421f63f79ca55af?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cM0C0ttcfzteSjzLAJfhKbZ5NyT0GNJYIdqXJCPmFQQJ4u1mL4nFP-qfR0BmHCHy~xuo2cqobeoD3wAOhzV6Kf6-6rVVue9sBTzNfsw1xVcxl-WN4RABEZl~fWXV~jRIvNm-pG9y3Gx5SoxeqPg6DNh252ctOLXDB0UeKn~IpOl3I3iEvrshtf1CccGZ0Rni7IHZII89Q-37eA6rB5lbbJ6faAr8qifQhJBMWeR2aq-1lzjf7X-9wsGMMR2~zTSl1272AunUZTOSbbBM3E2PxHGKjP7jw7ouz1eVY2wlggBgB6Tl0s-0xYzZdd2HDqoHF-awZGrXdQFlTWbJLdiilA__' alt="Decorative" />
          </div>
          <div className="w-full h-10 bg-[#345EA1] rounded-tl-[40px]"></div>
        </div>

        <div className="w-1 h-full border-l-8 border-dashed border-black"></div>

        <div className="w-[80%] h-full flex flex-col">
          <div className="w-full h-10 bg-[#345EA1] rounded-br-[40px] mt-auto"></div>
        </div>
        <img src='../public/safarsathi_logo.jpg' className='w-[200px] absolute ml-[740px] mt-20' alt="Logo" />
        <div className='flex align-center justify-normal w-[620px] h-72 ml-8 mt-16 absolute'>
          <div className='flex flex-row justify-between z-40 mt-8 w-full h-32'>
            <p className='text-lg'>Current Location</p>
            <p className='text-lg'>Destination Location</p>
            <div className='w-full h-20 mt-10 flex justify-between absolute'>
              <FaMapMarkerAlt className="absolute text-center ml-[270px] text-[70px] transform -translate-y-1/2 text-red-500" />
              <p className='text-3xl font-bold'>MATHURA</p>
              <p className='text-3xl font-bold'>MANALI</p>
            </div>
          </div>
          <div className='flex flex-row w-[440px] h-40 mt-32 absolute'>
            <div className='w-[170px] border-2 border-black bg-[#345EA1] h-20 flex flex-col'>
              <p className='text-md ml-4'>Departure Date</p>
              <p className='text-xl text-white'>11 Jan, 2025  <span className="text-red-500 text-2xl ml-2" style={{color:'red'}}>&#x1F4C5;</span></p>
            </div>
            <div className='w-[170px] bg-[#345EA1] border-2 border-black h-20 ml-28 flex flex-col'>
              <p className='text-lg ml-4'>Return Date</p>
              <p className='text-xl text-white'>17 Jan, 2025  <span className="text-red-500 text-2xl ml-2" style={{color:'red'}}>&#x1F4C5;</span></p>
            </div>
            <div className='h-20 w-full flex flex-row absolute mt-24'>
              <div className='flex flex-col w-1/2'>
                <p>Budget</p>
                <p className='font-bold text-2xl'>INR 10,000</p>
              </div>
              <div className='flex flex-col ml-28 w-1/2'>
                <p>No. of members</p>
                <p className='font-bold text-2xl'>4</p>
              </div>
            </div>
          </div>
          <div className='h-40 w-[200px] mt-36 absolute ml-[440px] flex justify-center'>
            <img className='w-32 h-32' src='' alt="Loading" />
          </div>
        </div>
      </div>

      <div className='h-40 mt-10 w-full'></div>

  <div className="flex-grow mt-8">
        <div className="flex justify-center mt-10 items-center min-h-screen">
          <div className="max-w-6xl w-full px-16">
            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {sections[currentSection - 1].cards.map((card) => (
                <div 
                  key={card.id} 
                  className="bg-white shadow-md border-2 border-black rounded-[50px] p-4 flex flex-col items-center text-center" 
                  style={{ boxShadow: '12px 12px 8px rgba(0, 0, 0, 0.8)' }}
                >
                  <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
                  <img 
                    src={card.image || '/placeholder-image.jpg'} 
                    alt={card.title} 
                    className="w-60 border-2 border-black h-60 object-cover rounded-3xl mb-4" 
                  />
                  <Link to={`/explore/${card.id}`} className="bg-[#766992] text-white px-6 py-2 rounded">
                    <span className='text-[#E3CC70] text-xl font-bold'>EXPLORE</span>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className='w-full h-40 mt-20 mb-20 flex text-center flex-col sm:flex-row items-center justify-between'>
  <button 
    className='flex font-bold text-2xl rounded-3xl items-center justify-center w-44 h-20 bg-[#E3CC70] disabled:opacity-50 mb-4 sm:mb-0'
    style={{ boxShadow: 'inset -3px 0px 35px rgba(0,0,0,0.7)' }} 
    onClick={() => handleSectionChange(currentSection - 1)} 
    disabled={currentSection === 1}
  >
    PREVIOUS
  </button>

  <div className='flex justify-center sm:justify-between items-center mb-4 sm:mb-0'>
    {sections.map((section) => (
      <button
        key={section.id}
        className={`bg-[#D9D9D9] font-bold mr-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
          currentSection === section.id ? 'bg-[#766992] text-white' : ''
        }`}
        onClick={() => handleSectionChange(section.id)}
      >
        {section.id}
      </button>
    ))}
  </div>
  
  <button 
    className='flex font-bold text-2xl rounded-3xl items-center justify-center w-44 h-20 bg-[#E3CC70] disabled:opacity-50'
    style={{ boxShadow: 'inset -3px 0px 35px rgba(0,0,0,0.7)' }} 
    onClick={() => handleSectionChange(currentSection + 1)} 
    disabled={currentSection === sections.length}
  >
    NEXT
  </button>
</div>

          </div>
        </div>
      </div>
      <section className="invite-planner-section text-white p-16 rounded-3xl flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full rounded-3xl"></div>
            <div className="text-left max-w-2xl relative z-10">
                <h2 className="text-[55px] font-extrabold mb-20 text-black leading-tight tracking-wide drop-shadow-lg">Become a Trip Planner</h2>
                <p className="text-xl mb-8 leading-relaxed opacity-90 font-semibold tracking-wide">
                    Join our community of travel enthusiasts and start planning with 
                    <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-transparent text-2xl bg-clip-text font-extrabold"> SafarSathi</span>. 
                    Share experiences, create itineraries, and explore the world together!
                </p>
                <p className="text-lg mb-8 leading-relaxed opacity-90">
                    Discover hidden gems, curate unique travel experiences, and help others make memories that last a lifetime. 
                    Whether you're an experienced traveler or just getting started, our platform gives you the tools to design seamless trips effortlessly.
                    With <span className="text-yellow-300 font-bold">SafarSathi</span>, you can turn your passion for travel into a rewarding experience. 
                    Start your journey today and make every trip extraordinary!
                </p>
                <Link to={'/contact'} className="bg-white text-indigo-600 font-semibold px-10 py-5 rounded-full shadow-2xl transform transition duration-300 relative overflow-hidden group text-xl flex items-center gap-2">
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
                    <span className="relative z-10 group-hover:text-white">✨ Be a Trip Planner</span>
                </Link>
            </div>
            <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0 relative z-10">
                <img src="/itit.jpg" alt="Trip Planning" className="w-3/4 rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105" />
            </div>
        </section>

      <Footer />

     {/* <div className='fixed bottom-0 w-full bg-white text-center z-0' style={{ boxShadow: '0px 0px 400px 200px rgba(255, 255, 255, 0.8)' }}></div> */}
   
</div>
  )
}

export default TripPlanning