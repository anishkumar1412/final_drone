import React from 'react';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  DesktopComputerIcon,
  GlobeAltIcon,
  ScaleIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

const features = [
  {
    icon: <DesktopComputerIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Cutting-Edge Drone Technology",
    description:
      "Explore the latest advancements in drone technology through hands-on experience and industry-driven research.",
  },
  {
    icon: <UserGroupIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Industry Experts Guidance",
    description:
      "Receive mentorship from industry experts to enhance your skills and navigate your entrepreneurial journey.",
  },
  {
    icon: <BriefcaseIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Career-Focused Education",
    description:
      "Prepare for a successful career in the drone industry with practical training and comprehensive coursework.",
  },
  {
    icon: <GlobeAltIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Global Research Collaboration",
    description:
      "Participate in global research initiatives and collaborations aimed at solving industry challenges with UAV technologies.",
  },
  {
    icon: <ScaleIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Focus on Innovation",
    description:
      "Nurture your innovative spirit and contribute to groundbreaking advancements in drone applications.",
  },
  {
    icon: <AcademicCapIcon className="w-12 h-12 mx-auto text-blue-600" />,
    title: "Academic Excellence",
    description:
      "Achieve academic excellence through rigorous curriculum and hands-on projects designed to enhance learning outcomes.",
  },
];

const Coe = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Title Section */}
        <h1 className="text-center text-5xl leading-tight font-extrabold tracking-tight text-gray-800 sm:text-6xl">
          Center of Excellence (COE)
        </h1>
        <p className="mt-6 max-w-3xl text-lg lg:text-xl text-gray-600 lg:mx-auto text-center">
          Our Center of Excellence (CoE) initiative aims to empower the youth by creating a vibrant drone ecosystem. At Higher Education Institutions (HEIs), we foster research and innovation in Unmanned Aerial Vehicles (UAVs), engaging students and faculty in solving industry challenges.
        </p>

        {/* Features Grid */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex justify-center mb-6">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-center text-gray-800">
                  {feature.title}
                </h3>
                <p className="mt-4 text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coe;