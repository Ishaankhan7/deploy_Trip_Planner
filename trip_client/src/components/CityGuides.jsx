import React, { useRef, useEffect } from "react";
import { FaStar, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const CityGuide = () => {
  const hotelSliderRef = useRef(null);
  const activitiesSliderRef = useRef(null);
  const foodSliderRef = useRef(null);

  const scrollRight = (sliderRef) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = sliderRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 50) {
        sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const hotelInterval = setInterval(() => scrollRight(hotelSliderRef), 3000);
    const activitiesInterval = setInterval(() => scrollRight(activitiesSliderRef), 3500);
    const foodInterval = setInterval(() => scrollRight(foodSliderRef), 4000);

    return () => {
      clearInterval(hotelInterval);
      clearInterval(activitiesInterval);
      clearInterval(foodInterval);
    };
  }, []);

  const hotels = [
    { img: "https://cf.bstatic.com/xdata/images/hotel/square240/629018723.jpg?k=3374d4d033c5d162c00d9a052d1799da41f3a1dbb7efd098bb65b7c0b09cdd7a&o=", name: "Grand Palace Hotel", price: "$120/night", rating: 4.5 },
    { img: "https://cf.bstatic.com/xdata/images/hotel/square240/635744275.jpg?k=c1ddeb0a35f80b56a27c8d4275af726730e649630777b601d349e7c26b224187&o=", name: "Grand Palace Hotel", price: "$120/night", rating: 4.5 },
    { img: "https://cf.bstatic.com/xdata/images/hotel/square240/476194924.jpg?k=9e92f15a45ecb951052d1ea85d40aaf2a7aac2ecfc6f9e969491916877fc5b07&o=", name: "Grand Palace Hotel", price: "$120/night", rating: 4.5 },
    { img: "https://cf.bstatic.com/xdata/images/hotel/square240/633458814.jpg?k=1305dd5949005555beda4bf845a5d7e0373d84725f97414abf2b83ced9a53f94&o=", name: "Grand Palace Hotel", price: "$120/night", rating: 4.5 },
    { img: "https://cf.bstatic.com/xdata/images/hotel/square600/605369387.webp?k=e142c9d95018d521a08137e1fa20c61a26bb5d1fa1b156646ea2da34c80b09c9&o=", name: "Sunrise Resort", price: "$100/night", rating: 4.2 },
    { img: "https://images.oyoroomscdn.com/uploads/hotel_image/215850/medium/xxgticccrbej.jpg", name: "Blue Lagoon Stay", price: "$150/night", rating: 4.7 },
  ];

  const activities = [
    { img: "https://www.holidify.com/images/cmsuploads/compressed/img_2249.1744x0-is-1024x416_20190712182711.jpg", name: "ISCKON Temple", desc: "Explore historical landmarks and modern wonders." },
    { img: "https://www.holidify.com/images/cmsuploads/compressed/Radha_Raman_Temple_Vrindavan_20190911180727.jpg", name: "Radha Raman Temple", desc: "Relax on sandy beaches and enjoy water sports." },
    { img: "https://www.holidify.com/images/cmsuploads/compressed/attr_1576_20201210132544.jpg", name: "Prem Mandir", desc: "Relax on sandy beaches and enjoy water sports." },
    { img: "https://www.holidify.com/images/cmsuploads/compressed/30490951168_915ed666cb_b_20190822163429.jpg", name: "Banke Bihari Temple", desc: "Relax on sandy beaches and enjoy water sports." },
    { img: "https://www.holidify.com/images/cmsuploads/compressed/Govind-Dev-Ji-Mandir_20190708191243.jpg", name: "Govind Devji Temple", desc: "Relax on sandy beaches and enjoy water sports." },
    { img: "//external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-VNuCIatXL2c%2FUdbga1b8IbI%2FAAAAAAAAKtM%2FmxOPg8W6AFA%2Fs1600%2Fmathura-lord-krishna-janmabhoomi.jpg&f=1&nofb=1&ipt=3d921e1a81984ebc258c911e0282f905d6c77fd00167be0f3f52cf88e084e15f&ipo=images", name: "Krishna JanamBhoomi", desc: "Trek through breathtaking mountain trails." },
  ];

  const foodPlaces = [
    { img: "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.restaurantguru.com%2Fr30a-interior-The-Trunk-Rooftop-fine-dine-Restaurant-Mathura-Best-Cafe-in-Mathura-Best-bar-in-Mathura.jpg&f=1&nofb=1&ipt=2c2b871ea1f5591b3a7a6f87afad39d7d03dc26ccf0b47d598836b20ed73c529&ipo=images", name: "Trunk Cafe", desc: "Taste the finest gourmet dishes in town." },
    { img: "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.crazymasalafood.com%2Fwp-content%2Fimages%2F2021%2F12%2FLoft-Cafe.jpg&f=1&nofb=1&ipt=e716c7550abdbc2de47238662fdb5339efc4f3f9f2bedd84d466e85a08620e43&ipo=images", name: "Cha Maska", desc: "Taste the finest gourmet dishes in town." },
    { img: "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcrazymasalafood.com%2Fwp-content%2Fimages%2F2021%2F12%2FUrban-Sky-960x503.jpg&f=1&nofb=1&ipt=3815410a585f966d31a141cbf2c21fb1cb54c91cc3ab7fa71bddeeabe12d6b6e&ipo=images", name: "Gourmet Bistro", desc: "Taste the finest gourmet dishes in town." },
    { img: "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.68j-y8yKZJ-H_4C-G2xY2AHaE9%26pid%3DApi&f=1&ipt=a2e17556a11c0374f5724c3c9da8b7ca4a9ed3bdda34d4ed533c85b174e74883&ipo=images", name: "Barista", desc: "Taste the finest gourmet dishes in town." },
    { img: "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.cBqrhVgMkMA04BqBgsfW2gHaD4%26pid%3DApi&f=1&ipt=8c582c3e405bb35f6a2cdd0476bb9228335bd7da8d853e51092d6938dc65e7c9&ipo=images", name: "Street Delights", desc: "Enjoy the best local street food flavors." },
    { img: "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.CaqVNaBQZ25QTPPLhpe1oAHaEK%26pid%3DApi&f=1&ipt=0a152deb1db7aebcd6a765a005b4bc1f02ae47bb5559804b150ed54bc7a48b10&ipo=images", name: "Cozy Café", desc: "Sip a hot cup of coffee in a cozy setting." },
  ];

  return (
    <div>
    <div className="relative bg-white/30 backdrop-blur-lg p-8 shadow-2xl rounded-3xl mt-12">
      {/* Hotels Section */}
      <h2 className="text-4xl font-extrabold text-black mb-6 text-left tracking-wide">
        🌟 Luxury Hotels
      </h2>
      <div className="relative">
        <div ref={hotelSliderRef} className="flex space-x-8 pb-6 snap-x scroll-smooth overflow-x-hidden" id="placestostay">
          {hotels.map((hotel, index) => (
            <div key={index} className="min-w-[320px] h-[420px] bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg snap-start transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <img src={hotel.img} alt={hotel.name} className="w-full h-56 object-cover rounded-lg shadow-md" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                <p className="text-gray-700 text-lg font-medium">{hotel.price}</p>
                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-500 text-xl" />
                  <span className="ml-1 text-lg font-semibold text-gray-800">{hotel.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(hotelSliderRef)} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-full shadow-xl hover:scale-125 transition-all duration-300 border-2 border-white animate-pulse">
          <FaChevronRight className="text-2xl" />
        </button>
      </div>

      {/* Things to Do Section */}
      <h2 className="text-4xl font-extrabold text-black mt-12 mb-6 text-left tracking-wide">
        🎭 Things to Do
      </h2>
      <div className="relative">
        <div ref={activitiesSliderRef} className="flex space-x-8 pb-6 snap-x scroll-smooth overflow-x-hidden" id="thingstodo">
          {activities.map((activity, index) => (
            <div key={index} className="relative min-w-[320px] h-[420px] rounded-xl shadow-lg snap-start overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <img src={activity.img} alt={activity.name} className="w-full h-full object-cover rounded-xl" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4 text-white">
                <h3 className="text-3xl font-bold">{activity.name}</h3>
                <p className="text-lg mt-2 text-center">{activity.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(activitiesSliderRef)} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-red-600 text-white p-6 rounded-full shadow-xl hover:scale-125 transition-all duration-300 border-2 border-white animate-pulse">
          <FaChevronRight className="text-2xl" />
        </button>
      </div>

      {/* Places to Eat Section */}
      <h2 className="text-4xl font-extrabold text-black mt-12 mb-6 text-left tracking-wide">
        🍽️ Places to Eat
      </h2>
      <div className="relative">
        <div ref={foodSliderRef} className="flex space-x-8 pb-6 snap-x scroll-smooth overflow-x-hidden">
          {foodPlaces.map((place, index) => (
            <div key={index} className="relative min-w-[320px] h-[420px] rounded-xl shadow-lg snap-start overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl" id="placestoeat">
              <img src={place.img} alt={place.name} className="w-full h-full object-cover rounded-xl" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center p-4 text-white">
                <h3 className="text-3xl font-bold">{place.name}</h3>
                <p className="text-lg mt-2 text-center">{place.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => scrollRight(foodSliderRef)} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-6 rounded-full shadow-xl hover:scale-125 transition-all duration-300 border-2 border-white animate-pulse">
          <FaChevronRight className="text-2xl" />
        </button>
      </div>
    </div>
    <section className="flex items-center justify-center mt-20 py-20">
      <div className="flex flex-row items-center w-full max-w-6xl px-4">
        <img 
          src="/itit.jpg" 
          alt="destination" 
          className="w-1/2 rounded-lg shadow-lg"
        />
        <div className="w-1/2 ml-8">
          <h2 className="text-4xl font-bold text-black mb-6">Explore Beautiful Destinations</h2>
          <p className="text-lg text-white mb-6">
            At <span className="bg-gradient-to-r from-yellow-400 to-red-500 text-transparent text-4xl bg-clip-text font-extrabold"> SafarSathi</span>, we offer unforgettable travel experiences. Whether you're seeking a tranquil escape or an adventure full of culture and excitement, we've got you covered. From stunning beaches to breathtaking mountains, our curated trips are designed to cater to your travel dreams. Our expert guides will take you through hidden gems and iconic landmarks, ensuring you get the most out of your journey. 
            <br />
            Join us to explore the world with Safarsathi – where every trip becomes a story worth telling!
          </p>
          <Link 
            to={'/bookyourtrip'}
            className="px-8 py-3 bg-blue-600 text-white text-xl font-semibold rounded-full transition duration-300 ease-in-out transform hover:bg-blue-700 hover:scale-110 hover:shadow-2xl hover:rotate-3 focus:outline-none"
          >
            Book Your Trip
          </Link>
        </div>
      </div>
    </section>
    <div className="flex items-center justify-center ">
      <div className="flex flex-col md:flex-row items-center justify-between p-10  text-white rounded-2xl max-w-7xl w-full">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-4xl font-bold mb-12">
            Explore the World with <span className="text-yellow-300 text-4xl">Safarsathi</span>
          </h2>
          <p className="text-lg mb-6">
            Discover hidden gems, experience rich cultures, and embark on unforgettable adventures.
            Let <span className="font-semibold">Safarsathi</span> be your trusted travel companion! Whether you're looking for historical marvels, scenic landscapes, or thrilling experiences, we ensure every journey is special and memorable.
          </p>
          <Link to={'/bookyourguide'}  className="bg-yellow-400 text-black px-6 py-3 text-lg font-semibold rounded-xl shadow-md hover:bg-yellow-500 transition">
            Book a Guide
          </Link>
        </motion.div>
        
        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <img 
            src="//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fseateroo.com%2Fwp-content%2Fuploads%2F2018%2F10%2FPlanning-travel-like-a-pro.jpeg&f=1&nofb=1&ipt=d0d0edec210255cdae5eb1c78062d66994cc12223b9778d5b2004965c6486c5f&ipo=images" 
            alt="Travel Adventure" 
            className="rounded-xl w-[400px] h-[400px] shadow-lg md:w-auto"
          />
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default CityGuide;
