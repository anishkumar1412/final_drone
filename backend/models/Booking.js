import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  droneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drone' },
  droneImg: { type: String, required: true },
  crop: { type: String, required: true },
  landPrice: { type: String, required: true },
  specificLandPrice: { type: Number, required: true },
  workingDays: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  villagePanchayat: { type: String, required: true },
  pinCode: { type: String, required: true },
  subtotal: { type: Number, required: true },
  pilot: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Pilot field
  copilot: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } ,// Co-Pilot field
  user: {
    type: Object,  // You can also define a user schema if needed
    required: true
  },
  cancelled: { type: Boolean, default: false },
  pilotName:{type:String,defult:null},
  copilotName:{type:String,default:null},
  pilotConfirm:{type:Boolean,default:false},
  copilotConfirm:{type:Boolean,default:false},
  copilotCancelled:{type:Boolean,default:false},
  pilotCancelled:{type:Boolean,default:false},
  workCompleted:{type:Boolean,default:false},
  orderConfirmed:{type:Boolean,default:false},
  target:{type:Number,default:0},
  done:{type:Number,default:0},
  pending:{type:Number,default:0},
  workProgress: { type: Object, default: {} },

  cancellationReason: { type: String, default: null }, // Reason for cancellation
  customMessage: { type: String, default: null } 
  
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
