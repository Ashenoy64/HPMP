"use client";
import React, { useState,useEffect } from "react";
import {PodcastCard} from "./Card";
import { GetUserPodcast } from "@/lib/utilites";



export default function UserPodcast({details}) {

  const [data,setData] =  useState() 
  const [ uid,setUID ] = useState()

  useEffect(()=>{
    const FetchData=async(uid)=>{
      try{
        const _data = await GetUserPodcast(uid)
        setData(_data)
      }
      catch(error)
      {
        console.log(error)
      }
    }
    const uid = details().userID
    if(uid)
    {
      setUID(uid)
      FetchData(uid)
    }
  },[details])


  const DeletePodcast=async(k)=>{

  }
  

  

  return (
    <div className="flex flex-col justify-center w-full">
      
      <div className="flex flex-row p-4 items-center gap-2">
        <span className="font-bold text-lg">Podcast</span>
      </div>
      <div className="grid grid-flow-col justify-start w-full md:mx-8 gap-4 rounded-lg h-64 no-scrollbar overflow-x-auto">
        {/* Use onClick to open the modal */}
        { data && data.map((val,ind)=><PodcastCard key={ind} onClick={handleModalOpen} deleteHandler={DeletePodcast} />)}
      </div>
    </div>
  );
}


