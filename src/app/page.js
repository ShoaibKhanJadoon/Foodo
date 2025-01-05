"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('')
  const [restaurant, setRestaurant] = useState([])
  const [showLocations,setShowLocations] = useState(false)

  useEffect(() => {
    loadLocations()
    loadRestaurants()
  }, [])

  const loadLocations = async () => {
    let response = await fetch("/api/customer/locations")
    response = await response.json()
    if (response.success) {
      setLocations(response.result)
    }
    else {
      console.log("no result found")
    }
  }
  const loadRestaurants = async (params) => {
    let url = '/api/customer'
    if(params?.location){
      url = url+"?location="+params.location
    }
    else if(params?.restaurant){
      url = url+"?restaurant="+params.restaurant
    }
    let response = await fetch(url)
    response = await response.json()
    
    if (response.success) {
      setRestaurant(response.result)
    }
  }

  const handleListItem = (item) => {
    
    setShowLocations(false)
    if(item=="Default"){
      setSelectedLocation("")
      loadRestaurants()
    }
    else{
      setSelectedLocation(item)
      loadRestaurants({location:item})
    }
  }
  let router = useRouter()

  return (
    <>
      <CustomerHeader />
      <div className="w-full z-20 flex justify-center p-12 items-center h-80 bg-cover flex-col relative top-16  bg-custom-pattern bg-[rgba(0,0,0,0.5)] bg-blend-multiply">
        <h1 className="font-bold text-2xl p-4 text-white shadow-black shadow-2xl">Food Delivery App</h1>
        <div className="relative">
          <input className="appearance-none focus:outline-none border-0 p-1 text-xl w-2/5" placeholder="Select Place" type="text" value={selectedLocation} onClick={()=>setShowLocations(true)} onChange={(e) => { e.target.value }} />
          <ul className="text-black bg-white absolute w-2/5">
          {showLocations && <li onClick={() => handleListItem("Default")} className="hover:bg-slate-300 transition-all duration-700 border-b-2 border-black p-1 ">Default</li>}
            {
                            
               showLocations && locations.map((item, index) => (
                <li onClick={() => handleListItem(item)} className="hover:bg-slate-300 transition-all duration-700 border-b-2 border-black p-1 " key={index}>{item}</li>
              ))
            }
          </ul>
          <input onChange={(e)=>loadRestaurants({restaurant:e.target.value})} className="appearance-none focus:outline-none border-0 p-1 text-xl w-3/5" placeholder="Enter Food or Restaurant" type="text" />
        </div>
      </div>
      <div className="bg-slate-400 relative z-10 top-16 p-6 grid md:grid-cols-2 grid-cols-1">
        {
          restaurant.map((item, index) => (
            <div onClick={()=>router.push("explore/"+item.name+"?id="+item._id)} key={index} className="bg-yellow-300 hover:bg-yellow-500 p-4 m-1 rounded-lg ">
              <div className="font-bold">{item.name}</div>
              <div className="flex gap-4">
                <div>Contact: {item.contact}</div>
                <div>city: {item.city}</div>
              </div>
              <div className="flex gap-4">
                <div>Address: {item.address}</div>
                <div>Email: {item.email}</div>
              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </>
  );
}


