import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET() {
    await mongoose.connect(connectionStr)
    const data = await restaurantSchema.find()
    console.log(data)
    return NextResponse.json({ Result: true })
}

export async function POST(request) {
    let payload = await request.json()
    await mongoose.connect(connectionStr)
    let result;
    let success = false
    if (payload.login) {
        result = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
        if (result) {
            success = true
        }
    } else {
        result = await restaurantSchema.findOne({ email: payload.email })
        if (result) {
            result = "user already exists"
            success=false
        }
        else {
            const restaurant = new restaurantSchema(payload)
            result = await restaurant.save()
            if (result) {
                success = true
            }
        }

    }

    return NextResponse.json({ result, success })
}