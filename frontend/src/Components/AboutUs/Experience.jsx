import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { assset } from "../../assets/assets";

const Experience = ({ percentage, label }) => {
  const [progress, setProgress] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = percentage;
      const duration = 1000; // Total animation duration in ms
      const increment = (end / duration) * 10;

      const animateProgress = () => {
        start += increment;
        setProgress(Math.min(Math.ceil(start), end));
        if (start < end) requestAnimationFrame(animateProgress);
      };

      animateProgress();
    }
  }, [inView, percentage]);

  return (
    <div className="flex flex-col items-center m-2 md:m-4 lg:m-6" ref={ref}>
      <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56">
        <svg className="w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="#e5e7eb"
            strokeWidth="9"
            fill="none"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="#3b82f6"
            strokeWidth="8"
            fill="none"
            strokeDasharray="282"
            strokeDashoffset={282 - (progress / 100) * 282}
            className="transition-all duration-200 ease-linear"
            style={{
              transformOrigin: "center",
              transform: "rotate(-90deg)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white md:text-xl lg:text-2xl">
            {progress}%
          </span>
        </div>
      </div>
      <p className="mt-2 text-xs font-medium text-white md:text-sm lg:text-base">
        {label}
      </p>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${assset.hero_inner_01})`, // Fixed template literal
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "40vh",
      }}
    >
      {/* Blackish overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center mb-6">
        <h1 className="text-lg font-bold text-white md:text-2xl lg:text-3xl max-w-xl mx-auto">
          We Use Various Technologies & Products To Get The Best Results
        </h1>
        <p className="mt-2 text-gray-300 text-sm md:text-base lg:text-lg max-w-lg mx-auto">
          Once you rent our aircraft by itself, you'll save on an extra battery.
        </p>
      </div>

      {/* Circles Section */}
      <div className="relative z-10 flex flex-row flex-wrap justify-center gap-4 md:gap-6">
        <Experience percentage={75} label="Product Quality" />
        <Experience percentage={80} label="Camera" />
        <Experience percentage={68} label="Speed" />
        <Experience percentage={97} label="24/7 Support" />
      </div>
    </div>
  );
};

export default ExperienceSection;
