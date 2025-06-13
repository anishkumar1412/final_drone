import { Sequelize, DataTypes, QueryTypes } from "sequelize";
import db from "../config/db.js";
import createUserModel from '../models/User.js';
import createDrone from '../models/drone.js'
import booking from '../models/Booking.js'
import crop from '../models/cropModel.js'
import wday from '../models/WorkingDay.js'
import RefundModel from "./Refund.model.js";
import ReviewModel from "./ReviewModel.js";
import EnquiryModel from "./Enquiry.model.js";
import ComplaintModel from "./Complaint.model.js";


// Initialize Sequelize
const sequelize = new Sequelize(
  db.DATABASE,
  db.USER,
  db.PASSWORD,
  {
    host: db.HOST,
    dialect: db.DIALECT,
    logging: false,
    pool: {
      max: 40,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test DB connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

// Initialize db object
const db1 = {};
db1.Sequelize = Sequelize;
db1.sequelize = sequelize;
db1.DataTypes = DataTypes;
db1.QueryTypes = QueryTypes;

// Register all models
db1.User = createUserModel(sequelize, DataTypes);
db1.Drone = createDrone(sequelize, DataTypes);
db1.Booking = booking(sequelize, DataTypes)
db1.Crop = crop(sequelize, DataTypes)
db1.WorkingDay = wday(sequelize, DataTypes)
db1.Refund = RefundModel(sequelize,DataTypes)
db1.Review = ReviewModel(sequelize,DataTypes)
db1.Enquiry = EnquiryModel(sequelize,DataTypes)
db1.Complaint = ComplaintModel(sequelize,DataTypes)


// Booking belongs to User as Pilot
db1.Booking.belongsTo(db1.User, { foreignKey: 'pilot', as: 'pilotDetails' });

// Booking belongs to User as Copilot
db1.Booking.belongsTo(db1.User, { foreignKey: 'copilot', as: 'copilotDetails' });


// Sync all models
sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ All models were synchronized successfully.");
  })
  .catch((err) => {
    console.error("❌ Sync error:", err);
  });

export default db1;
