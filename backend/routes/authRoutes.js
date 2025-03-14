// const express = require("express");
// const { registerUser, loginUser } = require("../controllers/authController");


import express from 'express'
import {registerUser,loginUser, getDroneData, getUserBookings, getUserBookingById,getCropData, getAllUsers, deleteUser, getProfile, updateProfile, getPilotTask, getCoPilotTask,confirmCopilot, pilotCancel}  from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js';
import authAdmin from '../middleware/authAdmin.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/getDrone',getDroneData)
router.get('/getCrop',getCropData)
router.get('/my-order',authMiddleware,getUserBookings)
router.get('/my-order/:orderId', authMiddleware, getUserBookingById)
router.get('/getUsers',getAllUsers)
router.get('/get-profile', authMiddleware, getProfile);
router.post('/update-profile',upload.single('image'),authMiddleware,updateProfile)


router.post('/deleteUser/:id',authAdmin,deleteUser)
router.get('/pilotTask',authMiddleware,getPilotTask)
router.get('/copilotTask',authMiddleware,getCoPilotTask)
router.post('/confirmCopilot',authMiddleware,confirmCopilot)
router.post('/pilotCancel',authMiddleware,pilotCancel)


export default router