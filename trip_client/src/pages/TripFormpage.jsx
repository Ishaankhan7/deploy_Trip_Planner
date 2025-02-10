import React from 'react';
import Navbar_TripPlanningPage from '../components/Navbar_TripPlanningPage';
import Footer from '../components/Footer';
import TripPlanningForm from '../components/TripPlanningForm';

const TripFormpage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1D3465] to-[#CDCED1]">
      <Navbar_TripPlanningPage />
      {/* <img className='w-80 h-80 z-30 lg:top-[750px] absolute md:block ml-44 sm:block' src='/maps_17237931.png'></img> */}
      <div className="flex-grow flex justify-center items-center py-12">
        <div className="bg-white bg-opacity-90 p-8 mt-20 z-20 rounded-lg shadow-lg w-full max-w-2xl">
        {/* <img className='w-80 h-80 -z-0 lg:top-30 absolute md:block sm:block lg:ml-[605px]' src='/travel_6.png'></img>
        <img className='w-80 h-80 -z-0 lg:top-[1400px] absolute md:block sm:block lg:ml-[580px]' src='/travel_7.png'></img> */}
          {/* Trip Planning Form */}
          <TripPlanningForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TripFormpage;
