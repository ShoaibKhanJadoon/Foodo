"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeliveryHeader = ({ cartData, removeCartData }) => {
    const router = useRouter()
    const [userStorage, setUserStorage] = useState();
    const [cartNumber, setCartNumber] = useState(0)
    const [cartItem, setCartItem] = useState([])

    useEffect(() => {
        const user = localStorage.getItem("user")
        const parsedUser = JSON.parse(user)
        setUserStorage(parsedUser)
    }, [])

    

    

    return (
        <div className="flex z-30 items-center justify-between bg-slate-500 fixed top-0 w-full px-3 py-2">
            <div>

                <div className=" w-12 h-12">
                    <Image className="rounded-full " src="/images/logo.png" alt="Logo" width={150} height={140} />
                </div>
            </div>
            <ul className="flex gap-2 items-center">
                <li className="cursor-pointer bg-black text-white px-4 py-2 hover:text-black hover:bg-white rounded-lg transition duration-500"><Link  href={"/"}>Home</Link></li>
               
               
                <li className="cursor-pointer bg-black text-white px-4 py-2 hover:text-black hover:bg-white rounded-lg transition duration-500">
                    <Link  href={"/restaurant"}>Add Restaurant</Link>
                    
                </li>

            </ul>
        </div>
    )
}

export default DeliveryHeader;