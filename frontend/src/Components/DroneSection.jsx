import React from 'react';

const DroneSection = () => {
  return (
    <section className="flex  flex-col lg:flex-row items-center lg:items-stretch px-10 lg:px-12 bg-white w-full h-screen">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-6 lg:mb-0 lg:ml-[-40px]">
        <img 
          src="https://squadrone.bold-themes.com/main-demo/wp-content/uploads/sites/2/2017/12/team_member_01.jpg" 
          alt="Drone pilot" 
          className="w-5/6  lg:w-[90%] object-cover h-full"
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 lg:pl-12 flex flex-col justify-center">
        <h2 className="text-blue-600 text-lg lg:text-xl font-bold uppercase mb-4">Aerial Photography</h2>
        <h1 className="text-gray-800 text-4xl lg:text-5xl font-bold mb-6">We Are Drone Pilots</h1>
        <p className="text-gray-600 text-base lg:text-lg mb-10">
          Leverage agile frameworks to provide a robust synopsis for high-level overviews. 
          Iterative approaches to corporate strategy foster collaborative thinking to further.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-base lg:text-lg">
          <div className="text-center sm:text-left">
            <span className="text-2xl">🏆</span>
            <h3 className="font-semibold text-gray-800">Awards</h3>
            <p className="text-gray-600 text-sm">
              A drone is an unmanned aerial vehicle (UAV) that is fitted with various equipment including photography.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <span className="text-2xl">🚁</span>
            <h3 className="font-semibold text-gray-800">Fast Crew</h3>
            <p className="text-gray-600 text-sm">
              Our drone services provide you with a skilled UAV pilot that will provide drone videography.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <span className="text-2xl">🎮</span>
            <h3 className="font-semibold text-gray-800">License</h3>
            <p className="text-gray-600 text-sm">
              Professionally cultivate one-to-one customer service with robust ideas dynamically innovate.
            </p>
          </div>
          <div className="text-center sm:text-left">
            <span className="text-2xl">📘</span>
            <h3 className="font-semibold text-gray-800">Experience</h3>
            <p className="text-gray-600 text-sm">
              Engage worldwide methodologies with web-enabled technology. Interactively coordinate proactive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DroneSection;