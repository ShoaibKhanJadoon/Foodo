"use client"
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import { useState } from "react";
import AddFoodItem from "@/app/_components/AddFoodItem"
import FoodItemList from "@/app/_components/FoodItemList";

const Dashboard = () => {
    const [addItem, setAddItem] = useState(false);
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <RestaurantHeader />
                <div className="relative top-14">
                    <div className="flex gap-2 ml-4">
                        <button onClick={() => setAddItem(false)} className="px-2 py-1 bg-orange-600 rounded-lg hover:bg-orange-700">Dashboard</button>
                        <button onClick={() => setAddItem(true)} className="px-2 py-1 bg-orange-600 rounded-lg hover:bg-orange-700">Add Food</button>

                    </div>

                    {
                        addItem ? <AddFoodItem /> : <FoodItemList/>
                    }


                </div>
            </div>
        </>
    )
}
export default Dashboard;