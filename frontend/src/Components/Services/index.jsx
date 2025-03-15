import React from 'react';
import { assset } from '../../assets/assets';

const OurServices = () => {
  return (
    <div className="relative">
      {/* Background Image Section */}
      <div
        className="h-[400px] bg-cover bg-center relative "
        style={{
          backgroundImage: `url(${assset.serviceinnerimage})`, 
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content Section */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-lg md:text-xl max-w-3xl">
            Aerial filming with unmanned aerial vehicles (UAVs) or drones as they are most often known, is the future of aerial sports photography, TV commercials, etc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
