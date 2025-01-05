"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CustomerHeader = ({ cartData, removeCartData }) => {

    const [userStorage, setUserStorage] = useState();
    const [cartNumber, setCartNumber] = useState(0)
    const [cartItem, setCartItem] = useState([])

    useEffect(() => {
        const user = localStorage.getItem("user")
        const parsedUser = JSON.parse(user)
        console.log(parsedUser)
        setUserStorage(parsedUser)

    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (removeCartData) {
                let localCartItem = cartItem.filter((item) => {
                    return item._id != removeCartData
                })

                setCartItem(localCartItem)
                setCartNumber(cartNumber - 1)
                localStorage.setItem('cart', JSON.stringify(localCartItem))
                if (localCartItem.length == 0) {
                    localStorage.removeItem('cart')
                }

            }
        }
    }, [removeCartData])
    useEffect(() => {
        if (typeof window !== "undefined") {


            const cartStorage = localStorage.getItem('cart');
            const parsedCart = cartStorage ? JSON.parse(cartStorage) : [];
            setCartNumber(parsedCart.length);
            setCartItem(parsedCart);
            if (cartData) {
                if (cartNumber > 0) {

                    if (cartItem[0].resto_id != cartData.resto_id) {
                        localStorage.removeItem('cart')
                        setCartNumber(1)
                        setCartItem([cartData])
                        localStorage.setItem("cart", JSON.stringify([cartData]))
                    } else {

                        let localCartItem = cartItem
                        localCartItem.push(JSON.parse(JSON.stringify(cartData)))
                        setCartItem(localCartItem)
                        setCartNumber(cartNumber + 1)
                        localStorage.setItem("cart", JSON.stringify(localCartItem))
                    }


                }
                else {

                    setCartNumber(1)
                    setCartItem([cartData])
                    localStorage.setItem("cart", JSON.stringify([cartData]))
                }
            }
        }
    }, [cartData])
    const Logout = () =>{
    localStorage.removeItem("user")
    setUserStorage(null)

    }

    return (
        <div className="flex z-30 items-center justify-between bg-slate-500 fixed top-0 w-full px-3 py-2">
            <div>

                <div className=" w-12 h-12">
                    <Image className="rounded-full " src="/images/logo.png" alt="Logo" width={150} height={140} />
                </div>
            </div>
            <ul className="flex gap-2 items-center">
                <li className="cursor-pointer bg-black text-white px-4 py-2 hover:text-black hover:bg-white rounded-lg transition duration-500"><Link  href={"/"}>Home</Link></li>
                {
                    userStorage ?
                        <>
                            <li  className="cursor-pointer m-0 bg-black text-white px-4 py-2 hover:text-black hover:bg-white rounded-lg transition duration-500">
                                <Link href={"#"}>{userStorage?.name}</Link>
                            </li>
                            <li className="cursor-pointer bg-black text-white px-4 py-2 hover:text-black hover:bg-white rounded-lg transition duration-500">
                                <button  onClick={Logout}>Logout</button>
                            </li>
                        </>
                        : <>
                            <li className="cursor-pointer bg-black text-white px-4 py-2 hover:text-black hover:bg-white rounded-lg transition duration-500">
                                <Link  href={"/user-auth?flag="+true}>Login</Link>
                            </li>
                            <li className="cursor-pointer bg-black text-white px-4 py-2 hover:text-black hover:bg-white rounded-lg transition duration-500">
                                <Link  href={"/user-auth?flag="+false}>SignUp</Link>

                            </li>
                        </>
                }
                <li className="cursor-pointer bg-black text-white px-4 py-2 hover:text-black hover:bg-white rounded-lg transition duration-500">
                    <Link  href={cartNumber ? "/cart" : "#"}>Cart ({cartNumber ? cartNumber : 0})</Link>
                </li>
                <li className="cursor-pointer bg-black text-white px-4 py-2 hover:text-black hover:bg-white rounded-lg transition duration-500">
                    <Link  href={"/restaurant"}>Add Restaurant</Link>
                    
                </li>

            </ul>
        </div>
    )
}

export default CustomerHeader;