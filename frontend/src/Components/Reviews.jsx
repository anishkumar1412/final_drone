import { useRef, useState } from 'react';
import leftArrow from '../assets/leftArrow.png'; 
import rightArrow from '../assets/rightArrow.png';

const drones = [
  {
    name: 'Spraying Drone',
    video: 'https://www.youtube.com/embed/zUwYQ7BU1vw',
    specs: ['Capacity: 16L', 'Range: 2km', 'Battery Life: 1hr'],
    price: '$2000',
    description: 'Perfect for spraying crops efficiently and effectively.',
  },
  {
    name: 'Surveillance Drone',
    video: 'https://www.youtube.com/embed/zUwYQ7BU1vw',
    specs: ['Resolution: 4K', 'Range: 5km', 'Battery Life: 2hrs'],
    price: '$2500',
    description: 'Ideal for monitoring large fields and livestock.',
  },
  {
    name: 'Drone Training',
    video: 'https://www.youtube.com/embed/zUwYQ7BU1vw',
    specs: ['Duration: 3 days', 'Skill Level: Beginner', 'Best Seller'],
    price: '$300',
    description: 'Comprehensive training program for drone operation.',
  },
  {
    name: '16L Drone',
    video: 'https://www.youtube.com/embed/zUwYQ7BU1vw',
    specs: ['Capacity: 16L', 'Range: 2km', 'Battery Life: 1hr'],
    price: '$2100',
    description: 'Efficient and reliable drone with a 16L capacity.',
  },
  {
    name: '25L Drone',
    video: 'https://www.youtube.com/embed/zUwYQ7BU1vw',
    specs: ['Capacity: 25L', 'Range: 3km', 'Battery Life: 1.5hrs'],
    price: '$3000',
    description: 'High-capacity drone suitable for larger farms.',
  },
  {
    name: '30L Drone',
    video: 'https://www.youtube.com/embed/zUwYQ7BU1vw',
    specs: ['Capacity: 30L', 'Range: 3.5km', 'Battery Life: 2hrs'],
    price: '$3500',
    description: 'Top-of-the-line drone with maximum capacity and range.',
  },
];

function DroneSlider() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction) => {
    const cardWidth = sliderRef.current.clientWidth / 2; // Adjust based on visible cards
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setCurrentIndex((prev) =>
      direction === 'left' ? Math.max(prev - 1, 0) : Math.min(prev + 1, drones.length - 1)
    );
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4">Drones</h1>
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Explore Our Drones</h2>
        <p className="text-lg mb-12">
          Check out our high-tech drones designed to meet various agricultural and surveillance needs.
        </p>

        <div className="relative flex items-center">
          {currentIndex > 0 && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-all"
            >
              <img src={leftArrow} alt="Previous" className="w-6 h-6" />
            </button>
          )}

          <div className="overflow-x-auto flex-grow" ref={sliderRef}>
            <div className="flex gap-6" style={{ scrollSnapType: 'x mandatory' }}>
              {drones.map((drone, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 min-w-[80%] sm:min-w-[50%] lg:min-w-[33.333%] bg-white rounded-lg shadow-lg p-4"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <iframe
                    width="100%"
                    height="200"
                    src={drone.video}
                    title={drone.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="mb-4 rounded-t-lg"
                  ></iframe>
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{drone.name}</h3>
                    <p className="text-sm mb-2">{drone.description}</p>
                    <ul className="text-sm mb-4">
                      {drone.specs.map((spec, i) => (
                        <li key={i} className="text-gray-600">{spec}</li>
                      ))}
                    </ul>
                    <div className="text-xl font-bold text-gray-800">{drone.price}</div>
                    <a href="#" className="text-blue-500 hover:underline mt-4 inline-block">
                      Learn More →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {currentIndex < drones.length - 1 && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-all"
            >
              <img src={rightArrow} alt="Next" className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="flex justify-center mt-6">
          {drones.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 mx-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
            ></span>
          ))}
        </div>
      </div>
      <style>
        {
`
  ::-webkit-scrollbar {
          display: none;
        }
`
        }
    
      </style>
    </section>
  );
}

export default DroneSlider;
