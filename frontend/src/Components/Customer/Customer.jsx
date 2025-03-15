import React from 'react';
import { assset } from '../../assets/assets';

const ClientsSection = () => {
  const clients = [
    { name: 'Reliance', logo: assset.c1 },
    { name: 'Adani', logo: assset.c2 },
    { name: 'Sekura', logo: assset.c3 },
    { name: 'DAE', logo: assset.c1 },
    { name: 'Indian Railways', logo: assset.c2 },
    { name: 'NHAI', logo: assset.c1 },
    { name: 'OMC', logo: assset.c2 },
    { name: 'OBCC', logo: assset.c3 },
    { name: 'Transrail', logo: assset.c2 },
    { name: 'Aditya Birla Hindalco', logo: assset.c1 },
    { name: 'Aditya Birla Renewables', logo: assset.c3 },
  ];

  return (
    <div className="w-full bg-white py-10 mt-20">
      <style>
        {`
          @keyframes slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-slide {
            animation: slide 30s linear infinite;
          }
        `}
      </style>
      <h1 className="text-center text-4xl md:text-5xl font-semibold text-black mb-32">Our Customers</h1>
      <div className="overflow-hidden flex justify-center items-center">
        <div className="flex w-max animate-slide">
          {/* Duplicating the array to create an infinite loop effect */}
          {[...clients, ...clients].map((client, index) => (
            <div className="flex-shrink-0 w-28 sm:w-36 md:w-44 lg:w-52 mx-4 transition duration-300 hover:scale-105" key={index}>
              <img
                src={client.logo}
                alt={client.name}
                className="w-full filter grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsSection