import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { FaSignInAlt, FaClipboardCheck, FaRegClock, FaUserTie, FaSignal } from 'react-icons/fa';

const steps = [
  { icon: <FaSignInAlt className="text-blue-500 w-6 h-6" />, text: "Log in to your account" },
  { icon: <FaRegClock className="text-purple-500 w-6 h-6" />, text: "Select the drone and service you need" },
  { icon: <FaClipboardCheck className="text-green-500 w-6 h-6" />, text: "Complete the booking process" },
  { icon: <FaRegClock className="text-yellow-500 w-6 h-6" />, text: "Track your order status" },
  { icon: <FaUserTie className="text-orange-500 w-6 h-6" />, text: "Contact our scientist advisor for assistance" },
];

const BookingVideo = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Video section */}
      <div className="mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-5 text-gray-800">How to Book Your Drone</h2>
        <div className="relative overflow-hidden rounded-lg shadow-lg" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/45XG7shHHpQ"
            title="Client Booking Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Steps section */}
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">Booking Steps</h3>
        <ul className="space-y-4">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start p-4 rounded-md bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex-shrink-0 mr-4">
                {step.icon}
              </div>
              <span className="text-gray-700">{step.text}</span>
            </li>
          ))}
        </ul>
        <div className="text-center mt-6">
          <button className=" text-white font-semibold py-3 px-6 rounded-lg shadow-lg  transition duration-300"  style={{ backgroundColor: '#4B5563' }}>
            Book Your Drone Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingVideo;
