import React from "react";

const DownloadBrochure = () => {
  return (
    <div className="fixed bottom-24 left-4 z-10 ">
      <a
        href="/path-to-your-brochure.pdf"
        download
        className="flex items-center bg-white text-blue-600 px-4 py-2 text-sm sm:text-base rounded-full shadow-lg border border-blue-600 hover:scale-105 hover:pl-6 transition-all duration-300 ease-in-out"
      >
        <span className="flex-grow">Download Brochure</span>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" // Replace with your PDF icon URL
          alt="PDF Icon"
          className="w-5 h-5 ml-2 hidden hover:block"
        />
      </a>
    </div>
  );
};

export default DownloadBrochure;
