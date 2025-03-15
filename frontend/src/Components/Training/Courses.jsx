import React from 'react';
import list from "../../../public/list.json";
import Card from '../Cards';

const Courses = () => {
    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 py-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                        Courses We Offer
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg leading-7 text-gray-600">
                        Discover a wide array of courses crafted to empower your learning journey with practical and cutting-edge knowledge.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {list.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
