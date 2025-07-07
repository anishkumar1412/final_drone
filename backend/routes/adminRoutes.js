import express from 'express'
import { addCrop, addDrone, adminCancelBooking, changeAvailability, getAllBookings, loginAdmin, removeCrop, removeDrone,confirmOrder, updatePilot, updateCoPilot, registerAdmins, loginAdmins, getAllAdmins,getAdminProfile, addWorkingDays, getWorkingDays, deleteWorkingDay, getAllPermissions } from '../controllers/adminControllers.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'
import { assignBooking } from '../controllers/bookingController.js'
import { verifyToken } from '../middleware/adminPermissionAuth.js'
import dynamicAuthMiddleware from '../middleware/dynamicauthmiddleware.js'

const router = express.Router()

router.post(
  '/addDrone',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Add Drone")(req, res, next),
  upload.single('image'),
  addDrone
);
router.post(
  '/removeDrone/:id',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Add Drone")(req, res, next),
  removeDrone
);

// 🟢 Crops
router.post(
  '/addCrop',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Add Crop")(req, res, next),
  upload.single('image'),
  addCrop
);
router.post(
  '/removeCrop/:id',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Add Crop")(req, res, next),
  removeCrop
);

// 🟢 Bookings
router.get(
  '/getBookings',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Total Bookings")(req, res, next),
  getAllBookings
);
router.post(
  '/cancelBooking/:id',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Total Bookings")(req, res, next),
  adminCancelBooking
);
router.post(
  '/confirmOrder',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Total Bookings")(req, res, next),
  confirmOrder
);
router.post(
  '/assign-pilots/:bookingId',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Total Bookings")(req, res, next),
  assignBooking
);
router.post(
  '/update-pilot/:bookingId',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Total Bookings")(req, res, next),
  updatePilot
);
router.post(
  '/update-copilot/:bookingId',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Total Bookings")(req, res, next),
  updateCoPilot
);
router.post(
  '/changeAvailability/:id',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Total Bookings")(req, res, next),
  changeAvailability
);

// 🟢 Admin Auth & Profile
router.post('/login', loginAdmin);
router.post('/admins-login', loginAdmins);

router.get(
  '/me',
  verifyToken,
  getAdminProfile
);

router.get(
  '/all',
  verifyToken,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Users")(req, res, next),
  getAllAdmins
);

// 🟢 Admin Registration (Super Admin or Add Admins permission)
router.post(
  '/admins-register',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Add Admins")(req, res, next),
  registerAdmins
);

// 🟢 Working Days
router.post(
  '/working-days',addWorkingDays
);
router.get(
  '/get-working-days',getWorkingDays
);
router.post(
  '/delete-working-days/:id',
  dynamicAuthMiddleware,
  (req, res, next) => req.isSuperAdmin ? next() : checkPermission("Add Working Days")(req, res, next),
  deleteWorkingDay
);
// controllers/permissionController.js

router.get('/permissions',getAllPermissions);



export default router