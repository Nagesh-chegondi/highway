import { connectDB, UserBooking } from "../../lib/db";

export async function POST(request) {
  await connectDB();

  try {
    const { place, date, slot, username, email } = await request.json();

    // 1️⃣ Check if user exists
    let user = await UserBooking.findOne({ username, email });

    if (!user) {
      // If user not found, create new user with booking
      await UserBooking.create({
        username,
        email,
        booking: [
          {
            place,
            datebooking: [
              {
                date,
                slot: [{ slot, bookedtickets: "1" }],
              },
            ],
          },
        ],
      });

      return Response.json({ message: "New user and booking created" });
    }

    // 2️⃣ If user exists, check if place exists
    const placeIndex = user.booking.findIndex((b) => b.place === place);

    if (placeIndex === -1) {
      // Place not found → push new booking
      user.booking.push({
        place,
        datebooking: [
          {
            date,
            slot: [{ slot, bookedtickets: "1" }],
          },
        ],
      });
    } else {
      // Place exists
      const dateIndex = user.booking[placeIndex].datebooking.findIndex(
        (d) => d.date === date
      );

      if (dateIndex === -1) {
        // Date not found → push new datebooking
        user.booking[placeIndex].datebooking.push({
          date,
          slot: [{ slot, bookedtickets: "1" }],
        });
      } else {
        // Date exists → check slot
        const slotIndex = user.booking[placeIndex].datebooking[
          dateIndex
        ].slot.findIndex((s) => s.slot === slot);

        if (slotIndex === -1) {
          // Slot not found → push new slot
          user.booking[placeIndex].datebooking[dateIndex].slot.push({
            slot,
            bookedtickets: "1",
          });
        } else {
          // Slot exists → check limit
          let currentTickets =
            user.booking[placeIndex].datebooking[dateIndex].slot[slotIndex]
              .bookedtickets;

          if (Number(currentTickets) >= 4) {
            return Response.json({
              message: "User crossed booking limit for this slot",
            }, { status: 400 });
          }

          // Increment bookedtickets
          user.booking[placeIndex].datebooking[dateIndex].slot[
            slotIndex
          ].bookedtickets = String(Number(currentTickets) + 1);
        }
      }
    }

    await user.save();
    return Response.json({ message: "Booking updated successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
