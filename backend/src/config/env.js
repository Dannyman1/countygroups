import dotenv from "dotenv";

dotenv.config();

/**
 * Helper function to ensure required env vars exist
 */
function requireEnv(key) {
  if (!process.env[key]) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return process.env[key];
}

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  // Server
  PORT: process.env.PORT || 5000,

  // Client
  CLIENT_URL: requireEnv("CLIENT_URL"),

  // Database
  MONGO_URI: requireEnv("MONGO_URI"),

  // Authentication
  JWT_SECRET: requireEnv("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: requireEnv("CLOUDINARY_CLOUD_NAME"),
  CLOUDINARY_API_KEY: requireEnv("CLOUDINARY_API_KEY"),
  CLOUDINARY_API_SECRET: requireEnv("CLOUDINARY_API_SECRET"),
};

export default env;

