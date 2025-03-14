
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbUri = `${process.env.MONGODB_URI}`;

        if (!dbUri) {
            console.error("MongoDB URI is missing from .env file.");
            return;
        }

        await mongoose.connect(dbUri);
        console.log("MongoDB connected!");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB
