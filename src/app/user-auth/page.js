"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import Login from "../_components/Login";
import UserSignUp from "../_components/UserSignUp";

const UserAuth = ({ searchParams }) => {
    const [login, setLogin] = useState(null)
    const [redirectParams, setRedirectParams] = useState({});

    useEffect(() => {
        // Simulating async resolution of params
        const fetchParams = async () => {
            const resolvedParams = await searchParams; // Resolve the promise
            const order = resolvedParams.order?true:false 

            if (resolvedParams.flag == 'true') {
                setLogin(true)
            }
            else if (resolvedParams.flag == 'false') {
                setLogin(false)
            }
            else{
                setLogin(true)
            }
            setRedirectParams({ order });
        };

        fetchParams();
    }, [searchParams]);


    return (
        <div className="min-h-screen relative ">
            <CustomerHeader />

            {
                login ? <Login redirect={redirectParams}/> : <UserSignUp redirect={redirectParams} />
            }
            <div className="flex items-center justify-center top-16 relative">
                <button onClick={() => setLogin(!login)} className="text-blue-600 hover:text-blue-800">{
                login ? 
                    <Link className="cursor-pointer" href={redirectParams.order ?"/user-auth?flag=false&order=true":"/user-auth?flag=false"}>Do not have Account ? SignUp</Link>: 
                    <Link className="cursor-pointer" href={redirectParams.order ?"/user-auth?flag=true&order=true":"/user-auth?flag=true"}>Already have Account ? Login</Link> }
                </button>
            </div>

            <div className="absolute w-full bottom-16">
                <Footer />
            </div>

        </div>
    )
}
export default UserAuth;