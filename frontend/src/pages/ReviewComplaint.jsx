import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2"; // Import SweetAlert2
import { FaStar } from "react-icons/fa";
import { AppContext } from "../Context/AppContext"; // Import global context
import axios from "axios";

function ReviewComplaint() {
  const { orderId } = useParams(); // Get order ID from URL
  const { userData, token } = useContext(AppContext); // Get user details
  

  const [product, setProduct] = useState({ productImage: "", productName: "", price: null });
  const [pilot, setPilot] = useState({ Pilotname: "", Pilotemail: "", PilotmobNumber: "" });
  const [copilot, setCoPilot] = useState({ Copilotname: "", Copilotemail: "", CopilotmobNumber: "" });
  const [hasRefunded, setHasRefunded] = useState(false); // State to track refund request status
  const {backendUrl} = useContext(AppContext)

  const [progressDates, setProgressDates] = useState([]); // All extracted dates
const [selectedDates, setSelectedDates] = useState([]); // User-selected dates


  const [formData, setFormData] = useState({
    orderId,
    type: "Review", // Default type
    rating: 5,
    reviewTitle: "",
    reviewText: "",
    complaintText: "",
    enquiryText: "",
    refundReason: "",
    AccountHolderName: "",
    bankAccountNumber: "",
    refundRequestAmount:null,
    bankIFSC: "",
    date: new Date().toISOString(),
  });
useEffect(() => {
  const fetchBookingDetails = async () => {
    if (!orderId) return; // prevent API call with undefined ID

    try {
      const response = await axios.get(`${backendUrl}/api/booking/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

     const booking = response.data;

// Extract and format workProgress dates if Refund
if (Array.isArray(booking.workProgress)) {
  const dates = booking.workProgress.map(item =>
    new Date(item.date).toISOString().split("T")[0] // format: YYYY-MM-DD
  );
  setProgressDates(dates);
}



      setPilot(booking.pilotDetails
        ? {
            Pilotname: booking.pilotDetails.name,
            Pilotemail: booking.pilotDetails.email,
            PilotmobNumber: booking.pilotDetails.mobNumber,
          }
        : { Pilotname: "", Pilotemail: "", PilotmobNumber: "" });

      setCoPilot(booking.copilotDetails
        ? {
            Copilotname: booking.copilotDetails.name,
            Copilotemail: booking.copilotDetails.email,
            CopilotmobNumber: booking.copilotDetails.mobNumber,
          }
        : { Copilotname: "", Copilotemail: "", CopilotmobNumber: "" });

    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  fetchBookingDetails();
}, [orderId, token]);



  
  // Fetch product details using orderId
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/auth/my-order/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setProduct({
            productImage: response.data.order.productImage,
            productName: response.data.order.productName,
            price: response.data.order.subtotal,

          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (orderId) fetchProduct();
  }, [orderId, token]);

  // Check if the user has already submitted a refund request
  useEffect(() => {
    const checkRefundStatus = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/refunds`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          const userRefunds = response.data.refunds;
          const refundExists = userRefunds.some((refund) => refund.orderId === orderId); // Check for current orderId

          setHasRefunded(refundExists);
        }
      } catch (error) {
        console.error("Error fetching refund status:", error);
      }
    };

    if (userData) checkRefundStatus();
  }, [orderId, token, userData]);




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Validate refund amount
    if(formData.type ==="Refund" && (pilot.Pilotname === "" )||(copilot.Copilotname===""))
    {
      Swal.fire({
        icon:"error",
        title:"Pilot or Copliot has not assigned yet!",
        text:"You can't request The Refund if either the pilot or Copilot  has not been assigned yet"
      });
      setFormData({
        orderId,
        type: "Review",
        rating: 5,
        reviewTitle: "",
        reviewText: "",
        complaintText: "",
        enquiryText: "",
        refundReason: "",
        refundRequestAmount: 0,
        AccountHolderName: "",
        bankAccountNumber: "",
        bankAddress:"",
        bankName:"",
        bankIFSC: "",
        date: new Date().toISOString(),
      });
      return;
    }
  if (formData.type === "Refund" && formData.refundRequestAmount > product.price) {
    Swal.fire({
      icon: "error",
      title: "Invalid Amount",
      text: "Refund amount cannot be greater than the product price.",
    });
    return;
  }
  // Validate Bank Account Number (6-18 digits)
  if (formData.type === "Refund" && !/^[0-9]{6,18}$/.test(formData.bankAccountNumber)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Account Number",
      text: "Enter a valid account number (6-18 digits).",
    });
    return;
  }
