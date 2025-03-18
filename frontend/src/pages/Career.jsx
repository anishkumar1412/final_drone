import React from "react";
import { assset } from "../assets/assets";

const CareersPage = () => {
  const jobs = [
    {
      title: "Drone Engineer - Project Agro",
      location: "Bhubaneswar, Odisha",
      image:
        "https://img.freepik.com/free-vector/drone-engineering-concept-illustration_114360-2738.jpg",
    },
    {
      title: "Remote Pilot - Project Agro",
      location: "Cuttack, Odisha",
      image:
        "https://img.freepik.com/free-vector/remote-drone-pilot-illustration_114360-3425.jpg",
    },
    {
      title: "AI Specialist - Project Drone",
      location: "Sambalpur, Odisha",
      image:
        "https://img.freepik.com/free-vector/artificial-intelligence-drone-concept_114360-2135.jpg",
    },
    {
      title: "Field Operations Manager - Project Agro",
      location: "Remote",
      image:
        "https://img.freepik.com/free-vector/drone-field-operations-manager_114360-2403.jpg",
    },
    {
      title: "Software Developer - Project Drone",
      location: "Bhubaneswar, Odisha",
      image:
        "https://img.freepik.com/free-vector/software-development-drone-application_114360-1214.jpg",
    },
    {
      title: "Data Analyst - Project Drone",
      location: "Remote",
      image:
        "https://img.freepik.com/free-vector/drone-data-analysis-illustration_114360-301.jpg",
    },
    {
      title: "Agronomy Consultant - Project Agro",
      location: "Bhubaneswar, Odisha",
      image:
        "https://img.freepik.com/free-vector/agronomy-drone-consultant-concept_114360-7358.jpg",
    },
    {
      title: "Customer Success Manager - Project Agro",
      location: "Cuttack, Odisha",
      image:
        "https://img.freepik.com/free-vector/customer-support-drone-company_114360-2670.jpg",
    },
  ];


  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header
        className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white py-24 px-8 text-center"
        style={{
          backgroundImage: `url(${assset.career})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            Build the Future with AgroDrone
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mt-4">
            Join a mission-driven company revolutionizing agriculture through
            technology.
          </p>
          <a
            href="#jobs"
            className="inline-block mt-10 px-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 shadow-lg transition duration-300"
          >
            Explore Opportunities
          </a>
        </div>
      </header>
      {/* Available Jobs */}
      <section id="jobs" className="py-16 px-8">
        <h2 className="text-center text-3xl font-bold mb-14 text-gray-800">
          Available Positions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105 overflow-hidden  "
              style={{ height: "270px", width: "260px", margin: "0 auto" }}
            >
              <img
                src={job.image}
                alt={job.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <h3 className="text-sm font-semibold text-purple-700">
                  {job.title}
                </h3>
                <p className="mt-2 text-xs text-gray-600">{job.location}</p>
                <button className="mt-4 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-center text-3xl font-bold mb-16 text-gray-800">
          Why Join AgroDrone?
        </h2>
        <div className="flex flex-wrap justify-center gap-12">
          {/* Innovation */}
          <div className="text-center max-w-xs">
            <img
              src="https://img.freepik.com/free-vector/robotic-drone-technology-flat-illustration_1284-59620.jpg"
              alt="Innovation"
              className="w-28 h-28 mx-auto mb-6 sm:w-36 sm:h-36"
            />
            <h3 className="text-xl font-semibold text-purple-700">
              Innovation
            </h3>
            <p className="mt-4 text-gray-600">
              Be part of cutting-edge technology that transforms agriculture.
            </p>
          </div>
          {/* Collaboration */}
          <div className="text-center max-w-xs">
            <img
              src="https://img.freepik.com/free-vector/teamwork-concept-illustration_114360-7644.jpg"
              alt="Collaboration"
              className="w-28 h-28 mx-auto mb-6 sm:w-36 sm:h-36"
            />
            <h3 className="text-xl font-semibold text-purple-700">
              Collaboration
            </h3>
            <p className="mt-4 text-gray-600">
              Work with a passionate and supportive team.
            </p>
          </div>
          {/* Growth */}
          <div className="text-center max-w-xs">
            <img
              src="https://img.freepik.com/free-vector/progress-concept-illustration_114360-1221.jpg"
              alt="Growth"
              className="w-28 h-28 mx-auto mb-6 sm:w-36 sm:h-36"
            />
            <h3 className="text-xl font-semibold text-purple-700">Growth</h3>
            <p className="mt-4 text-gray-600">
              Enjoy unparalleled opportunities for professional development.
            </p>
          </div>
          {/* Balance */}
          <div className="text-center max-w-xs">
            <img
              src="https://img.freepik.com/free-vector/work-life-balance-concept-illustration_114360-1340.jpg"
              alt="Balance"
              className="w-28 h-28 mx-auto mb-6 sm:w-36 sm:h-36"
            />
            <h3 className="text-xl font-semibold text-purple-700">Balance</h3>
            <p className="mt-4 text-gray-600">
              Flexible work options for a healthier work-life balance.
            </p>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 px-8 bg-indigo-100">
        <h2 className="text-center text-3xl font-bold mb-8 text-gray-800">
          Perks and Benefits
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="bg-white border border-gray-200 p-6 w-full sm:w-80 lg:w-72 rounded-lg shadow-lg hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-700">
              Health Insurance
            </h3>
            <p className="mt-3 text-gray-600">
              Comprehensive health coverage for you and your family.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6 w-full sm:w-80 lg:w-72 rounded-lg shadow-lg hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-700">
              Flexible Hours
            </h3>
            <p className="mt-3 text-gray-600">
              Work-life balance is a priority for us.
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-6 w-full sm:w-80 lg:w-72 rounded-lg shadow-lg hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-700">Remote Work</h3>
            <p className="mt-3 text-gray-600">Freedom to work from anywhere.</p>
          </div>
          <div className="bg-white border border-gray-200 p-6 w-full sm:w-80 lg:w-72 rounded-lg shadow-lg hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-700">
              Learning Opportunities
            </h3>
            <p className="mt-3 text-gray-600">
              Access to courses and skill-building programs.
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
    </div>
  );
};

export default CareersPage;
