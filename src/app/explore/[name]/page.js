"use client"

import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import { use, useEffect, useState } from "react";


const page = (props) => {
    const [restaurantDetail, setRestaurantDetail] = useState(null)
    const [foodDetails, setFoodDetails] = useState([])
    const [cartData, setCartData] = useState()
    const [cartStorage, setCartStorage] = useState([])
    const [cartId, setCartId] = useState([])
    const [removeCartData, setRemoveCartData] = useState();

    const resolvedParams = use(props.params)
    const resolvedSearchParams = use(props.searchParams)
    const name = decodeURI(resolvedParams.name);
    const id = resolvedSearchParams.id


    useEffect(() => {
        
        loadRestaurantDetails()

        if (typeof window !== "undefined") {

            const storedCart = localStorage.getItem("cart");
            try {
                const parsedCart = storedCart ? JSON.parse(storedCart) : [];
                setCartStorage(parsedCart);
                setCartId(parsedCart.map((item) => item._id));
            } catch (error) {
                console.error("Failed to parse cart data from localStorage", error);
                setCartStorage([]);
                setCartId([]);
            }
        }
    }, [])

    const loadRestaurantDetails = async () => {

        let response = await fetch("/api/customer/" + id)
        response = await response.json()

        if (response.success) {
            setFoodDetails(response.foodDetails)
            setRestaurantDetail(response.restaurantDetail)
        }
    }
    const addToCart = (item) => {
        setRemoveCartData()
        setCartData(item)
        let localCartIds = cartId;
        localCartIds.push(item._id)
        setCartId(localCartIds)
        
    }
    const removeFromCart = (id) => {
        setCartData()
        setRemoveCartData(id)
        let localIds = cartId.filter(item => item != id)
        setCartId(localIds)

    }
    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
            <div>
                <div className="w-full z-20 flex justify-center p-12 items-center h-80 bg-cover flex-col relative top-16  bg-custom-pattern bg-[rgba(0,0,0,0.5)] bg-blend-multiply">
                    <h1 className="font-bold text-3xl p-4 text-white shadow-black shadow-2xl">{name || "Loading..."}</h1>
                </div>
            </div>
            <div className="p-6  top-16 relative">
                {restaurantDetail && (
                    <div className="flex bg-orange-400 items-center justify-around">
                        <h2 className="text-base">Contact: {restaurantDetail?.contact}</h2>
                        <h2 className="text-base">City: {restaurantDetail?.city}</h2>
                        <h2 className="text-base">Address: {restaurantDetail?.address}</h2>
                        <h2 className="text-base">Email: {restaurantDetail?.email}</h2>
                    </div>

                )}
                <ul className="mt-4 6 grid md:grid-cols-2 grid-cols-1">
                    {foodDetails.length > 0 ? foodDetails.map((food, index) => (
                        <li className="flex gap-4 justify-center items-center bg-yellow-300 p-4 m-1 rounded-lg" key={index}>
                            <div className="flex-1">
                                <img src={food.img_path} alt="foodImage" className="h-36  bg-cover" />
                            </div>
                            <div className="flex-1 text-2xl w-full h-full text-orange-700">
                                <div>Name: {food.name}</div>
                                <div>Price: {food.price}</div>
                                <div>Description: {food.description}</div>
                                {
                                    cartId.includes(food._id) ? <button onClick={() => removeFromCart(food._id)} className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-lg">Remove From Cart</button>
                                        : <button onClick={() => addToCart(food)} className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-lg">Add to Cart</button>

                                }

                            </div>

                        </li>
                    )) :
                        <h1 className="text-orange-700 text-2xl">Loading...</h1>
                    }
                </ul>
            </div>
            
            <Footer />
        </div>
    )
}
export default page;