import React from "react";

const Meetourteam = () => {
  return (
    <div>
      <h1
        className="text-4xl font-bold text-[50px] sm:mb-4 text-center mt-10"
        style={{
          textShadow:
            "0px 7px 50px #90EE90, 0px 16px 80px #90EE90, 0px 22px 60px #90EE90",
        }}
      >
        MEET OUR TEAM
      </h1>
      <div className="flex flex-col items-center py-10">
        <div className="container mx-auto border-2 h-[896px] w-[1250px] border-black p-6 rounded-lg bg-gradient-to-b from-[#273D6C] to-white">
          {/* Responsive Grid for Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {/* First Card */}
            <div className="flex flex-col border-2 border-black items-center bg-white shadow-lg rounded-lg p-6 h-full">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
              <p className="text-center text-lg font-medium">Ishaan Khan</p>
              <p className="mt-4 text-center text-sm text-black">
              Ishan powers the engine of Safarsathi, building robust and efficient server-side solutions to keep everything running flawlessly.
              </p>
            </div>

            {/* Second Card (Elevated) */}
            <div className="flex flex-col border-2 border-black items-center bg-white shadow-lg rounded-lg p-6 h-full mt-10 relative z-10">
              <img src="/rishabh.jpg" className="w-28 h-28 bg-gray-300 rounded-full mb-4"></img>
              <p className="text-center text-lg font-medium">Rishabh Tripathi</p>
              <p className="mt-4 text-center text-sm text-black">
              Rishabh brings intelligence to our platform with cutting-edge ML algorithms, enhancing recommendations and personalizing user experiences.
              </p>
            </div>

            {/* Third Card */}
            <div className="flex flex-col border-2 border-black items-center bg-white shadow-lg rounded-lg p-6 h-full">
              <img src="/jatin.jpg" className="w-28 h-28 bg-gray-300 rounded-full mb-4"></img>
              <p className="text-center text-lg font-medium">Jatin Rajani</p>
              <p className="mt-4 text-center text-sm text-black">
              Jatin ensures that our website is visually stunning and highly interactive, delivering a smooth and engaging user experience.
              </p>
            </div>

            {/* Fourth Card */}
            <div className="flex flex-col mt-10 border-2 border-black items-center bg-white shadow-lg rounded-lg p-6 h-full">
              <img src="/sanskrati.jpg" className="w-28 h-28 bg-gray-300 rounded-full mb-4"></img>
              <p className="text-center text-lg font-medium">Sanskrati Agrawal</p>
              <p className="mt-4 text-center text-sm text-black">
              Sanskrati blends creativity with functionality, designing intuitive and visually appealing interfaces that elevate user interaction.
              </p>
            </div>

            {/* Fifth Card */}
            <div className="flex flex-col border-2 mt-20 border-black items-center bg-white shadow-lg rounded-lg p-6 h-full">
              <img src="/om.jpg" className="w-28 h-28 bg-gray-300 rounded-full mb-4"></img>
              <p className="text-center text-lg font-medium">Om Lakshkar</p>
              <p className="mt-4 text-center text-sm text-black">
              Om crafts compelling content and integrates AI-driven insights to enhance user engagement and automation.
              </p>
            </div>

            {/* Sixth Card */}
            <div className="flex flex-col border-2 mt-10 border-black items-center bg-white shadow-lg rounded-lg p-6 h-full">
              <img src="/vikky.jpg" className="w-28 h-28 bg-gray-300 rounded-full mb-4"></img>
              <p className="text-center text-lg font-medium">Vikky Khushwah</p>
              <p className="mt-4 text-center text-sm text-black">
              Vikky develops intelligent chatbots and automation systems, ensuring smooth user interactions and instant assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meetourteam;
