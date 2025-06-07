import React, { useContext, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { assset } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { AppContext } from '../Context/AppContext';
import { DistrictData } from '../assets/DistrictData';

function Drone() {
  const { drones, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [filteredDrones, setFilteredDrones] = useState([]);
  const [startDate, setStartDate] = useState(null);


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDroneId, setSelectedDroneId] = useState(null);

  const handleDateChange = (date, droneId) => {
    setSelectedDate(date); // Store the selected start date
    setSelectedDroneId(droneId); // Mark which drone's calendar should reflect the date
  };




  useEffect(() => {
    filterDrones(selectedState, selectedDistrict, startDate);
  }, [drones, selectedState, selectedDistrict, startDate]);

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedDistrict('All'); // Reset district when state changes
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleBook = (drone, startDate) => {


    if (!token) {

      if (!selectedDate) {
        alert("Please select a start date before booking.");
        return;
      } else {


        navigate('/login');
        window.scrollTo(0, 0);
      }
    } else {

      if (!selectedDate) {
        alert("Please select a start date before booking.");
        return;
      }

      if (selectedDistrict === 'All' || selectedState === 'All') {
        alert("Please select the state and distric both")
        return;
      }

      console.log("This is the data", drone, selectedDate)
      navigate('/book-your-drone', { state: { drone, selectedDate } });
      window.scrollTo(0, 0);
    }
  };

  const filterDrones = (state, district, start) => {
    let filtered = drones;

    if (state !== 'All') {
      filtered = filtered.filter(drone => drone.state === state);
    }

    if (district !== 'All') {
      filtered = filtered.filter(drone => drone.district === district);
    }



    setFilteredDrones(filtered);
  };

  return (
    <>
      <div className="relative">
        <div className="h-[300px] md:h-[400px] bg-cover bg-center relative" style={{ backgroundImage: `url(${assset.serviceinnerimage})` }}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Book Your Drone</h1>
            <p className="text-sm md:text-lg max-w-3xl px-4">
              Aerial filming with drones is the future of sports photography, TV commercials, and more.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-center mb-4">
          <select className="w-full md:w-1/3 p-2 border rounded-lg text-sm" value={selectedState} onChange={handleStateChange}>
            <option value="All">All States</option>
            {Object.keys(DistrictData).map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mb-4">
          <select className="w-full md:w-1/3 p-2 border rounded-lg text-sm" value={selectedDistrict} onChange={handleDistrictChange}>
            <option value="All">All Districts</option>
            {selectedState !== 'All' && DistrictData[selectedState]?.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        {/* <div className="flex justify-center mb-6">
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Start Date"
            className="p-2 border rounded-lg"
          />
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDrones.length > 0 ? (
            filteredDrones.map((drone) => (
              <div
                key={drone.id}
                className="bg-white rounded-lg shadow-lg p-4 flex flex-col transition-all duration-300 hover:shadow-2xl"
              >
                <div className="flex flex-col md:flex-row items-center md:items-start mb-4 w-full">
                  <div className="w-28 h-28 md:w-36 md:h-36 mb-4 md:mb-0 flex-shrink-0 border rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={drone.image}
                      alt={drone.model}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left w-full md:ml-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">{drone.model}</h2>
                    <ul className="text-gray-600 text-sm md:text-base mb-4 space-y-2">
                      <li>Range: {drone.range}</li>
                      <li>Price: {drone.price}</li>
                      <li>Location: {drone.district.substring(0, 5)}..</li>
                    </ul>
                  </div>
                </div>
                <DatePicker
                  inline
                  selected={selectedDroneId === drone._id ? selectedDate : null} // Show date only for selected drone
                  onChange={(date) => handleDateChange(date, drone._id)}
                  minDate={new Date()}
                  excludeDates={
                    (() => {
                      let bookingsArray = [];

                      if (drone.bookings) {
                        if (typeof drone.bookings === "string") {
                          try {
                            bookingsArray = JSON.parse(drone.bookings);
                          } catch (error) {
                            console.error("Invalid JSON in drone.bookings:", drone.bookings);
                          }
                        } else if (Array.isArray(drone.bookings)) {
                          bookingsArray = drone.bookings;
                        }
                      }

                      return bookingsArray
                        .map((booking) => {
                          const start = new Date(booking.startDate);
                          const end = new Date(booking.endDate);
                          const dates = [];

                          let current = new Date(start); // clone to avoid mutation
                          while (current <= end) {
                            dates.push(new Date(current));
                            current.setDate(current.getDate() + 1);
                          }

                          return dates;
                        })
                        .flat();
                    })()
                  }
                  dateFormat="dd/MM/yyyy"
                  calendarClassName="custom-calendar"
                />


                {drone.availability ? (
                  <button
                    onClick={() => handleBook(drone)}
                    className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
                  >
                    Book Now
                  </button>
                ) : (
                  <button
                    disabled
                    className="mt-4 py-2 px-6 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-300"
                  >
                    Not Available
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg">No drones available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Drone;
