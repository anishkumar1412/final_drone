import React, { useEffect, useRef, useState } from 'react';
import { assset } from '../assets/assets';

const DroneComponent = () => {
  // State to track when the image is in view
  const [inView, setInView] = useState(false);

  // Reference for the image element
  const imageRef = useRef(null);

  useEffect(() => {
    // Create the intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // When the image comes into view, set inView to true
          setInView(true);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the image is in the viewport
      }
    );

    // Start observing the image element
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div className="flex bg-gray-50 flex-col items-center text-center p-8 md:p-16">
      <h5 className="text-xs md:text-sm uppercase tracking-widest text-gray-500">Aerial Photography</h5>
      <h1 className="text-2xl md:text-4xl font-light mt-2">
        There Are Many <strong className="font-bold">Great Ways</strong>
        <br />
        To Use Drones
      </h1>
      <img
        src={assset.home3droneimage} // Replace this with the path to your drone image
        alt="Drone"
        ref={imageRef}
        className={`mt-8 w-full max-w-3xl md:w-4/5 lg:w-11/12 transition-transform duration-1000 ${
          inView ? 'animate-slide-up' : 'opacity-0' // Apply animation when in view
        }`}
      />
      <style jsx>{`
        @keyframes slide-up {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default DroneComponent;
