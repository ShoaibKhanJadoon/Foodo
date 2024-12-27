
import { useEffect, useState } from "react";

const FoodItemList = () => {
    const [foodItems, setFoodItems] = useState([]);
    useEffect(() => {
        handleFoodItem();
    }, [])
    const handleFoodItem = async () => {
        const userData = JSON.parse(localStorage.getItem("restaurantUser"));
        const id = userData._id
        let response = await fetch("http://localhost:3000/api/restaurant/foods/"+id)
        response = await response.json()
        if (response.success) {
            setFoodItems(response.result)
            console.log(response.result)
        }
        console.log(foodItems)

    }

    return (
        <div className="my-6 mx-4 flex items-center justify-center flex-col gap-3">
            <h1 className="text-2xl font-bold">Food Item List</h1>
            <table className="border-2 border-black">
                <thead>
                    <tr>
                        <td className="p-1 font-bold border-2 border-black ">S.N</td>
                        <td className="p-1 font-bold border-2 border-black">Name</td>
                        <td className="p-1 font-bold border-2 border-black">Price</td>
                        <td className="p-1 font-bold border-2 border-black">Description</td>
                        <td className="p-1 font-bold border-2 border-black">Image</td>
                        <td className="p-1 font-bold border-2 border-black">Operations</td>

                    </tr>
                </thead>
                <tbody>
                {foodItems.length > 0 ? (
                        foodItems.map((foodItem, index) => (
                            <tr key={foodItem.id || index}>
                                <td className="p-1 border-2 border-black">{index + 1}</td>
                                <td className="p-1 border-2 border-black">{foodItem.name}</td>
                                <td className="p-1 border-2 border-black">{foodItem.price}</td>
                                <td className="p-1 border-2 border-black">{foodItem.description}</td>
                                <td className="p-1 border-2 border-black">
                                    <img src={foodItem.img_path} alt={foodItem.name} className="h-10 w-10 object-cover" />
                                </td>
                                <td className="p-1 border-2 border-black">
                                    <button className="m-1 bg-blue-500 hover:bg-blue-700 px-2 py-1 rounded-lg">
                                        Edit
                                    </button>
                                    <button className="m-1 bg-red-500 hover:bg-red-700 px-2 py-1 rounded-lg">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center p-4">No food items available</td>
                        </tr>
                    )}

                </tbody>
            </table>

        </div>
    )
}
export default FoodItemList;