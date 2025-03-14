import express from "express";
import { createComplaint, createEnquiry, createRefund, createReview, getAllComplaints, getAllEnquiry, getAllRefunds, getAllReviews, getPilotCopilotDetails, getReviewsByOrderId, getUserRefunds, updateRefundStatus } from "../controllers/Reviews.controller.js";
import authAdmin from "../middleware/authAdmin.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/post-reviews", createReview); // ✅ Add a new review
router.get("/get-reviews", getAllReviews); // ✅ Get all reviews
router.post("/post-refund", createRefund); 
router.get("/get-refunds", getAllRefunds); 
router.post("/post-complaints", createComplaint); 
router.get("/get-complaints", getAllComplaints); 
router.post("/post-enquiry", createEnquiry); 
router.post("/update-refund-status", updateRefundStatus); 
router.get("/get-enquiry", getAllEnquiry); 
router.get("/reviews/:orderId", getReviewsByOrderId);
router.get("/refunds",authMiddleware,getUserRefunds) // ✅ Get reviews by orderId
router.get("/booking/:id",authMiddleware,getPilotCopilotDetails);
export default router;
