import React from 'react';
import { MailIcon, PhoneIcon, LocationMarkerIcon } from '@heroicons/react/solid';

const Form1 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header Section */}
      <header className="text-black w-full py-6">
        <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r  text-black py-4 px-8 rounded-lg ">
          Drone Training Courses
        </h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row text-black w-full flex-grow p-8 gap-8 max-w-7xl">
        {/* Information Section */}
        <section className="md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600">
            Interested in setting up a Center of Excellence (CoE)?
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Learn from India’s highly qualified and experienced drone training instructors. 
            Nourish excellence with a focus on every candidate. Access well-equipped labs 
            with the latest simulation software and tools.
          </p>
          <ul className="mt-6 space-y-4">
            <li className="flex items-center">
              <MailIcon className="w-6 h-6 text-blue-500 mr-2" />
              <span className="text-gray-600">Email us at <span className="font-semibold">info@dronetraining.com</span></span>
            </li>
            <li className="flex items-center">
              <PhoneIcon className="w-6 h-6 text-blue-500 mr-2" />
              <span className="text-gray-600">Call us at <span className="font-semibold">+91-XXXXXXXXXX</span></span>
            </li>
            <li className="flex items-center">
              <LocationMarkerIcon className="w-6 h-6 text-blue-500 mr-2" />
              <span className="text-gray-600">Visit us at <span className="font-semibold">123 Drone St, Bhubaneswar, India</span></span>
            </li>
          </ul>
        </section>

        {/* Contact Form Section */}
        <section className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Contact Us</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your city"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Message (optional)</label>
              <textarea
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                rows="4"
                placeholder="Write your message here..."
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition duration-200"
              >
                Send
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Form1;
