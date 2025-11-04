
import { connectDB, SeatAvailability, Booking } from "../../lib/db.js";




export async function GET() {
    await connectDB()
    const now = new Date();
    
  const today = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
  const result = [];

  const slots = ["7AM", "9AM", "11AM", "1PM"];

  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const formattedDate = date.toISOString().split("T")[0];

    for (const slot of slots) {
      const existing = await SeatAvailability.findOne({ date: formattedDate, slot });

      if (!existing) {
        const doc = await SeatAvailability.create({
          date: formattedDate,
          slot,
          totalSeats: 100,
          bookedSeats: 0,
        });
        result.push(doc);
      } else {
        result.push(existing);
      }
    }
  }

  return Response.json({ success: true, data: result });
}


export async function POST(req) {
    await connectDB();


  const { userId, email, date, slot, seats } = await req.json();

  if (!userId || !email || !date || !slot || !seats) {
    return Response.json({ success: false, message: "Missing fields" }, { status: 400 });
  }

  // Check if user already booked this slot for this date
  const existingBooking = await Booking.findOne({ userId, date, slot });
  if (existingBooking) {
    return Response.json(
      { success: false, message: "You have already booked this slot." },
      { status: 400 }
    );
  }

  // Find seat availability
  const availability = await SeatAvailability.findOne({ date, slot });
  if (!availability) {
    return Response.json(
      { success: false, message: "Slot not found for this date." },
      { status: 404 }
    );
  }

  if (availability.bookedSeats + seats > availability.totalSeats) {
    return Response.json(
      { success: false, message: "Not enough seats available." },
      { status: 400 }
    );
  }

  // Create booking and update seat count
  const booking = await Booking.create({ userId, email, date, slot, seats });
  availability.bookedSeats += seats;
  await availability.save();

  return Response.json({ success: true, booking });
}

