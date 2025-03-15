// DroneTransportation.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/image1.png";
import img2 from "../../assets/image2.png";
import img3 from "../../assets/image3.png";
import img4 from "../../assets/image4.png";
import img5 from "../../assets/image5.png";
import img6 from "../../assets/image6.png";
import img8 from "../../assets/image8.png";
import "./DroneTransportation.css";

const DroneTransportation = () => {
  const images = [
    { id: 1, src: img1, caption: "Efficient Logistics" },
    { id: 2, src: img2, caption: "Advanced Delivery" },
    { id: 3, src: img3, caption: "Faster Operations" },
    { id: 4, src: img4, caption: "Secure Transport" },
    { id: 5, src: img5, caption: "Innovative Technology" },
    { id: 6, src: img6, caption: "Eco-Friendly Solutions" },
    { id: 7, src: img8, caption: "Unmanned Precision" },
  ];

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="drone-transportation-container max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-40 py-10 text-blue-900">
        Drone Transportation
      </h2>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id} className="mt-32 drone-slide text-center">
            <img
              src={image.src}
              alt={image.caption}
              className="rounded-lg mx-auto transition-transform duration-300 hover:scale-105"
            />
            <p className="mt-32 w-full text-lg font-medium text-gray-700">
              {image.caption}
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DroneTransportation;
