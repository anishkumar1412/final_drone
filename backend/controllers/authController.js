import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Drone from '../models/drone.js';
import Booking from '../models/Booking.js';
import Crop from '../models/cropModel.js';
import cloudinary from 'cloudinary'
// Register a new user
const registerUser = async (req, res) => {
  const { name, mobNumber, email, password, state, district, pin, villageName, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      mobNumber,
      email,
      password,
      state,
      district,
      pin,
      villageName,
      role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token, user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
      if (err) throw err;
      res.json({ token, user });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


const getDroneData = async (req, res) => {

  try {

    const drones = await Drone.find()
    res.json({ success: true, drones })

  } catch (error) {
    res.json({ success: false, message: error })
  }
}
const getCropData = async (req, res) => {

  try {

    const crops = await Crop.find()
    res.json({ success: true, crops })

  } catch (error) {
    res.json({ success: false, message: error })
  }
}


const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.user.id; // Extracted from auth middleware
    console.log(userId)

    if (!userId) {
      return res.status(400).json({ success: false, message: "User authentication failed." });
    }

    const bookings = await Booking.find({ "user._id": new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.status(404).json({ success: false, message: "No bookings found for this user." });
    }

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
const getUserBookingById = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Fetch booking and populate drone details
    const order = await Booking.findById(orderId).populate("droneId");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      order: {
        orderId: order._id,
        date: order.startDate,  // Assuming startDate is the order date
        productImage: order.droneImg,  // Using droneImg as productImage
        productName: order.droneId ? order.droneId.model : "Unknown",
        subtotal:order.subtotal // Fetching model name from Drone
      }
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude password field
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
const getProfile = async (req, res) => {
  try {
   console.log(req.user)
      const user = await User.findById(req.user.user.id).select('-password');
      res.json({ success: true, user });
  } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
      const { userId,name, mobNumber,email,state,district,pin, villageName } = req.body;
      const imageFile = req.file;
   
    
      console.log('Headers:', req.headers);

      if(!name || !mobNumber || !state ||!district ||!pin ||!villageName ||!email )
      {
          return res.json({success:false,message:"Data Missing"});
      }
      await User.findByIdAndUpdate(userId,{name,mobNumber,state,district,pin,villageName});

      if(imageFile)
      {
          // upload image to cloudinary
          const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
          const imageUrl = imageUpload.secure_url;
          await User.findByIdAndUpdate(userId,{image:imageUrl});
      }

     

      res.json({ success: true, message: 'Profile Updated' });
  } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
  }
};
const getPilotTask = async (req,res) => {
  try {
    const pilotId = req.user.user.id; // Get logged-in pilot's ID from token

    console.log("this is the pilot id ",pilotId)

    // Fetch bookings where the pilot matches the logged-in user
    const bookings = await Booking.find({ pilot: pilotId }).populate("user", "name email mobNumber"); // Populate user details
   

    res.status(200).json({ success: true, bookings });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
}
}
const getCoPilotTask = async (req,res) => {
  try {
    const copilotId = req.user.user.id; // Get logged-in pilot's ID from token

    console.log("this is the pilot id ",copilotId)

    // Fetch bookings where the pilot matches the logged-in user
    const bookings = await Booking.find({ copilot: copilotId }).populate("user", "name email mobNumber"); // Populate user details
   

    res.status(200).json({ success: true, bookings });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
}
}


const confirmCopilot = async (req,res)=>{
  try {
      const {id,name} = req.body;
      console.log(name)
      console.log(id)

      const booking = await Booking.findById(id)

      if(!booking){
        return res.json({success:false,message:"Booking not found"})
      }

      if(name === 'pilot'){
        booking.pilotConfirm = true;
      }else{
        booking.copilotConfirm = true;
      }
      await booking.save();

      res.json({success:true,message:"Co-pilot confirmed"})
  } catch (error) {
     console.log(error)
  }
}


const pilotCancel = async (req,res)=>{
  try {
      const {id,name} = req.body;
      console.log(name)
      console.log(id)

      const booking = await Booking.findById(id)

      if(!booking){
        return res.json({success:false,message:"Booking not found"})
      }

      if(name === 'pilot'){
        booking.pilotCancelled = true;
      }else{
        booking.copilotCancelled = true;
      }
      await booking.save();

      res.json({success:true,message:"Cancelled"})
  } catch (error) {
     console.log(error)
  }
}




export { registerUser, loginUser, getDroneData, getUserBookings, getUserBookingById, getCropData, getAllUsers, deleteUser, getProfile, updateProfile, getPilotTask ,getCoPilotTask,confirmCopilot,pilotCancel};
