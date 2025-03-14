import express from "express";
import {  cancelBooking, createBooking, farmerVerified, workCompleted, workUpdate } from "../controllers/bookingController.js";

import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router();

// Apply authMiddleware to protect the route
router.post("/book", authMiddleware, createBooking);
router.post("/cancelBooking/:id",authMiddleware,cancelBooking)
router.post("/workUpdate/:id",authMiddleware,workUpdate)
router.post('/workCompleted/:id',authMiddleware,workCompleted)
router.post('/farmerVerify/:bookingId',authMiddleware,farmerVerified)


export default router;
