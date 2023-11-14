"use client";
import React,{useState,useEffect} from "react";
import { GetPlaylistInfo } from "@/lib/utilites";

function PlaylistSong({ details }) {
  return (
    <div className="mx-auto flex flex-row justify-between rounded h-16 w-56  bg-neutral-800 p-2">
      <div className="flex flex-row gap-4">
        <div className="object-contain">
          <img src="/music.jpg" className="w-12 h-12" alt="" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm">{details.name}</span>
          <span className="text-xs">{details.author}</span>
        </div>
      </div>
    </div>
  );
}

export default function Viewer({  onClose,details,type }) {
  const [data,setData] = useState()
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
          <div className="grid grid-cols-1 gap-2 overflow-y-scroll no-scrollbar h-96">
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
