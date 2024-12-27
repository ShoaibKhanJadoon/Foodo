'use client'
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin"
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantHeader from "../_components/RestaurantHeader";
import Footer from "../_components/Footer";


const Restaurant = () => {

    const [login, setLogin] = useState(true);
    

    return (
        <>
            <div>

            </div>
            <div className="relative min-h-screen flex flex-col items-center justify-center">
                <RestaurantHeader />
                <div className="flex items-center flex-col  justify-center bg-slate-400 p-8 rounded-lg">
                    <h1 className="text-lg font-bold">Restaurant Login/SignUp</h1>
                    <div>
                        {login ? <RestaurantLogin /> : <RestaurantSignUp />}
                    </div>
                    <div>
                        <button className="text-blue-600 hover:text-blue-800" onClick={() => setLogin(!login)}>
                            {login ? "Do not have account? SignUp" : "Already have Account? Login"}
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}
export default Restaurant;