


export default (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    bookingId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // auto-generates a unique UUID
      allowNull: false,

    },
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
      type: DataTypes.INTEGER, // ForeignKey reference to User
      allowNull: true,
    },
    copilot: {
      type: DataTypes.INTEGER, // ForeignKey reference to User
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
      defaultValue: [],
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
