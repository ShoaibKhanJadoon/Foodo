import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodsModel"
import { restaurantSchema } from "@/app/lib/restaurantModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"


export async function GET(request,content){
    const id = (await content.params).id
    await mongoose.connect(connectionStr)
    
    let restaurantDetail = await restaurantSchema.findOne({_id:id}).lean()
    delete restaurantDetail.password
    let foodDetails = await foodSchema.find({resto_id:id})
    const success = restaurantDetail && foodDetails ? true : false;
    return NextResponse.json({restaurantDetail,foodDetails,success})
}