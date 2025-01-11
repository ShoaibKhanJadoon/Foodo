"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { useRouter } from "next/navigation";

const MyProfile = () => {
    const [myOrders, setMyOrders] = useState();
    const router = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            let user = localStorage.getItem('user')
            if (user) {
                user = JSON.parse(user)
                getMyOrders(user._id)
            }
            else {
                router.push("/user-auth?flag=true")
            }
        }
    }, [])
    const getMyOrders = async (id) => {
        let response = await fetch('/api/orders?id=' + id)
        response = await response.json()


        if (response.success) {
            setMyOrders(response.result)
        }
    }
    console.log(myOrders)
    return (
        <>
            <div >
                <CustomerHeader />
                <div className="relative top-16 min-h-screen">
                    {

                        myOrders?.length > 0 ? myOrders?.map((item, index) => (
                            <div onClick={() => router.push("explore/" + item.data.name + "?id=" + item.data._id)} key={index} className="bg-yellow-300 hover:bg-yellow-500 p-4 m-1 rounded-lg ">
                                <div className="font-bold">{item.data.name}</div>
                                <div className="flex gap-4">
                                    <div>Amount: {item.amount}</div>
                                    <div>Address: {item.data.address}</div>
                                </div>
                                <div className="flex gap-4">
                                    <div>Status: {item.status}</div>
                                    <div>Contact: {item.data.contact}</div>
                                </div>
                            </div>
                        )) : 
                        <div className="text-center text-gray-500 mt-10">
                        No Order History
                        </div>
                    }
                </div>

                <Footer />
            </div>
        </>
    )
}
export default MyProfile;