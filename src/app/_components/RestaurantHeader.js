"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter,usePathname } from "next/navigation";



const RestaurantHeader = () => {
    const pathName=usePathname();
    const router = useRouter()
    const [detail, setDetail] = useState();
    useEffect(() => {
        let data = localStorage.getItem("restaurantUser");
        if (!data && pathName=="/restaurant/dashboard") {
            router.push("/restaurant")
        }else if(data && pathName=="/restaurant"){
            router.push("/restaurant/dashboard")
        }
        else {
            setDetail(JSON.parse(data))
        }
    },[])
    const logout=()=>{
        localStorage.removeItem("restaurantUser")
        router.push("/restaurant")
    }
    return (
        <>
            <div className="bg-slate-500 flex justify-between items-center fixed top-0 w-full">
                <div>
                    <div className=" w-12 h-12">
                        <Image className="rounded-full " src="/images/logo.png" alt="Logo" width={150} height={140} />
                    </div>
                </div>
                <ul className="flex justify-evenly gap-4 mr-12">
                    <li>
                        <Link  href={"/"}>Home</Link>
                    </li>
                    {
                        detail && detail.name ?
                            <li className="flex gap-4">
                                <Link href={"/"}>Profile</Link>
                                <button onClick={logout}>Logout</button>
                            </li> :
                            <li>
                                <Link href={"/"}>Login/SignUp</Link>
                            </li>
                    }


                </ul>
            </div>
        </>
    )
}
export default RestaurantHeader;