import React, { useEffect, useState, useContext } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import Swal from "sweetalert2";

const Refund = () => {
  const { refunds, loading, setLoading } = useContext(AdminContext);
  const [adminMessages, setAdminMessages] = useState({});
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [refundStatuses, setRefundStatuses] = useState({});
  const [SanctionedRefundAmount, setSanctionedRefundAmount] = useState(0);
  const {backendUrl} = useContext(AdminContext)

  useEffect(() => {
    const initialStatuses = refunds.reduce((acc, refund) => {
      acc[refund._id] = refund.status || "Pending";
      return acc;
    }, {});
    setRefundStatuses(initialStatuses);
  }, [refunds]);

  const handleStatusUpdate = async (status) => {
    if (!selectedRefund) return;
  
    // Check if the refund amount is greater than the requested amount
    if (SanctionedRefundAmount > selectedRefund.refundRequestAmount) {
      Swal.fire({
        title: "Error!",
        text: "The refunded amount cannot be greater than the requested amount.",
        icon: "error",
        confirmButtonText: "OK",
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      return;
    }
  
    // Show confirmation popup before proceeding
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you really want to update the refund status to "${status}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const adminMessage = adminMessages[selectedRefund._id] || "";
          const response = await axios.post(`${backendUrl}/api/update-refund-status`, {
            refundId: selectedRefund._id,
            status,
            adminMessage,
            SanctionedRefundAmount,
          });
  
          if (response.data.success) {
            Swal.fire({
              title: "Success!",
              text: `Refund status updated to ${status}`,
              icon: "success",
              confirmButtonText: "OK",
              allowOutsideClick: false,
              allowEscapeKey: false,
            }).then(() => {
              setRefundStatuses((prev) => ({ ...prev, [selectedRefund._id]: status }));
              setSelectedRefund(null);
            });
          }
        } catch (error) {
          console.error("Error updating refund status", error);
          Swal.fire({
            title: "Failed!",
            text: "Failed to update refund status",
            icon: "error",
            confirmButtonText: "OK",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        }
      }
    });
  };
  

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500 text-white";
      case "Declined":
        return "bg-red-500 text-white";
      case "Pending":
        return "bg-yellow-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-[calc(100vw-300px)] bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase border-b">
            <tr>
              <th className="py-4 px-4 text-left">Product</th>
              <th className="py-4 px-4 text-left">User</th>
              <th className="py-4 px-4 text-left">Pilot</th>
              <th className="py-4 px-4 text-left">Co-Pilot</th>
              

              <th className="py-4 px-4 text-left">Refund Complaint</th>
              <th className="py-4 px-4 text-left">Date</th>
              <th className="py-4 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-4">Loading...</td>
              </tr>
            ) : (
              refunds.map((refund) => (
                <tr key={refund._id} className="border-b">
                  <td className="py-4 px-4 flex items-center gap-4">
                    <img
                      src={refund.productImage || assets.dronequadcopter}
                      alt={refund.productName}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <p className="font-medium text-gray-800">{refund.productName}</p>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={refund.userImage || assets.drone_icon}
                        alt={refund.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{refund.userName}</p>
                        <p className="text-sm text-gray-500">{refund.userEmail}</p>
                        <p className="text-sm text-gray-500">{refund.userPhone || '+911234567890'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                     
                      <div>
                        <p className="font-semibold">{refund.Copilotname|| 'NaN'}</p>
                        <p className="text-sm text-gray-500">{refund.Copilotemail|| 'NaN'}</p>
                        <p className="text-sm text-gray-500">{refund.CopilotmobNumber || 'NaN'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                     
                      <div>
                        <p className="font-semibold">{refund.Pilotname|| 'NaN'}</p>
                        <p className="text-sm text-gray-500">{refund.Pilotemail|| 'NaN'}</p>
                        <p className="text-sm text-gray-500">{refund.PilotmobNumber || 'NaN'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-[300px]">
                    <p className="font-semibold">{refund.reviewTitle}</p>
                    <p className="text-sm text-gray-600">{refund.reviewText}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold">
                      {new Date(refund.date).toLocaleString()}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    <button
                      className={`${getStatusStyle(refundStatuses[refund._id])} px-4 py-2 rounded`}
                      onClick={() => setSelectedRefund(refund)}
                    >
                      {refundStatuses[refund._id] || "Manage"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedRefund && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
            <h2 className="text-lg font-bold mb-4">Manage Refund Request</h2>
            <p className="mb-2">Product: {selectedRefund.productName}</p>
            <p className="mb-2">User: {selectedRefund.userName}</p>
            <p className="mb-2">Product Price: {selectedRefund.price}</p>
            <p className="mb-2">Request Amount: {selectedRefund.refundRequestAmount}</p>
            <textarea
              placeholder="Admin Message"
              className="border rounded p-2 w-full mb-4"
              value={adminMessages[selectedRefund._id] || ""}
              onChange={(e) => setAdminMessages({ ...adminMessages, [selectedRefund._id]: e.target.value })}
            ></textarea>
            <div>
              <p className="mb-2">Refund Amount</p>
              <input
                type="number"
                className="border rounded p-2 w-full mb-4"
                onChange={(e) => setSanctionedRefundAmount(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleStatusUpdate("Approved")}>
                Approve
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleStatusUpdate("Declined")}>
                Decline
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => handleStatusUpdate("Pending")}>
                Pending
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setSelectedRefund(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Refund;
