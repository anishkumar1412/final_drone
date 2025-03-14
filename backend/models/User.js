
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  image:{type:String},
  name: { type: String, required: true },
  role:{type:String,required:true},
  mobNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  state: { type: String, default:'Odisha' },
  district: { type: String ,default:'Khorda'},
  pin: { type: String },
  villageName: { type: String },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
