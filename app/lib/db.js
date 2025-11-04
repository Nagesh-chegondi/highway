// lib/db.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ Missing MONGO_URI in environment variables");
}

// ✅ Connect once
export const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI, { dbName: "bookingDB" });
    console.log("✅ MongoDB connected");
  }
};

// --------------------
// SCHEMAS & MODELS
// --------------------

const SeatAvailabilitySchema = new mongoose.Schema({
  date: { type: String, required: true },
  slot: { type: String, required: true },
  bookedSeats: { type: Number, default: 0 },
});

SeatAvailabilitySchema.index({ date: 1, slot: 1 }, { unique: true });

const BookingSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  slot: { type: String, required: true },
  seats: { type: Number, default: 0 },
});

BookingSchema.index({ userId: 1, date: 1, slot: 1 }, { unique: true });

// ✅ Prevent model recompilation in Next.js hot reload
export const SeatAvailability =
  mongoose.models.SeatAvailability ||
  mongoose.model("SeatAvailability", SeatAvailabilitySchema);

export const Booking =
  mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
