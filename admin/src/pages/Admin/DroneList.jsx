import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import Swal from 'sweetalert2';
import { FaEye } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
function DroneList() {
  const { drones, removeDrone, updateDroneAvailability } = useContext(AdminContext);
  const [selectedDrone, setSelectedDrone] = useState(null);
  const {backendUrl,aToken,permissions,token} = useContext(AdminContext)

const navigate = useNavigate();

  const handleAvailabilityChange = async (droneId, currentAvailability) => {
  try {
    const newAvailability = !currentAvailability;

    // Show confirmation prompt before making API call
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to mark this drone as ${newAvailability ? 'Available' : 'Unavailable'}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!',
    });

    if (!result.isConfirmed) return; // If user cancels, exit

    // Proceed with API call
  await axios.post(
  `${backendUrl}/api/admin/changeAvailability/${droneId}`,
  { availability: newAvailability },
  {
    headers: {
      Authorization: `Bearer ${aToken}`,
    },
  }
);


    updateDroneAvailability(droneId, newAvailability);

    // Show success message
    Swal.fire({
      title: 'Success!',
      text: `Drone is now marked as ${newAvailability ? 'Available' : 'Unavailable'}.`,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      window.location.reload();
    });

  } catch (error) {
    console.error("Error updating availability:", error);
    Swal.fire({
      title: 'Error!',
      text: 'Failed to update drone availability.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};

  // const token = localStorage.getItem("aToken") || localStorage.getItem("dToken");

  // ✅ Check permission
  const hasAccess = aToken || permissions.includes("Total Drones");

  if (!hasAccess) {
    // Option 1: Show nothing
    return null;

    // Option 2: Show unauthorized message
    // return <div className="text-red-600 p-4 font-semibold">Unauthorized: You do not have permission to view this page.</div>;

    // Option 3: Redirect to unauthorized page
    // return <Navigate to="/unauthorized" />;
  }
  return (
    <div className='m-5 max-h-[90vh] overflow-y-auto'>
      <h1 className='text-2xl font-semibold mb-4'>All Drones</h1>

      {/* Drone Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {drones.map((item) => (
          <div
            key={item.id}
            className='border rounded-lg shadow-md overflow-hidden bg-white transition-all hover:shadow-lg cursor-pointer'
           
          >
            <img className='w-full h-40 object-cover' src={item.image} alt="Drone"   />
            <div className='p-4'>
              <p className='text-lg font-semibold text-gray-800'>{item.model}</p>
              <p className='text-gray-600 text-sm'>Price: {item.price}</p>
              <p className='text-gray-600 text-sm'>District: {item.district}</p>

              <div className='flex justify-between items-center mt-3'>
                <label className='flex items-center text-sm'>
                  <input
                    type="checkbox"
                    checked={item.availability}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleAvailabilityChange(item.id, item.availability);
                    }}
                    className='mr-2'
                  />
                  {item.availability ? 'Available' : 'Unavailable'}
                </label>
                <button onClick={() => setSelectedDrone(item)}>
                  <FaEye />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDrone(item.id);
                  }}
                  className= 'mt-2 bg-blue-400 px-4 py-1 rounded-full text-white text-sm'
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Drone Details Modal */}
      {selectedDrone && (
      <div
  className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-5'
  onClick={() => setSelectedDrone(null)}
>
  <div
    className='bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-lg'
    onClick={(e) => e.stopPropagation()}
  >
    {/* Fixed Header */}
    <div className='p-4 border-b bg-white sticky top-0 z-10'>
      <h2 className='text-2xl font-bold text-center'>
        {selectedDrone.model} Details
      </h2>
    </div>

    {/* Scrollable Content */}
    <div className='p-6 overflow-y-auto flex-grow'>
      <div className='grid grid-cols-2 gap-4'>
        {Object.entries(selectedDrone).map(
          ([key, value]) =>
            key !== '_id' &&
            key !== '__v' &&
            key !== 'image' && (
              <div key={key}>
                <label className='block text-black font-bold'>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  className='w-full p-2 border rounded'
                  value={value}
                  readOnly
                />
              </div>
            )
        )}
      </div>
    </div>

    {/* Fixed Footer Buttons */}
    <div className='p-4 border-t bg-white sticky bottom-0 z-10 flex justify-center gap-4'>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-10 py-2 rounded"
        onClick={() => {
          navigate(`/admin/updateDrone/${selectedDrone.id}`, {
            state: selectedDrone,
          });
          window.location.reload();
        }}
      >
        Edit
      </button>
      <button
        className='bg-red-500 hover:bg-red-600 text-white px-10 py-2 rounded'
        onClick={() => setSelectedDrone(null)}
      >
        Close
      </button>
    </div>
  </div>
</div>

      )}
    </div>
  );
}

export default DroneList;
