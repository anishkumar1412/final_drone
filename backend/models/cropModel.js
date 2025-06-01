// models/Crop.js

export default (sequelize, DataTypes) => {
  const Crop = sequelize.define('Crop', {
    cropName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cropPerAcer: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false, // Disable createdAt and updatedAt like in Mongoose by default
  });

  return Crop;
};
