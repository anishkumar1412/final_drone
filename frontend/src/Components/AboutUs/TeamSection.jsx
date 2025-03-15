import React from 'react';

const teamMembers = [
  {
    name: 'Staephan HUMBERT',
    role: 'PILOT',
    description: 'Experienced photographer, videographer, film editor and responsible pilot.',
    image: 'https://squadrone.bold-themes.com/main-demo/wp-content/uploads/sites/2/2017/12/team_01.jpg',
  },
  {
    name: 'Jack KOWALSKI',
    role: 'PHOTOGRAPHER',
    description: 'Ten years of flying experience. Affordable UAV services for aerial drone inspections.',
    image: 'https://squadrone.bold-themes.com/main-demo/wp-content/uploads/sites/2/2017/12/team_02.jpg',
  },
  {
    name: 'Leo SIMON',
    role: 'PILOT',
    description: 'Licensed 107 and 33 exempt drone operator with more than five years flying experience.',
    image: 'https://squadrone.bold-themes.com/main-demo/wp-content/uploads/sites/2/2017/12/team_03.jpg',
  },
  {
    name: 'Thomas PERMUTT',
    role: 'PILOT',
    description: 'Professional photojournalist for the local CBS affiliate & recently freelance drone pilot.',
    image: 'https://squadrone.bold-themes.com/main-demo/wp-content/uploads/sites/2/2017/12/team_04.jpg',
  },
];

const TeamSection = () => {
  return (
    <section className="py-12 bg-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-blue-600 text-sm font-bold uppercase mb-2">Aerial Photography</h2>
        <h1 className="text-gray-800 text-3xl md:text-4xl font-bold mb-12">Our Dedicated Team</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center max-w-xs mx-auto">
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden mb-4">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-gray-500 uppercase text-sm font-semibold">{member.role}</h3>
              <h2 className="text-gray-800 text-lg font-bold mt-1">{member.name}</h2>
              <p className="text-gray-600 text-sm mt-2 px-6 md:px-4">{member.description}</p>
            </div>
          ))}
        </div>

        <button className="mt-12 bg-blue-500 text-white py-3 px-8 rounded-full text-sm font-semibold hover:bg-blue-600 transition duration-300">
          Pilot List
        </button>
      </div>
    </section>
  );
};

export default TeamSection;
