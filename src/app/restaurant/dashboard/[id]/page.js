"use client"

import { useRouter } from "next/navigation";
import { useState,use, useEffect } from "react";

const EditFoodItem =({params}) => {
    
    const router= useRouter()
    const [error, setError] = useState(false);
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescription] = useState("")

    const resolvedParams = use(params);
    const id = resolvedParams.id;

    useEffect(()=>{
        handleLoadFoodItem()
    },[])
    const handleLoadFoodItem=async()=>{
        let response =await fetch(`/api/restaurant/foods/edit/${id}`)
        response =await response.json();
        
        if(response.success){
            
            setName(response.result.name)
            setPrice(response.result.price)
            setPath(response.result.img_path)
            setDescription(response.result.description)

        }
        else{
            console.log("failed")
        }
    }
    const handleEditFoodItem =async () =>{
        if(!name || !price || !path || !description){
            setError(true)
            return false 
        }
        else{
            setError(false)
        }
        let response =await fetch(`/api/restaurant/foods/edit/${id}`,{
            method:"PUT",
            body:JSON.stringify({name,price,img_path:path,description})
        })
        response =await response.json()
        if(response.success){
            alert("updated")
            handleLoadFoodItem()

        }
    }

    
    

    return (
        <div className="flex items-center justify-center flex-col gap-2">
            <h1 className="font-bold">Update food item</h1>
            <div className='relative'>
                <input className="border-2 border-black px-2 h-8 rounded-lg " type="text" placeholder="Enter Name"
                    value={name} onChange={(event) => setName(event.target.value)}
                />
                {error && !name && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
            </div>
            <div className='relative'>
                <input className="border-2 border-black px-2 h-8 rounded-lg " type="text" placeholder="Enter Price"
                    value={price} onChange={(event) => setPrice(event.target.value)}
                />
                {error && !price && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
            </div>
            <div className='relative'>
                <input className="border-2 border-black px-2 h-8 rounded-lg " type="text" placeholder="Enter image path"
                    value={path} onChange={(event) => setPath(event.target.value)}
                />
                {error && !path && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
            </div>
            <div className='relative'>
                <input className="border-2 border-black px-2 h-8 rounded-lg " type="text" placeholder="Enter description"
                    value={description} onChange={(event) => setDescription(event.target.value)}
                />
                {error && !description && <span className='text-red-500 absolute text-2xl  -right-3 top-1 text-center'> *</span>}
            </div>
            <button onClick={handleEditFoodItem} className="bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded-lg">Update Food Item</button>
            
            <button onClick={()=>router.push("../dashboard")} className="bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded-lg">Back to Food Item List</button>



        </div>
    )
}

export default EditFoodItem;