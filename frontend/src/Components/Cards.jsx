import React from 'react';

const Card = ({ item }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 hover:scale-105 flex flex-col h-full">
            {/* Card Image */}
            <div className="relative">
                <img
                    className="w-full h-56 object-cover rounded-t-xl"
                    src={item.image}
                    alt={item.title}
                />
                <span className="absolute top-4 right-4 bg-blue-500 text-white text-sm px-3 py-1 rounded-full shadow-md">
                    {item.category || "General"}
                </span>
            </div>
            {/* Card Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h2>
                <p className="text-gray-600 flex-grow mb-4">
                    {item.description}
                </p>
                {/* Price and Duration */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="text-lg font-semibold">
                        {item.price === 0 ? (
                            <span className="text-green-600">Free</span>
                        ) : (
                            <span className="text-blue-600 border border-blue-600 px-2 py-1 rounded">
                                ₹{item.price}
                            </span>
                        )}
                        {item.price !== 0 && (
                            <span className="text-sm ml-1 text-gray-500"> / course</span>
                        )}
                    </div>
                    <div className="text-sm text-gray-500">{item.duration}</div>
                </div>
                {/* CTA Button */}
                <button className="mt-5 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200">
                    {item.price === 0 ? "Enroll Now" : "Buy Now"}
                </button>
            </div>
        </div>
    );
};

export default Card;
