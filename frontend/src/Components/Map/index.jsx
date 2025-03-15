import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCogs, FaRocket, FaGlobeAsia } from "react-icons/fa";
import droneLocation from "/public/drone_location.png";
import odishaMap from "/public/Odisha_MapNew.png";
import districtData from "../Data/districtData";

const OdishaMapWithContent = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [animatedStats, setAnimatedStats] = useState([0, 0, 0, 0]);

  const stats = [
    {
      icon: <FaMapMarkerAlt className="text-4xl text-blue-700" />,
      title: "Districts Covered",
      target: 24,
      description: "Our drones operate across all districts of Odisha.",
    },
    {
      icon: <FaCogs className="text-4xl text-indigo-700" />,
      title: "Projects Completed",
      target: 150,
      description:
        "Successful implementation of drone solutions for various industries.",
    },
    {
      icon: <FaRocket className="text-4xl text-purple-700" />,
      title: "Advanced Drones Deployed",
      target: 20,
      description:
        "State-of-the-art drones with advanced features for precision work.",
    },
    {
      icon: <FaGlobeAsia className="text-4xl text-green-700" />,
      title: "Global Clients",
      target: 50,
      description:
        "Trusted by clients from across the globe for drone services.",
    },
  ];

  // Counter animation effect
  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const increment = Math.ceil(stat.target / 100);
      return setInterval(() => {
        setAnimatedStats((prev) => {
          const newStats = [...prev];
          if (newStats[index] < stat.target) {
            newStats[index] = Math.min(
              newStats[index] + increment,
              stat.target
            );
          }
          return newStats;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval); // Cleanup intervals
  }, [stats]);

  return (
    <div className="flex flex-col items-center bg-white p-8">
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center tracking-wide">
        Odisha Drone Solutions
      </h1>

      <div className="flex flex-col md:flex-row w-full items-center">
        {/* Left: Map Section */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto mb-8 md:mb-0">
          <img
            src={odishaMap}
            alt="Odisha Map"
            className="w-full h-full object-contain rounded-lg shadow-lg"
          />
          {districtData.map((district, index) => (
            <div
              key={index}
              className="absolute"
              style={{
                top: `${district.top}%`,
                left: `${district.left}%`,
              }}
              onMouseEnter={() => setHoveredDistrict(district)}
              onMouseLeave={() => setHoveredDistrict(null)}
            >
              <img
                src={droneLocation}
                alt="Drone Location"
                className="w-6 h-6 cursor-pointer hidden sm:block"
              />
              {hoveredDistrict === district && (
                <div className="absolute top-0 left-8 bg-white border rounded shadow-lg p-2 text-sm w-40">
                  <h3 className="font-bold text-indigo-500">{district.name}</h3>
                  <p className="text-gray-600">{district.details}</p>
                  <p className="text-gray-600">
                    Drone data: {district.droneData}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Statistics Section */}
        <div className="w-full md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 ml-[2rem] mb-[4rem]">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 mt-[2rem] bg-gradient-to-br from-blue-100/40 via-purple-50/30 to-indigo-100/50 backdrop-blur-lg border border-white/30 hover:bg-white/40"
            >
              {stat.icon}
              <h2 className="text-3xl font-bold text-gray-800 mt-3">
                {animatedStats[index]}
              </h2>
              <p className="text-lg font-semibold text-gray-600 text-center">
                {stat.title}
              </p>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OdishaMapWithContent;
