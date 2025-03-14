import mongoose from "mongoose";

const droneSchema = new mongoose.Schema({
  model: { type: String, required: true },
  range: { type: String, required: true },
  speed: { type: String, required: true },
  weight: { type: String, required: true },
  price: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  owner: { type: String, required: true },
  propeller: { type: String, required: true },
  arms: { type: String, required: true },
  motor: { type: String, required: true },
  lGear: { type: String, required: true },
  nozzle: { type: String, required: true },
  nutBold: { type: String, required: true },
  bableBare: { type: String, required: true },
  lnkey: { type: String, required: true },
  waterPump: { type: String, required: true },
  pipeQty: { type: String, required: true },
  charger: { type: String, required: true },
  chargerCable: { type: String, required: true },
  chargerPcable: { type: String, required: true },
  extaintionBoard: { type: String, required: true },
  battery: { type: String, required: true },
  transmeterAndReciever: { type: String, required: true },
  availability: { type: Boolean, default: true },
  bookings: [
    {
      startDate: { type: Date },
      endDate: { type: Date },
    },
  ],
  image: { type: String, required: true },
});

const Drone = mongoose.model("Drone", droneSchema);

export default Drone;
