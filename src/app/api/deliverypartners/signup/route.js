import { connectionStr } from "@/app/lib/db"
import { deliverypartnersSchema } from "@/app/lib/deliverypartnersModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    const payload = await request.json()
    let success = false
    let result;
    await mongoose.connect(connectionStr)
    console.log(payload)
    let preUser = await deliverypartnersSchema.findOne({ mobile: payload.mobile })
    if (preUser) {
        result = "Email Already Exists"
        return NextResponse.json({ result, success })

    }else{
    const user = new deliverypartnersSchema(payload)
    result =await user.save()
   
    if (result) {
        result = result.toObject()
        delete result.password
        success = true
    }
    return NextResponse.json({ result, success })
    }
}