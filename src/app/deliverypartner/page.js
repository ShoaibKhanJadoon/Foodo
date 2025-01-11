"use client"

import { useEffect, useState } from "react"
import DeliveryHeader from "../_components/DeliveryHeader"
import { useRouter } from "next/navigation"

const page = () => {

    const [loginMobile, setLoginMobile] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const [loginError, setLoginError] = useState(false)
    const [error, setError] = useState(false)
    const [password_error, setPassword_Error] = useState(false)
    const [login_signup, setlogin_signup] = useState()
    const router = useRouter()

    useEffect(() => {
        if (typeof window != "undefined") {
            const delivery = localStorage.getItem("delivery");
            if (delivery) {
                router.push("/deliverydashboard")
            }
        }
    }, []);

    const handleLogin = async () => {
        if (!loginMobile || !loginPassword) {
            setLoginError(true);
            return false;
        }
        else {
            setLoginError(false)
        }
        let response = await fetch('/api/deliverypartners/login', {
            method: "POST",
            body: JSON.stringify({ loginMobile, password: loginPassword })
        })

        response = await response.json()
        console.log(response)
        if (response.success) {
            const { result } = response;
            alert("login successful")
            localStorage.setItem("delivery",JSON.stringify(result))
            router.push("/deliverydashboard")

        } else {
            alert("Login Failed")
        }
    }
    const handleSignUp = async () => {
        // empty error
        if (!name || !password || !confirmPassword || !city || !address || !mobile) {
            setError(true);
            return false;
        }
        else {
            setError(false)
        }
        //password confirmation
        if (password != confirmPassword) {
            setPassword_Error(true)
            return false
        }
        else {
            setPassword_Error(false)
        }
        let response = await fetch('/api/deliverypartners/signup', {
            method: "POST",
            body: JSON.stringify({ name, mobile, password, city, address })
        })
        console.log("result" + JSON.stringify(response))
        response = await response.json()
        if (response.success) {
            const { result } = response;
            alert("account created")
            localStorage.setItem("delivery", JSON.stringify(result))
            router.push("/deliverydashboard")

        } else if (response.result == "Email Already Exists") {
            alert("Email Already Exists")
        } else {
            alert("Signup Failed")
        }
    }
    return (
        <div>
            <DeliveryHeader />
            {login_signup ?
                <div className="relative top-16 p-4">
                    <div className="flex items-center justify-center flex-col gap-2">
                        <div>Login</div>
                        <div className="relative">
                            <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Mobile" value={loginMobile} onChange={(e) => setLoginMobile(e.target.value)} type="text" />
                            {loginError && !loginMobile && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                        </div>
                        <div className="relative">
                            <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} type="text" />
                            {loginError && !loginPassword && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                        </div>
                        <button onClick={handleLogin} className="bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded-lg">Login</button>
                        <button className="text-blue-500 hover:text-blue-700" onClick={() => setlogin_signup(false)}>Dont have an account? SignUp</button>

                    </div>
                </div> :

                <div className="relative top-16 p-4 ">
                    <div className="flex items-center justify-center flex-col gap-2">
                        <div>SignUp</div>
                        <div className="relative">
                            <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} type="text" />
                            {error && !name && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                        </div>
                        <div className="relative">
                            <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} type="text" />
                            {error && !mobile && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                        </div>
                        <div className="relative">
                            <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                            {error && !password && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                        </div>
                        <div className="relative">
                            <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="text" />
                            {error && !confirmPassword && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                        </div>
                        {password_error && <div className='text-red-500 text-xs px-6 '>password and confirm password not matching</div>}
                        <div className="relative">
                            <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} type="text" />
                            {error && !city && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                        </div>
                        <div className="relative">
                            <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} type="text" />
                            {error && !address && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                        </div>

                        <button onClick={handleSignUp} className="bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded-lg">SignUp</button>
                        <button className="text-blue-500 hover:text-blue-700" onClick={() => setlogin_signup(true)}>Already have an account? Login</button>

                    </div>
                </div>}
        </div>

    )
}

export default page;