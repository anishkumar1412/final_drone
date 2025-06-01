
import express from 'express'
import bodyParser from 'body-parser'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/bookingRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import reviewRoutes from './routes/Review.routes.js'



import cors from 'cors'


// require("dotenv").config();

import 'dotenv/config.js'

connectCloudinary()
const app = express();

// Connect Database

import index from './models/index.js'



// connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/booking", orderRoutes)
app.use('/api/admin', adminRoutes)
app.use("/api", reviewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
