// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   droneId: { type: mongoose.Schema.Types.ObjectId, ref: 'Drone' },
//   droneName: { type: String },
//   droneImg: { type: String, required: true },
//   crop: { type: String, required: true },
//   landPrice: { type: String, required: true },
//   specificLandPrice: { type: Number, required: true },
//   workingDays: { type: Number, required: true },
//   startDate: { type: Date, required: true },
//   endDate: { type: Date, required: true },
//   villagePanchayat: { type: String, required: true },
//   pinCode: { type: String, required: true },
//   subtotal: { type: Number, required: true },
//   pilot: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Pilot field
//   copilot: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },// Co-Pilot field
//   user: {
//     type: Object,  // You can also define a user schema if needed
//     required: true
//   },
//   cancelled: { type: Boolean, default: false },
//   pilotName: { type: String, default: null },
//   pilotMobile: { type: String, default: null },
//   copilotName: { type: String, default: null },
//   copilotMobile: { type: String, default: null },
//   pilotConfirm: { type: Boolean, default: false },
//   copilotConfirm: { type: Boolean, default: false },
//   copilotCancelled: { type: Boolean, default: false },
//   pilotCancelled: { type: Boolean, default: false },
//   workCompleted: { type: Boolean, default: false },
//   orderConfirmed: { type: Boolean, default: false },
//   target: { type: Number, default: 0 },
//   done: { type: Number, default: 0 },
//   pending: { type: Number, default: 0 },
//   progress: { type: Boolean, default: false },
//   workProgress: { type: Object, default: {} },

//   cancellationReason: { type: String, default: null }, // Reason for cancellation
//   customMessage: { type: String, default: null },

//   farmerVerifiedComplete: { type: Boolean, default: false },
//   fieldImage:{type:String,default:""},
//   cropPrice:{type:Number,default:null}
// }, { timestamps: true });

// const Booking = mongoose.model("Booking", bookingSchema);

// export default Booking;


export default (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    droneId: {
      type: DataTypes.STRING, // or UUID if you're using UUIDs
      allowNull: true,
    },
    droneName: {
      type: DataTypes.STRING,
    },
    droneImg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    crop: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specificLandPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    workingDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    villagePanchayat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    pilot: {
      type: DataTypes.STRING, // ForeignKey reference to User
      allowNull: true,
    },
    copilot: {
      type: DataTypes.STRING, // ForeignKey reference to User
      allowNull: true,
    },
    user: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    cancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    pilotName: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    pilotMobile: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    copilotName: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    copilotMobile: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    pilotConfirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    copilotConfirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    copilotCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    pilotCancelled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    workCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    orderConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    target: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    done: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    pending: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    progress: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    workProgress: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    cancellationReason: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    customMessage: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    farmerVerifiedComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fieldImage: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    cropPrice: {
      type: DataTypes.FLOAT,
      defaultValue: null,
    },
  }, {
    timestamps: true,
  });

  return Booking;
};
