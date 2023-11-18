"use client";
import React, { useEffect, useState } from "react";
import {RecentlyPlayedCard} from "./Card";
import { GetRecentlyPlayed,GetLocal } from "@/lib/utilites";
import { User } from "@/app/player/page";
// import MusicPlayer from "./MusicPlayer";

function extractTestValue(inputString) {
  const match = inputString.match(/'([^']*)'/);

  // Check if a match is found
  if (match) {
      return match[1];
  } else {
      return inputString;
  }
}  

export default function RecentlyPlayed() {
  const [data,setData] = useState(null)
  const {GetUserDetails,SongHandler} = User()
  
  // const player = new MusicPlayer()

  useEffect(()=>{
    const Recent=async ()=>{
      const uid= GetUserDetails().userID
      try{
        const _data = await GetRecentlyPlayed(uid)
        const arr = _data.result
        arr.sort((a,b)=>{
          return a.order - b.order
        })
        setData(arr)
      }
      catch(error)
      {
        console.log(error)
      }
    }
    const uid= GetUserDetails().userID
    if(uid)
    Recent()
  },[GetUserDetails])

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col p-4">
        <span className="font-bold text-lg">Recent</span>
      </div>
      <div className="grid grid-flow-col justify-start  w-full md:mx-8  gap-4  rounded-lg h-64 no-scrollbar overflow-x-auto">
      {data && data.map((val,ind)=>{
        return <RecentlyPlayedCard key={ind} primary={val.name} secondary={extractTestValue(val.artist_name)} imageBlob={val.image_blob} type={"track"} id={val.track_id} player={SongHandler} />
      })}
      </div>
    </div>
  );
}
