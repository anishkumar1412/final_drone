import React, { useState } from "react";

import { AiOutlineClose, AiOutlineBank, AiOutlineCreditCard, AiOutlineUser, AiOutlineNumber, AiOutlineMessage } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";


const DeclinedRefunds = () => {
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
            
            </tr>
          </thead>
          <tbody>
            {refunds.filter((refund) => refund.status === "Declined")
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
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
    </div>
  );
};

export default DeclinedRefunds;
