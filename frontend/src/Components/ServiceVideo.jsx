import React from "react";
import { FaSignInAlt, FaClipboardCheck, FaRegClock, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const steps = [
  {
    icon: <FaSignInAlt className="w-10 h-10 text-blue-500" />,
    title: "Log In",
    description: "Log in to your account to access our drone booking services.",
  },
  {
    icon: <FaRegClock className="w-10 h-10 text-purple-500" />,
    title: "Select Your Service",
    description: "Choose the drone and service you need with flexible options.",
  },
  {
    icon: <FaClipboardCheck className="w-10 h-10 text-green-500" />,
    title: "Complete Booking",
    description: "Finalize your booking process in a few simple steps.",
  },
  {
    icon: <FaRegClock className="w-10 h-10 text-yellow-500" />,
    title: "Track Your Order",
    description: "Get real-time updates on your order and track its status.",
  },
  {
    icon: <FaUserTie className="w-10 h-10 text-orange-500" />,
    title: "Get Assistance",
    description: "Contact our advisor for expert guidance and support.",
  },
];
const BookingVideo = () => {
  const navigate = useNavigate();
  const Reload = ()=>{
  navigate('/booking')
  window.scrollTo(0,0);
  }
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center px-6 py-12 mt-12 space-y-8 lg:space-y-0 lg:space-x-8 bg-gray-100">
      {/* Video Section */}
      <div className="w-full lg:w-1/2">
        <iframe
          className="w-full h-64 sm:h-80 lg:h-96 rounded-lg shadow-md"
          src="https://www.youtube.com/embed/45XG7shHHpQ"
          title="How to Book Your Drone"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Steps Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div>
          <h5 className="text-sm font-bold tracking-wide text-gray-600 uppercase">
            Booking Process
          </h5>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Easy Steps to Book Your Drone
          </h2>
          <p className="mt-3 text-gray-600">
            Follow these simple steps to book a drone and enjoy seamless aerial
            services.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div>{step.icon}</div>
              <div>
                <h5 className="text-sm font-bold tracking-wide text-gray-600 uppercase">
                  {step.title}
                </h5>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="text-center">
          <button onClick={Reload}
            className="px-6 py-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-300"
          >
            Book Your Drone Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingVideo;
