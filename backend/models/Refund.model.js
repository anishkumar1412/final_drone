export default (sequelize, DataTypes) => {
  const Refund = sequelize.define("Refund", {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Declined"),
      defaultValue: "Pending",
    },
    Paymentstatus: {
      type: DataTypes.ENUM("Sent", "Pending", "Declined"),
      defaultValue: "Pending",
    },
    adminMessage: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    reviewTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reviewText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    Copilotname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    CopilotmobNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    Copilotemail: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    Pilotname: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    PilotmobNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    Pilotemail: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    refundRequestAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    RefundApprovedprice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    AccountHolderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankAccountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankIFSC: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true, // adds createdAt and updatedAt
  });

  return Refund;
};
