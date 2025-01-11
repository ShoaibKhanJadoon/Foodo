import { connectionStr } from "@/app/lib/db"
import { deliverypartnersSchema } from "@/app/lib/deliverypartnersModel";
import mongoose from "mongoose"
import { NextResponse } from "next/server";


export async function POST(request){
    const payload = await request.json()
    let success = false
    await mongoose.connect(connectionStr);
    let result= await deliverypartnersSchema.findOne({mobile:payload.loginMobile,password:payload.password})
    console.log(result)
    if(result){
        result = result.toObject()
        delete result.password
        success=true
    }
    return NextResponse.json({result,success})
}