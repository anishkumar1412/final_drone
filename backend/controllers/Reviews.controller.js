import Booking from "../models/Booking.js";
import Complaint from "../models/Complaint.model.js";
import Enquiry from "../models/Enquiry.model.js";
import Refund from "../models/Refund.model.js";
import Review from "../models/ReviewModel.js";
import db1 from "../models/index.js";

const createReview = async (req, res) => {
  try {
    const review = await db1.Review.create(req.body);
    res.status(201).json({
      success: true,
      message: "Review added successfully!",
      review,
    });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save review",
    });
  }
};
const createRefund = async (req, res) => {
  try {
    console.log("Received refund request:", req.body);

    const refund = await db1.Refund.create(req.body);
    console.log("Hello this is \nhei\nhi\nhi\hi",req.body)
    res.status(201).json({
      success: true,
      message: "Refund complaint has been sent successfully!",
      refund,
    });
  } catch (error) {
    console.error("Error creating refund:", error);
    res.status(500).json({
      success: false,
      error: "Failed to send refund complaint",
    });
  }
};

const createComplaint = async (req, res) => {
  try {
    const complaint = await db1.Complaint.create(req.body);
    res.status(201).json({
      success: true,
      message: "Complaint has been lodged successfully!",
      complaint,
    });
  } catch (error) {
    console.error("Error creating complaint:", error);
    res.status(500).json({
      success: false,
      error: "Failed to lodge complaint",
    });
  }
};

const createEnquiry = async (req, res) => {
  try {
    const enquiry = await db1.Enquiry.create(req.body);
    res.status(201).json({
      success: true,
      message: "Enquiry has been lodged successfully!",
      enquiry,
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    res.status(500).json({
      success: false,
      error: "Failed to lodge enquiry",
    });
  }
};


const getAllReviews = async (req, res) => {
  try {
    const reviews = await db1.Review.findAll({ order: [['date', 'DESC']] });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch reviews" });
  }
};

const getAllRefunds = async (req, res) => {
  try {
    const refunds = await db1.Refund.findAll({ order: [['date', 'DESC']] });
    res.status(200).json({ success: true, refunds });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch refunds" });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await db1.Complaint.findAll({ order: [['date', 'DESC']] });
    res.status(200).json({ success: true, complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch complaints" });
  }
};

const getAllEnquiry = async (req, res) => {
  try {
    const enquiry = await db1.Enquiry.findAll({ order: [['date', 'DESC']] });
    res.status(200).json({ success: true, enquiry });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch enquiry" });
  }
};

const getReviewsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const reviews = await db1.Review.findAll({ where: { orderId } });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch reviews" });
  }
};

const updateRefundStatus = async (req, res) => {
  try {
    const { refundId, status, adminMessage, SanctionedRefundAmount } = req.body;

    if (!refundId || !status || !adminMessage) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    const refund = await db1.Refund.findByPk(refundId);
    if (!refund) {
      return res.status(404).json({ success: false, message: "Refund request not found!" });
    }

    refund.status = status;
    refund.adminMessage = adminMessage;
    refund.RefundApprovedprice = SanctionedRefundAmount;
    await refund.save();

    res.status(200).json({
      success: true,
      message: `Refund request has been ${status.toLowerCase()}!`,
      refund,
    });
  } catch (error) {
    console.error("Error updating refund status:", error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

const getUserRefunds = async (req, res) => {
  try {
    const userId = String(req?.user?.user?.id); // Ensure it's a string
    const refunds = await db1.Refund.findAll({
      where: { userId },
      order: [['date', 'DESC']],
    });
    return res.status(200).json({ success: true, refunds });
  } catch (error) {
    console.error("Error fetching refunds:", error);
    res.status(500).json({ success: false, error: "Failed to fetch refunds" });
  }
};

const getPilotCopilotDetails = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  try {
    const booking = await db1.Booking.findByPk(id, {
      include: [
        {
          model: db1.User,
          as: "pilotDetails",
          attributes: ["name", "email", "mobNumber"],
        },
        {
          model: db1.User,
          as: "copilotDetails",
          attributes: ["name", "email", "mobNumber"],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export { createReview, getAllReviews, getReviewsByOrderId,createRefund,getAllRefunds,createComplaint,getAllComplaints,createEnquiry,getAllEnquiry,updateRefundStatus,getUserRefunds,getPilotCopilotDetails };
