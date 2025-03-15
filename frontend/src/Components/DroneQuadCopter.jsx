import React, { useEffect, useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { assset } from '../assets/assets';

const DroneComponent = () => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center py-16 bg-gray-100 px-6 lg:px-20 xl:px-32"
      style={{ minHeight: '90vh' }}
    >
      {/* Main Heading */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-8 md:mb-12">
        Drones, Quadcopters, and Octocopters Are Perfectly Suited For The Purposes Of Aerial Inspections
      </h2>

      {/* Subheading */}
      <p className="text-center text-gray-600 mb-10 md:mb-16">
        Information highway will close the loop on focusing solely on the bottom line.
      </p>

      <div className="relative max-w-7xl w-full flex flex-col md:flex-row justify-center items-center mb-10 space-y-10 md:space-y-0">
        {/* Feature boxes with added margin */}
        <div className="md:absolute top-0 left-0 w-full md:w-1/4 text-center p-4 md:p-0 md:mb-10 lg:mb-12">
          <div className={`transition-opacity duration-700 ${isInView ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h3 className="font-bold text-lg md:text-xl">AERIAL PHOTOGRAPHY</h3>
            <p className="text-gray-600">
              A drone is an unmanned aerial vehicle (UAV) fitted with various equipment for agile photography.
            </p>
          </div>
        </div>

        <div className="md:absolute top-0 right-0 w-full md:w-1/4 text-center p-4 md:p-0 md:mb-10 lg:mb-12">
          <div className={`transition-opacity duration-700 delay-200 ${isInView ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h3 className="font-bold text-lg md:text-xl">PROPELLERS</h3>
            <p className="text-gray-600">
              Our skilled UAV pilot will provide excellent event photography and videography.
            </p>
          </div>
        </div>

        <div className="md:absolute bottom-0 left-0 w-full md:w-1/4 text-center p-4 md:p-0 md:mt-10 lg:mt-12">
          <div className={`transition-opacity duration-700 delay-400 ${isInView ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h3 className="font-bold text-lg md:text-xl">RESOLUTION</h3>
            <p className="text-gray-600">
              These devices capture high-quality images and videos, enhancing your event coverage.
            </p>
          </div>
        </div>

        <div className="md:absolute bottom-0 right-0 w-full md:w-1/4 text-center p-4 md:p-0 md:mt-10 lg:mt-12">
          <div className={`transition-opacity duration-700 delay-600 ${isInView ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h3 className="font-bold text-lg md:text-xl">POWERFUL & PORTABLE</h3>
            <p className="text-gray-600">
              Record all activities with ease, even in hard-to-reach areas.
            </p>
          </div>
        </div>

        {/* Drone Image with Zoom Animation */}
        <div className={`transition-transform duration-700 ease-in-out ${isInView ? 'animate-zoomIn' : ''} my-8`}>
          <img
            src={assset.QuadCopterimage}
            alt="Drone"
            className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-2xl"
          />
        </div>
      </div>

      {/* Get Started Button */}
      <button
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
      >
        GET STARTED
      </button>
    </div>
  );
};

export default DroneComponent;
