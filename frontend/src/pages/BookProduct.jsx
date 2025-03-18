import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import the required styles
import { addDays, format } from "date-fns"; // Import date-fns to add days and format dates

const BookProduct = () => {
  const [crop, setCrop] = useState("");
  const [landPrice, setLandPrice] = useState("");
  const [specificLandPrice, setSpecificLandPrice] = useState("");
  const [workingDays, setWorkingDays] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [villagePanchayat, setVillagePanchayat] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [email, setEmail] = useState("");
  const [cropImage, setCropImage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [cropPrice, setCropPrice] = useState(0)
  const {backendUrl} = useContext(AppContext)

  const navigate = useNavigate()
 



  const [numbers, setNumbers] = useState([]);
  const { startDate, endDate, setStartDate, setEndDate, token, crops } = useContext(AppContext); // Assuming you have setStartDate and setEndDate in AppContext

  const location = useLocation();
  const drone = location.state;

  console.log(drone.image)


  const [bookedDates, setBookedDates] = useState([]); // State to hold booked dates

  // Fetch booked dates from the backend (example API call)

  const handleLandSelect = (e) => {
    const selectedValue = e.target.value;
    setSpecificLandPrice(selectedValue);
  };

  // Logic to calculate subtotal
  const calculateSubtotal = () => {
    const specificLandCost = parseFloat(specificLandPrice) || 0;
    const total = specificLandCost * cropPrice;
    setSubtotal(total);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen); // Toggle calendar visibility
  };

  // Logic to automatically set working days based on land selection
  const handleLandSelection = (value) => {
    setLandPrice(value);
    if (value === "10 to 15") setWorkingDays(1);
    else if (value === "16 to 30") setWorkingDays(2);
    else if (value === "31 to 45") setWorkingDays(3);
    else if (value === "46 to 60") setWorkingDays(4);

    const [start, end] = value.split(' to ').map(Number);
    const rangeNumbers = [];
    for (let i = start; i <= end; i++) {
      rangeNumbers.push(i);
    }
    setNumbers(rangeNumbers);
  };

  const handleBooked = async (e) => {
    e.preventDefault(); // Prevent form from submitting and refreshing the page

    if (subtotal < 500) {
      alert("Minimum ₹500 required to book the product");
      return;
    }

    try {
      const bookingData = {
        crop,
        landPrice,
        specificLandPrice,
        workingDays,
        subtotal,
        villagePanchayat,
        pinCode,
        cropImage,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        droneId: drone._id, // Assuming drone object has an 'id'
        droneImg: drone.image
      };

      console.log("it is running")
      console.log(bookingData)

      const response = await axios.post(`${backendUrl}/api/booking/book`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,//http://localhost:5000
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success("Booking successful!");
        navigate('/my-order')
      } else {
        toast.error(response.data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };







  const handleCropChange = (selectedCrop) => {
    setCrop(selectedCrop.cropName);
    setCropImage(selectedCrop.image);
    setIsDropdownOpen(false);
    setCropPrice(selectedCrop.cropPerAcer)
    console.log(cropPrice)

  };

  

  const handleStartDateChange = (date) => {
    setIsCalendarOpen(false);
    setStartDate(date);
  
    if (workingDays > 0) {
      let calculatedEndDate = new Date(date);
      let daysAdded = 0;
      let hasBookedDate = false; // Flag to track if any booked date exists in range
  
      while (daysAdded < workingDays) {
        // Move to the next day
        calculatedEndDate = addDays(calculatedEndDate, 1);
  
        // Check if the calculatedEndDate is within any booked range
        const isBooked = drone.bookings.some((booking) => {
          const bookingStart = new Date(booking.startDate);
          const bookingEnd = new Date(booking.endDate);
          return calculatedEndDate >= bookingStart && calculatedEndDate <= bookingEnd;
        });
  
        if (isBooked) {
          hasBookedDate = true;
        } else {
          daysAdded++; // Only count non-booked dates
        }
      }
  
      // If no booked dates were encountered, reduce the end date by 1 day
      if (!hasBookedDate) {
        calculatedEndDate = addDays(calculatedEndDate, -1);
      }
  
      setEndDate(calculatedEndDate);
    }
  };
  
  
  

  const formatDate = (date) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen py-24 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl flex flex-col md:flex-row">
        {/* Left Side Form */}
        <div className="w-full md:w-2/3 p-6 md:p-10 border-b md:border-r">
          <h2 className="text-[30px] font-semibold  text-teal-600 border-b pb-2 mb-6">Book your Product</h2>
          <form
            className="grid grid-cols-1 gap-4"
            onChange={calculateSubtotal} // Update calculation on every form change


          >
            {/* Crop Field */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Crop <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                {/* Selected crop name */}
                <div
                  className="w-full p-2 border rounded-lg cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle dropdown
                >
                  {crop ? crop : "Select Crop"} {/* Display selected crop */}
                </div>

                {/* Dropdown for selecting crop */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
                    {crops.map((cropItem) => (
                      <div
                        key={cropItem._id}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleCropChange(cropItem)}
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={cropItem.image}
                            alt={cropItem.cropName}
                            className="w-10 h-10 object-cover"
                          />
                          <span>{cropItem.cropName}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Crop Image */}
              {crop && !isDropdownOpen && cropImage && (
                <div className="mt-4">
                  <img
                    src={cropImage}
                    alt={crop}
                    className="w-32 h-32 object-cover border rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Land Price */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Select Land (Acres) <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-2 border rounded-lg"
                value={landPrice}
                onChange={(e) => handleLandSelection(e.target.value)}
              >
                <option value="">Select Land Range</option>
                <option value="10 to 15">10 to 15</option>
                <option value="16 to 30">16 to 30</option>
                <option value="31 to 45">31 to 45</option>
                <option value="46 to 60">46 to 60</option>
              </select>
            </div>

            {/* Specific Land Price */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Specific Land (Acres) <span className="text-red-500">*</span>
              </label>

              <select
                className="w-full p-2 border rounded-lg mt-4"
                onChange={handleLandSelect}
              >
                <option value="">Select Specific range</option>
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>

            </div>

            {/* Working Days */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">Working Days:</label>
              <input
                type="number"
                className="w-full p-2 border rounded-lg"
                placeholder="Auto-calculated"
                value={workingDays}
                readOnly
              />
            </div>


            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Book From <span className="text-red-500">*</span>
              </label>

              <div onClick={toggleCalendar} className="cursor-pointer">
                <input
                  type="text"
                  value={formatDate(startDate)} // Use formatted date here
                  readOnly
                  className="border p-2 w-full"
                  placeholder="Select a date"
                />
              </div>

              {isCalendarOpen && (
                <DatePicker
                  inline
                  minDate={new Date()}
                  excludeDates={drone.bookings
                    .map((booking) => {
                      const start = new Date(booking.startDate);
                      const end = new Date(booking.endDate);
                      const dates = [];
                      while (start <= end) {
                        dates.push(new Date(start));
                        start.setDate(start.getDate() + 1);
                      }
                      return dates;
                    })
                    .flat()}
                  dateFormat="yyyy-MM-dd"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  calendarClassName="custom-calendar"
                />
              )}
            </div>

            {/* Book Date To */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Book To <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={formatDate(endDate)} // Display the calculated end date in the same format
                readOnly
              />
            </div>

            {/* Village Panchayat */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Village Panchayat <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={villagePanchayat}
                onChange={(e) => setVillagePanchayat(e.target.value)}
              />
            </div>

            {/* Pin Code */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Pin Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            {/* Subtotal */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Subtotal <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={`₹${specificLandPrice * cropPrice}`}
                readOnly
              />
            </div>

            {/* Book Button */}
            <button
              className="w-full py-2 mt-6 bg-teal-600 text-white rounded-lg"
              onClick={handleBooked}
            >
              Book Now
            </button>
          </form>
        </div>

        {/* Right sectin  */}

        <div className="w-full md:w-1/3 p-6 md:p-10 bg-gray-50">
          <h3 className="text-[30px] font-semibold border-b-2 pb-4 mb-6 text-teal-700">Your Order</h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="font-semibold text-gray-700 text-lg">Drone (Model):</span>
              <span className="text-lg text-gray-900">A</span>
            </li>
            <hr />
            <li className="flex justify-between">
              <span className="font-semibold text-gray-700 text-lg">Crop:</span>
              <span className="text-lg text-gray-900">{crop || "Not Selected"}</span>
            </li>
            <hr />
            <li className="flex justify-between">
              <span className="font-semibold text-gray-700 text-lg">Land:</span>
              <span className="text-lg text-gray-900">{landPrice || 0}</span>
            </li>
            <hr />
            <li className="flex justify-between">
              <span className="font-semibold text-gray-700 text-lg">Specific Land (per acre):</span>
              <span className="text-lg text-gray-900">{specificLandPrice || 0}</span>
            </li>
           
            <hr />
            <li className="flex justify-between">
              <span className="font-semibold text-gray-700 text-lg">Subtotal:</span>
              <span className="text-lg text-gray-900">₹{specificLandPrice * cropPrice}</span>
            </li>
            <hr />
          </ul>
          <p className="text-base text-red-600 font-medium mt-6">
            For Booking, You Pay Minimum ₹500
          </p>
        </div>
      </div>
    </div>
  );
};


export default BookProduct;
