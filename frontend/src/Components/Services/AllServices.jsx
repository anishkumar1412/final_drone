import React from "react";

const App = () => {
  const sections = [
    {
      title: "Wind Drone",
      description: "Harness wind energy with precision using advanced drone technology.",
      buttonText: "LEARN MORE",
      image: "/wind.png", // Replace with the correct path for the image
    },
    {
      title: "Videography Drone",
      description: "Capture breathtaking aerial footage for all your creative projects.",
      buttonText: "GET STARTED",
      image: "/Videography-Drone-1.jpeg", // Replace with the correct path for the image
    },
    {
      title: "Structural Drone",
      description: "Inspect and monitor structural integrity efficiently and safely.",
      buttonText: "EXPLORE OPTIONS",
      image: "/structural-1-800x534.jpg", // Replace with the correct path for the image
    },
    {
      title: "Warehouse Management Drone",
      description: "Streamline your inventory with our state-of-the-art warehouse drones.",
      buttonText: "DISCOVER MORE",
      image: "/Warehouse-Management-Drone-400x300.jpeg", // Replace with the correct path for the image
    },
    {
      title: "Ippo Drone",
      description: "Revolutionize transportation with cutting-edge Ippo Drone technology.",
      buttonText: "LEARN MORE",
      image: "/Ippo-Drone-400x300.jpeg", // Replace with the correct path for the image
    },
    {
      title: "Armed Tactical Drone",
      description: "Ensure security and tactical advantage with our armed drone solutions.",
      buttonText: "KNOW MORE",
      image: "/Armed-Tactical-Drone-600x450.jpeg", // Replace with the correct path for the image
    },
    {
      title: "Firefighting Drone",
      description: "Combat fires efficiently with advanced aerial firefighting solutions.",
      buttonText: "GET STARTED",
      image: "/Fire-Fighting-Drone-768x576.jpeg", // Replace with the correct path for the image
    },
    {
      title: "Kisan Drone",
      description: "Empowering agriculture with precision and productivity.",
      buttonText: "EXPLORE OPTIONS",
      image: "/kisan-drone-new-4.jpg", // Replace with the correct path for the image
    },
  ];

  return (
    <div className="w-full mt-[5rem]">
      <div className="lg:px-20 px-4">
        <div className="bg-gray-100 rounded-lg p-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center max-w-7xl mx-auto py-6`}
            >
              {/* Text Content */}
              <div className="md:w-1/2 flex items-center justify-center px-4 sm:px-8">
                <div className="text-center md:text-left max-w-md">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    {section.title}
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg mt-4">
                    {section.description}
                  </p>
                  <button className="bg-white border-2 border-black px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold rounded-full hover:bg-gray-200 transition mt-6">
                    {section.buttonText}
                  </button>
                </div>
              </div>

              {/* Image Section */}
              <div className="md:w-1/2 px-4">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-auto object-cover shadow-md rounded-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
