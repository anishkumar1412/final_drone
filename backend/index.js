// backend/api.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import reviewRoutes from "./routes/Review.routes.js";
import connectCloudinary from "./config/cloudinary.js";
import index from "./models/index.js"; // Sequelize init

dotenv.config();
connectCloudinary();

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/booking", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", reviewRoutes);

app.listen(PORT, () => {
  console.log(`🟢 API server running on http://localhost:${PORT}`);
});
