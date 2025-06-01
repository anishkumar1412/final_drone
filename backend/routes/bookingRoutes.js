import express from "express";
import { cancelBooking, createBooking, farmerFinalVerified, farmerVerified, updateProgress, uploadImageField, workCompleted, workUpdate } from "../controllers/bookingController.js";

import authMiddleware from '../middleware/authMiddleware.js'
import upload from '../middleware/multer.js'



const router = express.Router();

// Apply authMiddleware to protect the route
router.post("/book", authMiddleware, createBooking);
router.post("/cancelBooking/:id", authMiddleware, cancelBooking)
router.post("/workUpdate/:id", authMiddleware, workUpdate)
router.post('/workCompleted/:id', authMiddleware, workCompleted)
router.post('/farmerVerify/:bookingId', authMiddleware, farmerVerified)
router.post('/farmerFinalVerify/:bookingId', authMiddleware, farmerFinalVerified)
router.post('/progress/:id', authMiddleware, updateProgress)
router.post('/addFiledImage/:taskId', upload.single('image'), uploadImageField)



export default router;
