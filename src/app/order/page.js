"use client"
import { useEffect, useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import { DELIVERY_CHARGES, TAX } from "../lib/constant"
import { useRouter } from "next/navigation"

const page = () => {
    const router = useRouter();

    const [cartStorage, setCartStorage] = useState([])
    const [total, setTotal] = useState(0)
    const [removeCartData, setRemoveCartData] = useState();
    const [userStorage, setUserStorage] = useState()
    
   

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
            // user
            const user = localStorage.getItem("user")
            setUserStorage(user?JSON.parse(user):{})
            // cart
            const storedCart = localStorage.getItem("cart");
            if(!storedCart){
                router.push('/')
            }
            setCartStorage(storedCart ? JSON.parse(storedCart) : []);
        }
    }, [])


    const orderNow=async ()=>{
        let user_id=JSON.parse(localStorage.getItem("user"))._id;
        let city=JSON.parse(localStorage.getItem("user")).city;
        
        let cart=JSON.parse(localStorage.getItem("cart"));
        let resto_id=cart[0].resto_id;
        let foodItemIds = cart.map((item)=>(item._id)).toString();

        let deliverBoyResponse = await fetch("/api/deliverypartners/"+city)
        deliverBoyResponse = await deliverBoyResponse.json()
        console.log(deliverBoyResponse)
        let deliverBoyIds;
        let deliverBoyId;

        if(deliverBoyResponse.result.length > 1 && deliverBoyResponse.success){
            deliverBoyIds=deliverBoyResponse.result.map((item)=>item._id)
            deliverBoyId = deliverBoyIds[Math.floor(Math.random()*deliverBoyIds.length)]
            
        }else if(deliverBoyResponse.result.length == 1){
            deliverBoyId=deliverBoyResponse.result[0];
        }else{
            alert("No delivery partner avalable")
            return false
        }

        
        let status = "confirm";
        let  amount=total + (total == 0 ? 0 : DELIVERY_CHARGES) + (total * TAX) / 100;

        let collection={
            user_id,
            resto_id,
            foodItemIds,
            deliverBoyId,
            status,
            amount,
        }
        let response =await fetch('/api/orders',{
            method:'POST',
            body:JSON.stringify(collection),
        })

        response = await response.json();
        if(response.success){
            alert('Order Confirmed');
            console.log(response.result)
            setRemoveCartData(true)
            router.push('/myprofile')
        }else{
            alert('Order Failed');
        }
        
    }
    return (
        <div >
            <CustomerHeader  removeCartData={removeCartData} />
            <div className="min-h-screen">

                <div className="text-orange-700 relative text-xl top-16 mt-4 p-4 flex flex-col justify-center items-center">
                    <div className="text-black text-2xl">User Detail</div>
                    <div>
                        <div className="flex items-center gap-4 justify-between">
                            <span>Name:</span><span>{userStorage?.name}</span>
                        </div>
                        <div className="flex items-center gap-4 justify-between">
                            <span>Address:</span><span>{userStorage?.address}</span>
                        </div>
                        <div className="flex items-center gap-4 justify-between border-b-2 border-orange-700">
                            <span>Mobile:</span><span>{userStorage?.mobile}</span>
                        </div>
                    </div>

                </div>


                <div className="text-orange-700 relative text-xl top-16 mt-4 p-4 flex flex-col justify-center items-center">
                    <div className="text-black text-2xl">Amount Detail</div>
                    <div>
                        <div className="flex items-center gap-4 justify-between">
                            <span>Food Charges:</span><span>{total}</span>
                        </div>
                        <div className="flex items-center gap-4 justify-between">
                            <span>Tax:</span><span>{(total * TAX) / 100}</span>
                        </div>
                        <div className="flex items-center gap-4 justify-between border-b-2 border-orange-700">
                            <span>Delivery Charges:</span><span>{total == 0 ? "0" : DELIVERY_CHARGES}</span>
                        </div>
                        <div className="flex items-center gap-4 justify-between">
                            <span>Total Amount:</span><span>{total + (total == 0 ? "0" : DELIVERY_CHARGES) + (total * TAX) / 100}</span>
                        </div>
                        <button onClick={orderNow}  className="bg-orange-400 hover:bg-orange-500 px-4 py-2 mt-6 rounded-lg">Place Your Order Now</button>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}
export default page