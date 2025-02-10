import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar_ExplorePage from "../components/Navbar_ExplorePage";
import Footer from "../components/Footer";
import CityGuides from "../components/CityGuides";

const ExplorePageforPlaces = () => {
  const { id } = useParams();

  // Dummy data for demonstration
  const cardDetails = {
    1: {
      title: "MATHURA, Uttar Pradesh",
      description: "A beautiful spiritual destination.",
      images: [
        "https://www.theindia.co.in/blog/wp-content/uploads/2020/08/Kusum-Sarovar.jpg",
        "https://www.theindia.co.in/blog/wp-content/uploads/2020/08/Kusum-Sarovar.jpg",
        "https://www.theindia.co.in/blog/wp-content/uploads/2020/08/Kusum-Sarovar.jpg",
      ],
      temperature: "25°C",
      aqi: "Good (AQI: 42)",
      smalltext : "renowned temples",
      details:
        "Experience the rich culture, serene ghats, and vibrant festivals of MathuraExperience the rich culture, serene ghats, and vibrant festivals of MathuraExperience the rich culture, serene ghats, and vibrant festivals of Mathurav.",
    },
    2: {
      title: "AGRA",
      description: "Home to the iconic Taj Mahal.",
      images: [
        "https://images.unsplash.com/photo-1568572933382-74d440642117",
        "https://images.unsplash.com/photo-1562832130-9c3b8df29954",
        "https://images.unsplash.com/photo-1554118811-1e446a460efe",
      ],
      temperature: "28°C",
      aqi: "Moderate (AQI: 85)",
      details: "Visit the magnificent Taj Mahal and explore the Mughal architecture.",
    },
  };

  const card = cardDetails[id];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === card.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? card.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-blend-saturation min-h-screen scroll-smooth flex flex-col overflow-x-hidden bg-gradient-to-b from-[#233768] to-[#6E648E] text-white">
      <Navbar_ExplorePage />

      {/* Main Content */}
      <main className="flex-grow px-6 sm:px-12 md:px-16 lg:px-20 py-12">
        {card ? (
          <>
            {/* Heading Section */}
            <section className="text-center mb-12">
              <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 border-b-4 border-yellow-500 pb-2 max-w-4xl mx-auto">
                {card.title}
              </h1>
              <p className="text-xl sm:text-2xl text-white opacity-80 max-w-3xl mx-auto">
                {card.description}
              </p>
            </section>

            {/* Image Slider with Card Overlay */}
            <section className="relative text-center mb-10">
              {/* Slider */}
              <div className="relative w-full max-w-[1200px] h-[600px] mx-auto overflow-hidden rounded-[70px] shadow-xl">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {card.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-full flex-shrink-0"
                      style={{ width: "100%" }}
                    >
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-[600px] object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 text-black p-3 rounded-full shadow-md hover:bg-opacity-100"
                >
                  ❮
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 text-black p-3 rounded-full shadow-md hover:bg-opacity-100"
                >
                  ❯
                </button>
              </div>

              {/* Static Card Overlay */}
              <div className="absolute top-96  md:left-44 bg-[#393234] bg-opacity-90 text-white rounded-[40px] shadow-xl p-6 md:p-8 w-11/12 md:w-1/3 transform -translate-y-1/3">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-left text-white">
                  {card.title}
                </h2>
                <p className="text-lg sm:text-xl mb-2 text-left">
                  <span className="font-semibold">Temperature:</span> {card.temperature}
                </p>
                <p className="text-lg sm:text-xl mb-2 text-left ">
                  <span className="font-semibold">Air Quality Index:</span> {card.aqi}
                </p>
                <p className="text-sm sm:text-base text-left text-white leading-relaxed">
                  {card.details}
                </p>
              </div>
            </section>

            <div className="bg-white py-4 w-full rounded-[30px] scroll-smooth">
              <div className="flex flex-wrap justify-center lg:justify-start lg:mr-[450px] gap-4 px-4">
                <a href="#overview" className="flex items-center justify-center w-28 h-12 text-lg bg-blue-500 text-white rounded-3xl shadow-lg cursor-pointer">
                  <span className="font-semibold">Overview</span>
                </a>
                <a href="#placestostay" className="flex items-center justify-center w-36 h-12 text-lg bg-green-500 text-white rounded-3xl shadow-lg cursor-pointer">
                  <span className="font-semibold">Places to Stay</span>
                </a>
                <a href="#thingstodo" className="flex items-center justify-center w-36 h-12 text-lg bg-orange-500 text-white rounded-3xl shadow-lg cursor-pointer">
                  <span className="font-semibold">Things to Do</span>
                </a>
                <a href="#placestoeat" className="flex items-center justify-center w-36 h-12 text-lg bg-red-500 text-white rounded-3xl shadow-lg cursor-pointer">
                  <span className="font-semibold">Places to Eat</span>
                </a>
                <a href="#more" className="flex items-center justify-center w-20 h-12 text-lg bg-purple-500 text-white rounded-3xl shadow-lg cursor-pointer">
                  <span className="font-semibold">More</span>
                </a>
              </div>
            </div>


            {/* Vrindavan Section */}
            <section className="bg-transparent border border-black p-6 rounded-lg shadow-lg mt-12">
              {/* Dynamic Heading */}
              <h1 className="text-3xl font-bold text-left mb-6 text-white">
                Vrindavan is famous for
              </h1>

              {/* Images in a Row */}
              <div className="flex flex-wrap justify-start gap-20 mb-6">
                {[
                  "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.entertales.com%2Fwp-content%2Fuploads%2Ftemple.jpg&f=1&nofb=1&ipt=13f004c261f804587d7953423e4fcfd3444e3074f219cf88dd89d9fea88e8df4&ipo=images",
                  "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.entertales.com%2Fwp-content%2Fuploads%2Ftemple.jpg&f=1&nofb=1&ipt=13f004c261f804587d7953423e4fcfd3444e3074f219cf88dd89d9fea88e8df4&ipo=images",
                  "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.entertales.com%2Fwp-content%2Fuploads%2Ftemple.jpg&f=1&nofb=1&ipt=13f004c261f804587d7953423e4fcfd3444e3074f219cf88dd89d9fea88e8df4&ipo=images",
                  "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.entertales.com%2Fwp-content%2Fuploads%2Ftemple.jpg&f=1&nofb=1&ipt=13f004c261f804587d7953423e4fcfd3444e3074f219cf88dd89d9fea88e8df4&ipo=images",
                  "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.entertales.com%2Fwp-content%2Fuploads%2Ftemple.jpg&f=1&nofb=1&ipt=13f004c261f804587d7953423e4fcfd3444e3074f219cf88dd89d9fea88e8df4&ipo=images",
                  "//external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.entertales.com%2Fwp-content%2Fuploads%2Ftemple.jpg&f=1&nofb=1&ipt=13f004c261f804587d7953423e4fcfd3444e3074f219cf88dd89d9fea88e8df4&ipo=images",
                ].map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <h1 className="text-2xl font-bold text-white">Card not found</h1>
        )}
      </main>
      <CityGuides />

      <Footer />
    </div>
  );
};

export default ExplorePageforPlaces;