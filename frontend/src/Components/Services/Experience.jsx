import React from "react";
import { FaUserAlt, FaCamera, FaFilm, FaAward } from "react-icons/fa"; // Font Awesome Icons

const ExperienceSection = () => {
  const stats = [
    {
      icon: <FaUserAlt size={50} />, // Font Awesome User Icon
      value: 80,
      title: "SATISFIED CLIENTS",
      description:
        "A drone is an unmanned aerial vehicle (UAV) that is fitted with various equipment and tools.",
    },
    {
      icon: <FaCamera size={50} />, // Font Awesome Camera Icon
      value: 65,
      title: "PROJECTS DONE",
      description:
        "These devices can hover and maneuver above your event capturing images and video.",
    },
    {
      icon: <FaFilm size={50} />, // Font Awesome Film Icon
      value: 180,
      title: "COMPLETE PACKAGE",
      description:
        "Maybe your event includes music that you want recorded, rather than unsteady photos or video.",
    },
    {
      icon: <FaAward size={50} />, // Font Awesome Award Icon
      value: 18,
      title: "GREAT AWARDS",
      description:
        "Our drone event services provide you with a skilled UAV pilot that will provide drone photography.",
    },
  ];

  return (
    <section
      className="text-white py-16 bg-cover bg-center"
      style={{
        backgroundImage: "url('/hero_inner_02.jpg')", // Ensure the image is in the public folder
        backgroundSize: "cover", // Ensures proper scaling
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-4">
          Our Experience & Measures
        </h2>
        <p className="text-sm md:text-lg lg:text-xl text-gray-300 italic leading-relaxed">
          If you want a drone for shooting 4K videos of your concerts,
          <br className="hidden md:block" /> events, or music videos, the next one is
          <br className="hidden md:block" /> perfectly built just for you.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center bg-opacity-30 bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:bg-opacity-50"
          >
            {/* Icon */}
            <div className="text-white mb-4 transition-transform transform hover:scale-110">
              {stat.icon}
            </div>
            {/* Stat Value */}
            <h3 className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</h3>
            {/* Stat Title */}
            <h4 className="text-base md:text-lg font-semibold uppercase mb-4 tracking-wider">
              {stat.title}
            </h4>
            {/* Description */}
            <p className="text-gray-400 text-xs md:text-sm">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
