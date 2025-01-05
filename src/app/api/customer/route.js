import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){

    let queryParams = request.nextUrl.searchParams
    let filters = {}
    let success = false

    if(queryParams.get('location')){
        let city = queryParams.get('location')
        filters = {city:{$regex:new RegExp(city,'i')}} 
    }else if(queryParams.get('restaurant')){
        let name = queryParams.get('restaurant')
        filters = {name: {$regex:new RegExp(name,'i')}}
    }
    

    await mongoose.connect(connectionStr)
    let result = await restaurantSchema.find(filters).lean()
    if (result && result.length > 0) {
        result = result.map((doc) => {
            delete doc.password;
            return doc;
        });
        success = true;
    }

    return NextResponse.json({result,success})
}