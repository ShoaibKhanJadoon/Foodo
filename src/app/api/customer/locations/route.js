import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let success= false
    await mongoose.connect(connectionStr)
    let result = await restaurantSchema.find()
    result = result.map((item)=>(item?.city?.charAt(0).toUpperCase()+ item?.city?.slice(1)))
    result =[...new Set(result)]
    if(result){
        
        success = true
    }
    return NextResponse.json({result,success})
}