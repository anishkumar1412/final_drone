// import Booking from "../models/Booking.js";
// import User from "../models/User.js";
// import Drone from "../models/drone.js"; // Ensure Drone model is imported
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary'
import db1 from "../models/index.js";
import { Op } from 'sequelize'


const User = db1.User
const Drone = db1.Drone
const Booking = db1.Booking

// const createBooking = async (req, res) => {
//   try {
//     const {
//       crop,
//       landPrice,
//       specificLandPrice,
//       workingDays,
//       startDate,
//       endDate,
//       pilot,
//       copilot,
//       villagePanchayat,
//       pinCode,
//       droneId, // Now taking droneId to update drone bookings
//       droneImg,
//       pilotName,
//       copilotName,
//       pilotMobile,
//       copilotMobile,
//       workCompleted,
//       poliotConfirm,
//       copilotConfirm,
//       orderConfirmed,
//       pilotCancelled,
//       copilotCancelled,
//       total,
//       done,
//       pending,
//       subtotal,
//       workProgress,
//       progress,
//       droneName,
//       farmerVerifiedComplete,
//       cropPrice
//     } = req.body;

//     console.log(droneImg)

//     // Extract user ID from JWT token (middleware should set req.user)
//     const userId = req.user?.user?.id;
//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized access" });
//     }


//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     console.log("it is working ")
//     // console.log(user)

//     // Validate input fields
//     if (!crop || !landPrice || !specificLandPrice || !workingDays || !startDate || !endDate || !villagePanchayat || !pinCode || !droneId || !droneImg) {
//       console.log("feidlldddddd error")
//       return res.status(400).json({ message: "Please fill all the required fields" });
//     }



//     // Create booking entry
//     const newBooking = new Booking({
//       crop,
//       landPrice,
//       specificLandPrice,
//       workingDays,
//       startDate,
//       endDate,
//       villagePanchayat,
//       pinCode,
//       subtotal,
//       droneImg,
//       user,
//       droneId,
//       pilot,
//       copilot,
//       pilotName,
//       copilotName,
//       pilotMobile,
//       copilotMobile,
//       workCompleted,
//       poliotConfirm,
//       copilotConfirm,
//       orderConfirmed,
//       pilotCancelled,
//       copilotCancelled,
//       total,
//       done,
//       pending,
//       workProgress,
//       progress,
//       droneName,
//       farmerVerifiedComplete,
//       cropPrice
//     });

//     await newBooking.save();

//     // Find the drone and update its bookings
//     const drone = await Drone.findById(droneId);
//     if (!drone) {
//       console.log("drone is not available")
//       return res.status(404).json({ message: "Drone not found" });
//     }

//     drone.bookings.push({ startDate, endDate });
//     await drone.save();

//     res.status(201).json({
//       message: "Booking successful",
//       booking: newBooking,
//       updatedDrone: drone,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error in booking:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


