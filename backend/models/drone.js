// import mongoose from "mongoose";

// const droneSchema = new mongoose.Schema({
//   model: { type: String, required: true },
//   range: { type: String, required: true },
//   speed: { type: String, required: true },
//   weight: { type: String, required: true },
//   price: { type: String, required: true },
//   district: { type: String, required: true },
//   state: { type: String, required: true },
//   owner: { type: String, required: true },
//   propeller: { type: String, required: true },
//   arms: { type: String, required: true },
//   motor: { type: String, required: true },
//   lGear: { type: String, required: true },
//   nozzle: { type: String, required: true },
//   nutBold: { type: String, required: true },
//   bableBare: { type: String, required: true },
//   lnkey: { type: String, required: true },
//   waterPump: { type: String, required: true },
//   pipeQty: { type: String, required: true },
//   charger: { type: String, required: true },
//   chargerCable: { type: String, required: true },
//   chargerPcable: { type: String, required: true },
//   extaintionBoard: { type: String, required: true },
//   battery: { type: String, required: true },
//   transmeterAndReciever: { type: String, required: true },
//   availability: { type: Boolean, default: true },
//   bookings: [
//     {
//       startDate: { type: Date },
//       endDate: { type: Date },
//     },
//   ],
//   image: { type: String, required: true },
// });

// const Drone = mongoose.model("Drone", droneSchema);

// export default Drone;


export default (sequelize, DataTypes) => {
  const Drone = sequelize.define('Drone', {
    model: { type: DataTypes.STRING, allowNull: false },
    range: { type: DataTypes.STRING, allowNull: false },
    speed: { type: DataTypes.STRING, allowNull: false },
    weight: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.STRING, allowNull: false },
    district: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    owner: { type: DataTypes.STRING, allowNull: false },
    propeller: { type: DataTypes.STRING, allowNull: false },
    arms: { type: DataTypes.STRING, allowNull: false },
    motor: { type: DataTypes.STRING, allowNull: false },
    lGear: { type: DataTypes.STRING, allowNull: false },
    nozzle: { type: DataTypes.STRING, allowNull: false },
    nutBold: { type: DataTypes.STRING, allowNull: false },
    bableBare: { type: DataTypes.STRING, allowNull: false },
    lnkey: { type: DataTypes.STRING, allowNull: false },
    waterPump: { type: DataTypes.STRING, allowNull: false },
    pipeQty: { type: DataTypes.STRING, allowNull: false },
    charger: { type: DataTypes.STRING, allowNull: false },
    chargerCable: { type: DataTypes.STRING, allowNull: false },
    chargerPcable: { type: DataTypes.STRING, allowNull: false },
    extaintionBoard: { type: DataTypes.STRING, allowNull: false },
    battery: { type: DataTypes.STRING, allowNull: false },
    transmeterAndReciever: { type: DataTypes.STRING, allowNull: false },
    availability: { type: DataTypes.BOOLEAN, defaultValue: true },
    bookings: {
      type: DataTypes.JSON, // Array of objects with startDate, endDate
      defaultValue: [],
    },
    image: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: true, // Adds createdAt and updatedAt
  });

  return Drone;
};
