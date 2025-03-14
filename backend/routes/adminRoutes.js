import express from 'express'
import { addCrop, addDrone, adminCancelBooking, changeAvailability, getAllBookings, loginAdmin, removeCrop, removeDrone,confirmOrder, updatePilot, updateCoPilot, registerAdmins, loginAdmins, getAllAdmins } from '../controllers/adminControllers.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js'
import { assignBooking } from '../controllers/bookingController.js'
import { checkPermission, verifyToken } from '../middleware/adminPermissionAuth.js'


const router = express.Router()

router.post('/addDrone', upload.single('image'), addDrone)
router.post('/addCrop', upload.single('image'), addCrop)
router.get('/getBookings', getAllBookings)
router.post('/login', loginAdmin)
router.post("/cancelBooking/:id", authAdmin, adminCancelBooking)
router.post('/removeDrone/:id', authAdmin, removeDrone)
router.post('/removeCrop/:id', authAdmin, removeCrop)
router.post('/changeAvailability/:id', changeAvailability)
router.post('/assign-pilots/:bookingId', authAdmin, assignBooking)
router.post('/addDrone',upload.single('image'),addDrone)
router.post('/addCrop',upload.single('image'),addCrop)
router.get('/getBookings',getAllBookings)

router.post('/login',loginAdmin)
router.post("/cancelBooking/:id",authAdmin,adminCancelBooking)
router.post('/removeDrone/:id',authAdmin,removeDrone)
router.post('/removeCrop/:id',authAdmin,removeCrop)
router.post('/changeAvailability/:id',changeAvailability)
router.post('/confirmOrder',authAdmin,confirmOrder)
router.post('/update-pilot/:bookingId',authAdmin,updatePilot)
router.post('/update-copilot/:bookingId',authAdmin,updateCoPilot)
router.post("/admins-register", registerAdmins);
router.post("/admins-login", loginAdmins);
router.get("/all", verifyToken, checkPermission("Manage Users"), getAllAdmins);


export default router