import React from "react";
import { useNavigate } from "react-router-dom";
import { assset } from "../assets/assets";

const ContactUs = () => {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <>
    
    <div className="relative">
    {/* Background Image Section */}
    <div
      className="h-[400px] bg-cover bg-center relative "
      style={{
        backgroundImage: `url(${assset.inner_contact})`, 
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-3xl">
          Aerial filming with unmanned aerial vehicles (UAVs) or drones as they are most often known, is the future of aerial sports photography, TV commercials, etc.
        </p>
      </div>
    </div>
  </div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Buttons Section */}
     

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center justify-center py-10 px-4 lg:px-20 bg-white shadow-md rounded-lg">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet consectetur.</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-blue-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 8c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8zM22 12h-6"
                />
              </svg>
              stw@sonalitechworld.com
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-blue-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89-5.26c.67-.44 1.55-.44 2.22 0L21 8M7 21v-6m10 6v-6m-7-3h3v3m-3-3l-7 7M3 21h18"
                />
              </svg>
              +91 8537 88 6001
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-blue-500 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 3c6.63 0 12 5.37 12 12 0 6.63-5.37 12-12 12C5.37 27 0 21.63 0 15c0-6.63 5.37-12 12-12z"
                />
              </svg>
              Head Office# STW Building, Radhamohanpur, Durgapur, Bankati, WB-713148, "Kolkata - India"
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div
          className="lg:w-1/2 p-8 shadow-lg rounded-[16px] w-full relative"
          style={{
            margin: "0 auto",
            maxWidth: "720px",
            height: "auto",
            background: `url(${assset.ContactUsbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "16px",
          }}
        >
          <form className="space-y-4 mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First name*"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full bg-opacity-70"
              />
              <input
                type="text"
                placeholder="Last name*"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full bg-opacity-70"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <select
                  className="absolute left-0 top-0 border border-gray-300 rounded-md p-3 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option>IN</option>
                  <option>US</option>
                </select>
                <input
                  type="tel"
                  placeholder="+91 0000000000"
                  className="pl-16 border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <input
                type="email"
                placeholder="you@company.com"
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
              />
            </div>
            <input
              type="text"
              placeholder="Company Name"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
            <textarea
              placeholder="Message*"
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full h-32"
            ></textarea>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="privacy" />
              <label htmlFor="privacy" className="text-sm text-gray-600">
                You agree to our friendly{" "}
                <span className="text-blue-500 underline">privacy policy</span>.
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
