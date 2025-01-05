import { connectionStr } from "@/app/lib/db"
import { userSchema } from "@/app/lib/userModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    let success = false
    let result;
    const payload = await request.json()
    await mongoose.connect(connectionStr)
    let preUser = await userSchema.findOne({ email: payload.email })
    if (preUser) {
        result = "Email Already Exists"
        return NextResponse.json({ result, success })

    } else {
        const user = new userSchema(payload)
        result = await user.save()
        if (result) {
            result = result.toObject()
            delete result.password
            console.log(result)
            success = true
        }
        return NextResponse.json({ result, success })

    }


}