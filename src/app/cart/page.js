"use client"
import { useEffect, useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import { DELIVERY_CHARGES, TAX } from "../lib/constant"

const page = () => {
    const [cartStorage, setCartStorage] = useState([])
    const [total,setTotal] = useState(0)
    const [removeCartData, setRemoveCartData] = useState();
    const [cartData, setCartData] = useState()
    


    useEffect(() => {
        if (cartStorage.length > 0) {
            const calculatedTotal = cartStorage.reduce((sum, item) => sum + (item.price || 0), 0);
            setTotal(calculatedTotal);
        } else {
            setTotal(0);
        }
    }, [cartStorage]);
    useEffect(() => {
        if (typeof window != "undefined") {

            const storedCart = localStorage.getItem("cart") ;
            setCartStorage(storedCart ? JSON.parse(storedCart) : []);
        }
    }, [])

    const removeFromCart = (id) => {
        setCartData()
        setRemoveCartData(id)
        const updatedCart = cartStorage.filter((item) => item._id !== id);
        setCartStorage(updatedCart);
    };
    return (
        <div >
            <CustomerHeader cartData={cartData}  removeCartData={removeCartData} />
            <div className="min-h-screen">
                <ul className="mt-4 top-16 relative grid md:grid-cols-2 grid-cols-1">
                    {cartStorage?.length > 0 ? cartStorage.map((food, index) => (
                        <li className="flex gap-4 justify-center items-center bg-yellow-300 p-4 m-1 rounded-lg" key={index}>
                            <div className="flex-1">
                                <img src={food.img_path} alt="foodImage" className="h-36  bg-cover" />
                            </div>
                            <div className="flex-1 text-2xl w-full h-full text-orange-700">
                                <div>Name: {food.name}</div>
                                <div>Price: {food.price}</div>
                                <div>Description: {food.description}</div>
                                {
                                    <button onClick={() => removeFromCart(food._id)} className="bg-orange-400 hover:bg-orange-500 px-4 py-2 rounded-lg">Remove From Cart</button>
                                }

                            </div>

                        </li>
                    )) :
                        <h1 className="text-orange-700 text-2xl">{cartStorage.length > 0?"Loading...":"Add Item To The Cart"}</h1>
                    }
                </ul>
                <div className="text-orange-700 relative text-xl top-16 mt-4 p-4 flex flex-col justify-center items-center">
                    <div>
                        <div className="flex items-center gap-4 justify-between">
                            <span>Food Charges:</span><span>{total}</span>
                        </div>
                        <div className="flex items-center gap-4 justify-between">
                            <span>Tax:</span><span>{(total*TAX)/100}</span>
                        </div>
                        <div className="flex items-center gap-4 justify-between border-b-2 border-orange-700">
                            <span>Delivery Charges:</span><span>{total == 0 ?"0": DELIVERY_CHARGES}</span>
                        </div>
                        <div className="flex items-center gap-4 justify-between">
                            <span>Total Amount:</span><span>{total+(total == 0 ?"0": DELIVERY_CHARGES)+(total*TAX)/100}</span>
                        </div>
                        <button onClick={() => removeFromCart(food._id)} className="bg-orange-400 hover:bg-orange-500 px-4 py-2 mt-6 rounded-lg">Order Now</button>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}
export default page