// Validate IFSC Code (4 letters + 7 digits)
if (formData.type === "Refund" && !/^[A-Z]{4}[0-9]{7}$/.test(formData.bankIFSC)) {
  Swal.fire({
    icon: "error",
    title: "Invalid IFSC Code",
    text: "Enter a valid IFSC code (e.g., ABCD1234567).",
  });
  return;
}
    // Prevent duplicate refund submission
    if (formData.type === "Refund" && hasRefunded) {
      Swal.fire({
        icon: "warning",
        title: "Refund Request Already Submitted",
        text: "You have already sent your refund request for this order. Please wait for the authority to fulfill your order.",
        footer:
          '<p>For further assistance, contact:</p><p>📞 <strong>9798297100</strong></p><p>📧 <strong>anishkumarcbsa@gmail.com</strong></p>',
      });
      return;
    }
  
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit the form?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
const submissionData = {
  ...formData,
  ...product,
  ...pilot,
  ...copilot,
  userId: userData.id,
  userImage: userData?.image || "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
  userName: userData?.name || "Anonymous",
  userEmail: userData?.email || "anonymous@example.com",
  userPhone: userData?.mobNumber || "+91 1234567890",
  ...(formData.type === "Refund" && { selectedProgressDates: selectedDates }) // ✅ send only selected
};



  
          let endpoint = "";
          switch (formData.type) {
            case "Review":
              endpoint = `${backendUrl}/api/post-reviews`;
              break;
            case "Complaint":
              endpoint = `${backendUrl}/api/post-complaints`;
              break;
            case "Enquiry":
              endpoint = `${backendUrl}/api/post-enquiry`;
              break;
            case "Refund":
              endpoint = `${backendUrl}/api/post-refund`;
              break;
            default:
              toast.error("Invalid submission type.");
              return;
          }
  
          const response = await axios.post(endpoint, submissionData);
          if (response.status === 201) {
            Swal.fire("Submitted!", "Your form has been submitted.", "success");
           
            setFormData({
              orderId,
              type: "Review",
              rating: 5,
              reviewTitle: "",
              reviewText: "",
              complaintText: "",
              enquiryText: "",
              refundReason: "",
              refundRequestAmount: 0,
              AccountHolderName: "",
              bankAccountNumber: "",
              bankAddress:"",
              bankName:"",
              bankIFSC: "",
              date: new Date().toISOString(),
            });
  
            if (formData.type === "Refund") {
              setHasRefunded(true); // Prevent duplicate refund submission
            }
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong. Please try again.", "error");
          toast.error("Error submitting feedback.");
          console.log(error)
        }
      }
    });
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 pt-24">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
        Submit {formData.type}
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Product: <span className="font-semibold text-blue-600">{product.productName}</span>
      </p>

      {/* Product Image */}
      <div className="flex justify-center mb-4">
        <img src={product.productImage} alt="Product" className="w-32 h-32 object-cover rounded-lg" />
      </div>
      {/* Product Price */}
      <p className="text-center text-gray-600 mb-6">
        Product Price: <span className="font-semibold text-blue-600">{product.price}</span>
      </p>

      <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg w-full max-w-2xl relative">
        {/* Feedback Type Selection */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium block mb-2">Select Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Review">Review ⭐</option>
            <option value="Complaint">Complaint 😡</option>
            <option value="Enquiry">Enquiry ❓</option>
            
             
              <option value="Refund">Refund Request 💰</option>
            
          </select>
        </div>

        {/* Conditional Fields */}
        <form onSubmit={handleSubmit} className="space-y-5">
        <div>
  <label className="text-gray-700 font-medium block mb-1">{formData.type} Title</label>
  <select
    name="reviewTitle"
    value={formData.reviewTitle}
    onChange={handleChange}
    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
  <option value="">Select a title</option>
  
            {formData.type === "Review" && (
              <>
                <option value="Product Excellent">Product Damaged</option>
                <option value="Not good Delivery">Late Delivery</option>
                <option value="Incorrect Item Received">Incorrect Item Received</option>
              </>
            )}
            {formData.type === "Complaint" && (
              <>
                <option value="Product Damaged">Product Damaged</option>
                <option value="Late Delivery">Late Delivery</option>
                <option value="Incorrect Item Received">Incorrect Item Received</option>
              </>
            )}
            {formData.type === "Enquiry" && (
              <>
                <option value="Stock Availability">Stock Availability</option>
                <option value="Shipping Details">Shipping Details</option>
              </>
            )}
            {formData.type === "Refund" && (
              <>
                <option value="Defective Product">Defective Product</option>
                <option value="Wrong Item Delivered">Wrong Item Delivered</option>
              </>
            )}
  </select>
</div>

          <div>
            <label className="text-gray-700 font-medium block mb-1">{formData.type}</label>
            <textarea
              name="reviewText"
              rows="4"
              value={formData.reviewText}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your review..."
              required
            />
          </div>
          {formData.type === "Refund" && (
            <>
            <div>
            <label className="text-gray-700 font-medium block mb-1">Refund Request Amount </label>
            <input type="text" name="refundRequestAmount" value={formData.refundRequestAmount} onChange={handleChange} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
           
          </div>
          <div>
  <label className="text-gray-700 font-medium block mb-1">
    Select Work Progress Dates <span className="text-red-500">*</span>
  </label>
  <select
    multiple
    value={selectedDates}
    onChange={(e) =>
      setSelectedDates(Array.from(e.target.selectedOptions, (option) => option.value))
    }
    className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    {progressDates.map((date, index) => (
      <option key={index} value={date}>
        {date}
      </option>
    ))}
  </select>
  <p className="text-sm text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple dates</p>
</div>


         
              <div>
                <label className="text-gray-700 font-medium block mb-1">Account Holder Name</label>
                <input type="text" name="AccountHolderName" value={formData.AccountHolderName} onChange={handleChange} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-gray-700 font-medium block mb-1">Account Number</label>
                <input type="text" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-gray-700 font-medium block mb-1">IFSC Code</label>
                <input type="text" name="bankIFSC" value={formData.bankIFSC} onChange={handleChange} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="text-gray-700 font-medium block mb-1">Bank Name </label>
                <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" required />
                <label className="text-gray-700 font-medium block mb-1 mt-3">Bank Address</label>
                <input type="text" name="bankAddress" value={formData.bankAddress} onChange={handleChange} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" required/>
              </div>
              

            </>
          )}

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Submit 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewComplaint;
