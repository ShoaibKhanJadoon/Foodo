import { useState } from "react";

const AddFoodItem = () => {
    const [error, setError] = useState(false);
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescription] = useState("")

    const handleAddFoodItem=async()=>{
        if(!name || !price || !path || !description){
            setError(true)
            return false
        }
        let resto_id;
        const restaurantData=JSON.parse(localStorage.getItem("restaurantUser"))
        if(restaurantData){
            resto_id=restaurantData._id;
            const response =await fetch("http://localhost:3000/api/restaurant/foods",{
                method:"POST",
                body:JSON.stringify({name,price,img_path:path,description,resto_id})
            })
            const food = await response.json()
            if(food.success){
                alert("Food Item Added Successfully")
            }else{
                alert("Food Item not Added")
            }
            // console.log(food,restaurantData)
        }
        
       
    }

    return (
        <div className="flex items-center justify-center flex-col gap-2">
            <h1 className="font-bold">Add food item</h1>
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
            <button onClick={handleAddFoodItem} className="bg-orange-600 hover:bg-orange-700 px-4 py-1 rounded-lg">SignUp</button>
            



        </div>
    )
}

export default AddFoodItem;