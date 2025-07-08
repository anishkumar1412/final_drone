import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import the required styles
import { addDays, format } from "date-fns"; // Import date-fns to add days and format dates

const BookProduct = () => {

  const { userData, token, crops, backendUrl } = useContext(AppContext);

  const [crop, setCrop] = useState("");
  const [landPrice, setLandPrice] = useState("");
  const [specificLandPrice, setSpecificLandPrice] = useState("");
  const [workingDays, setWorkingDays] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [villagePanchayat, setVillagePanchayat] = useState(userData.villageName);
  const [pinCode, setPinCode] = useState(userData.pin);
  const [email, setEmail] = useState("");
  const [cropImage, setCropImage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [cropPrice, setCropPrice] = useState(0)
  const [endDate, setEndDate] = useState(null)
  const [data, setData] = useState([]);


  const navigate = useNavigate()

  const [numbers, setNumbers] = useState([]);
  // const { userData, token, crops ,backendUrl} = useContext(AppContext); // Assuming you have setStartDate and setEndDate in AppContext

  const location = useLocation();

  const { drone, selectedDate } = location.state || {};

  console.log("Selceting date is coming here", drone, selectedDate)

  const [startDate, setStartDate] = useState(selectedDate);

  console.log(drone.image)



  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen); // Toggle calendar visibility
  };


  useEffect(() => {
    if (specificLandPrice && cropPrice) {
      setSubtotal(specificLandPrice * cropPrice);
    }
  }, [specificLandPrice, cropPrice]);


  // Logic to automatically set working days based on land selection

  const handleBooked = async (e) => {
    e.preventDefault();

    if (subtotal < 500) {
      alert("Minimum ₹500 required to book the product");
      return;
    }

    try {
      // Check if required fields are present
      if (
        !crop || !landPrice || !specificLandPrice || !workingDays ||
        !startDate || !endDate || !villagePanchayat || !pinCode ||
        !drone || !drone._id || !drone.image
      ) {
        const missingFields = [];

        if (!crop?.trim()) missingFields.push("Crop");
        if (!landPrice) missingFields.push("Land Price");
        if (!specificLandPrice) missingFields.push("Specific Land Price");
        if (!workingDays) missingFields.push("Working Days");
        if (!startDate) missingFields.push("Start Date");
        if (!endDate) missingFields.push("End Date");
        if (!villagePanchayat?.trim()) missingFields.push("Village Panchayat");
        if (!pinCode) missingFields.push("Pin Code");

        if (!drone || typeof drone !== 'object') {
          missingFields.push("Drone (full object)");
        } else {
          if (!drone.id) missingFields.push("Drone ID");
          if (!drone.image) missingFields.push("Drone Image");
        }

        if (missingFields.length > 0) {
          console.log("Detected missing fields:", missingFields); // ✅ log to dev tools
          alert("Please fill in the following fields:\n" + missingFields.join(", "));
          return;
        }

      }


      const bookingData = {
        crop,
        landPrice,
        specificLandPrice,
        workingDays,
        subtotal,
        villagePanchayat,
        pinCode,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
        droneId: drone.id,
        droneImg: drone.image,
        droneName: drone.model,

        // Optional field (if backend doesn't need it, remove it)
        cropImage,

        // Default backend expected fields
        pilot: null,
        copilot: null,
        pilotName: null,
        copilotName: null,
        pilotMobile: null,
        copilotMobile: null,
        workCompleted: false,
        pilotConfirm: false,
        copilotConfirm: false,
        orderConfirmed: false,
        pilotCancelled: false,
        copilotCancelled: false,
        total: 0,
        done: 0,
        pending: 0,
        workProgress: [],   // ✅ backend expects a string
        progress: 0,        // ✅ backend expects a number
        farmerVerifiedComplete: false,
        cropPrice
      };

      console.log("Booking data to send:", bookingData);

      const response = await axios.post(`${backendUrl}/api/booking/book`, bookingData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success("Booking successful!");
        navigate('/my-order');
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
    setTimeout(calculateSubtotal, 0)
    console.log(cropPrice)

  };


  const normalizeDate = (date) => {
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

//  const handleStartDateChange = (date) => {
//   setIsCalendarOpen(false);
//   setStartDate(date);

//   if (workingDays > 0) {
//     // bookings might be a string from backend, parse it if needed
//     const bookingsArray = Array.isArray(drone.bookings)
//       ? drone.bookings
//       : JSON.parse(drone.bookings || "[]");

//     // Collect all booked dates in a Set (format: yyyy-mm-dd)
//     const bookedDatesSet = new Set();
//     bookingsArray.forEach(({ startDate, endDate }) => {
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       const current = new Date(start);

//       while (current <= end) {
//         bookedDatesSet.add(current.toISOString().split("T")[0]);
//         current.setDate(current.getDate() + 1);
//       }
//     });

//     // Now compute endDate by skipping booked dates
//     let tempDate = new Date(date);
//     let countedDays = 0;

//     while (countedDays < workingDays) {
//       const dateStr = tempDate.toISOString().split("T")[0];
//       if (!bookedDatesSet.has(dateStr)) {
//         countedDays++;
//       }

//       if (countedDays < workingDays) {
//         tempDate.setDate(tempDate.getDate() + 1);
//       }
//     }

//     setEndDate(new Date(tempDate));
//   }
// };


const handleStartDateChange = (date) => {
  setIsCalendarOpen(false);
  setStartDate(date);

  if (workingDays > 0) {
    const bookingsArray = Array.isArray(drone.bookings)
      ? drone.bookings
      : JSON.parse(drone.bookings || "[]");

    const bookedDatesSet = new Set();
    bookingsArray.forEach(({ startDate, endDate }) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let current = new Date(start);
      while (current <= end) {
        bookedDatesSet.add(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
    });

    let tempDate = new Date(date);
    let counted = 0;
    let lastValidDate = null;

    // Loop until we collect the required number of valid (non-booked) days
    while (counted < workingDays) {
      const dateStr = tempDate.toISOString().split("T")[0];

      if (!bookedDatesSet.has(dateStr)) {
        counted++;
        lastValidDate = new Date(tempDate); // update only if valid
      }

      tempDate.setDate(tempDate.getDate() + 1); // move to next day
    }

    setEndDate(lastValidDate); // this is the last non-booked day counted
  }
};









  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/get-working-days`); // Change to your API URL
        setData(response.data.workingDays);
        console.log("the working days data is here", response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [landPrice]);

  const handleLandSelection = (value) => {

    setSpecificLandPrice(value)
    setLandPrice(cropPrice);

    const matchedData = data.find(
      (item) => value >= item.startAcre && value <= item.endAcre
    );

    setWorkingDays(matchedData ? matchedData.workingDays : "No matching data found");
    setNumbers(Array.from({ length: selectedNumber }, (_, i) => i + 1));
  };

  useEffect(() => {
    handleStartDateChange(startDate);
  }, [workingDays, startDate]); // Re-run whenever workingDays or startDate changes



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
          // Update calculation on every form change


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


            {/* Specific Land Price */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Specific Land (Acres) <span className="text-red-500">*</span>
              </label>

              <select className="w-full p-2 border rounded-lg mt-4" onChange={(e) => handleLandSelection(e.target.value)}>
                <option value="">Select Specific Range</option>
                {[...Array(100)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
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
                  excludeDates={Array.isArray(drone?.bookings)
                    ? drone.bookings
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
                      .flat()
                    : []
                  }
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
              <span className="text-lg text-gray-900">{specificLandPrice}</span>
            </li>
            <hr />
            <li className="flex justify-between">
              <span className="font-semibold text-gray-700 text-lg">Specific Land (per acre):</span>
              <span className="text-lg text-gray-900">₹{cropPrice || 0}</span>
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
