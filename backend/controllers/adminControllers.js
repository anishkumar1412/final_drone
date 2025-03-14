import { v2 as cloudinary } from 'cloudinary'
import Drone from '../models/drone.js';
import Booking from '../models/Booking.js';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import Crop from '../models/cropModel.js';
import { Admin } from '../models/Admin.js';
import bcrypt from 'bcryptjs'
const addDrone = async (req, res) => {
  try {
    const {
      model, range, speed, weight, price, district, state, owner, propeller, arms,
      motor, lGear, nozzle, nutBold, bableBare, lnkey, waterPump, pipeQty, charger,
      chargerCable, chargerPcable, extaintionBoard, battery, transmeterAndReciever
    } = req.body;

    const imageFile = req.file;

    console.log({
      model, range, speed, weight, price, district, state, owner, propeller, arms,
      motor, lGear, nozzle, nutBold, bableBare, lnkey, waterPump, pipeQty, charger,
      chargerCable, chargerPcable, extaintionBoard, battery, transmeterAndReciever
    }, imageFile);

    // Check for missing data
    if (!model || !range || !speed || !weight || !price || !district || !state || !owner ||
      !propeller || !arms || !motor || !lGear || !nozzle || !nutBold || !bableBare || !lnkey ||
      !waterPump || !pipeQty || !charger || !chargerCable || !chargerPcable ||
      !extaintionBoard || !battery || !transmeterAndReciever) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const droneData = {
      model,
      range,
      speed,
      weight,
      price,
      district,
      state,
      owner,
      propeller,
      arms,
      motor,
      lGear,
      nozzle,
      nutBold,
      bableBare,
      lnkey,
      waterPump,
      pipeQty,
      charger,
      chargerCable,
      chargerPcable,
      extaintionBoard,
      battery,
      transmeterAndReciever,
      image: imageUrl,
    };

    const newDrone = new Drone(droneData);
    await newDrone.save();

    res.json({ success: true, message: "Drone Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addCrop = async (req, res) => {
  try {
    const {cropName ,cropPerAcer } = req.body;

    const imageFile = req.file;

    console.log({
       cropName,cropPerAcer
    }, imageFile);

    // Check for missing data
    if (!cropName || !cropPerAcer) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const cropData = {
      cropName,cropPerAcer,
      image: imageUrl,
    };

    const newCrop = new Crop(cropData);
    await newCrop.save();

    res.json({ success: true, message: "Crop Added Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })

  }
}

export const registerAdmins = async (req, res) => {
  try {
    const { name, email, password, role, access } = req.body;
    console.log(req.body);
    
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ name, email, password: hashedPassword, role, access });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error", error });
  }
};

export const loginAdmins = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role, access: admin.access },
      process.env[`${admin.role.toUpperCase()}_SECRET`],
      { expiresIn: "1h" }
    );
    console.log(token,admin)
    res.status(201).json({ success: true,token, admin });
    console.log("he")
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


const getAllBookings = async (req, res) => {
  try {
    const allBooking = await Booking.find({}); // Await the query result

    if (allBooking.length === 0) {  // Check if no bookings exist
      return res.json({ success: false, message: "No Booking Available" });
    }

    res.json({ success: true, allBooking }); // Send only plain objects
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const adminCancelBooking = async (req, res) => {
  try {
    const droneId = req.params.id; // Extract droneId from the URL
    const { startDate, endDate } = req.body;

    // Check if droneId is valid
    if (!mongoose.Types.ObjectId.isValid(droneId)) {
      return res.status(400).json({ message: "Invalid drone ID" });
    }

    // Find the booking and mark it as cancelled
    const booking = await Booking.findOneAndUpdate(
      { droneId: new mongoose.Types.ObjectId(droneId), startDate, endDate },
      { $set: { cancelled: true } },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Find the drone and remove the booking
    const drone = await Drone.findById(droneId);
    if (!drone) {
      return res.status(404).json({ message: "Drone not found" });
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Check if the booking exists in the drone's bookings array
    const bookingIndex = drone.bookings.findIndex(
      (booking) =>
        booking.startDate.toString() === startDateObj.toString() &&
        booking.endDate.toString() === endDateObj.toString()
    );

    if (bookingIndex === -1) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Remove the booking from the bookings array
    // Use $pull operator to remove the booking from the database
    await Drone.findByIdAndUpdate(
      droneId,
      { $pull: { bookings: { startDate: startDateObj, endDate: endDateObj } } },
      { new: true }
    );

    res.status(200).json({
      message: "Booking cancelled successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


const removeDrone = async (req, res) => {
  try {
    const { id } = req.params; // Get drone ID from URL params

    console.log("🔍 Removing Drone ID:", id);

    // Check if the drone exists
    const drone = await Drone.findById(id);
    if (!drone) {
      return res.status(404).json({ success: false, message: "Drone not found" });
    }

    // Delete the drone
    await Drone.findByIdAndDelete(id);

    res.json({ success: true, message: "Drone removed successfully" });
  } catch (error) {
    console.error(" Error removing drone:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const removeCrop = async (req, res) => {
  try {
    const { id } = req.params; // Get drone ID from URL params

    console.log("🔍 Removing Crop ID:", id);

    // Check if the drone exists
    const crop = await Crop.findById(id);
    if (!crop) {
      return res.status(404).json({ success: false, message: "Drone not found" });
    }

    // Delete the drone
    await Crop.findByIdAndDelete(id);

    res.json({ success: true, message: "Crop removed successfully" });
  } catch (error) {
    console.error(" Error removing drone:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


const changeAvailability = async (req,res)=>{
  // Assuming you're using Express
  const { id } = req.params;
  const { availability } = req.body;
  console.log("It is working")

  try {
    const drone = await Drone.findById(id);
    if (!drone) {
      return res.status(404).json({ message: 'Drone not found' });
    }
   

    drone.availability = availability;
    await drone.save();

    res.json({ message: 'Drone availability updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating drone availability' });
  }



}

const confirmOrder = async (req,res)=>{
   const {id} = req.body
   try {
     const booking = await Booking.findById(id)
     if(!booking){
      return res.json({success:false,message:'Booking not found'})
     }

     booking.orderConfirmed = true
     await booking.save()

     res.json({success:true,message:'Order confirmed successfully'})
   } catch (error) {
     console.log(error)
   }
}

// upadate pilot

const updatePilot = async (req,res) => {
  try {
    const { bookingId } = req.params;
    const { pilot, pilotName } = req.body; // Only taking pilot-related fields

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update only pilot fields
    if (pilot !== undefined) {
      booking.pilot = pilot;
      booking.pilotName = pilotName || booking.pilotName;
      booking.pilotConfirm = false;
      booking.pilotCancelled = false;
    }

    await booking.save();

    res.status(200).json({ message: "Pilot updated successfully", booking });
  } catch (error) {
    console.error("Error updating pilot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// update copilot

const updateCoPilot = async (req,res) => {
  try {
    const { bookingId } = req.params;
    const { coPilot, coPilotName } = req.body; // Only taking pilot-related fields

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update only pilot fields
    if (coPilot !== undefined) {
      booking.copilot = coPilot;
      booking.copilotName = coPilotName || booking.copilotName;
      booking.copilotConfirm = false;
      booking.copilotCancelled = false;
    }

    await booking.save();

    res.status(200).json({ message: "Co pilot updated successfully", booking });
  } catch (error) {
    console.error("Error updating pilot:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export { addDrone, getAllBookings, loginAdmin, adminCancelBooking, removeDrone,changeAvailability,addCrop,removeCrop,confirmOrder ,updatePilot,updateCoPilot}