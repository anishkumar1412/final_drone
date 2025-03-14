import mongoose from "mongoose";
import crypto from "crypto";



const RefundSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productImage: { type: String, required: true },
  productName: { type: String, required: true },
  price:{type:String,required:true},
  orderId: { type: String, required: true },
  userImage: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  userPhone: {type: String, required: true},
  rating: { type: Number, required: true, min: 1, max: 5 },
  status: { type: String, enum: ["Pending", "Approved", "Declined"], default: "Pending" },
  Paymentstatus: { type: String, enum: ["Sent", "Pending", "Declined"], default: "Pending" },
  adminMessage: { type: String, default: "" },
  reviewTitle: { type: String, required: true },
  reviewText: { type: String, required: true },
  date: { type: Date, default: Date.now },
 
  
  Copilotname:{type:String, required: true,default:""},
  CopilotmobNumber:{type:String,required:true,default:""},
  Copilotemail:{ type: String, required: true,default:"" },
  Pilotname:{type:String, required: true,default:""},
  PilotmobNumber:{type:String,required:true,default:""},
  Pilotemail:{ type: String, required: true,default:"" },

  refundRequestAmount:{type:Number,required:true,default:0},
  RefundApprovedprice: { type: Number, required: true,default:0 },
  // Encrypted Fields
  AccountHolderName: { type: String, required: true, },
  bankAccountNumber: { type: String, required: true, },
  bankName: { type: String, required: true, },
  bankAddress: { type: String, required: true, },
  

  bankIFSC: { type: String, required: true,  },
});

const Refund = mongoose.model("Refund", RefundSchema);

export default Refund;
