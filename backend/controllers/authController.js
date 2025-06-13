import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import User from '../models/User.js'
// import Drone from '../models/drone.js';
// import Booking from '../models/Booking.js';
// import Crop from '../models/cropModel.js';
import cloudinary from 'cloudinary'
import db1 from '../models/index.js';


// Sequelize model

const User = db1.User
const Drone = db1.Drone
const Crop = db1.Crop
const Booking = db1.Booking

const registerUser = async (req, res) => {
  const {
    name,
    mobNumber,
    email,
    password,
    state,
    district,
    pin,
    villageName,
    role,
    image
  } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      name,
      mobNumber,
      email,
      password: hashedPassword,
      state,
      district,
      pin,
      villageName,
      role,
      image
    });

    // Generate token
    const payload = {
      user: {
        id: newUser.id, // Sequelize uses `id` instead of `_id`
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token, user: newUser });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};




// Login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Create JWT payload
    const payload = {
      user: {
        id: user.id, // Sequelize uses `id`
      },
    };

    // Sign JWT and respond
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;

        res.status(200).json({
          success: true,
          message: "Login successful",
          token,
          user
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};



// const getDroneData = async (req, res) => {

//   try {

//     const drones = await Drone.find()
//     res.json({ success: true, drones })

//   } catch (error) {
//     res.json({ success: false, message: error })
//   }
// }

const getDroneData = async (req, res) => {
  try {
    const drones = await Drone.findAll(); // Sequelize uses findAll instead of find
    res.json({ success: true, drones });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const getCropData = async (req, res) => {
  try {
    const crops = await Crop.findAll();
    res.json({ success: true, crops });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// const getUserBookings = async (req, res) => {
//   try {
//     const userId = req.user.user.id; // Extracted from auth middleware
//     console.log(userId)

//     if (!userId) {
//       return res.status(400).json({ success: false, message: "User authentication failed." });
//     }

//     const bookings = await Booking.find({ "user._id": new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });



//      console.log(bookings.map(b => ({ id: b._id, createdAt: b.createdAt })));


//     if (!bookings.length) {
//       return res.status(404).json({ success: false, message: "No bookings found for this user." });
//     }

//     res.status(200).json({ success: true, bookings });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };


const getUserBookings = async (req, res) => {
  try {
    const userId = req.user?.user?.id; // Assuming auth middleware attaches user info
    if (!userId) {
      return res.status(400).json({ success: false, message: "User authentication failed." });
    }

    // Query bookings where user JSON field has the matching id
    const bookings = await Booking.findAll({
      where: {
        'user.id': userId, // Assuming user info is saved as { id, name, ... } in Booking.user
      },
      order: [['createdAt', 'DESC']],
    });

    if (!bookings.length) {
      return res.status(404).json({ success: false, message: "No bookings found for this user." });
    }

    // Optional: log ids and creation dates
    console.log(bookings.map(b => ({ id: b.id, createdAt: b.createdAt })));

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Get user bookings error:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



const getUserBookingById = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch booking directly
    const order = await db1.Booking.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      order: {
        orderId: order.id,
        date: order.startDate,
        productImage: order.droneImg,
        productName: order.droneName || "Unknown",
        subtotal: order.subtotal
      }
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // Exclude password field
    });
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
    const userId = req.user?.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    // Find user by primary key and exclude password
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user });

  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { userId, name, mobNumber, email, state, district, pin, villageName } = req.body;
    const imageFile = req.file;

    console.log('Headers:', req.headers);

    if (!name || !mobNumber || !state || !district || !pin || !villageName || !email) {
      return res.json({ success: false, message: "Data Missing" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Update basic fields
    await user.update({
      name,
      mobNumber,
      email,
      state,
      district,
      pin,
      villageName
    });

    // If an image is uploaded, upload it to cloudinary and update the user
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      const imageUrl = imageUpload.secure_url;
      await user.update({ image: imageUrl });
    }

    res.json({ success: true, message: 'Profile Updated' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// const getPilotTask = async (req,res) => {
//   try {
//     const pilotId = req.user.user.id; // Get logged-in pilot's ID from token

//     console.log("this is the pilot id ",pilotId)

//     // Fetch bookings where the pilot matches the logged-in user
//     const bookings = await Booking.find({ pilot: pilotId }).populate("user", "name email mobNumber"); // Populate user details


//     res.status(200).json({ success: true, bookings });
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
// }
// }


// Make sure Booking is properly imported

const getPilotTask = async (req, res) => {
  try {
    const userId = req.user?.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    console.log("line no 344")

    const pilotTasks = await Booking.findAll({
      where: { pilot: String(userId) }, // Ensure consistent type with DB
      order: [['createdAt', 'DESC']]
    });

    console.log(pilotTasks)

    return res.status(200).json({ success: true, pilotTasks });
  } catch (error) {
    console.error("Get pilot tasks error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};





// const getCoPilotTask = async (req,res) => {
//   try {
//     const copilotId = req.user.user.id; // Get logged-in pilot's ID from token

//     console.log("this is the pilot id ",copilotId)

//     // Fetch bookings where the pilot matches the logged-in user
//     const bookings = await Booking.find({ copilot: copilotId }).populate("user", "name email mobNumber"); // Populate user details


//     res.status(200).json({ success: true, bookings });
// } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
// }
// }

const getCoPilotTask = async (req, res) => {
  try {
    const userId = req.user?.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const copilotTasks = await Booking.findAll({
      where: { copilot: String(userId) }, // Ensure type matches DB if copilot is stored as string
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json({ success: true, copilotTasks });
  } catch (error) {
    console.error("Get copilot tasks error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};




const confirmCopilot = async (req, res) => {
  try {
    const { id, name } = req.body;
    console.log("Name:", name);
    console.log("Booking ID:", id);

    // Use Sequelize to find booking by primary key
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    if (name === 'pilot') {
      booking.pilotConfirm = true;
    } else {
      booking.copilotConfirm = true;
    }

    // Save the updated booking
    await booking.save();

    return res.status(200).json({ success: true, message: `${name === 'pilot' ? 'Pilot' : 'Co-pilot'} confirmed successfully.` });

  } catch (error) {
    console.error("Error confirming co-pilot:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


const pilotCancel = async (req, res) => {
  try {
    const { id, name } = req.body;
    console.log(name)
    console.log(id)

    const booking = await Booking.findById(id)

    if (!booking) {
      return res.json({ success: false, message: "Booking not found" })
    }

    if (name === 'pilot') {
      booking.pilotCancelled = true;
    } else {
      booking.copilotCancelled = true;
    }
    await booking.save();

    res.json({ success: true, message: "Cancelled" })
  } catch (error) {
    console.log(error)
  }
}




export {
  registerUser, loginUser, getDroneData, getUserBookings, getUserBookingById, getCropData, getAllUsers, deleteUser,
  getProfile,
  updateProfile, getPilotTask, getCoPilotTask, confirmCopilot, pilotCancel
};
