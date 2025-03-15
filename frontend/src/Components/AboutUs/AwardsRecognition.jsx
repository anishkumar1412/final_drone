import React, { useState, useEffect } from "react";
import image1 from "../../../public/image1.png";
import image2 from "../../../public/image2.png";
import image3 from "../../../public/image3.png";
import image4 from "../../../public/image4.png";

const images = [
  { src: image1, description: "Innovation Fund from Startup Odisha" },
  { src: image2, description: "Grant received from Startup Odisha" },
  { src: image3, description: "Certificate From Brinc" },
  { src: image4, description: "Recognition for sustainable agriculture" },
];

const Awards = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-800 tracking-wide">
          Awards & Recognitions
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Celebrating the achievements of <span className="font-bold">Rajendra Das</span>
        </p>
      </div>

      {/* Carousel Section */}
      <div className="relative w-[90%] max-w-3xl mx-auto">
        {/* Image Carousel */}
        <div className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg bg-white">
          <img
            src={images[currentImageIndex].src}
            alt={`Slide ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="mt-6 text-center">
          <p className="text-lg font-medium text-gray-700">
            {images[currentImageIndex].description}
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-12">
        <p className="text-gray-700 font-medium">
          "Our journey continues with more innovation and impact."
        </p>
      </div>
    </div>
  );
};

export default Awards;
