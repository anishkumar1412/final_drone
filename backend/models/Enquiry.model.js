import mongoose from "mongoose"

const EnquirySchema = new mongoose.Schema({
    productImage: { type: String, required: true },
    productName: { type: String, required: true },
    orderId: { type: String, required: true },
    userImage: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    reviewTitle: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },

    date: { type: Date, default: Date.now },

})

const Enquiry = mongoose.model("enquiry",EnquirySchema)
export default Enquiry;