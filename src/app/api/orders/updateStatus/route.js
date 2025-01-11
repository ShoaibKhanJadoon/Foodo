import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { id, status } = await request.json();
    console.log(id,status)

        await mongoose.connect(connectionStr);
        // Find the order by ID and update the status
        const order = await orderSchema.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Return the updated document
        );
        console.log(order)
        if (order) {
            return NextResponse.json({ success: true, order });
        } else {
            return NextResponse.json({ success: false, message: "Order not found" });
        }
   
    
}
