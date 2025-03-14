import React, { useState } from "react";

import { AiOutlineClose, AiOutlineBank, AiOutlineCreditCard, AiOutlineUser, AiOutlineNumber, AiOutlineMessage } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";


const ApprovedRefunds = () => {
  const {refunds} = useContext(AdminContext)
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);

  const openPopup = (refund) => {
    setSelectedRefund(refund);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedRefund(null);
  };
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-US', options); // Change 'en-US' to your preferred locale
  };
  return (
    <div className="container mx-auto p-4">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase border-b">
            <tr>
              <th className="p-4 text-left w-[250px]">Product</th>

              <th className="p-4 text-left w-[250px]">Reviewer</th>
              <th className="p-3 text-left w-[50px]">refundRequestAmount</th>
              <th className=" text-left w-[50px]">RefundApprovedprice</th>
              <th className="p-4 text-left w-[200px]">Date</th>
              <th className="p-4 text-left w-[100px]">Status</th>
              <th className="p-4 text-left w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {refunds.filter((refund) => refund.status === "Approved")
            .map((refund) => (
              <tr key={refund.id} className="border-b hover:bg-gray-50">
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <img
                      src={refund.productImage}
                      alt={refund.productName}
                      className="w-14 h-14 rounded-md object-cover"
                    />
                    <p className="font-medium text-gray-800">{refund.productName}</p>
                  </div>
                </td>
               
                <td className="p-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <img
                      src={refund.userImage}
                      alt={refund.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{refund.userName}</p>
                      <p className="text-sm text-gray-500">{refund.userEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-semibold">{refund.refundRequestAmount}</td>
                <td className="p-4 font-semibold">{refund.RefundApprovedprice}</td>
                <td className="p-4 font-semibold">{formatDate(refund.date)}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      refund.Paymentstatus === "Approved"
                        ? "bg-green-100 text-green-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {refund.Paymentstatus || "Pending"}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
                    onClick={() => openPopup(refund)}
                  >
                    <FiSend /> Send
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && selectedRefund && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 w-[600px] h-auto rounded-lg shadow-lg relative">
            <button className="absolute top-3 right-3 text-gray-500" onClick={closePopup}>
              <AiOutlineClose size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Send Refund</h2>
            <form className="space-y-4">
              <div className="flex items-center border rounded-md p-2">
                <AiOutlineUser className="text-gray-500 mr-2" />
                <input type="text" placeholder="Account Holder Name" className="w-full outline-none" />
              </div>
              <div className="flex items-center border rounded-md p-2">
                <AiOutlineNumber className="text-gray-500 mr-2" />
                <input type="text" placeholder="Account Number" className="w-full outline-none" />
              </div>
              <div className="flex items-center border rounded-md p-2">
                <AiOutlineBank className="text-gray-500 mr-2" />
                <input type="text" placeholder="IFSC Code" className="w-full outline-none" />
              </div>
              <div className="flex items-center border rounded-md p-2">
                <AiOutlineBank className="text-gray-500 mr-2" />
                <input type="text" placeholder="Bank Name" className="w-full outline-none" />
              </div>
              <div className="flex items-center border rounded-md p-2">
                <AiOutlineCreditCard className="text-gray-500 mr-2" />
                <select className="w-full outline-none">
                  <option>Choose Payment Method</option>
                  <option>NEFT</option>
                  <option>RTGS</option>
                  <option>IMPS</option>
                </select>
              </div>
              <div className="flex items-center border rounded-md p-2">
                <AiOutlineMessage className="text-gray-500 mr-2" />
                <textarea placeholder="Remarks" className="w-full outline-none"></textarea>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Confirm & Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedRefunds;
