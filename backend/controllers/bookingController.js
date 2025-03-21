import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Drone from "../models/drone.js"; // Ensure Drone model is imported
import mongoose from "mongoose";

const createBooking = async (req, res) => {
  try {
    const {
      crop,
      landPrice,
      specificLandPrice,
      workingDays,
      startDate,
      endDate,
      pilot,
      copilot,
      villagePanchayat,
      pinCode,
      droneId, // Now taking droneId to update drone bookings
      droneImg,
      pilotName,
      copilotName,
      workCompleted,
      poliotConfirm,
      copilotConfirm,
      orderConfirmed,
      pilotCancelled,
      copilotCancelled,
      total,
      done,
      pending,
      subtotal,
      workProgress
    } = req.body;

    console.log(droneImg)

    // Extract user ID from JWT token (middleware should set req.user)
    const userId = req.user?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }


    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("it is working ")
    // console.log(user)

    // Validate input fields
    if (!crop || !landPrice || !specificLandPrice || !workingDays || !startDate || !endDate || !villagePanchayat || !pinCode || !droneId || !droneImg) {
      console.log("feidlldddddd error")
      return res.status(400).json({ message: "Please fill all the required fields" });
    }



    // Create booking entry
    const newBooking = new Booking({
      crop,
      landPrice,
      specificLandPrice,
      workingDays,
      startDate,
      endDate,
      villagePanchayat,
      pinCode,
      subtotal,
      droneImg,
      user,
      droneId,
      pilot,
      copilot,
      pilotName,
      copilotName,
      workCompleted,
      poliotConfirm,
      copilotConfirm,
      orderConfirmed,
      pilotCancelled,
      copilotCancelled,
      total,
      done,
      pending,
      workProgress
    });

    await newBooking.save();

    // Find the drone and update its bookings
    const drone = await Drone.findById(droneId);
    if (!drone) {
      console.log("drone is not available")
      return res.status(404).json({ message: "Drone not found" });
    }

    drone.bookings.push({ startDate, endDate });
    await drone.save();

    res.status(201).json({
      message: "Booking successful",
      booking: newBooking,
      updatedDrone: drone,
      success: true,
    });
  } catch (error) {
    console.error("Error in booking:", error);
    res.status(500).json({ message: "Server error", error: error.message });
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
          customMessage ,
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

//   let { pilotId, copilotId, pilotName, copilotName } = req.body;

//   try {
//     // Validate ObjectId format
//     if (!mongoose.Types.ObjectId.isValid(pilotId) || !mongoose.Types.ObjectId.isValid(copilotId)) {
//       return res.status(400).json({ success: false, message: "Invalid pilot or copilot ID" });
//     }

//     console.log("this is working from the function");

//     const booking = await Booking.findByIdAndUpdate(
//       req.params.bookingId,
//       { 
//         pilot: new mongoose.Types.ObjectId(pilotId), 
//         copilot: new mongoose.Types.ObjectId(copilotId),
//         pilotName: pilotName,
//         copilotName: copilotName
//       },
//       { new: true }
//     );

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.status(200).json({ success: true, message: "Pilots assigned successfully", booking });
//   } catch (error) {
//     console.error("Error updating booking:", error);
//     res.status(500).json({ success: false, message: "Server Error", error });
//   }
// };



const assignBooking = async (req, res) => {
  let { pilotId, copilotId, pilotName, copilotName } = req.body;

  try {
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(pilotId) || !mongoose.Types.ObjectId.isValid(copilotId)) {
      return res.status(400).json({ success: false, message: "Invalid pilot or copilot ID" });
    }

    console.log("Assigning pilot and copilot...");

    // Get the booking details
    const booking = await Booking.findById(req.params.bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const { startDate, endDate } = booking;

    // Check if pilot or copilot is already assigned to another booking on the same date
    const existingBooking = await Booking.findOne({
      _id: { $ne: booking._id }, // Exclude the current booking
      $or: [{ pilot: pilotId }, { copilot: copilotId }],
      startDate: { $lte: endDate },
      endDate: { $gte: startDate }
    });

    if (existingBooking) {
      console.log("Error is coming from here`")
      return res.json({ success: false, message: "Pilot or Copilot is already assigned for the selected date range." });
    }

    // Update the booking with new pilot and copilot
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { pilot: pilotId, copilot: copilotId, pilotName, copilotName },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Pilots assigned successfully", booking: updatedBooking });

  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// const workUpdate = async (req, res) => {
//   try {
//     const { id } = req.params; // Get target ID from params
//     const { target, done, pending } = req.body; // Get updated values from request body

//     console.log(target, done, pending)

//     // Find the target by ID and update
//     const updatedWork = await Booking.findByIdAndUpdate(
//       id,
//       { target, done, pending },
//       { new: true }, // Return the updated document
//       console.log("this is working")

//     );

//     if (!updatedWork) {
//       return res.status(404).json({ message: "Target not found" });
//     }

//     res.json({ success: true, message: "Work updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


const workUpdate = async (req, res) => {
  try {
    const { id } = req.params; // Get booking ID
    let { date, done } = req.body; // Get work details from the pilot

    // Validate required fields
    if (!date || done === undefined ) {
      return res.status(400).json({ message: "Date, done, and pending fields are required" });
    }


    // Convert date to start of the day for consistency
    const workDate = new Date(date);
    workDate.setHours(0, 0, 0, 0);
    const workDateString = workDate.toISOString(); // Convert to string for better comparison

    // Find the booking
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure `workProgress` is an array
    if (!Array.isArray(booking.workProgress)) {
      booking.workProgress = [];
    }

    // Check if work already exists for this date
    const existingEntryIndex = booking.workProgress.findIndex(entry =>
      new Date(entry.date).toISOString() === workDateString
    );

    if (existingEntryIndex !== -1) {
      // Update existing entry
      booking.workProgress[existingEntryIndex].pending = pending;
      booking.workProgress[existingEntryIndex].farmerVerified = false;
    } else {
      // Add new entry
      booking.workProgress.push({ date: workDate, done,  farmerVerified: false });
    }

    // Mark `workProgress` as modified so Mongoose detects the change
    booking.markModified("workProgress");

    await booking.save(); // Save the updated document

    res.json({ success: true, message: "Work updated successfully", data: booking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const farmerVerified = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { date } = req.body;

    console.log("Received bookingId:", bookingId);
    console.log("Received date:", date);

    // Ensure date is converted to a Date object
    const formattedDate = new Date(date);
    console.log("Formatted Date Object:", formattedDate);

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: bookingId, "workProgress.date": formattedDate }, // Ensure date is a Date object
      { $set: { "workProgress.$.farmerVerified": true } },
      { new: true }
    );

    if (!updatedBooking) {
      console.log("No matching booking found or update failed.");
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    console.log("Update successful:", updatedBooking);
    res.json({ message: "Farmer verification updated successfully", booking: updatedBooking, success: true });
  } catch (error) {
    console.error("Error updating farmer verification:", error);
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

    updatedWork.workCompleted = true
    await updatedWork.save()

    res.json({ success: true, message: "Work Completed" })
  } catch (error) {
    es.status(500).json({ message: "Server error", error: error.message });
  }
}







export { createBooking, cancelBooking, assignBooking, workUpdate, workCompleted, farmerVerified }