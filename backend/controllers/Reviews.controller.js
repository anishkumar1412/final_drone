import Booking from "../models/Booking.js";
import Complaint from "../models/Complaint.model.js";
import Enquiry from "../models/Enquiry.model.js";
import Refund from "../models/Refund.model.js";
import Review from "../models/ReviewModel.js";

const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res
      .status(201)
      .json({ success: true, message: "Review added successfully!", review });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to save review" });
  }
};
const createRefund = async (req, res) => {
  try {
    console.log("Received refund request:", req.body);

    const refund = new Refund(req.body);
    console.log("helof")
    await refund.save();
    console.log("d")
    res
      .status(201)
      .json({ success: true, message: "Refund Compalint has send successfully!", refund });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to sent Refund Compalint"});
  }
};
const createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res
      .status(201)
      .json({ success: true, message: "Compalint has lodged successfully!", complaint });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to lodged Compalint"});
  }
};
const createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res
      .status(201)
      .json({ success: true, message: "Enquiry has lodged successfully!", enquiry });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to lodged Enquiry"});
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch reviews" });
  }
};
const getAllRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find().sort({ date: -1 });
    res.status(200).json({ success: true, refunds });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch refunds" });
  }
};
const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 });
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch complaints" });
  }
};
const getAllEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.find().sort({ date: -1 });
    res.status(200).json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch enquiry" });
  }
};

const getReviewsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const reviews = await Review.find({ orderId });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch reviews" });
  }
};
const updateRefundStatus = async (req, res) => {
  try {
    const { refundId, status, adminMessage,SanctionedRefundAmount } = req.body;

    if (!refundId || !status || !adminMessage) {
        return res.status(400).json({ success: false, message: "All fields are required!" });
    }
    
    // Find refund request by refundId and update status
    const refund = await Refund.findById(refundId);
    if (!refund) {
        return res.status(404).json({ success: false, message: "Refund request not found!" });
    }
    
    refund.status = status;
    refund.adminMessage = adminMessage;
    refund.RefundApprovedprice = SanctionedRefundAmount;
    await refund.save();
    

      // Sending response back to the frontend
      res.status(200).json({
          success: true,
          message: `Refund request has been ${status.toLowerCase()}!`,
          refund
      });
  } catch (error) {
      console.error("Error updating refund status:", error);
      res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};
const getUserRefunds = async (req,res) => {
  try {
    const userId = req.user.user.id;
      const refunds = await Refund.find({ userId }).sort({date:-1});
      return res.status(200).json({success:true,refunds});
  } catch (error) {
      console.error("Error fetching refunds:", error);
      res.status(500).json({success:true,error:"Failed to fetch refunds"})
  }
};
const getPilotCopilotDetails = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({ path: "pilot", select: "name email mobNumber" })
      .populate({ path: "copilot", select: "name email mobNumber" });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}


export { createReview, getAllReviews, getReviewsByOrderId,createRefund,getAllRefunds,createComplaint,getAllComplaints,createEnquiry,getAllEnquiry,updateRefundStatus,getUserRefunds,getPilotCopilotDetails };
