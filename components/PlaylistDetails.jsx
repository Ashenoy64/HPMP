"use client";
import React,{useState,useEffect} from "react";
import { GetPlaylistInfo } from "@/lib/utilites";
import { User } from "@/app/player/page";

function extractTestValue(inputString) {
  const match = inputString.match(/'([^']*)'/);

  if (match) {
      return match[1];
  } else {
      return inputString;
  }
} 

function PlaylistSong({ details }) {
  const [imageSrc,setSrc] = useState()
  const {SongHandler} = User()
  useEffect(()=>{

    if(details.image_blob) setSrc(`data:image/jpeg;base64,${details.image_blob}`);
      else if(details.image_url) setSrc(details.image_url)
      else setSrc('/music.jpg')
  },[details])
  return (
    <div className="mx-auto flex flex-row justify-between rounded h-16 w-56  bg-neutral-800 p-2 cursor-pointer hover:shadow-[0_0_2px_1px_rgba(_255,_255,_255,_0.7)]" onClick={()=>{SongHandler(details.name,extractTestValue(details.artist_name),details.image_blob,details.track_id)}} >
      <div className="flex flex-row gap-4">
        <div className="object-contain">
          <img src={imageSrc} className="w-12 h-12" alt="" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm">{details.name}</span>
          <span className="text-xs">{extractTestValue(details.artist_name)}</span>
        </div>
      </div>
    </div>
  );
}

export default function PlaylistDetails({  onClose,details }) {
  const [data,setData] = useState()
  console.log(details,"here")
  useEffect(()=>{
    const FetchData = async()=>{
      try{
        const _data = await GetPlaylistInfo(details.playlist_id)
        setData(_data)
      }
      catch(error){
        console.log(error)
      } 
    }
    FetchData()
  },[details])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 h-full">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl z-10 relative">
        <div className="flex flex-col gap-2 justify-center w-56 ">
          <span className="font-bold text-xl text-center capitalize">{details.name}</span>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2 justify-start">
              <span className="text-xs">{details.doc}</span>
            </div>
            
          </div>
          <hr />
          <div className="flex flex-col gap-3 overflow-y-scroll no-scrollbar h-96">
            { data && data.map((val,k) =>{
              return <PlaylistSong details={val} key={k} />
            })}
          </div>
          <button
            onClick={onClose}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
