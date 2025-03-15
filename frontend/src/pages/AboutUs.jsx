import React from "react";
import DroneSection from "../Components/DroneSection";
import ExperienceSection from "../Components/AboutUs/Experience";
import VisionComponent from "../Components/AboutUs/vision";
import OurTeamList from "../Components/OurTeam/OurTeam";
import Awards from "../Components/AboutUs/AwardsRecognition";


const AboutUs = () => {
  return (
    <>
    {/* This is the about page  */}
    <section
      className="relative h-[70vh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://squadrone.bold-themes.com/main-demo/wp-content/uploads/sites/2/2018/01/inner_image_02.jpg')" }}
    >
      <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
        <div className="text-center px-6 sm:px-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="underline decoration-sky-500">DarhubDrone</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            At SquaDrone, we provide professional aerial filming and photography services, as well as full post production services for all manner of aerial applications.
          </p>
        </div>
      </div>
    </section>
    <DroneSection/>
    <ExperienceSection/>
    <VisionComponent/>
    <OurTeamList/>
    <Awards/>
    </>
  );
};

export default AboutUs;