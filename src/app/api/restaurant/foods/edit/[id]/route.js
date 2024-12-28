import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(request,content){
    const  id =(await content.params).id;
    await mongoose.connect(connectionStr)
    let success = false;
    const result = await foodSchema.findOne({_id : id})
    if(result){
        success= true
    }
    return NextResponse.json({result,success})

}

export async function PUT(request,content){
    const id = (await content.params).id
    const payload = await request.json()
    await mongoose.connect(connectionStr)
    const result = await foodSchema.findOneAndUpdate({_id:id},payload)
    let success =false
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}