// models/admin.js
import { DataTypes } from 'sequelize';

const Admin = (sequelize) => {
  return sequelize.define('Admin', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('superadmin', 'finance', 'operations', 'support'),
      allowNull: false,
    },
    access: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
  }, {
    tableName: 'admins',
    timestamps: true, // adds createdAt and updatedAt
  });
};

export default Admin;
