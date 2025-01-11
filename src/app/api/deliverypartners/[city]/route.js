import { connectionStr } from "@/app/lib/db";
import { deliverypartnersSchema } from "@/app/lib/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function GET(request,content){
    const city = (await content.params).city
    let success = false;
    await mongoose.connect(connectionStr)
    let  filter={city:{$regex:new RegExp(city,"i")}}
    const result = await deliverypartnersSchema.find(filter)
    if(result){
        success = true
    }
    return NextResponse.json({result,success})
}