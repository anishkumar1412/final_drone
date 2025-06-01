// models/WorkingDay.js

const WorkingDayModel = (sequelize, DataTypes) => {
  const WorkingDay = sequelize.define("WorkingDay", {
    startAcre: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    endAcre: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workingDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'WorkingDays', // Optional: you can specify the table name
    timestamps: false         // Mongoose doesn't add timestamps by default
  });

  return WorkingDay;
};

export default WorkingDayModel;
