import { useRouter } from "next/navigation";
import { useState } from "react";




const RestaurantLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router=useRouter()

    const handleLogin =async () => {
        if (!email || !password) {
            setError(true)
            return false
        } else {
            setError(false)
        }
        let response =await fetch("/api/restaurant",{
            method:'POST',
            body:JSON.stringify({email,password,login:true})
        })
        response =await response.json()
        if(response.success){
            const {result} = response;
            delete result.password
            localStorage.setItem("restaurantUser",JSON.stringify(result))
            alert("Login successful")
            router.push("/restaurant/dashboard")
        }else{
            alert("Login failed")
        }
    }

    return (
        <>
            <div className="flex items-center justify-center  flex-col gap-2">
                <div className="font-bold ">Login</div>
                <div className="relative">
                    <input className=" border-2 border-black px-2 h-8 rounded-lg " type="text" placeholder="Enter Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    {
                        error && !email && <span className="absolute text-2xl top-1 -right-3 text-red-500">*</span>
                    }
                </div>
                <div className="relative">
                    <input className="border-2 border-black px-2 h-8 rounded-lg " type="password" placeholder="Enter Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    {
                        error && !password && <span className="absolute text-2xl top-1 -right-3 text-red-500">*</span>
                    }
                </div>
                
                <button onClick={handleLogin} className="bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded-lg">Login</button>
            </div>
        </>
    )
}
export default RestaurantLogin;