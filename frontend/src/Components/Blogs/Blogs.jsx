import React, { useState, useRef } from 'react';
import { assset } from '../../assets/assets';

// Blog post list
const blogsList = [
  {
    image: assset.b1,
    title: "The Critical Need for Forestation in India: How Darubrahma Drones SABUJA Could Be a Game Changer",
    date: "22 - Aug - 24",
    description: "Discover how Darubrahma Drones SABUJA is transforming reforestation in India with cutting-edge technology. At a time when restoring our forests is more crucial than ever, this innovative approach could be the game changer we need to combat climate change and secure a sustainable future.",
    linkText: "VIEW MORE"
  },
  {
    image: assset.b2,
    title: "Enhancing Mining Safety: Darubrahma Drones Advanced Technology for Surveying and Inspection",
    date: "21 - Sep - 23",
    description: "Darubrahma Drones technology has emerged as an efficient solution to enhance safety in mining operations. These drones offer a cost-effective and efficient means of accessing hazardous or hard-to-reach areas, eliminating the need for personnel to be physically present during surveying. Darubrahma Drones provide more accurate data compared to traditional surveying methods, leading to more effective and targeted rehabilitation efforts. By leveraging these drones for inspection, surveying, and MCDR compliance, mining companies can prioritize worker well-being and sustainable mining practices.",
    linkText: "VIEW MORE"
  },
  {
    image: assset.b3,
    title: "Road Survey in Myanmar Border for BRO",
    date: "21 - Sep - 22",
    description: "Recently, Darubrahma Drones got an opportunity to conduct drone surveys in 3 major roadways near the Myanmar border; Chakpikarong to Khongtal, Chakpikarong to Joupi & Saibol Joupi to L.Bongjoi, for The Border Roads Organisation. Let us have a look at the services we aim to provide and learn how drones have changed the scenario of civil engineering & surveying.",
    linkText: "VIEW MORE"
  },
  {
    image: assset.b4,
    title: "Simplifying Vegetation Management for Power Lines with Drones",
    date: "15 - Mar - 22",
    description: "Do you remember the aftermath of cyclone Fani? It brushed past a trail of destruction by adversely affecting the state of Odisha. The storm’s rushing speed of 250 kilometres per hour had a devastating effect on lives, property, trees and other basic amenities. The effect of the cyclone was observed even after months as several rural areas continued to be in darkness due to lack of electricity.",
    linkText: "VIEW MORE"
  },
  {
    image: assset.b5,
    title: "Drones for Construction Monitoring",
    date: "08 - Mar - 22",
    description: "Since their adoption by civil and commercial groups in 2016, the use of drones in the construction industry has increased significantly. Drones have now become a valuable asset to construction and engineering firms looking forward to streamlining their operations, increasing employee safety, and monitoring progress regularly even in tough-to-access areas.",
    linkText: "VIEW MORE"
  },
  {
    image: assset.b6,
    title: "Making India the Drone Superpower by 2025",
    date: "01 - Mar - 22",
    description: "The export revenue of the IT industry is estimated at US$ 150 billion in FY21; way higher than the oil exports from Saudi which depicts the capability of India being a technology superpower in the field of IT services.",
    linkText: "VIEW MORE"
  },
];

const BlogPost = () => {
  const [expandedPosts, setExpandedPosts] = useState({});
  const blogRefs = useRef([]); // Create an array of refs

  const toggleDescription = (index) => {
    setExpandedPosts((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollToPost = (index) => {
    blogRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="max-w-[1600px]  mt-20 mx-auto p-8 sm:p-12 lg:p-16"> {/* Increased max width */}
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Blogs</h1>
      
      <div className=" mt-10 lg:flex lg:space-x-16">
        {/* Blog Posts Section */}
        <div className="lg:w-3/4">
          {blogsList.map((post, index) => (
            <div key={index} className="lg:flex lg:space-x-10 border-b pb-10 mb-10" ref={(el) => (blogRefs.current[index] = el)}>
              {/* Image Section */}
              <div className="lg:w-1/2">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-[225px] lg:h-[300px] object-cover shadow-lg rounded-md"
                />
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 mt-6 lg:mt-0">
                {/* Category and Format Tags */}
                <div className="flex items-center space-x-2 mb-4 text-sm">
                  <span className="uppercase font-semibold text-gray-500">Updates</span>
                  <span className="text-gray-400">|</span>
                  <span className="uppercase font-semibold text-blue-600">Video</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>

                {/* Date */}
                <div className="text-sm text-gray-500 mb-4">
                  <span>{post.date}</span>
                </div>

                {/* Description with "Read More" */}
                <p className="text-gray-700">
                  {expandedPosts[index] ? post.description : post.description.slice(0, 100) + "..."}
                  <button
                    onClick={() => toggleDescription(index)}
                    className="text-blue-600 ml-2 hover:underline"
                  >
                    {expandedPosts[index] ? "Read less" : "Read more"}
                  </button>
                </p>

                {/* Link Text */}
                <a href="#" className="inline-block text-blue-600 mt-4 hover:underline">
                  {post.linkText}
                </a>

                {/* Social Media Links */}
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="text-gray-500 hover:text-blue-600"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="text-gray-500 hover:text-blue-600"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="text-gray-500 hover:text-blue-600"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Posts Section */}
        <div className="hidden lg:block lg:w-1/4 space-y-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Recent Posts</h2>
          <ul className="space-y-4">
            {blogsList.slice(0, 4).map((post, index) => (
              <li key={index} className="flex items-start space-x-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-24 h-24 object-cover shadow-lg rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 cursor-pointer" onClick={() => scrollToPost(index)}>
                    {post.title.length > 40 ? post.title.slice(0, 40) + "..." : post.title}
                  </h3>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
