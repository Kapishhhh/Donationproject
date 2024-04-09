import React, { useEffect, useState } from "react";
import axiosUrl from "../url/Axiosurl";


const Profile = () => {

    const [profile, setProfile] = useState([]);
      const [selectedFile, setSelectedFile] = useState(null);

  
  useEffect(()=>{
     axiosUrl.get("/user").then((response)=>{
       console.log(response.data.data);
       setProfile([response.data.data])
     }).catch((err)=>{
       console.log(err);
     })
},[])



  return (
    <div className="mx-5 my-10  rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <h1>Profile</h1>
        {
        profile.map((data, index)=>(
            <div key={index} className="">
               <div className="flex justify-center">
                <img src={data.image}/>
               </div>
               <div className="flex justify-center text-6xl font-medium">{data.username}</div>
               <div className="flex justify-center text-xl">{data.email}</div>
            </div>
        ))
        }


       


    </div>
  )
}

export default Profile