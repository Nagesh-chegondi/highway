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
  place:{type:String,required:true},
  date: { type: String, required: true },
  slot:{type:String,required:true},
  bookedSeats: { type: Number, default: 0 },
});



const BookingSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  slot: { type: String, required: true },
  seats: { type: Number, default: 0 },
});
const UserBookingSchema = new mongoose.Schema({
     username: {type:String, required: true},
     email: {type:String, required: true},
     booking:[{place:{type:String},
      datebooking:[{
        date:{type:String},
      slot:[{
        slot: {type:String, required:true},
      bookedtickets: {type:String, required:true}
    }]}
  ]
  }
     ]


})

 export const  UserBooking = 
 mongoose.models.UserBooking ||
 mongoose.model("UserBooking", UserBookingSchema)

// ✅ Prevent model recompilation in Next.js hot reload
export const SeatAvailability =
  mongoose.models.SeatAvailability ||
  mongoose.model("SeatAvailability", SeatAvailabilitySchema);

export const Booking =
  mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
