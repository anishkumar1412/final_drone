import React, { useState } from 'react';
import FancyCarousel from "react-fancy-circular-carousel";
import 'react-fancy-circular-carousel/FancyCarousel.css';
import './Carousel.css';


import { assset } from '../../assets/assets';


const Carousel = () => {
  const [focusElement, setFocusElement] = useState(0);
  const images = [assset.agriculturedrone, assset.battery, assset.batterycharger, assset.Generator, assset.surviellance,assset.soiltesting,assset.Transportation];
  const info = [ 'Agriculture Drone', 'Customized Battery', 'Battery Charger', 'Generator', 'Surveillance Drone','Soil Testing', 'Drone Transportation'];

  return (
    <div className='mt-20 flex flex-col justify-between items-center'>
      <h1 className="hidden sm:block font-bold  text-2xl sm:text-3xl lg:text-4xl text-center"

     >
        Service Package
      </h1>
 <div className="flex py-10 flex-col items-center px-4 sm:px-8 lg:px-16">

      {/* Main Content */}
      <div className="hidden sm:flex flex-col lg:flex-row mt-8 justify-center items-center w-full lg:h-[500px] space-y-2 lg:space-y-0">
        {/* Left - Carousel Section */}
        <div className="flex flex-col items-center lg:w-1/2 h-full">
          <div className="carousel flex flex-col items-center justify-center h-full">
            <div className="relative object-cover">
              <FancyCarousel
                images={images}
                setFocusElement={setFocusElement}
                carouselRadius={window.innerWidth < 640 ? 150 : 200} // Smaller radius for small screens
                peripheralImageRadius={window.innerWidth < 640 ? 50 : 60} // Smaller peripheral images
                centralImageRadius={window.innerWidth < 640 ? 70 : 80} // Smaller central image
                autoRotateTime={3} // Smooth auto-rotation
                borderWidth={4}
                borderHexColor={'#fff'}
              
              />
            </div>
          
          </div>
        </div>

      
      </div>
    </div>
    <div className=" w-100 mt-10 bg-gray-800 px-5 text-white rounded-lg  py-4 text-center ">
              <p className="text-sm sm:text-lg font-bold">{info[focusElement]}</p>
            </div>
    </div>
   
  );
};

export default Carousel;
