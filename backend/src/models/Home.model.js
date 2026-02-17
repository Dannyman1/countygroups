import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  images: [String],
  bedrooms: Number,
  amenities: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
});

export default mongoose.model("Home", HomeSchema);

