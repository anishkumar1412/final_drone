import React, { useState, useContext } from "react";
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaUniversity, FaRegTimesCircle, FaQuestionCircle, FaInfoCircle } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";

function RefundReviewsStatus() {
  const { refunds } = useContext(AppContext);
  const [selectedBankDetails, setSelectedBankDetails] = useState(null);
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);


  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FaCheckCircle className="text-green-600 text-2xl" />;
      case "Pending":
        return <FaHourglassHalf className="text-yellow-500 text-2xl" />;
      case "Declined":
        return <FaTimesCircle className="text-red-600 text-2xl" />;
      default:
        return null;
    }
  };
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-US', options); // Change 'en-US' to your preferred locale
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-12 pt-24 w-full">
      <h2 className="text-5xl font-bold text-gray-900 mb-12">Refund & Review Status</h2>
      <div className="w-full max-w-7xl space-y-8">
        {refunds.map((item) => (
          <div
            key={item.id}
            className="bg-white p-10 rounded-xl shadow-lg flex gap-8 relative border-l-8 w-full transition duration-300 hover:shadow-xl"
            style={{ borderColor: item.status === "Approved" ? "#16a34a" : item.status === "Pending" ? "#eab308" : "#dc2626" }}
          >
            {/* Product Image */}
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300"
            />
            
            {/* Refund Details */}
            <div className="flex-1">
              <p className="text-xl text-gray-900 font-bold">{item.productName}</p>
              <p className="text-md text-gray-700">Booking Date: {formatDate(item.date)}</p>
              <p className="text-md text-gray-700">Service Amount: ₹{item.price}</p>
              <p className="text-md text-gray-700">Refund Requested: ₹{item.refundRequestAmount}</p>
              <p className="text-md text-gray-700">Refund Released: ₹{item.RefundApprovedprice}</p>
              <p className="text-md text-gray-900 mt-3 font-semibold">Admin Message: {item.adminMessage}</p>
            </div>
            
            {/* Payment Status */}
            <div className="absolute top-6 right-8 flex flex-col items-end">
              <p className="flex items-center gap-2 text-lg font-bold">
                {getStatusIcon(item.status)} <span className={item.status === "Approved" ? "text-green-600" : item.status === "Pending" ? "text-yellow-500" : "text-red-600"}>{item.status}</span>
              </p>
              {/* Payment Status Field */}
              <p className="text-md mt-2 font-semibold">Payment Status: <span className={item.paymentStatus === "Sent" ? "text-green-600" : item.paymentStatus === "Pending" ? "text-yellow-500" : "text-red-600"}>{item.paymentStatus}</span></p>
              
              {/* Info Icon for Payment Status */}
              <button onClick={() => setShowPaymentInfo(true)} className="mt-2 flex items-center gap-1 text-gray-600 hover:text-gray-800 text-md font-medium">
                <FaInfoCircle className="text-lg" /> Why?
              </button>
              
              {/* Bank Details Icon */}
              <button onClick={() => setSelectedBankDetails(item)} className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800 text-lg font-bold">
                <FaUniversity className="text-2xl" /> View Bank Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bank Details Popup */}
      {selectedBankDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Bank Account Details</h3>
            <p className="text-lg text-gray-800"><strong>Account Holder:</strong> {selectedBankDetails.AccountHolderName}</p>
            <p className="text-lg text-gray-800"><strong>Bank Name:</strong> {selectedBankDetails.bankName}</p>
            <p className="text-lg text-gray-800"><strong>Account Number:</strong> {selectedBankDetails.bankAccountNumber}</p>
            <p className="text-lg text-gray-800"><strong>Bank Address:</strong> {selectedBankDetails.bankAddress}</p>
            <button 
              onClick={() => setSelectedBankDetails(null)} 
              className="mt-6 bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-md w-full flex items-center justify-center gap-2 text-lg font-bold"
            >
              <FaRegTimesCircle /> Close
            </button>
          </div>
        </div>
      )}
      
      {/* Payment Info Popup */}
      {showPaymentInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Payment Status Info</h3>
            <p className="text-md text-gray-800">Reasons why payment might not be sent:</p>
            <ul className="list-disc pl-5 text-md text-gray-700 mt-2">
              <li>Bank details mismatch.</li>
              <li>Pending approval from admin.</li>
              <li>Technical errors during transfer.</li>
              <li>Bank server issues.</li>
            </ul>
            <p className="text-md text-gray-800 mt-3">If payment is delayed, please verify your bank details and contact support.</p>
            <button 
              onClick={() => setShowPaymentInfo(false)} 
              className="mt-6 bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-md w-full text-lg font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RefundReviewsStatus;
