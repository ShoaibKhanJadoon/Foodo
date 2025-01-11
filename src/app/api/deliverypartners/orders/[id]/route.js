import { connectionStr } from "@/app/lib/db"
import { orderSchema } from "@/app/lib/ordersModel"
import { restaurantSchema } from "@/app/lib/restaurantModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request,content){
    let id=(await content.params).id;
    await mongoose.connect(connectionStr);
    let result = await orderSchema.find({deliverBoyId:id})
    let success=false;
    if(result){
        let restoData =await Promise.all(result.map(async (item)=>{
            let restoInfo={}
            restoInfo.data = await restaurantSchema.findOne({_id:item.resto_id})
            restoInfo.data = restoInfo.data.toObject();
            delete restoInfo.data.password
            restoInfo.amount=item.amount;
            restoInfo.status=item.status;
            restoInfo.orderId=item._id;
            return restoInfo;

        }))
        result=restoData;
        success=true
    }
    return NextResponse.json({result,success});
}