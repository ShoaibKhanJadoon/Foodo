'use client'

import { useRouter } from 'next/navigation'
import { useState } from "react";



const RestaurantSignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [c_password, setC_password] = useState('')
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const router = useRouter()

    const [error,setError]=useState(false);
    const [password_error,setPassword_Error]=useState(false)

    const handleSignUp =async () => {
        // empty error
        if( !email || !password || !c_password || !name || !city || !address || !contact ){
            setError(true);
            return false;
        }
        else{
            setError(true)
        }
        // password confirmation
        if(password != c_password){
            setPassword_Error(true)
            return false
        }
        else{
            setPassword_Error(false)
        }
        
        let response=await fetch("http://localhost:3000/api/restaurant",{
            method:"POST",
            body:JSON.stringify({email, password, name, city, address, contact})
        })

        response =await response.json()
        
        if(response.success){
            alert("Restaurant Created Successfully")
            const {result} = response
            delete result.password
            localStorage.setItem("restaurantUser",JSON.stringify(result))
            router.push("/restaurant/dashboard")
        }
    }

    return (
        <>
            <div className="flex items-center justify-center flex-col gap-2">
                <div>SignUp</div>
                <div className='relative'>
                    <input className="border-2 border-black px-2 h-8 rounded-lg " type="text" placeholder="Enter Email"
                        value={email} onChange={(event) => setEmail(event.target.value)}
                    />
                    {error && !email && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                </div>
                <div className='relative'>
                    <input className="border-2 border-black px-2 h-8 rounded-lg " type="password" placeholder="Enter Password"
                        value={password} onChange={(event) => setPassword(event.target.value)}
                    />
                    {error && !password && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                </div>
                {password_error && <div className='text-red-500 text-xs px-6'>password and confirm password not matching</div>}
                <div className={` relative`}>
                    <input className="border-2 border-black px-2 h-8 rounded-lg " type="password" placeholder="Confirm Password"
                        value={c_password} onChange={(event) => setC_password(event.target.value)}
                    />
                    {error && !c_password && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                    
                </div>
                {password_error && <div className='text-red-500 text-xs px-6 '>password and confirm password not matching</div>}
                <div className='relative'>
                    <input className="border-2 border-black px-2 h-8 rounded-lg " type="text" placeholder="Enter Restuarant Name"
                        value={name} onChange={(event) => setName(event.target.value)}
                    />
                    {error && !name && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                </div>
                <div className='relative'>
                    <input className="border-2 border-black px-2 h-8 rounded-lg " type="text" placeholder="Enter City"
                        value={city} onChange={(event) => setCity(event.target.value)}
                    />
                    {error && !city && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                </div>
                <div className='relative'>
                    <input className="border-2 border-black px-2 h-8 rounded-lg " type="text" placeholder="Enter Full Address"
                        value={address} onChange={(event) => setAddress(event.target.value)}
                    />
                    {error && !address && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                </div>
                <div className='relative'>
                    <input className="border-2 border-black px-2 h-8 rounded-lg " type="tel" placeholder="Enter Contact Number"
                        value={contact} onChange={(event) => setContact(event.target.value)}
                    />
                    {error && !contact && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                </div>
                <button onClick={handleSignUp} className="bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded-lg">SignUp</button>
            </div>
        </>
    )
}
export default RestaurantSignUp;