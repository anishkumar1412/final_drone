import React, { useState, useEffect } from 'react';
import drone1 from '../../../public/drone.jpg';
import drone2 from '../../../public/drone2.jpg';
import drone3 from '../../../public/drone3.jpg';

const Banner = () => {
  const images = [drone1, drone2, drone3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background with smooth transition */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center">
          Drone Piloting Training
        </h1>
        <p className="mt-4 text-lg md:text-xl text-center max-w-3xl">
          Darubramha empowers farmers with essential drone training, enabling precision agriculture 
          for enhanced productivity and sustainability. Join us to revolutionize your farming practices with cutting-edge technology.
        </p>
        <div className="mt-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg mr-4 transition-all duration-300">
            Join Training
          </button>
          <button className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-6 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-4 shadow-lg transition-all duration-300 z-20"
        onClick={prevImage}
        aria-label="Previous Slide"
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-6 transform -translate-y-1/2 text-white bg-gray-800 hover:bg-gray-700 rounded-full p-4 shadow-lg transition-all duration-300 z-20"
        onClick={nextImage}
        aria-label="Next Slide"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Banner;
