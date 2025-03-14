import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import Swal from "sweetalert2";

function Appointment() {
  const { aToken, bookings, getAllBokings, cancelAppointment, formatDate, allUsers, updatePilot, updateCoPilot } = useContext(AdminContext);

  console.log(allUsers);

  const pilots = allUsers.filter((user) => user.role === "Pilot");
  const copilots = allUsers.filter((user) => user.role === "Co Pilot");

  const [editRow, setEditRow] = useState(null);
  const [editCopilotRow, setEditCopilotRow] = useState(null); // Track which row is in edit mode
  const {backendUrl} = useContext(AdminContext)

  useEffect(() => {
    getAllBokings();
  }, []);

  const [selectedPilots, setSelectedPilots] = useState({});
  const [selectedCopilots, setSelectedCopilots] = useState({});

  const handleAssignPilots = async (bookingId) => {
    try {
      const pilotId = selectedPilots[bookingId];
      const copilotId = selectedCopilots[bookingId];

      if (!pilotId || !copilotId) {
        Swal.fire({
          title: "Error!",
          text: "Need both confirmation before final confirmation.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const pilotName = pilots.find((p) => p._id === pilotId)?.name || "";
      const copilotName = copilots.find((c) => c._id === copilotId)?.name || "";

      console.log("Selected Pilot:", pilotId, pilotName, "Selected Co-Pilot:", copilotId, copilotName);

      const { data } = await axios.post(
        `${backendUrl}/api/admin/assign-pilots/${bookingId}`,
        { pilotId, copilotId, pilotName, copilotName },
        { headers: { Authorization: `Bearer ${aToken}` } }
      );

      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: "Pilots are Assigned successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.log("Server Message:", data.message);
      }

      getAllBokings();
    } catch (error) {
      console.error("Error assigning pilots:", error);
    }
  };

  const finalConfirm = async (id, pilotConfirm, copilotConfirm) => {
    try {
      console.log(pilotConfirm, copilotConfirm);

      if (pilotConfirm && copilotConfirm) {
        const { data } = await axios.post(`${backendUrl}/api/admin/confirmOrder`, { id }, {
          headers: { Authorization: `Bearer ${aToken}` }
        });

        if (data.success) {
          Swal.fire({
            title: "Success!",
            text: "Order has been confirmed successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          getAllBokings();
        } else {
          Swal.fire({
            title: "Error!",
            text: data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        }

      } else {
        Swal.fire({
          title: "Error!",
          text: "Please confirm both pilots before confirming the booking",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPilot = async (bookingId) => {
    if (!selectedPilots[bookingId]) {
      alert("Please select a pilot before saving.");
      return;
    }

    await updatePilot(bookingId, selectedPilots[bookingId], pilots.find(p => p._id === selectedPilots[bookingId])?.name);

    setEditRow(null); // Exit edit mode
  };

  const handleEditcoPilot = async (bookingId) => {
    if (!selectedCopilots[bookingId]) {
      alert("Please select a co pilot before saving.");
      return;
    }

    await updateCoPilot(bookingId, selectedCopilots[bookingId], copilots.find(p => p._id === selectedCopilots[bookingId])?.name);

    setEditCopilotRow(null); // Exit edit mode
  };


  return (
    <div className="w-full m-5">
      <p className="mb-3 text-lg font-medium">All Bookings</p>

      <div className="bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-4 text-left border-r">#</th>
              <th className="py-3 px-4 text-left border-r">Drone</th>
              <th className="py-3 px-4 text-left border-r">District</th>
              <th className="py-3 px-4 text-left border-r">Date & Time</th>
              <th className="py-3 px-4 text-left border-r">User</th>
              <th className="py-3 px-4 text-left border-r">Price</th>
              <th className="py-3 px-4 text-left border-r">Pilot</th>
              <th className="py-3 px-4 text-left border-r">Co Pilot</th>
              <th className="py-3 px-4 text-left border-r">Assign</th>
              <th className="py-3 px-4 text-left border-r">Progress</th>
              <th className="py-3 px-4 text-left border-r">Actions</th>
              <th className="py-3 px-4 text-left border-r">Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice().reverse().map((item, i) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 border-r">{i + 1}</td>
                <td className="py-3 px-4 border-r">
                  <img className="w-20 rounded-md" src={item.droneImg} alt="Drone" />
                  <p>Drone A</p>
                </td>
                <td className="py-3 px-4 border-r">{item.villagePanchayat}</td>
                <td className="py-3 px-4 border-r">
                  {formatDate(item.startDate)}, <br /> {formatDate(item.endDate)}
                </td>
                <td className="py-3 px-4 border-r">{item.user.name}</td>
                <td className="py-3 px-4 border-r">{item.subtotal}</td>


                {/* pilot field  */}

                <td className="py-3 px-4 border-r">
                  {editRow === item._id || !item.pilotName ? ( // Check if in edit mode or new booking
                    <div className="flex flex-col items-start">
                      <select
                        className="border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={selectedPilots[item._id] || ""}
                        onChange={(e) =>
                          setSelectedPilots((prev) => ({ ...prev, [item._id]: e.target.value }))
                        }
                      >
                        <option value="">Pilot</option>
                        {pilots.map((pilot) => (
                          <option key={pilot._id} value={pilot._id}>
                            {pilot.name}
                          </option>
                        ))}
                      </select>
                      <button
                        className="bg-green-500 text-white text-xs p-1 rounded-sm mt-2"
                        onClick={() => {
                          handleEditPilot(item._id)
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="relative p-3 bg-gray-100 rounded-md shadow-md">
                      <p className="text-gray-700 font-medium">
                        Assigned to <br /> <span className="font-semibold">{item.pilotName}</span>
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        {item.pilotConfirm ? <>
                          <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                            Confirmed
                          </span>
                          <button
                            className="bg-gray-600 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-700 ml-2"
                            onClick={() => setEditRow(item._id)}
                          >
                            Edit
                          </button>

                        </> : item.pilotCancelled ? (
                          <>
                            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                              Cancelled
                            </span>
                            <button
                              className="bg-gray-600 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-700 ml-2"
                              onClick={() => setEditRow(item._id)}
                            >
                              Edit
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="text-yellow-600 font-medium">Waiting for Confirmation</span>
                            <button
                              className="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-700"
                              onClick={() => setEditRow(item._id)}
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </td>



                {/* Copilot field  */}

                <td className="py-3 px-4 border-r">
                  {editCopilotRow === item._id || !item.copilotName ? ( // Check if in edit mode or new booking
                    <div className="flex flex-col items-start">
                      <select
                        className="border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={selectedCopilots[item._id] || ""}
                        onChange={(e) =>
                          setSelectedCopilots((prev) => ({ ...prev, [item._id]: e.target.value }))
                        }
                      >
                        <option value="">Copilot</option>
                        {copilots.map((copilot) => (
                          <option key={copilot._id} value={copilot._id}>
                            {copilot.name}
                          </option>
                        ))}
                      </select>
                      <button
                        className="bg-green-500 text-white text-xs p-1 rounded-sm mt-2"
                        onClick={() => {
                          handleEditcoPilot(item._id)
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="relative p-3 bg-gray-100 rounded-md shadow-md">
                      <p className="text-gray-700 font-medium">
                        Assigned to <br /> <span className="font-semibold">{item.copilotName}</span>
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        {item.copilotConfirm ? (
                          <>
                            <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                              Confirmed
                            </span>
                            <button
                              className="bg-gray-600 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-700 ml-2"
                              onClick={() => setEditCopilotRow(item._id)}
                            >
                              Edit
                            </button>
                          </>
                        ) : item.copilotCancelled ? (
                          <>
                            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                              Cancelled
                            </span>
                            <button
                              className="bg-gray-600 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-700 ml-2"
                              onClick={() => setEditCopilotRow(item._id)}
                            >
                              Edit
                            </button>
                          </>
                        ) : (
                          <>
                            <span className="text-yellow-600 font-medium">Waiting for Confirmation</span>
                            <button
                              className="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-700"
                              onClick={() => setEditCopilotRow(item._id)}
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </td>


                <td className="py-3 px-4 border-r">
                  {item.pilot && item.copilot ? (
                    <button className="bg-gray-500 text-xs text-white ml-4 px-2 py-1 rounded-md hover:bg-gray-600">
                      Assigned
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAssignPilots(item._id)}
                      className="bg-green-500 text-white text-xs ml-4 px-2 py-1 rounded-md hover:bg-green-600"
                    >
                      Assign
                    </button>
                  )}
                </td>


                <td className="py-3 px-4 border-r">
                  {item.workCompleted ? (
                    <button className="bg-green-500 py-1 px-2 text-white rounded-md text-xs">Completed</button>
                  ) : (
                    (() => {
                      // Filter only verified work progress
                      const verifiedWork = (item.workProgress ?? []).filter(work => work.farmerVerified);

                      // Calculate total verified work done
                      const totalVerifiedDone = verifiedWork.reduce((sum, work) => sum + Number(work.done), 0);

                      return verifiedWork.length > 0 ? (
                        <>
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-4 px-2">
                              <span className="font-semibold text-gray-700">Target:</span>
                              <span className="text-gray-900 bg-gray-200 px-2 py-1 rounded-md">{item.specificLandPrice}A</span>
                            </p>

                            <p className="flex items-center gap-4 px-2">
                              <span className="font-semibold text-gray-700">Pending:</span>
                              <span className="text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-md">
                                {Math.max(item.specificLandPrice - totalVerifiedDone, 0)}A
                              </span>
                            </p>

                            <p className="flex items-center gap-4 px-2">
                              <span className="font-semibold text-gray-700">Total:</span>
                              <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-md">
                                {totalVerifiedDone}A
                              </span>
                            </p>

                            <p className="flex items-center gap-4 px-2">
                              <span className="font-semibold text-gray-700">Extra:</span>
                              <span className="text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-md">
                                {Math.max(totalVerifiedDone - item.specificLandPrice, 0)}A
                              </span>
                            </p>


                            {verifiedWork.length > 0 && (
                              <div className="px-2 space-y-1">
                                <span className="font-semibold text-gray-700">Done:</span>
                                {verifiedWork.map((work, index) => (
                                  <p key={index} className="flex items-center gap-4">
                                    <span className="text-gray-600 text-xs">{formatDate(work.date)}</span>
                                    <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-md">{work.done}A</span>
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-4 px-2">
                              <span className="font-semibold text-gray-700">Target:</span>
                              <span className="text-gray-900 bg-gray-200 px-2 py-1 rounded-md">{item.specificLandPrice}A</span>
                            </p>

                            <p className="flex items-center gap-4 px-2">
                              <span className="font-semibold text-gray-700">Pending:</span>
                              <span className="text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-md">{item.specificLandPrice}A</span>
                            </p>

                            <p className="flex items-center gap-4 px-2">
                              <span className="font-semibold text-gray-700">Done:</span>
                              <span className="text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-md">0A</span>
                            </p>
                          </div>
                        </>
                      );
                    })()
                  )}
                </td>






                <td className="  py-3 px-4 border-r">
                  {
                    !item.cancelled ? <div className="flex flex-col items-center justify-center gap-4">
                      {
                        item.orderConfirmed ?
                          <button className="bg-green-700 text-white px-2 py-1 rounded-md">Confirmed</button>
                          : <button
                            onClick={() => finalConfirm(item._id, item.pilotConfirm, item.copilotConfirm)}
                            className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md hover:bg-blue-600"
                          >
                            Confirm
                          </button>
                      }
                      <button className="bg-red-700 text-white px-2 py-1 rounded-md "
                        onClick={() => cancelAppointment(item)}
                      >Cancel</button>
                    </div>
                      :
                      <button className="bg-red-700 text-white px-2 py-1 rounded-md ">Cancelled</button>
                  }
                </td>

                <td className=" py-3 px-4" >Pending</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointment;


