import React from "react";
import E1 from '../../../public/E1.png';
import E2 from '../../../public/E2.png';
import E3 from '../../../public/E3.png';
import E4 from '../../../public/E4.png';
import E5 from '../../../public/E5.png';
import E6 from '../../../public/E6.png';

const EnterPricelist = [
  {
    image: E1,
    name: "Accurate and Reliable Data",
    desc: "Darubrahma Drones uses cutting-edge technology to capture highly accurate data for enterprises, ensuring that their needs are met with precision.",
  },
  {
    image: E2,
    name: "Time and Cost-Effective",
    desc: "Darubrahma Drones mapping and surveying is faster and more cost-effective than traditional methods, making it a popular choice for enterprises.",
  },
  {
    image: E3,
    name: "Increased Efficiency",
    desc: "Streamlined processes and cutting-edge drone technology reduce the time required for mapping and surveying projects, increasing overall efficiency.",
  },
  {
    image: E4,
    name: "Experienced Team",
    desc: "The team at Darubrahma Drones has extensive experience in the field, ensuring that you receive the best possible results for your project.",
  },
  {
    image: E5,
    name: "Commitment to Quality",
    desc: "We are committed to delivering high-quality results that meet and exceed customer expectations.",
  },
  {
    image: E6,
    name: "Enhanced Safety",
    desc: "Darubrahma Drones mapping and surveying eliminates the need for workers to access dangerous or hazardous areas, improving safety.",
  }
];

const EnterPrice = ({ image, name, desc }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center max-w-xs mx-auto transition-transform transform hover:scale-105">
      <img src={image} alt="Error Loading Image" className="w-24 h-24 mb-4" />
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-sm">{desc}</p>
    </div>
  );
};

const EnterPriceList = () => {
  return (
    <div className="mt-32">
      <h1 className="text-black text-center text-3xl md:text-4xl font-bold mb-8">Why Enterprises Choose Us</h1>
      <p className="text-black text-center text-base md:text-lg mx-auto mb-8 w-11/12 md:w-3/5">
        <b className="text-blue-600">Darubramha Drones</b> offers enterprises a cost-effective, efficient, and safe solution for their mapping and surveying needs, providing them with accurate and reliable data that meets their business objectives.
      </p>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 md:px-12">
        {EnterPricelist.map((item, index) => (
          <EnterPrice key={index} image={item.image} name={item.name} desc={item.desc} />
        ))}
      </div>
    </div>
  );
};

export default EnterPriceList;
