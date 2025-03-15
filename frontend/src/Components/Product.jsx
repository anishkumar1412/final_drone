import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper";
import { AiOutlinePlus } from "react-icons/ai"; // Import the icon
import { assset } from "../assets/assets";

const Product = () => {
  const products = [
    { id: 1, name: "Drone Model 1", image: "https://i.postimg.cc/8PfPRTKm/Drone-1.jpg", link: "https://bookyourdrone.org/product/eft-e416p-16l-16kg-agricultural-spray-drone-frame-kit-four-axis-folding-with-hobbywing-x9-jiyi-kflight-control-skydroid-h12/" },
    { id: 2, name: "Drone Model 2", image: "https://i.postimg.cc/3NjRGTFZ/Drone-2.avif", link: "https://bookyourdrone.org/product/jis-nv16-nv20-16l-20l-agricultural-framework-hobbywing-route-planning-spraying-pesticides-on-farmland/" },
    { id: 3, name: "Drone Model 3", image: "https://i.postimg.cc/RZHYLZH9/Drone-3.avif", link: "https://bookyourdrone.org/product/eft-e610p-10kg-6-axis-folding-agricultural-spray-agricultural-drone-with-x6-power-system-h12-rc-jiyik-fc-full-set/" },
    { id: 4, name: "Drone Model 4", image: "https://i.postimg.cc/xCvJvM0H/Drone-4.avif", link: "https://bookyourdrone.org/product/eft-e420p-20l-20kg-agricultural-spray-frame-kit-four-axis-folding-quadcopter-with-hobbywing-x9-plus-power-system-2/" },
    { id: 5, name: "Drone Model 5", image: "https://i.postimg.cc/8zLSPHwh/Drone-5.avif", link: "https://bookyourdrone.org/product/m30-agricultural-spraying-frame-four-axis-30kg-50l-plant-protection-machine-with-large-capacity-for-pesticide-and-pest-control/" },
    { id: 6, name: "Drone Model 6", image: "https://i.postimg.cc/zDT6hBTr/Drone-6.avif", link: "https://bookyourdrone.org/product/eft-e420p-20l-20kg-agricultural-spray-frame-kit-four-axis-folding-quadcopter-with-hobbywing-x9-plus-power-system/" },
    { id: 7, name: "Drone Model 7", image: "https://i.postimg.cc/DzV112q9/Drone-7.avif", link: "https://bookyourdrone.org/product/eft-e416p-16l-16kg-agricultural-spray-drone-frame-kit-four-axis-folding-with-hobbywing-x9-jiyi-kflight-control-skydroid-h12/" },
  ];

  return (
    <div className="bg-white py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-5 text-gray-800">We Rent The Best Drones</h1>
      <p className="text-center text-gray-600 mb-8 px-4 max-w-xl mx-auto">
        If you’re looking for a portable drone or a pro tool, we have a drone for you!
      </p>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        loopAdditionalSlides={products.length}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 15 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className="max-w-6xl mx-auto px-4"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="flex justify-center">
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <div className="bg-white rounded-lg relative group overflow-hidden transform transition duration-300 hover:scale-105">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-t-lg mb-4 group-hover:opacity-30 transition-opacity duration-300"
                />
                <h3 className="text-xl font-semibold text-gray-800 text-center">{product.name}</h3>

                {/* Icon button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl hover:bg-blue-600 transition duration-300"
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Product;
