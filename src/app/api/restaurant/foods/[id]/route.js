import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodsModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request,content) {
    const resto_id =(await content.params).id
    
    let success = false
    await mongoose.connect(connectionStr)
    const result = await foodSchema.find({resto_id})
    if(result){
        success=true
    }
    
    return NextResponse.json({result,success})

}