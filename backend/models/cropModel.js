import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  cropName: { type: String, required: true },
  cropPerAcer:{type:Number,required:true},

  image: { type: String, required: true },

});

const Crop = mongoose.model("Crop", cropSchema);

export default Crop;
