import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")
    const [mobile, setMobile] = useState("")
    const [error,setError] = useState(false)
    const [password_error,setPassword_Error]=useState(false)
    const router = useRouter()

    const handleSignUp =async () =>{
        // empty error
        if( !name || !email || !password || !confirmPassword || !city || !address || !mobile ){
            setError(true);
            return false;
        }
        else{
            setError(true)
        }
        //password confirmation
        if(password != confirmPassword){
            setPassword_Error(true)
            return false
        }
        else{
            setPassword_Error(false)
        }
        
        let response = await fetch("/api/user",{
            method:"POST",
            body:JSON.stringify({name,email,password,city,address,mobile})
        })
        response=await response.json()
        if(response.success){
            const {result} = response;
            localStorage.setItem('user',JSON.stringify(result))
            router.push("/")
        }else{
            alert(response.result)
        }
    }

    return (
        <div className="relative top-16 p-4 ">
            <div className="flex items-center justify-center flex-col gap-2">
                <div>SignUp</div>
                <div className="relative">
                    <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} type="text" />
                    {error && !name && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                </div>
                <div className="relative">
                    <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                    {error && !email && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
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
                <div className="relative">
                    <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} type="text" />
                    {error && !mobile && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                </div>
                <button onClick={handleSignUp} className="bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded-lg">SignUp</button>
            
            </div>
        </div>
    )
}
export default UserSignUp;