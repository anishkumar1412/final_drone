import React, { useState } from "react";
import { assset } from "../assets/assets";

const DroneQuoteCalculator = () => {
  const [dronePilots, setDronePilots] = useState(0);
  const [hours, setHours] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(200);

  const handleSliderChange = (value, setter) => {
    setter(value);
    calculateTotal();
  };

  const calculateTotal = () => {
    const calculatedTotal = 200 + dronePilots * 500 + hours * 300 + quantity * 100;
    setTotal(calculatedTotal);
  };

  return (
    <>
     <header
        className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white py-24 px-8 text-center"
        style={{
          backgroundImage: `url(${assset.quoteinnerimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            Calculate the expenses using QuoteCalculator
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mt-4">
            Join a mission-driven company revolutionizing agriculture through technology.
          </p>
        
        </div>
      </header>
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-8 ">
      {/* Ensure that this header does not get overlapped by a fixed navbar */}
     

      {/* Main content area starts here */}
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-xl w-11/12 max-w-6xl mt-8"> {/* Adjusted margin-top */}
        {/* Left Section: Form */}
        <div className="p-8 lg:w-1/2">
          <h2 className="text-xl font-bold mb-6 text-gray-700">Drone Quote Calculator</h2>
          <form className="space-y-4">
            {/* Dropdowns */}
            {["Video", "Photography", "Drone Purpose", "Rent Equipment"].map((label, idx) => (
              <div key={idx}>
                <label className="block text-gray-600 font-medium">{label}</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-blue-500">
                  <option>Select...</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            ))}

            {/* Sliders */}
            {[ 
              { label: "Drone Pilots", value: dronePilots, setter: setDronePilots },
              { label: "Hours", value: hours, setter: setHours },
              { label: "Quantity (shots or minutes)", value: quantity, setter: setQuantity },
            ].map((slider, idx) => (
              <div key={idx}>
                <label className="block text-gray-600 font-medium mb-1">{slider.label}</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={slider.value}
                  onChange={(e) => handleSliderChange(e.target.value, slider.setter)}
                  className="w-full accent-blue-500"
                />
                <div className="text-sm text-gray-500 mt-1">{slider.value}</div>
              </div>
            ))}

            {/* Toggle Button */}
            <div className="flex items-center space-x-3">
              <label className="text-gray-600 font-medium">Drone License</label>
              <input type="checkbox" className="toggle-input" />
            </div>
          </form>

          {/* Total and Next */}
          <div className="flex items-center justify-between mt-8">
            <div className="text-lg font-semibold text-blue-600">
              Total: ₹{total.toLocaleString()}
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
              NEXT
            </button>
          </div>
        </div>

        {/* Right Section: Image and Steps */}
        <div className="bg-gray-100 p-8 lg:w-1/2 flex flex-col items-center">
          {/* Image */}
          <img
            src={assset.QuadCopterimage}
            alt="Drone"
            className="w-4/5 max-w-sm mb-6"
            />

          {/* Steps */}
          <h3 className="text-lg font-bold mb-4 text-gray-700">Follow The Steps</h3>
          <div className="space-y-4">
            {[ 
              {
                icon: "📡",
                title: "Step 1",
                description: "A drone is an unmanned aerial vehicle (UAV) that is fitted for your tasks.",
              },
              {
                icon: "👨‍✈️",
                title: "Step 2",
                description: "Our drone services provide skilled UAV pilots for a professional experience.",
              },
              {
                icon: "🖐️",
                title: "Step 3",
                description: "Advanced control features make your project smoother with simple gestures.",
              },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <span className="text-2xl">{step.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-700">{step.title}</h4>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
              </>
  );
};

export default DroneQuoteCalculator;
