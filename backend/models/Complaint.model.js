import mongoose from "mongoose";
const ComplaintSchema = new mongoose.Schema({
    productImage: { type: String, required: true },
    productName: { type: String, required: true },
    orderId: { type: String, required: true },
    userImage: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    reviewTitle: { type: String, required: true },
    reviewText: { type: String, required: true },
    date: { type: Date, default: Date.now },

})

const Complaint = mongoose.model("complaint",ComplaintSchema)

export default Complaint;