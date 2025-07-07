// models/Permission.js
import { DataTypes } from "sequelize";

const PermissionModel = (sequelize) => {
  return sequelize.define("Permission", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    timestamps: false // <--- correct placement here
  });
};

export default PermissionModel;



// CREATE TABLE permissions (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100) NOT NULL UNIQUE,
//   category VARCHAR(100)
// );


// INSERT INTO permissions (name, category) VALUES
// -- Master
// ('Add Drone', 'Master'),
// ('Add Crop', 'Master'),
// ('Add Working Days', 'Master'),

// -- Users
// ('Add Admins', 'Users'),
// ('View Admins', 'Users'),
// ('View Farmers', 'Users'),
// ('View Pilots', 'Users'),
// ('View Copilots', 'Users'),
// ('View Drone''s Owner', 'Users'),

// -- Tickets
// ('Total Refund Orders', 'Tickets'),
// ('Reviews', 'Tickets'),
// ('View  Enquiry', 'Tickets'),
// ('View Complain', 'Tickets'),
// ('View Other', 'Tickets'),

// -- Dashboard (contains all)
// ('Dashboard', 'Dashboard'),
// ('Master', 'Dashboard'),
// ('Users', 'Dashboard'),
// ('Tickets', 'Dashboard'),
// ('Total Drones', 'Dashboard'),
// ('Total Bookings', 'Dashboard'),
// ('Order Completed', 'Dashboard'),
// ('Approved Refunds', 'Dashboard'),
// ('Declined Refunds', 'Dashboard'),
// ('Total User Cancel Orders', 'Dashboard'),
// ('Today''s Workings Orders', 'Dashboard'),
// ('Upcoming Bookings', 'Dashboard'),
// ('Today''s Orders in Progress', 'Dashboard'),
// ('Today''s Pending Orders', 'Dashboard'),
// ('Today''s Bookings', 'Dashboard'),
// ('Filter Details', 'Dashboard'),
// ('Waiting for Confirmation', 'Dashboard'),
// ('Work on Hold', 'Dashboard'),
// ('UnAssigned Orders', 'Dashboard'),
// ('Successfull Payments', 'Dashboard'),
// ('Unsuccessfull Payments', 'Dashboard'),
// ('Pending Payments', 'Dashboard'),
// ('Partial Payments', 'Dashboard'),
// ('View Tickets', 'Dashboard'),
// ('View Other', 'Dashboard'),
// ('View Complain', 'Dashboard'),
// ('View  Enquiry', 'Dashboard');

