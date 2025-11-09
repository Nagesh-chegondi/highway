import { connect } from "mongoose";
import { connectDB, SeatAvailability, Booking } from "../../lib/db.js";
import { experiences } from "@/app/data/product.js";

export async function POST(request) {
    await connectDB();
    try {
        const body = await request.json();
        const {place,date,slot} = body
        const info = await SeatAvailability.findOneAndUpdate({
            place:place,
            date:date,
            slot:slot,

        },{$inc:{bookedSeats:+1}},
    {new:true});
        if(info){
              
        return Response.json({
            message:"data came successfully",
            info:{place,date,slot},
        });
        }
        else{
            return Response.json({
                message:"cant find the data you have sent",
                  info:{place,date,slot}
            
            })
        }
      
    }catch(error){
        return Response.json(
            {error:"failed to parsed body"},
            {status:400},

        )
    }
}
export async function GET(request){
    await connectDB()
    try{
        const body = await request.json()
        const {name,date} = body
    const res = await SeatAvailability.find({
        name:name,
        date:date
    });
    if(res){
        const data = await res.json() 
        return Response.json({
           slotdata:data
        })
    }
    else{
        return Response.json({
            message:"hey there is no data"
        })
    }
    }catch(error){
        return Response.json(
            {error:"filed man"},
            {status:400},
        )
    }

}