
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   image:{type:String},
//   name: { type: String, required: true },
//   role:{type:String,required:true},
//   mobNumber: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   state: { type: String, default:'Odisha' },
//   district: { type: String ,default:'Khorda'},
//   pin: { type: String },
//   villageName: { type: String },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// export default User;




export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    image: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      defaultValue: 'Odisha',
    },
    district: {
      type: DataTypes.STRING,
      defaultValue: 'Khorda',
    },
    pin: {
      type: DataTypes.STRING,
    },
    villageName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,     // Adds createdAt and updatedAt
  });

  return User;
};
