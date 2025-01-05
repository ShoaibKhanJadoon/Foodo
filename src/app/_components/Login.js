import { useRouter } from "next/navigation"
import { useState } from "react"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const router = useRouter();
    const handleLogin =async () => {
        if (!email || !password) {
            setError(true);
            return false;
        }
        else {
            setError(true)
        }
        let response = await fetch("/api/user/login",{
            method:"POST",
            body:JSON.stringify({email,password})
        })
        response=await response.json()
        if(response.success){
            const {result} = response;
            localStorage.setItem('user',JSON.stringify(result))
            alert("Login Successful")
            router.push("/")
        }else{
            alert("failed to login. Please Correct Email or Password")
        }
    }
    return (
        <div className="relative top-16 p-4">
            <div className="flex items-center justify-center flex-col gap-2">
            <div>Login</div>
                <div className="relative">
                    <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                    {error && !email && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                </div>
                <div className="relative">
                    <input className="border-2 border-black px-2 h-8 rounded-lg" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                    {error && !password && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
                </div>
                <button onClick={handleLogin} className="bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded-lg">Login</button>

            </div>

        </div>
    )
}
export default Login;