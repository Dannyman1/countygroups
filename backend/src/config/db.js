import mongoose from "mongoose";
import dotenv from "dotenv";

// Ensure variables are loaded
dotenv.config(); 

export default async function connectDB() {
  const primary = process.env.MONGO_URI;
  const fallback = "mongodb+srv://mytraveladvisorlite:Tobefavour12%24@traveladvisor.3g6cprg.mongodb.net/?appName=traveladvisor";

  // Quick check: If primary is missing from .env, warn immediately
  if (!primary) {
    console.warn("Warning: MONGO_URI is not defined in your .env file.");
  }

  try {
    // Optimization: Add a timeout so it doesn't hang forever
    await mongoose.connect(primary, { serverSelectionTimeoutMS: 5000 });
    console.log("MongoDB connected (primary)");
    return;
  } catch (err) {
    console.warn("Failed to connect to primary MongoDB:", err.message);
  }

  // ... rest of your fallback code
}