"use client";
import React, { useState,useEffect } from "react";
import {PodcastCard} from "./Card";
import { GetUserPodcast,DeleteMedia } from "@/lib/utilites";
import { useUser } from "@/app/user/layout";


export default function UserPodcast({details}) {

  const [data,setData] =  useState() 
  const [ uid,setUID ] = useState()
  const {Notify} = useUser()
  useEffect(()=>{
    const FetchData=async(uid)=>{
      try{
        const _data = await GetUserPodcast(uid)
        // console.log(_data)
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
    try{
      const res = await DeleteMedia('podcast',data[k].podcast_id,uid)
      if(res=='ok')
      {
        Notify("Deleted the Podcast")
      }
      else{
        Notify("Failed to delete the Podcast")
      }
    }catch(error)
    {
      Notify("Failed to delete the Podcast")
      console.log(error)
    }
  }
  

  

  return (
    <div className="flex flex-col justify-center w-full">
      
      <div className="flex flex-row p-4 items-center gap-2">
        <span className="font-bold text-lg">Podcast</span>
      </div>
      <div className="grid grid-flow-col justify-start w-full md:mx-8 gap-4 rounded-lg h-64 no-scrollbar overflow-x-auto">
        {/* Use onClick to open the modal */}
        { data && data.map((val,ind)=><PodcastCard key={ind} primary={val.name} secondary={val.doc} imageBlob={val.image_blob} k={ind}  deleteHandler={DeletePodcast} />)}
      </div>
    </div>
  );
}


