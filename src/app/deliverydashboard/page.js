"use client"
import { useRouter } from "next/navigation";
import DeliveryHeader from "../_components/DeliveryHeader"
import { useEffect, useState } from "react";

const page = () => {
    const router = useRouter()
    const [myOrders, setMyOrders] = useState();
    const [orderStatuses, setOrderStatuses] = useState("");

    useEffect(() => {
        if (typeof window != "undefined") {
            const delivery = localStorage.getItem("delivery");
            if (!delivery) {
                router.push("/deliverypartner")
            } else {
                let user = JSON.parse(delivery)
                getMyOrders(user._id)
            }
        }
    }, []);

    const getMyOrders = async (user_id) => {
        
        let response = await fetch('/api/deliverypartners/orders/' + user_id)
        response = await response.json()
     

        if (response.success) {
            setMyOrders(response.result)
            
           console.log(response.result)
        }
    }
    const handleStatusChange = async (id, newStatus) => {
        console.log(id)
        if (newStatus === "default") {
            alert("Please select a valid status.");
            return;
        }
      
        try {
            const response = await fetch(`/api/orders/updateStatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, status: newStatus }),
            });

            const result = await response.json();
      
            if (result.success) {
                setOrderStatuses(newStatus)
                alert("Order status updated successfully!");
            } else {
                alert("Failed to update order status."+result.message);
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("An error occurred while updating the status.");
        }

    }
    

    return (
        <div>
            <DeliveryHeader />
            <div className="relative top-16 min-h-screen">
                <div>My order List</div>
                {

                    myOrders?.length > 0 ? myOrders?.map((item, index) => (
                        <div key={index} className="bg-yellow-300 hover:bg-yellow-500 p-4 m-1 rounded-lg ">
                            <div className="font-bold">{item.data.name}</div>
                            <div className="flex gap-4">
                               
                                <div>Amount: {item.amount}</div>
                                <div>Address: {item.data.address}</div>
                            </div>
                            <div className="flex gap-4">
                                <div>Status: {item.status}</div>
                                <div>Contact: {item.data.contact}</div>
                                <div>
                                    Update Status: <select
                                        // value is not included yet
                                        onChange={(e) =>
                                            handleStatusChange(item.orderId, e.target.value)
                                        }
                                    >
                                        <option value="default">Select status</option>
                                        <option value="Confirm">Confirm</option>
                                        <option value="On the way">On the way</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Failed to Deliver">Failed to Deliver</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    )) :
                        <div className="text-center text-gray-500 mt-10">
                            No Order History
                        </div>
                }
            </div>
        </div>
    )
}
export default page