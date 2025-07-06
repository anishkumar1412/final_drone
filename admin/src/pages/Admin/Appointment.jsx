import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "react-modal"
import * as XLSX from "xlsx";


Modal.setAppElement('#root')

function Appointment() {
  const { aToken, dtoken, bookings, getAllBokings, cancelAppointment, formatDate, allUsers, updatePilot, updateCoPilot, token } = useContext(AdminContext);

  console.log(allUsers);

  const pilots = allUsers.filter((user) => user.role === "Pilot");
  const copilots = allUsers.filter((user) => user.role === "Co Pilot");

  const [editRow, setEditRow] = useState(null);
  const [editCopilotRow, setEditCopilotRow] = useState(null); // Track which row is in edit mode
  const { backendUrl } = useContext(AdminContext)
  const { modalIsOpen, setModalIsOpen } = useContext(AdminContext);
  const { cancellationReason, setCancellationReason } = useContext(AdminContext);
  const { customMessage, setCustomMessage } = useContext(AdminContext);
  const { selectedDrone, setSelectedDrone } = useContext(AdminContext);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [expanded, setExpanded] = useState(false);
  // 
  const [isOpen, setIsOpen] = useState(false);

  const [filters, setFilters] = useState({

    droneName: "",
    id: "",
    pilotName: "",
    copilotName: "",
    userName: "",
    villagePanchayat: "",
    status: "",
    startDate: "",
    startAcre: "",
    endAcre: "",


  });
  const handleDownloadExcel = () => {
    const formattedData = bookings.map((item) => ({
      OrderID: item.id,
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

      if (!pilotId || copilotId === undefined) {
        Swal.fire({
          title: "Error!",
          text: "Need both selection before assigning.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const pilot = pilots.find((p) => String(p.id) === String(pilotId));
      const copilot = copilots.find((c) => String(c.id) === String(copilotId));

      const pilotName = pilot?.name || "";
      const pilotMobile = pilot?.mobNumber || "";
      const copilotName = copilot?.name || "";
      const copilotMobile = copilot?.mobNumber || "";

      console.log("Selected Pilot:", pilotId, pilotName, pilotMobile);
      console.log("Selected Co-Pilot:", copilotId, copilotName, copilotMobile);


      console.log("Sending payload:", {
        pilot: Number(pilotId),
        copilot: Number(copilotId),
        pilotName,
        pilotMobile,
        copilotName,
        copilotMobile
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/assign-pilots/${bookingId}`,
        {
          pilotId: Number(pilotId),
          copilotId: Number(copilotId),
          pilotName,
          pilotMobile,
          copilotName,
          copilotMobile
        },
        {
          headers: { Authorization: `Bearer ${aToken}` },
        }
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

  const finalConfirm = async (id, pilotConfirm, copilotConfirm, copilotName) => {
    try {
      console.log("Pilot Confirm:", pilotConfirm);
      console.log("Copilot Confirm:", copilotConfirm);
      console.log("Copilot Name:", copilotName);

      const isCopilotConfirmed = copilotConfirm || copilotName === "no copilot";

      if (pilotConfirm && isCopilotConfirmed) {
        const { data } = await axios.post(
          `${backendUrl}/api/admin/confirmOrder`,
          { id },
          {
            headers: { Authorization: `Bearer ${aToken}` },
          }
        );

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
          text: "Please confirm both pilots before confirming the booking (or explicitly set 'no copilot')",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.log("Error confirming final order:", error);
    }
  };

  const handleEditPilot = async (bookingId) => {
    if (!selectedPilots[bookingId]) {
      alert("Please select a pilot before saving.");
      return;
    }

    await updatePilot(bookingId, selectedPilots[bookingId], pilots.find(p => p.id === selectedPilots[bookingId])?.name);

    setEditRow(null); // Exit edit mode
  };

  const handleEditcoPilot = async (bookingId) => {
    const selectedCopilotId = selectedCopilots[bookingId];

    // Allow "no copilot" as valid
    if (!selectedCopilotId && selectedCopilotId !== "no copilot") {
      alert("Please select a co pilot before saving.");
      return;
    }

    // Determine copilot ID and name
    const isNoCopilot = selectedCopilotId === "no copilot";

    const copilotIdToSend = isNoCopilot ? null : selectedCopilotId;
    const copilotNameToSend = isNoCopilot
      ? "no copilot"
      : copilots.find(p => p.id === selectedCopilotId)?.name || "";

    await updateCoPilot(bookingId, copilotIdToSend, copilotNameToSend);

    window.location.reload()

    setEditCopilotRow(null); // Exit edit mode
  };
  const filteredBookings = bookings.filter((item) => {
    const {
      droneName,
      id,
      pilotName,
      copilotName,
      userName,
      villagePanchayat,
      status,
      startDate,
      startAcre,
      endAcre,
    } = filters;

    if (
      droneName &&
      !item.droneName?.toLowerCase().includes(droneName.toLowerCase())
    )
      return false;

    if (id && !item.id?.toLowerCase().includes(id.toLowerCase()))
      return false;

    if (
      pilotName &&
      !item.pilotName?.toLowerCase().includes(pilotName.toLowerCase())
    )
      return false;

    if (
      copilotName &&
      !item.copilotName?.toLowerCase().includes(copilotName.toLowerCase())
    )
      return false;

    if (
      userName &&
      !item.user?.name?.toLowerCase().includes(userName.toLowerCase())
    )
      return false;

    if (
      villagePanchayat &&
      !item.villagePanchayat
      
        ?.toLowerCase()
        
        .includes(villagePanchayat.toLowerCase())
        
    )
      return false;

    if (
      status &&
      !(
        (status.toLowerCase() === "cancelled" && item.cancelled) ||
        (status.toLowerCase() === "completed" && item.workCompleted)
      )
    )
      return false;

    if (startDate) {
      const searchDate = new Date(startDate);
      const sDate = new Date(item.startDate);
      const eDate = new Date(item.endDate);
      if (!(searchDate >= sDate && searchDate <= eDate)) return false;
    }

    if (startAcre || endAcre) {
      const start = parseFloat(startAcre);
      const end = parseFloat(endAcre);
      const price = parseFloat(item.specificLandPrice);

      if (
        (startAcre && isNaN(start)) ||
        (endAcre && isNaN(end)) ||
        (startAcre && price < start) ||
        (endAcre && price > end)
      ) {
        return false;
      }
    }

    return true;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Number of items per page

  // ... existing useEffect and other functions ...

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice().reverse().slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination controls component
  const PaginationControls = () => (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">
        Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBookings.length)} of {filteredBookings.length} results
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ?
            'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          // Show only first, last, and nearby pages
          if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
            return (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-3 py-2 rounded-md ${currentPage === page ?
                  'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {page}
              </button>
            );
          }
          return null;
        })}

        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ?
            'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full m-5">
      <p className="mb-3 text-lg font-medium">All Bookings</p>

      <div className="flex flex-wrap items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Drone Name"
          value={filters.droneName}
          onChange={(e) => setFilters({ ...filters, droneName: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1 w-48"
        />

        <input
          type="text"
          placeholder="Booking ID"
          value={filters.id}
          onChange={(e) => setFilters({ ...filters, id: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1 w-48"
        />

        <select
          value={filters.pilotName}
          onChange={(e) => setFilters({ ...filters, pilotName: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1 w-48"
        >
          <option value="">All Pilots</option>
          {pilots.map((pilot) => (
            <option key={pilot.id} value={pilot.name}>
              {pilot.name}
            </option>
          ))}
        </select>

        <select
          value={filters.copilotName}
          onChange={(e) => setFilters({ ...filters, copilotName: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1 w-48"
        >
          <option value="">All Co-Pilots</option>
          {copilots.map((copilot) => (
            <option key={copilot.id} value={copilot.name}>
              {copilot.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="User Name"
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1 w-48"
        />

        <input
          type="text"
          placeholder="District"
          value={filters.villagePanchayat}
          onChange={(e) =>
            setFilters({ ...filters, villagePanchayat: e.target.value })
          }
          className="border border-gray-300 rounded-md px-3 py-1 w-48"
        />

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1 w-48"
        >
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1 w-48"
        />

        {/* New Inputs for Acre Range */}
        <input
          type="number"
          placeholder="Start Acre"
          value={filters.startAcre}
          onChange={(e) => setFilters({ ...filters, startAcre: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1 w-48"
        />

        <input
          type="number"
          placeholder="End Acre"
          value={filters.endAcre}
          onChange={(e) => setFilters({ ...filters, endAcre: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-1 w-48"
        />

        {Object.values(filters).some((val) => val) && (
          <button
            className="bg-red-500 text-white px-4 py-1 rounded-md"
            onClick={() =>
              setFilters({
                droneName: "",
                id: "",
                pilotName: "",
                copilotName: "",
                userName: "",
                villagePanchayat: "",
                status: "",
                startDate: "",
                startAcre: "",
                endAcre: "",
              })
            }
          >
            Clear Filters
          </button>
        )}
      </div>

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
              <th className="py-3 px-4 text-left border-r">Village</th>
              <th className="py-3 px-4 text-left border-r">Date & Time</th>
              <th className="py-3 px-4 text-left border-r">User</th>
              <th className="py-3 px-4 text-left border-r">Price</th>
              <th className="py-3 px-4 text-left border-r">Pilot</th>
              <th className="py-3 px-4 text-left border-r">Co Pilot</th>
              <th className="py-3 px-4 text-left border-r">Proof</th>
              <th className="py-3 px-4 text-left border-r">Assign</th>
              <th className="py-3 px-4 text-left border-r">Actions</th>
              <th className="py-3 px-4 text-left border-r">Progress</th>
              <th className="py-3 px-4 text-left border-r">Payment</th>
              <th className="py-3 px-4 text-left border-r">Updated at</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, i) => (

                // filteredBookings.length > 0 ? (
                //   filteredBookings.slice().reverse().map((item, i) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">

                  <td
                    className="py-3 px-4 border-r cursor-pointer"
                    onClick={() => setExpanded(!expanded)}
                  >
                    {expanded ? item.bookingId : item.bookingId ? `${item.bookingId.toString().slice(0, 1)}..` : ""}

                  </td>
                  <td className="py-3 px-4 border-r">
                    <img className="w-20 rounded-md" src={item.droneImg} alt="Drone" />
                    <p> {item.droneName}</p>
                  </td>
                  <td className="py-3 px-4 border-r">{item.villagePanchayat}</td>
                  <td className="py-3 px-4 border-r">
                    {formatDate(item.startDate)}, <br /> {formatDate(item.endDate)}
                  </td>
                  <td className="py-3 px-4 border-r">{item.user.name}</td>
                  <td className="py-3 px-4 border-r">{item.subtotal}</td>


                  {/* pilot field  */}



                  <td className="py-3 px-4 border-r">
                    {
                      item.workCompleted && item.farmerVerifiedComplete ? (
                        <div className="p-3 bg-gray-100 rounded-md shadow-md">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                            Completed
                          </span>
                        </div>
                      ) :

                        item.cancelled ? ( // Check if booking is cancelled
                          <div className="p-3 bg-gray-100 rounded-md shadow-md">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                              Cancelled
                            </span>
                          </div>
                        ) : editRow === item.id || !item.pilotName ? ( // Check if in edit mode or new booking
                          <div className="flex flex-col items-start">
                            <select
                              className="border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              value={selectedPilots[item.id] || ""}
                              onChange={(e) =>
                                setSelectedPilots((prev) => ({ ...prev, [item.id]: e.target.value }))
                              }
                            >
                              <option value="">Pilot</option>
                              {pilots.map((pilot) => (
                                <option key={pilot.id} value={pilot.id}>
                                  {pilot.name}
                                </option>
                              ))}
                            </select>
                            <button
                              className="bg-green-500 text-white text-xs p-1 rounded-sm mt-2"
                              onClick={() => {
                                handleEditPilot(item.id);
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
                                    onClick={() => setEditRow(item.id)}
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
                                    onClick={() => setEditRow(item.id)}
                                  >
                                    Edit
                                  </button>
                                </>
                              ) : (
                                <>
                                  <span className="text-yellow-600 font-medium">Waiting for Confirmation</span>
                                  <button
                                    className="absolute top-2 right-2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md hover:bg-gray-700"
                                    onClick={() => setEditRow(item.id)}
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
                    {
                      item.workCompleted && item.farmerVerifiedComplete ? ( // Check if booking is cancelled
                        <div className="p-3 bg-gray-100 rounded-md shadow-md">
                          <span className="bg-green-500 text-white px-3 py-1 rounded-md text-sm">
                            Completed
                          </span>
                        </div>
                      ) :




                        item.cancelled ? ( // Check if booking is cancelled
                          <div className="p-3 bg-gray-100 rounded-md shadow-md">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                              Cancelled
                            </span>
                          </div>
                        ) : editCopilotRow === item.id || !item.copilotName ? ( // Check if in edit mode or new booking
                          <div className="flex flex-col items-start">
                            <select
                              className="border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              value={selectedCopilots[item.id] || ""}
                              onChange={(e) =>
                                setSelectedCopilots((prev) => ({ ...prev, [item.id]: e.target.value }))
                              }
                            >
                              <option value=""> Copilot</option>
                              <option value="no copilot">No Copilot</option>

                              {copilots.map((copilot) => (
                                <option key={copilot.id} value={copilot.id}>
                                  {copilot.name}
                                </option>
                              ))}
                            </select>
                            <button
                              className="bg-green-500 text-white text-xs p-1 rounded-sm mt-2"
                              onClick={() => {
                                handleEditcoPilot(item.id);
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
                                    onClick={() => setEditCopilotRow(item.id)}
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
                                    onClick={() => setEditCopilotRow(item.id)}
                                  >
                                    Edit
                                  </button>
                                </>
                              ) : (
                                <div className="flex items-center justify-between bg-gray-100 px-2 py-1 rounded shadow-sm">
                                  {item.copilotName === "no copilot" ? (
                                    <span className="bg-gray-400 text-white text-xs px-2 py-0.5 rounded">
                                      No Copilot Assigned
                                    </span>
                                  ) : (
                                    <span className="bg-yellow-400 text-white text-xs px-2 py-0.5 rounded">
                                      Waiting for Confirmation
                                    </span>
                                  )}
                                  <button
                                    className="ml-2 bg-gray-600 text-white text-xs px-2 py-0.5 rounded hover:bg-gray-700 transition-all"
                                    onClick={() => setEditCopilotRow(item.id)}
                                  >
                                    Edit
                                  </button>
                                </div>


                              )}
                            </div>
                          </div>
                        )}
                  </td>
                  <td className="py-3 px-4 border-r relative">
                    {item.fieldImage ? (
                      <>
                        <img
                          src={item.fieldImage}
                          alt="proof"
                          className="w-20 h-20 object-cover cursor-pointer hover:opacity-80"
                          onClick={() => setIsOpen(true)}
                        />

                        {/* Modal/Overlay */}
                        {isOpen && (
                          <div
                            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                            onClick={() => setIsOpen(false)}
                          >
                            <img
                              src={item.fieldImage}
                              alt="Large Preview"
                              className="max-w-full max-h-full rounded-lg"
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <p>No Proof</p>
                    )}
                  </td>

                  <td className="py-3 px-4 border-r">
                    {item.pilot && (item.copilot || item.copilot === null || item.copilot === "no copilot") ? (
                      <button className="bg-gray-500 text-xs text-white ml-4 px-2 py-1 rounded-md hover:bg-gray-600">
                        Assigned
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAssignPilots(item.id)}
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
                            : <> <button
                              onClick={() =>
                                finalConfirm(item.id, item.pilotConfirm, item.copilotConfirm, item.copilotName)
                              }


                              className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md hover:bg-blue-600"
                            >
                              Confirm
                            </button>
                              <button className="bg-red-700 text-white px-2 py-1 rounded-md "
                                onClick={() => cancelAppointment(item)}
                              >Cancel</button></>
                        }

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
                      onClick={() => { cancelAppointment(selectedDrone); closeModal() }}


                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Confirm Cancellation
                    </button>
                  </Modal>
                  

                  {/* Aciton of work */}

                  <td className="py-3 px-4 border-r relative">
                    {item.workCompleted && item.farmerVerifiedComplete ? (
                      <>
                        <div className="flex">
                          <button className="bg-green-500 text-white px-2 py-1 rounded-md text-xs">Completed</button>
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs ml-2"
                            onClick={() => toggleDetails(item.id)}
                          >
                            Info
                          </button>
                        </div>

                        {selectedItemId === item.id && (
                          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white shadow-lg p-6 rounded-lg border w-80 max-w-md z-10">
                              <h3 className="font-semibold text-gray-800 text-lg">Work Details</h3>

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
                                  <span className="text-blue-600 font-semibold">{Number(item.specificLandPrice) || 0}A</span>
                                </p>
                                <p className="flex justify-between">
                                  <span className="font-semibold">Completed State:</span>
                                  <span className={`font-semibold ${item.workCompleted ? "text-green-600" : "text-red-600"}`}>
                                    {item.workCompleted ? "Completed" : "Pending"}
                                  </span>
                                </p>
                              </div>

                              <hr className="my-2" />

                              {/* Parse workProgress safely */}
                              {(() => {
                                let workProgress = [];
                                try {
                                  workProgress = Array.isArray(item.workProgress)
                                    ? item.workProgress
                                    : JSON.parse(item.workProgress || "[]");
                                } catch {
                                  workProgress = [];
                                }

                                if (workProgress.length > 0) {
                                  return (
                                    <ul className="text-sm text-gray-700 mt-2 space-y-1">
                                      {workProgress.map((work, index) => (
                                        <li key={index} className="flex justify-between">
                                          <span>{formatDate(work.date)}</span>
                                          <span className="text-green-600 font-semibold">{Number(work.done) || 0}A</span>
                                        </li>
                                      ))}
                                    </ul>
                                  );
                                } else {
                                  return <p className="text-sm text-gray-500 mt-2">No details available</p>;
                                }
                              })()}

                              <hr className="my-2" />

                              {/* Calculations */}
                              {(() => {
                                let workProgress = [];
                                try {
                                  workProgress = Array.isArray(item.workProgress)
                                    ? item.workProgress
                                    : JSON.parse(item.workProgress || "[]");
                                } catch {
                                  workProgress = [];
                                }

                                const totalDone = workProgress.reduce(
                                  (acc, work) => acc + (Number(work.done) || 0),
                                  0
                                );
                                const target = Number(item.specificLandPrice) || 0;
                                const cropPrice = Number(item.cropPrice) || 0;
                                const extraWork = Math.max(totalDone - target, 0);
                                const pendingWork = Math.max(target - totalDone, 0);
                                const extraAmount = extraWork * cropPrice;

                                return (
                                  <div className="text-sm text-gray-700 space-y-1">
                                    <p className="flex justify-between">
                                      <span className="font-semibold">Total Done:</span>
                                      <span className="text-green-600 font-semibold">{totalDone}A</span>
                                    </p>
                                    <p className="flex justify-between">
                                      <span className="font-semibold">Pending:</span>
                                      <span className="text-red-600 font-semibold">{pendingWork}A</span>
                                    </p>
                                    <p className="flex justify-between">
                                      <span className="font-semibold">Extra Work:</span>
                                      <span className="text-blue-600 font-semibold">{extraWork}A</span>
                                    </p>
                                    {extraWork > 0 && (
                                      <p className="flex justify-between">
                                        <span className="font-semibold">Extra Amount:</span>
                                        <span className="text-green-700 font-semibold">₹{extraAmount}</span>
                                      </p>
                                    )}
                                  </div>
                                );
                              })()}

                              <button
                                className="bg-red-500 mt-3 py-2 px-4 text-white rounded-md w-full text-sm"
                                onClick={() => toggleDetails(item.id)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      (() => {
                        // If not completed & verified, only consider verified work
                        let workProgress = [];
                        try {
                          workProgress = Array.isArray(item.workProgress)
                            ? item.workProgress
                            : JSON.parse(item.workProgress || "[]");
                        } catch {
                          workProgress = [];
                        }

                        const verifiedWork = workProgress.filter(work => work.farmerVerified);
                        const totalVerifiedDone = verifiedWork.reduce((sum, work) => sum + (Number(work.done) || 0), 0);
                        const target = Number(item.specificLandPrice) || 0;
                        const cropPrice = Number(item.cropPrice) || 0;
                        const extraWork = Math.max(totalVerifiedDone - target, 0);
                        const pending = Math.max(target - totalVerifiedDone, 0);
                        const extraAmount = extraWork * cropPrice;

                        return (
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center gap-4 px-2">
                              <span className="font-semibold text-gray-700">Target:</span>
                              <span className="text-gray-900 bg-gray-200 px-2 py-1 rounded-md">{target}A</span>
                            </p>
                            <p className="flex items-center gap-4 px-2">
                              <span className="font-semibold text-gray-700">Pending:</span>
                              <span className="text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-md">{pending}A</span>
                            </p>
                            <p className="flex items-center gap-4 px-2">
                              <span className="font-semibold text-gray-700">Extra:</span>
                              <span className="text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-md">{extraWork}A</span>
                            </p>
                            {extraWork > 0 && (
                              <p className="flex items-center gap-4 px-2">
                                <span className="font-semibold text-gray-700">Extra Amount:</span>
                                <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-md">₹{extraAmount}</span>
                              </p>
                            )}
                            <p className="flex items-center gap-4 px-2">
                              <span className="font-semibold text-gray-700">Total:</span>
                              <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-md">{totalVerifiedDone}A</span>
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
                        );
                      })()
                    )}
                  </td>



                  <td className=" py-3 px-4" >Pending</td>
                 
                  <td className=" py-3 px-4  border-l-0" >{formatDate(item.updatedAt)}</td>
                </tr>
              
                // ))

              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-center py-4 text-gray-500">
                  No results found
                </td>
              </tr>
            )}
      
         
               

             
            
         
          </tbody>
        </table>
        <PaginationControls />
      </div>
    </div>
  );
}

export default Appointment;