const createBooking = async (req, res) => {
  try {
    const {
      crop,
      landPrice,
      specificLandPrice,
      workingDays,
      startDate,
      endDate,
      villagePanchayat,
      pinCode,
      droneId,
      droneImg,
      droneName,
      subtotal,
      cropImage, // optional

      pilot,
      copilot,
      pilotName,
      copilotName,
      pilotMobile,
      copilotMobile,
      workCompleted,
      pilotConfirm,
      copilotConfirm,
      orderConfirmed,
      pilotCancelled,
      copilotCancelled,
      total,
      done,
      pending,
      workProgress,
      progress,
      farmerVerifiedComplete,
      cropPrice,
    } = req.body;

    // Authentication check
    const userId = req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate required fields
    const missingFields = [];
    if (!crop) missingFields.push("crop");
    if (!landPrice) missingFields.push("landPrice");
    if (!specificLandPrice) missingFields.push("specificLandPrice");
    if (!workingDays) missingFields.push("workingDays");
    if (!startDate) missingFields.push("startDate");
    if (!endDate) missingFields.push("endDate");
    if (!villagePanchayat) missingFields.push("villagePanchayat");
    if (!pinCode) missingFields.push("pinCode");
    if (!droneId) missingFields.push("droneId");
    if (!droneImg) missingFields.push("droneImg");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        missingFields,
      });
    }

    // Find drone instance
    const drone = await Drone.findByPk(droneId);
    if (!drone) {
      return res.status(404).json({ message: "Drone not found" });
    }

    // Create booking
    const newBooking = await Booking.create({
      crop,
      landPrice,
      specificLandPrice,
      workingDays,
      startDate,
      endDate,
      villagePanchayat,
      pinCode,
      droneId,
      droneImg,
      droneName,
      subtotal,
      cropImage: cropImage || null,
      user: user.toJSON(),
      pilot,
      copilot,
      pilotName,
      copilotName,
      pilotMobile,
      copilotMobile,
      workCompleted,
      pilotConfirm,
      copilotConfirm,
      orderConfirmed,
      pilotCancelled,
      copilotCancelled,
      total,
      done,
      pending,
      workProgress: workProgress || {},
      progress: progress || false,
      farmerVerifiedComplete,
      cropPrice,
    });

    // Update drone bookings array and save
    let existingBookings;
    try {
      existingBookings = Array.isArray(drone.bookings)
        ? drone.bookings
        : JSON.parse(drone.bookings || '[]');
    } catch (e) {
      existingBookings = [];
    }

    existingBookings.push({ startDate, endDate });
    drone.bookings = JSON.stringify(existingBookings);

    await drone.save();


    return res.status(201).json({
      message: "Booking successful",
      booking: newBooking,
      updatedDrone: drone,
      success: true,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const cancelBooking = async (req, res) => {
  try {
    const droneId = req.params.id; // Extract droneId from URL
    const userId = req.user.user.id; // Extract user ID from authenticated request
    const { startDate, endDate, cancellationReason, customMessage } = req.body; // Extract cancellation details

    // Check if droneId is valid
    if (!mongoose.Types.ObjectId.isValid(droneId)) {
      return res.status(400).json({ message: "Invalid drone ID" });
    }

    // Find and update the booking to mark it as cancelled with reason and message
    const booking = await Booking.findOneAndUpdate(
      { droneId: new mongoose.Types.ObjectId(droneId), startDate, endDate },
      {
        $set: {
          cancelled: true,
          cancellationReason,
          customMessage,
          pilot: null, // Set pilot to null
          coPilot: null // Set coPilot to null

        }
      },
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
      (b) =>
        b.startDate.toString() === startDateObj.toString() &&
        b.endDate.toString() === endDateObj.toString()
    );

    if (bookingIndex === -1) {
      return res.status(404).json({ message: "Booking not found in drone data" });
    }

    // Remove the booking from the drone's bookings array
    await Drone.findByIdAndUpdate(
      droneId,
      { $pull: { bookings: { startDate: startDateObj, endDate: endDateObj } } },
      { new: true }
    );

    res.status(200).json({
      message: "Booking cancelled successfully",
      success: true,
      booking, // Send updated booking with cancellation details
    });
  } catch (error) {
    console.error("Error canceling booking:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};




// const assignBooking = async (req, res) => {
//   let { pilotId, copilotId, pilotName, copilotName, pilotMobile, copilotMobile } = req.body;

//   try {
//     // Validate ObjectId format
//     if (!mongoose.Types.ObjectId.isValid(pilotId) || !mongoose.Types.ObjectId.isValid(copilotId)) {
//       return res.status(400).json({ success: false, message: "Invalid pilot or copilot ID" });
//     }

//     console.log("Assigning pilot and copilot...");

//     // Get the booking details
//     const booking = await Booking.findById(req.params.bookingId);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     const { startDate, endDate } = booking;

//     // Check if pilot or copilot is already assigned to another booking on the same date
//     const existingBooking = await Booking.findOne({
//       _id: { $ne: booking._id }, // Exclude the current booking
//       $or: [{ pilot: pilotId }, { copilot: copilotId }],
//       startDate: { $lte: endDate },
//       endDate: { $gte: startDate }
//     });

//     if (existingBooking) {
//       console.log("Error is coming from here`")
//       return res.json({ success: false, message: "Pilot or Copilot is already assigned for the selected date range." });
//     }

//     // Update the booking with new pilot and copilot
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       req.params.bookingId,
//       { pilot: pilotId, copilot: copilotId, pilotName, copilotName, pilotMobile, copilotMobile },
//       { new: true }
//     );

//     res.status(200).json({ success: true, message: "Pilots assigned successfully", booking: updatedBooking });

//   } catch (error) {
//     console.error("Error updating booking:", error);
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };

// const assignBooking = async (req, res) => {
//   let { pilotId, copilotId, pilotName, copilotName, pilotMobile, copilotMobile } = req.body;

//   try {
//     // Validate pilotId
//     if (!mongoose.Types.ObjectId.isValid(pilotId)) {
//       return res.status(400).json({ success: false, message: "Invalid pilot ID" });
//     }

//     // Allow "no copilot" string
//     const isCopilotAssigned = copilotId !== "no copilot";
//     if (isCopilotAssigned && !mongoose.Types.ObjectId.isValid(copilotId)) {
//       return res.status(400).json({ success: false, message: "Invalid copilot ID" });
//     }

//     console.log("Assigning pilot and copilot...");

//     // Get the booking
//     const booking = await Booking.findById(req.params.bookingId);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     const { startDate, endDate } = booking;

//     // Check for scheduling conflict
//     const conflictQuery = {
//       _id: { $ne: booking._id },
//       startDate: { $lte: endDate },
//       endDate: { $gte: startDate },
//       $or: [
//         { pilot: pilotId },
//         ...(isCopilotAssigned ? [{ copilot: copilotId }] : [])
//       ]
//     };

//     const existingBooking = await Booking.findOne(conflictQuery);

//     if (existingBooking) {
//       return res.json({ success: false, message: "Pilot or Copilot is already assigned for the selected date range." });
//     }

//     // If copilot is "no copilot", make it null in DB
//     const updateData = {
//       pilot: pilotId,
//       pilotName,
//       pilotMobile,
//       copilot: isCopilotAssigned ? copilotId : null,
//       copilotName: isCopilotAssigned ? copilotName : "no copilot",
//       copilotMobile: isCopilotAssigned ? copilotMobile : "N/A"
//     };

//     const updatedBooking = await Booking.findByIdAndUpdate(
//       req.params.bookingId,
//       updateData,
//       { new: true }
//     );

//     res.status(200).json({ success: true, message: "Pilots assigned successfully", booking: updatedBooking });

//   } catch (error) {
//     console.error("Error updating booking:", error);
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };


const assignBooking = async (req, res) => {
  const {
    pilotId,
    copilotId,
    pilotName,
    copilotName,
    pilotMobile,
    copilotMobile,
  } = req.body;
  const bookingId = req.params.bookingId;

  try {
    // Validate pilotId
    if (isNaN(pilotId)) {
      return res.status(400).json({ success: false, message: "Invalid pilot ID" });
    }

    const isCopilotAssigned = copilotId !== "no copilot" && copilotId !== null && copilotId !== undefined;

    if (isCopilotAssigned && isNaN(copilotId)) {
      return res.status(400).json({ success: false, message: "Invalid copilot ID" });
    }

    // Find the booking, include user details if needed
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const { startDate, endDate } = booking;
    console.log(startDate, endDate)

    // Check if pilot or copilot already assigned in conflicting bookings
    const conflictCondition = {
      id: { [Op.ne]: booking.id },
      startDate: { [Op.lte]: endDate },
      endDate: { [Op.gte]: startDate },
      [Op.or]: [
        { pilot: pilotId.toString() },          // cast to string
        ...(isCopilotAssigned ? [{ copilot: copilotId.toString() }] : [])
      ]
    };


    const existingBooking = await Booking.findOne({ where: conflictCondition });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        message: "Pilot or Copilot is already assigned for the selected date range.",
      });
    }

    // Prepare updated data
    const updateData = {
      pilot: pilotId,
      pilotName,
      pilotMobile,
      copilot: isCopilotAssigned ? copilotId : null,
      copilotName: isCopilotAssigned ? copilotName : "no copilot",
      copilotMobile: isCopilotAssigned ? copilotMobile : "N/A",
    };

    // Update booking
    const updatedBooking = await booking.update(updateData);

    res.status(200).json({
      success: true,
      message: "Pilots assigned successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


const workUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, done } = req.body;
    console.log(date, done + " line 547");

    if (!date || done === undefined) {
      return res.status(400).json({ message: "Date and done fields are required" });
    }

    const workDate = new Date(date);
    workDate.setHours(0, 0, 0, 0);
    const workDateString = workDate.toISOString();

    const booking = await Booking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    let workProgress = Array.isArray(booking.workProgress)
      ? booking.workProgress
      : booking.workProgress
        ? JSON.parse(booking.workProgress)
        : [];

    const existingIndex = workProgress.findIndex(
      (entry) => new Date(entry.date).toISOString() === workDateString
    );

    if (existingIndex !== -1) {
      workProgress[existingIndex].done = done;
      workProgress[existingIndex].farmerVerified = false;
    } else {
      workProgress.push({
        date: workDate,
        done,
        farmerVerified: false,
      });
    }

    booking.workProgress = JSON.stringify(workProgress); // ✅ this is the fix
    await booking.save();

    res.json({ success: true, message: "Work updated successfully", data: booking });
  } catch (error) {
    console.error("Error in workUpdate:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const farmerVerified = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({ success: false, message: "Date is required" });
    }

    const formattedDate = new Date(date);
    if (isNaN(formattedDate)) {
      return res.status(400).json({ success: false, message: "Invalid date format" });
    }

    // 1. Fetch the booking
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // 2. Parse workProgress (could already be an array or a JSON string)
    let progress = booking.workProgress;
    if (typeof progress === 'string') {
      try {
        progress = JSON.parse(progress);
      } catch {
        progress = [];
      }
    }
    if (!Array.isArray(progress)) {
      progress = [];
    }

    // 3. Find the entry for that date
    const entryIndex = progress.findIndex(w => {
      const wDate = new Date(w.date);
      return wDate.toISOString() === formattedDate.toISOString();
    });

    if (entryIndex === -1) {
      return res.status(404).json({ success: false, message: "Work progress entry not found" });
    }

    // 4. Update the farmerVerified flag
    progress[entryIndex].farmerVerified = true;

    // 5. Save back to the booking
    booking.workProgress = progress;
    await booking.save();

    // Return updated booking
    return res.json({
      success: true,
      message: "Farmer verified successfully",
      booking
    });
  } catch (error) {
    console.error("Error in farmerVerified:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


const farmerFinalVerified = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { farmerVerifiedComplete: true },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Verification complete", booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};



const workCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedWork = await Booking.findById(id)

    if (!updatedWork) {
      return res.json({ success: false, message: "Work not found" })
    }

    if (!updatedWork.progress) {
      return res.json({ success: false, message: "Before completing the work progress should be done" })
    }

    updatedWork.workCompleted = true
    updatedWork.pilot = null
    updatedWork.copilot = null
    await updatedWork.save()

    res.json({ success: true, message: "Work Completed" })
  } catch (error) {
    es.status(500).json({ message: "Server error", error: error.message });
  }
}


const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;



    if (typeof progress !== "boolean") {
      return res.status(400).json({ message: "Invalid progress value" });
    }

    const updatedProgress = await Booking.findByIdAndUpdate(
      id,
      { progress },
      { new: true }
    );

    if (!updatedProgress) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Progress updated", user: updatedProgress, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message, success: false });
  }
};



const uploadImageField = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    const imageFile = req.file // e.g., 'uploads/filename.jpg'


    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const task = await Booking.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    task.fieldImage = imageUrl;
    await task.save();

    res.status(200).json({ success: true, message: "Field proof uploaded" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: "Upload failed", error: err });
  }
}






export { createBooking, cancelBooking, assignBooking, workUpdate, workCompleted, farmerVerified, updateProgress, farmerFinalVerified, uploadImageField }