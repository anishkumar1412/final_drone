import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "finance", "operations", "support"], required: true },
  access: [{ type: String }],
});

export const Admin = mongoose.model("Admin", adminSchema);

// export default (sequelize, DataTypes) =>{
//   const adminSchema = sequelize.define("Admin",{
//     name:{type:DataTypes.String},
//     email:{type:DataTypes.String}
//  })


//    return adminSchema;

// }


