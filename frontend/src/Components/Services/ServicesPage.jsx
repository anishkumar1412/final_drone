import React from "react";
import { FaVideo, FaHouseUser, FaBasketballBall, FaCamera, FaMicrophone, FaBoxOpen, FaFilm, FaPlane } from "react-icons/fa"; // Importing relevant icons

const ServicesPage = () => {
  const services = [
    {
      title: "Film & TV",
      description:
        "If you work in film or TV and are looking for aerial professionals who are highly experienced, then we can help you in making films.",
      icon: <FaFilm size={50} />, // React Icon for Film & TV
    },
    {
      title: "Aerial Surveys",
      description:
        "The ability to view the earth from the air is a prerequisite for many types of surveying applications. We offer two distinct platforms.",
      icon: <FaHouseUser size={50} />, // React Icon for Aerial Surveys
    },
    {
      title: "Sports",
      description:
        "Aerial filming with unmanned aerial vehicles (UAVs) or drones as they are most often known, is the future of aerial sports.",
      icon: <FaBasketballBall size={50} />, // React Icon for Sports
    },
    {
      title: "Photography",
      description:
        "Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward.",
      icon: <FaCamera size={50} />, // React Icon for Photography
    },
    {
      title: "Events",
      description:
        "These devices can hover and maneuver above your event capturing images and video of not just individuals.",
      icon: <FaMicrophone size={50} />, // React Icon for Events
    },
    {
      title: "Industry",
      description:
        "Our drone industry services provide you with a skilled UAV pilot that will provide drone surveys photography and short videos.",
      icon: <FaBoxOpen size={50} />, // React Icon for Industry
    },
    {
      title: "Commercials",
      description:
        "Maybe your event includes water activities that you want recorded, rather than unsteady photos or video being taken from a boat.",
      icon: <FaFilm size={50} />, // React Icon for Commercials
    },
    {
      title: "Travel & Tourism",
      description:
        "Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional.",
      icon: <FaPlane size={50} />, // React Icon for Travel & Tourism
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-5 mt-[3rem]">
      <div className="max-w-7xl mx-auto">
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-5"
            >
              {/* Icon with hover effect */}
              <div className="text-4xl mb-4 hover:text-blue-400">{service.icon}</div>

              {/* Title */}
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                {service.title}
              </h2>

              {/* Description in cursive */}
              <p className="text-sm text-gray-600 italic">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
