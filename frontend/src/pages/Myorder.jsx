import React, { useContext, useEffect, useState } from "react";
import { assset } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "react-modal";
Modal.setAppElement("#root");
function Myorder() {
  const [orders, setOrders] = useState([]);
  const { token, formatDate, userData } = useContext(AppContext);
  const [pilotTask, setPilotTask] = useState([]);
  const [copilotTask, setCopilotTask] = useState([]);
  const [target, setTarget] = useState(0);
  const [done, setDone] = useState(0);
  const [pending, setPending] = useState(0);
  const [date, setDate] = useState("");
  const [workData, setWorkData] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState(null);
  const [cancellationReason, setCancellationReason] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const { backendUrl } = useContext(AppContext)


  const [selectedItemId, setSelectedItemId] = useState(null);

  const toggleDetails = (itemId) => {
    setSelectedItemId(selectedItemId === itemId ? null : itemId);
  };

  const handleInputChange = (taskId, field, value) => {
    setWorkData((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], [field]: value },
    }));
  };

  const getCoPilotTask = async () => {
    try {
      console.log("this is the user", userData);
      console.log("Function is working");
      console.log("Token:", token); // Log token to make sure it's set
      const { data } = await axios.get(
        `${backendUrl}/api/auth/copilotTask`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API Response:", data.bookings); // Log the full response for debugging

      if (data.success) {
        setCopilotTask(data.bookings);
        console.log("co pilot task is here", data.bookings);
      } else {
        console.log(" co Pilot task error:", data.message);
      }
    } catch (error) {
      console.log("Error occurred:", error); // Log any error
    }
  };
  const getPilotTask = async () => {
    try {
      console.log("this is the user", userData);
      console.log("Function is working");
      console.log("Token:", token); // Log token to make sure it's set
      const { data } = await axios.get(
        `${backendUrl}/api/auth/pilotTask`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("API Response:", data.bookings); // Log the full response for debugging

      if (data.success) {
        setPilotTask(data.bookings);
        console.log("pilot task is here", data.bookings);
      } else {
        console.log("Pilot task error:", data.message);
      }
    } catch (error) {
      console.log("Error occurred:", error); // Log any error
    }
  };

  const cancelPilot = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (userData.role === "Pilot") {
            let name = "pilot";
            const { data } = await axios.post(
              `${backendUrl}/api/auth/pilotCancel`,
              { id, name },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (data.success) {
              Swal.fire("Cancelled!", "Pilot has been cancelled.", "success");
            } else {
              Swal.fire("Error!", data.message, "error");
            }
          } else if (userData.role === "Co Pilot") {
            let name = "copilot";
            const { data } = await axios.post(
              `${backendUrl}/api/auth/pilotCancel`,
              { id, name },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (data.success) {
              Swal.fire(
                "Cancelled!",
                "Co-Pilot has been cancelled.",
                "success"
              );
            } else {
              Swal.fire("Error!", data.message, "error");
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const confirmCopilot = async (id) => {
    Swal.fire({
      title: "Confirm Action",
      text: "Do you want to confirm this?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (userData.role === "Pilot") {
            let name = "pilot";
            const { data } = await axios.post(
              `${backendUrl}/api/auth/confirmCopilot`,
              { id, name },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (data.success) {
              Swal.fire("Confirmed!", "Pilot has been confirmed.", "success");
            } else {
              Swal.fire("Error!", data.message, "error");
            }
          } else if (userData.role === "Co Pilot") {
            let name = "copilot";
            const { data } = await axios.post(
              `${backendUrl}/api/auth/confirmCopilot`,
              { id, name },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (data.success) {
              Swal.fire(
                "Confirmed!",
                "Co-Pilot has been confirmed.",
                "success"
              );
            } else {
              Swal.fire("Error!", data.message, "error");
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  useEffect(() => {
    if (token) {
      getPilotTask();
    }
  }, [token]);
  useEffect(() => {
    if (token) {
      getCoPilotTask();
    }
  }, [token]);

  const getBooking = async () => {
    try {
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await axios.get(
        `${backendUrl}/api/auth/my-order`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setOrders(response.data.bookings);
      }
    } catch (error) {
      console.error(
        "Error fetching user bookings:",
        error.response?.data || error.message
      );
    }
  };

  const farmerVerify = async (bookingId, workDate) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/booking/farmerVerify/${bookingId}`,
        { date: workDate },

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert(data.message);
      // Refresh data to update UI


      // Success notification using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Verified!",
        text: "Work has been successfully verified.",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Error verifying work:", error);

      // Error notification using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Verification Failed!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    getBooking();
  }, [token]);
  const openModal = (drone) => {
    setSelectedDrone(drone);
    setModalIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDrone(null);
    setCancellationReason("");
    setCustomMessage("");
  };
  // Cancel Booking Function
  const cancelAppointment = async () => {
    if (!selectedDrone) return;
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { droneId, startDate, endDate } = selectedDrone;

          const response = await axios.post(
            `${backendUrl}/api/booking/cancelBooking/${droneId}`,
            { startDate, endDate, cancellationReason, customMessage },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data.success) {
            toast.success("Booking cancelled");
            setOrders((prevOrders) =>
              prevOrders.map((order) =>
                order.droneId === droneId
                  ? { ...order, cancelled: true }
                  : order
              )
            );
          }
        } catch (error) {
          console.error(
            "Error canceling booking:",
            error.response?.data || error.message
          );
        }

        closeModal();
      }
    });
  };

  const updateWork = async (id) => {
    try {
      if (!workData[id]) return;

      const { date, target, done, pending } = workData[id];
      // Show confirmation dialog before updating
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to update the work progress?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      // If user cancels, do nothing
      if (!result.isConfirmed) return;

      // Ensure token is available
      if (!token) {
        throw new Error("Authorization token is missing");
      }

      // Validate date input
      if (!date) {
        return Swal.fire({
          title: "Error!",
          text: "Please select a date!",
          icon: "error",
        });
      }

      // Make API call
      const { data } = await axios.post(
        `${backendUrl}/api/booking/workUpdate/${id}`,
        { date, done, pending }, // ✅ Include date
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Show success message
      if (data.success) {
        await Swal.fire({
          title: "Updated!",
          text: data.message,
          icon: "success",
        });
      } else {
        await Swal.fire({
          title: "Not Updated!",
          text: data.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating work progress:", error);

      // Show error message
      await Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  const completeWork = async (id) => {
    try {
      // Show confirmation dialog before updating
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Comleted?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      // If user cancels, do nothing
      if (!result.isConfirmed) return;

      // Ensure token is available
      if (!token) {
        throw new Error("Authorization token is missing");
      }

      // Make API call
      const { data } = await axios.post(
        `${backendUrl}/api/booking/workCompleted/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Show success message
      if (data.success) {
        await Swal.fire({
          title: "Updated!",
          text: data.message,
          icon: "success",
        });
      } else {
        await Swal.fire({
          title: "Not Updated!",
          text: data.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating target:", error);

      // Show error message
      await Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="mb-44">
        <header
          className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white pt-24 pb-7 px-8 text-center"
          style={{
            backgroundImage: `url(${assset.quoteinnerimg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10">
            <h1 className="text-xl sm:text-6xl font-semibold mb-4">My Order</h1>
            <p className="text-lg sm:text-xl md:text-2xl mt-4">
              Join a mission-driven company revolutionizing agriculture through
              technology.
            </p>
          </div>
        </header>

        {userData.role === "Pilot" ? (
          <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Pilot Assigned Tasks
            </h2>

            {pilotTask.length === 0 ? (
              <p className="text-gray-600 text-center">
                No tasks assigned yet.
              </p>
            ) : (
              <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="border px-4 py-2">#</th>
                      <th className="border px-4 py-2">Drone</th>
                      <th className="border px-4 py-2">Location</th>
                      <th className="border px-4 py-2">Crop</th>
                      <th className="border px-4 py-2">Start Date</th>
                      <th className="border px-4 py-2">End Date</th>
                      <th className="border px-4 py-2">Price</th>
                      <th className="border px-4 py-2">Client</th>
                      <th className="border px-4 py-2">Co Pilot</th>
                      <th className="border px-4 py-2">Progress</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pilotTask.map((task, index) => (
                      <tr key={task._id} className="text-center border-b">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">
                          <img
                            src={task.droneImg}
                            alt="Drone"
                            className="w-16 h-16 object-cover rounded"
                          />
                          <p className="text-sm text-gray-600">Drone A</p>
                        </td>
                        <td className="border px-4 py-2">
                          {task.villagePanchayat}, {task.pinCode}
                        </td>
                        <td className="border px-4 py-2">
                          {task.crop} Farming
                        </td>
                        <td className="border px-4 py-2">
                          {formatDate(task.startDate)}
                        </td>
                        <td className="border px-4 py-2">
                          {formatDate(task.endDate)}
                        </td>
                        <td className="border px-4 py-2">
                          ₹{task.specificLandPrice} per acre
                        </td>
                        <td className="border px-4 py-2">
                          <p>
                            <strong>{task.user.name}</strong>
                          </p>
                          <p className="text-sm text-gray-600">
                            📞 {task.user.mobNumber}
                          </p>
                        </td>
                        <td className="border px-4 py-2">
                          <p>
                            {task.copilotName ? task.copilotName : "No copilot"}
                          </p>
                        </td>
                        {/* Progress Column */}
                        <td className="border px-4 py-2 align-top">
                          <div className="p-3 bg-gray-50 rounded-lg shadow-md">
                            <p className="text-base font-semibold text-gray-800 flex items-center mb-2">
                              📌 Target:
                              <span className="ml-2 text-gray-700 font-medium">
                                {task.specificLandPrice}A
                              </span>
                            </p>

                            <div className="space-y-1">
                              <p className="text-sm text-yellow-600 font-semibold flex items-center">
                                ⏳ Pending:
                                <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-md font-medium">
                                  {task.specificLandPrice && task.workProgress
                                    ? Math.max(
                                      task.specificLandPrice -
                                      task.workProgress.reduce(
                                        (sum, work) =>
                                          sum + Number(work.done),
                                        0
                                      ),
                                      0
                                    )
                                    : task.specificLandPrice || 0}
                                  A
                                </span>
                              </p>

                              <p className="text-sm text-green-600 font-semibold flex items-center">
                                ✅ Total:
                                <span className="ml-2 bg-green-100 text-green-600 px-2 py-0.5 rounded-md font-medium">
                                  {task.specificLandPrice && task.workProgress
                                    ? task.workProgress.reduce(
                                      (sum, work) => sum + Number(work.done),
                                      0
                                    )
                                    : task.specificLandPrice || 0}
                                  A
                                </span>
                              </p>

                              <p className="text-sm text-blue-600 font-semibold flex items-center">
                                ⏳ Extra:
                                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md font-medium">
                                  {task.specificLandPrice && task.workProgress
                                    ? Math.max(
                                      task.workProgress.reduce(
                                        (sum, work) =>
                                          sum + Number(work.done),
                                        0
                                      ) - task.specificLandPrice,
                                      0
                                    )
                                    : 0}
                                  A
                                </span>
                              </p>
                            </div>

                            <p className="text-sm text-blue-700 font-semibold flex items-center mt-3">
                              ✅ Done:
                            </p>

                            <div className="mt-2 space-y-1">
                              {(task.workProgress ?? []).map((work, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center bg-blue-100 p-2 rounded-md shadow-sm"
                                >
                                  <span className="text-xs text-blue-700 font-medium">
                                    {formatDate(work.date)}
                                  </span>
                                  <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                    {work.done}A
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>

                        {/* Actions Column */}
                        <td className="border px-4 py-2">
                          {task.pilotConfirm && !task.workCompleted ? (
                            <div className="bg-green-100 p-3 rounded-md shadow-md text-sm">
                              <p className="text-green-700 font-semibold flex items-center">
                                Completed
                                <button
                                  className="ml-2 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                  onClick={() => completeWork(task._id)}
                                >
                                  Yes
                                </button>
                              </p>

                              <div className="mt-2 flex items-center">
                                <label className="text-green-700 font-medium w-1/3">
                                  Date:
                                </label>
                                <input
                                  type="date"
                                  className="px-2 py-1 w-2/3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-xs"
                                  value={workData[task._id]?.date || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      task._id,
                                      "date",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              <div className="mt-2 flex items-center">
                                <label className="text-green-700 font-medium w-1/3">
                                  Done:
                                </label>
                                <input
                                  type="number"
                                  placeholder="Done acres"
                                  className="px-2 py-1 w-2/3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-xs"
                                  value={workData[task._id]?.done || ""}
                                  onChange={(e) =>
                                    handleInputChange(
                                      task._id,
                                      "done",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>

                              <button
                                className="mt-3 w-full bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-xs"
                                onClick={() =>
                                  updateWork(task._id, workData[task._id])
                                }
                              >
                                Submit
                              </button>
                            </div>
                          ) : task.pilotCancelled ? (
                            <div className="bg-red-700 font-semibold text-white rounded py-2">
                              Cancelled
                            </div>
                          ) : task.workCompleted ? (
                            <button className="mt-3 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                              Completed
                            </button>
                          ) : (
                            <div className="flex flex-col gap-2">
                              <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => confirmCopilot(task._id)}
                              >
                                Confirm
                              </button>
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                onClick={() => cancelPilot(task._id)}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : userData.role === "Co Pilot" ? (
          <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Co Pilot Assigned Tasks
            </h2>

            {copilotTask.length === 0 ? (
              <p className="text-gray-600 text-center">
                No tasks assigned yet.
              </p>
            ) : (
              <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="border px-4 py-2">#</th>
                      <th className="border px-4 py-2">Drone</th>
                      <th className="border px-4 py-2">Location</th>
                      <th className="border px-4 py-2">Crop</th>
                      <th className="border px-4 py-2">Start Date</th>
                      <th className="border px-4 py-2">End Date</th>
                      <th className="border px-4 py-2">Price</th>
                      <th className="border px-4 py-2">Client</th>
                      <th className="border px-4 py-2"> Pilot</th>
                      <th className="border px-4 py-2">Progress</th>

                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copilotTask.reverse().map((task, index) => (
                      <tr key={task._id} className="text-center border-b">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">
                          <img
                            src={task.droneImg}
                            alt="Drone"
                            className="w-16 h-16 object-cover rounded"
                          />
                          <p className="text-sm text-gray-600">Drone A</p>
                        </td>
                        <td className="border px-4 py-2">
                          {task.villagePanchayat}, {task.pinCode}
                        </td>
                        <td className="border px-4 py-2">
                          {task.crop} Farming
                        </td>
                        <td className="border px-4 py-2">
                          {formatDate(task.startDate)}
                        </td>
                        <td className="border px-4 py-2">
                          {formatDate(task.endDate)}
                        </td>
                        <td className="border px-4 py-2">
                          ₹{task.specificLandPrice} per acre
                        </td>
                        <td className="border px-4 py-2">
                          <p>
                            <strong>{task.user.name}</strong>
                          </p>
                          <p className="text-sm text-gray-600">
                            📞 {task.user.mobNumber}
                          </p>
                        </td>
                        <td className="border px-4 py-2">
                          <p>{task.pilotName ? task.pilotName : "No pilot"}</p>
                        </td>
                        <td className="border px-4 py-2 align-top">
                          <div className="p-3 bg-gray-50 rounded-lg shadow-md">
                            <p className="text-base font-semibold text-gray-800 flex items-center mb-2">
                              📌 Target:
                              <span className="ml-2 text-gray-700 font-medium">
                                {task.specificLandPrice}A
                              </span>
                            </p>

                            <div className="space-y-1">
                              <p className="text-sm text-yellow-600 font-semibold flex items-center">
                                ⏳ Pending:
                                <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-md font-medium">
                                  {task.specificLandPrice && task.workProgress
                                    ? Math.max(
                                      task.specificLandPrice -
                                      task.workProgress.reduce(
                                        (sum, work) =>
                                          sum + Number(work.done),
                                        0
                                      ),
                                      0
                                    )
                                    : task.specificLandPrice || 0}
                                  A
                                </span>
                              </p>

                              <p className="text-sm text-green-600 font-semibold flex items-center">
                                ✅ Total:
                                <span className="ml-2 bg-green-100 text-green-600 px-2 py-0.5 rounded-md font-medium">
                                  {task.specificLandPrice && task.workProgress
                                    ? task.workProgress.reduce(
                                      (sum, work) => sum + Number(work.done),
                                      0
                                    )
                                    : task.specificLandPrice || 0}
                                  A
                                </span>
                              </p>

                              <p className="text-sm text-blue-600 font-semibold flex items-center">
                                ⏳ Extra:
                                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md font-medium">
                                  {task.specificLandPrice && task.workProgress
                                    ? Math.max(
                                      task.workProgress.reduce(
                                        (sum, work) =>
                                          sum + Number(work.done),
                                        0
                                      ) - task.specificLandPrice,
                                      0
                                    )
                                    : 0}
                                  A
                                </span>
                              </p>
                            </div>

                            <p className="text-sm text-blue-700 font-semibold flex items-center mt-3">
                              ✅ Done:
                            </p>

                            <div className="mt-2 space-y-1">
                              {(task.workProgress ?? []).map((work, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center bg-blue-100 p-2 rounded-md shadow-sm"
                                >
                                  <span className="text-xs text-blue-700 font-medium">
                                    {formatDate(work.date)}
                                  </span>
                                  <span className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs font-semibold">
                                    {work.done}A
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>

                        <td className="border px-4 py-2">
                          {task.copilotConfirm && !task.workCompleted ? (
                            <div className="bg-green-700 font-semibold text-white rounded py-1">
                              Confirmed
                            </div>
                          ) : task.copilotCancelled ? (
                            <div className="bg-red-700 font-semibold text-white rounded py-1">
                              Cancelled
                            </div>
                          ) : task.workCompleted ? (
                            <div className="bg-green-700 font-semibold text-white rounded py-1">
                              Completed
                            </div>
                          ) : (
                            <div className="flex flex-col gap-2">
                              <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => confirmCopilot(task._id)}
                              >
                                Confirm
                              </button>
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                onClick={() => cancelPilot(task._id)}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="mx-4 sm:mx-[10%] mt-14">
            <table className="min-w-full table-auto border-separate rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Drone Image
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Drone Details
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Order Details
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, i) => (
                  <tr
                    key={i}
                    className="border-b hover:bg-indigo-50 transition-all duration-300 group"
                  >
                    {/* Drone Image Column */}
                    <td className="px-6 py-4 text-center">
                      <img
                        className="w-32 h-32 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                        src={item.droneImg}
                        alt="no image"
                      />
                    </td>

                    {/* Drone Details Column */}
                    <td className="px-6 py-4 text-left">
                      <div className="text-sm text-gray-700">
                        <p className="text-neutral-800 font-semibold mt-4">
                          Crop:{item.crop}{" "}
                        </p>
                        <p className="text-zinc-700 font-medium mt-1">
                          Address: {item.villagePanchayat}
                        </p>
                        <p className="text-zinc-700 font-medium mt-1">
                          Land Acre: {item.specificLandPrice}
                        </p>
                        <p className="text-zinc-700 font-medium mt-1">
                          Total: {item.subtotal}
                        </p>

                        <p className="text-sm mt-1">
                          <span className="text-sm text-neutral-700 font-medium">
                            Starting Date:{" "}
                          </span>
                          {formatDate(item.startDate)}
                        </p>
                        <p className="text-sm mt-1">
                          <span className="text-sm text-neutral-700 font-medium">
                            Ending Date:{" "}
                          </span>
                          {formatDate(item.endDate)}
                        </p>
                      </div>
                    </td>

                    {/* Order Details Column */}
                    <td className="px-6 py-4 text-left">
                      <div className="text-sm text-gray-700 space-y-2 mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
                        {item.cancelled ? (
                          // Cancelled Order
                          <div className="bg-red-500 text-white text-center py-2 px-4 rounded-md w-[50%] font-semibold">
                            ❌ Cancelled
                          </div>
                        ) : item.workCompleted ? (
                          // Work Completed
                          <>

                            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg shadow-md">
                              <p className="font-semibold text-lg flex items-center gap-2">✅ Work Done</p>
                              <p className="mt-2 text-sm"><span className="font-medium">Pilot:</span> {item.pilotName}</p>
                              <p className="text-sm"><span className="font-medium">Co-pilot:</span> {item.copilotName}</p>
                            </div>


                            <button className="bg-green-500 text-white px-2 py-1 rounded-md text-xs">
                              Completed
                            </button>
                            <button
                              className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs ml-2"
                              onClick={() => toggleDetails(item._id)}
                            >
                              Info
                            </button>

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
                        ) : item.orderConfirmed && !item.workProgress ? (
                          // Order Confirmed but Work Not Started
                          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md">
                            <p className="font-semibold text-lg flex items-center gap-2">
                              ✅ Order Confirmed
                            </p>
                            <p className="mt-2 text-sm">
                              <span className="font-medium">Pilot:</span>{" "}
                              {item.pilotName}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Co-pilot:</span>{" "}
                              {item.copilotName}
                            </p>
                          </div>
                        ) : !item.orderConfirmed && !item.workProgress ? (
                          // New Condition: Order is pending (Final confirmation not done, work not started)
                          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg shadow-md text-center">
                            <p className="font-semibold text-lg">
                              ⏳ Your order is pending
                            </p>
                          </div>
                        ) : (
                          // Work In Progress (Show Target, Pending, Done, and Verify Work Button)
                          <>
                            <div className="flex flex-col space-y-2 p-3 bg-white rounded-md shadow">
                              <p className="text-md font-semibold">
                                📌 Target:
                                <span className="font-medium">
                                  {" "}
                                  {item.specificLandPrice}A
                                </span>
                              </p>
                              <p className="text-md text-yellow-600 font-semibold">
                                ⏳ Pending:
                                <span className="font-medium">
                                  {item.specificLandPrice && item.workProgress
                                    ? Math.max(
                                      item.specificLandPrice -
                                      item.workProgress.reduce(
                                        (sum, work) =>
                                          sum + Number(work.done),
                                        0
                                      ),
                                      0
                                    )
                                    : item.specificLandPrice || 0}
                                  A
                                </span>
                              </p>

                              <p className="text-md text-yellow-600 font-semibold">
                                ✅ Total:
                                <span className="font-medium">
                                  {item.specificLandPrice && item.workProgress
                                    ? item.workProgress.reduce(
                                      (sum, work) => sum + Number(work.done),
                                      0
                                    )
                                    : item.specificLandPrice || 0}
                                  A
                                </span>
                              </p>
                              <p className="text-md text-yellow-600 font-semibold">
                                ⏳ Extra:
                                <span className="font-medium">
                                  {item.specificLandPrice && item.workProgress
                                    ? Math.max(
                                      item.workProgress.reduce(
                                        (sum, work) =>
                                          sum + Number(work.done),
                                        0
                                      ) - item.specificLandPrice,
                                      0
                                    )
                                    : 0}
                                  A
                                </span>
                              </p>

                              <p className="text-md text-blue-600 font-semibold">
                                ✅ Done:
                              </p>
                              <div className="space-y-1">
                                {(item.workProgress ?? []).map(
                                  (work, index) => (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center"
                                    >
                                      <p className="text-sm text-blue-600 font-medium">
                                        <span>
                                          {new Date(
                                            work.date
                                          ).toLocaleDateString()}
                                        </span>
                                        <span className="bg-blue-100 px-2 py-1 rounded-md">
                                          {work.done}A
                                        </span>
                                      </p>

                                      {/* Show Verify Button or Verified Badge */}
                                      {work.farmerVerified ? (
                                        <span className="text-green-600 font-semibold">
                                          ✅ Verified
                                        </span>
                                      ) : (
                                        <button
                                          className="bg-green-500 hover:bg-green-700 text-white font-semibold px-3 py-1 rounded-md shadow-md transition duration-200"
                                          onClick={() => {
                                            console.log(
                                              "Verifying work with date:",
                                              work.date
                                            ); // Debugging
                                            farmerVerify(item._id, work.date);
                                          }}
                                        >
                                          Verify
                                        </button>
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col gap-3 w-full">
                        <Link
                          to={`/review-complaint/${item._id}`}
                          className="flex justify-center items-center py-2 px-4 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                          Review & Complaint
                        </Link>

                        {!item.cancelled &&
                          item.payment &&
                          !item.isCompleted && (
                            <button className="py-2 px-4 rounded-lg text-stone-500 bg-indigo-50 border hover:bg-indigo-100 transition-all duration-300 transform hover:scale-105">
                              Paid
                            </button>
                          )}

                        {!item.cancelled &&
                          !item.payment &&
                          !item.isCompleted && (
                            <button
                              onClick={() => appointmentRazorpay(item._id)}
                              className="text-sm py-2 px-4 rounded-lg text-white bg-green-500 hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                            >
                              Pay Online
                            </button>
                          )}

                        {!item.cancelled && !item.isCompleted && (
                          <button
                            onClick={() => openModal(item)}
                            className="text-sm to-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                          >
                            Cancel Booking
                          </button>
                        )}
                        {item.cancelled && !item.isCompleted && (
                          <button className="sm:min-w-48 py-2 border border-red-500 text-red-500 rounded">
                            Booking cancelled
                          </button>
                        )}
                        {item.isCompleted && (
                          <button className="sm:min-w-48 py-2 border border-green-500 text-green-500">
                            Completed
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="bg-white p-6 rounded-lg shadow-xl max-w-lg mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
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
            onClick={cancelAppointment}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Confirm Cancellation
          </button>
        </Modal>
      </div>
    </>
  );
}

export default Myorder;
