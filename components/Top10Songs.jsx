"use client";
import React, { useEffect, useState } from "react";
import {RecentlyPlayedCard} from "./Card";
import { GetTop10 } from "@/lib/utilites";
import { User } from "@/app/player/page";

function extractTestValue(inputString) {
  const match = inputString.match(/'([^']*)'/);

  // Check if a match is found
  if (match) {
      return match[1];
  } else {
      return inputString;
  }
}  

export default function Top10() {
  const [data,setData] = useState(null)
  const {SongHandler} = User()

  useEffect(()=>{
    const TopSongs=async ()=>{
      try{
        const _data = await GetTop10()
        const arr = _data.result
        console.log(arr)
        arr.sort((a,b)=>{
          return b.stream_count - a.stream_count
        })
        setData(arr)
      }
      catch(error)
      {
        console.log(error)
      }
    }
   
    TopSongs()
  },[])

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col p-4">
        <span className="font-bold text-lg">Popular songs</span>
      </div>
      <div className="grid grid-flow-col justify-start  w-full md:mx-8  gap-4  rounded-lg h-64 no-scrollbar overflow-x-auto">
      {data && data.map((val,ind)=>{
        return <RecentlyPlayedCard key={ind} primary={val.title} secondary={val.artist_names[0]} imageUrl={val.image_url}  player={SongHandler} details={val} />
      })}
      </div>
    </div>
  );
}
