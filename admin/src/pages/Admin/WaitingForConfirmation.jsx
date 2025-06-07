import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal"
import * as XLSX from "xlsx";

Modal.setAppElement('#root')

function WaitingForConfirmation() {
  const { aToken,token, bookings, getAllBokings, cancelAppointment, formatDate, allUsers, updatePilot, updateCoPilot } = useContext(AdminContext);

  console.log(allUsers);

  const pilots = allUsers.filter((user) => user.role === "Pilot");
  const copilots = allUsers.filter((user) => user.role === "Co Pilot");

  const [editRow, setEditRow] = useState(null);
  const [editCopilotRow, setEditCopilotRow] = useState(null); // Track which row is in edit mode
  const { backendUrl } = useContext(AdminContext)
  const {modalIsOpen, setModalIsOpen} = useContext(AdminContext);
  const {cancellationReason, setCancellationReason} = useContext(AdminContext);
  const {customMessage, setCustomMessage} = useContext(AdminContext);
  const {selectedDrone, setSelectedDrone} = useContext(AdminContext);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const toggleDetails = (itemId) => {
    setSelectedItemId(selectedItemId === itemId ? null : itemId);
  };

  useEffect(() => {
    getAllBokings();
  }, []);

  const openModal = (drone) => {
    setSelectedDrone(drone);
    console.log("Drone data is ", drone)
    setModalIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDrone(null);
    setCancellationReason("");
    setCustomMessage("");
  };
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
        { headers: { Authorization: `Bearer ${token}` } }
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
          headers: { Authorization: `Bearer ${token}` }
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
  const handleDownloadExcel = () => {
    const formattedData = bookings.map((item) => ({
      OrderID: item._id,
      Drone: item.droneName || '',              
      District: item.villagePanchayat || '',
      Date: item.createdAt ? formatDate(item.createdAt) : '',
      Name: item.user?.name || '',
      Price: item.subtotal || '',
      Pilot: item.pilotName || '',
      Copilot: item.copilotName || '',
      Target: item.specificLandPrice || '',
      OrderConfirmed: item.orderConfirmed ? "Yes" : "No",
      Cancelled: item.cancelled ? "Yes" : "No",
      CancelledBy: item.cancelledBy || '',
      WorkCompleted: item.workCompleted ? "Yes" : "No",
      FarmerVerifiedComplete: item.farmerVerifiedComplete ? "Yes" : "No",
      WorkProgress: item.workProgress?.map(w => `${formatDate(w.date)} - ${w.done}A`).join(", ") || 'N/A',
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
  
    XLSX.writeFile(workbook, "booking_data.xlsx");
  };


  return (
    <div className="w-full m-5">
      <p className="mb-3 text-lg font-medium"> Bookings - Waiting for Confirmation from Pilot and Copilot</p>

      <div className="bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll">
      <button
  onClick={handleDownloadExcel}
  className="bg-blue-600 text-white px-4 py-2 mb-4 rounded hover:bg-blue-700"
>
  Download Excel
</button>

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
              <th className="py-3 px-4 text-left border-r">Actions</th>
              <th className="py-3 px-4 text-left border-r">Progress</th>
              <th className="py-3 px-4 text-left border-r">Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings.filter(item => 
                item.pilotName!=null && item.copilotName!=null && 
                item.pilotConfirm === false && item.copilotConfirm === false && item.cancelled!=true

            ).slice().reverse().map((item, i) => (
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
                  {item.cancelled ? ( // Check if booking is cancelled
                    <div className="p-3 bg-gray-100 rounded-md shadow-md">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                        Cancelled
                      </span>
                    </div>
                  ) : editRow === item._id || !item.pilotName ? ( // Check if in edit mode or new booking
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
                          handleEditPilot(item._id);
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
                        {item.pilotConfirm ? (
                          <>
                            <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                              Confirmed
                            </span>
                            <button
                              className="bg-gray-600 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-700 ml-2"
                              onClick={() => setEditRow(item._id)}
                            >
                              Edit
                            </button>
                          </>
                        ) : item.pilotCancelled ? (
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




              

                <td className="py-3 px-4 border-r">
                  {item.cancelled ? ( // Check if booking is cancelled
                    <div className="p-3 bg-gray-100 rounded-md shadow-md">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                       Cancelled
                      </span>
                    </div>
                  ) : editCopilotRow === item._id || !item.copilotName ? ( // Check if in edit mode or new booking
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
                          handleEditcoPilot(item._id);
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
                        onClick={() => openModal(item)}
                      >Cancel</button>
                    </div>
                      :
                      <button className="bg-red-700 text-white px-2 py-1 rounded-md ">Cancelled</button>
                  }
                </td>
                <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto mt-20"
          overlayClassName="fixed inset-0  flex items-center justify-center"
          ariaHideApp={false} 
        >
          <h2 className="text-xl font-semibold mb-4">Cancel Booking</h2>
          <label className="block mb-2 text-gray-700">
            Reason for Cancellation:
          </label>
          <select
            className="w-full border p-2 rounded mb-3"
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
          >
            <option value="">Select a reason</option>
            <option value="Change of Plan">Change of Plan</option>
            <option value="Weather Conditions">Weather Conditions</option>
            <option value="Technical Issues">Technical Issues</option>
          </select>
          <textarea
            className="w-full border p-2 rounded mb-3"
            placeholder="Additional message (optional)"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
          ></textarea>
          <button
            onClick={() => {cancelAppointment(selectedDrone); closeModal()}}
        
         
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Confirm Cancellation
          </button>
        </Modal>

                {/* Aciton of work */}

                <td className="py-3 px-4 border-r relative">
                  {item.workCompleted ? (
                    <>


                      <div className="flex">
                        <button className="bg-green-500 text-white px-2 py-1 rounded-md text-xs">
                          Completed
                        </button>
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs ml-2"
                          onClick={() => toggleDetails(item._id)}
                        >
                          Info
                        </button>
                      </div>

                      {selectedItemId === item._id && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                          <div className="bg-white shadow-lg p-6 rounded-lg border w-80 max-w-md z-10">
                            <h3 className="font-semibold text-gray-800 text-lg">
                              Work Details
                            </h3>

                            <div className="text-sm text-gray-700 mt-2 space-y-2">
                              <p className="flex justify-between">
                                <span className="font-semibold">Pilot:</span>
                                <span>{item.pilotName || "N/A"}</span>
                              </p>
                              <p className="flex justify-between">
                                <span className="font-semibold">Co-Pilot:</span>
                                <span>{item.copilotName || "N/A"}</span>
                              </p>
                              <p className="flex justify-between">
                                <span className="font-semibold">Target:</span>
                                <span className="text-blue-600 font-semibold">
                                  {Number(item.specificLandPrice) || 0}A
                                </span>
                              </p>
                              <p className="flex justify-between">
                                <span className="font-semibold">Completed State:</span>
                                <span
                                  className={`font-semibold ${item.workCompleted ? "text-green-600" : "text-red-600"
                                    }`}
                                >
                                  {item.workCompleted ? "Completed" : "Pending"}
                                </span>
                              </p>
                            </div>

                            <hr className="my-2" />

                            {item.workProgress?.length > 0 ? (
                              <ul className="text-sm text-gray-700 mt-2 space-y-1">
                                {item.workProgress.map((work, index) => (
                                  <li key={index} className="flex justify-between">
                                    <span>{formatDate(work.date)}</span>
                                    <span className="text-green-600 font-semibold">
                                      {Number(work.done) || 0}A
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-500 mt-2">
                                No details available
                              </p>
                            )}

                            <hr className="my-2" />

                            {(() => {
                              const totalWorkDone =
                                item.workProgress?.reduce(
                                  (acc, work) => acc + (Number(work.done) || 0),
                                  0
                                ) || 0;
                              const target = Number(item.specificLandPrice) || 0;
                              const pendingWork = Math.max(target - totalWorkDone, 0);
                              const extraWork = totalWorkDone > target ? totalWorkDone - target : 0;

                              return (
                                <div className="text-sm text-gray-700 space-y-1">
                                  <p className="flex justify-between">
                                    <span className="font-semibold">Total Work Done:</span>
                                    <span className="text-green-600 font-semibold">
                                      {totalWorkDone}A
                                    </span>
                                  </p>
                                  <p className="flex justify-between">
                                    <span className="font-semibold">Pending:</span>
                                    <span className="text-red-600 font-semibold">
                                      {pendingWork}A
                                    </span>
                                  </p>
                                  <p className="flex justify-between">
                                    <span className="font-semibold">Extra Work:</span>
                                    <span className="text-blue-600 font-semibold">
                                      {extraWork}A
                                    </span>
                                  </p>
                                </div>
                              );
                            })()}

                            <button
                              className="bg-red-500 mt-3 py-2 px-4 text-white rounded-md w-full text-sm"
                              onClick={() => toggleDetails(item._id)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    (() => {
                      const verifiedWork = (item.workProgress ?? []).filter(
                        (work) => work.farmerVerified
                      );
                      const totalVerifiedDone = verifiedWork.reduce(
                        (sum, work) => sum + Number(work.done),
                        0
                      );

                      return verifiedWork.length > 0 ? (
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center gap-4 px-2">
                            <span className="font-semibold text-gray-700">Target:</span>
                            <span className="text-gray-900 bg-gray-200 px-2 py-1 rounded-md">
                              {item.specificLandPrice}A
                            </span>
                          </p>

                          <p className="flex items-center gap-4 px-2">
                            <span className="font-semibold text-gray-700">Pending:</span>
                            <span className="text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-md">
                              {Math.max(item.specificLandPrice - totalVerifiedDone, 0)}A
                            </span>
                          </p>

                          <p className="flex items-center gap-4 px-2">
                            <span className="font-semibold text-gray-700">Extra:</span>
                            <span className="text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-md">
                              {Math.max(totalVerifiedDone - item.specificLandPrice, 0)}A
                            </span>
                          </p>

                          <p className="flex items-center gap-4 px-2">
                            <span className="font-semibold text-gray-700">Total:</span>
                            <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-md">
                              {totalVerifiedDone}A
                            </span>
                          </p>



                          {verifiedWork.length > 0 && (
                            <div className="px-2 space-y-1">
                              <span className="font-semibold text-gray-700">Done:</span>
                              {verifiedWork.map((work, index) => (
                                <p key={index} className="flex items-center gap-4">
                                  <span className="text-gray-600 text-xs">
                                    {formatDate(work.date)}
                                  </span>
                                  <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-md">
                                    {work.done}A
                                  </span>
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1 text-sm">
                          <p className="flex items-center gap-4 px-2">
                            <span className="font-semibold text-gray-700">Target:</span>
                            <span className="text-gray-900 bg-gray-200 px-2 py-1 rounded-md">
                              {item.specificLandPrice}A
                            </span>
                          </p>

                          <p className="flex items-center gap-4 px-2">
                            <span className="font-semibold text-gray-700">Pending:</span>
                            <span className="text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-md">
                              {item.specificLandPrice}A
                            </span>
                          </p>

                          <p className="flex items-center gap-4 px-2">
                            <span className="font-semibold text-gray-700">Done:</span>
                            <span className="text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-md">
                              0A
                            </span>
                          </p>
                        </div>
                      );
                    })()
                  )}
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

export default WaitingForConfirmation;


