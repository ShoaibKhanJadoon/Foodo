import { connectionStr } from "@/app/lib/db"
import { orderSchema } from "@/app/lib/ordersModel"
import { restaurantSchema } from "@/app/lib/restaurantModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"


export async function POST(request) {
    const payload =await request.json()
    await mongoose.connect(connectionStr)
    let success=false
    const orderObj = new orderSchema(payload)
    const result = await orderObj.save()
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}

export async function GET(request){
    let user_id=request.nextUrl.searchParams.get("id");
    await mongoose.connect(connectionStr);
    let result = await orderSchema.find({user_id})
    let success=false;
    console.log("user_result"+result)
    if(result){
        let restoData =await Promise.all(result.map(async (item)=>{
            let restoInfo={}
            restoInfo.data = await restaurantSchema.findOne({_id:item.resto_id})
            restoInfo.data = restoInfo.data.toObject();
            delete restoInfo.data.password
            restoInfo.amount=item.amount;
            restoInfo.status=item.status;
            
            return restoInfo;

        }))
        result=restoData;
        success=true
    }
    return NextResponse.json({result,success});
}