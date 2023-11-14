"use client";
import React,{useState,useEffect} from "react";
import { AddPlaylist, AddTrackToPlaylist, GetPlaylistInfo,GetUserPlaylist } from "@/lib/utilites";
import { User } from "@/app/player/page";


function PlaylistSong({ details }) {
  const [imageSrc,setSrc] = useState()
  const {SongHandler} = User()

  useEffect(()=>{
    console.log(details)
    if(details.image) setSrc(`data:image/jpeg;base64,${details.image_blob}`);
      else if(details.image_url) setSrc(details.image_url)
      else setSrc('/music.jpg')
  },[details])
  return (
    <div className="mx-auto flex flex-row justify-between rounded h-16 w-56  bg-neutral-800 p-2" >
      <div className="flex flex-row gap-4">
        <div className="object-contain">
          <img src={imageSrc} className="w-12 h-12" alt="" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm">{details.name}</span>
          <span className="text-xs">{details.author}</span>
        </div>
      </div>
    </div>
  );
}

export function ViewerPlaylist({  onClose,details}) {

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


export function ViewerAlbum({  onClose,details}) {

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


function PlaylistItems({ details,uid,songID }) {

  const [imageSrc,setSrc] = useState()
  const {Notify} = User()
  

  useEffect(()=>{
      if(details.image) setSrc(`data:image/jpeg;base64,${details.image_blob}`);
      else if(details.image_url) setSrc(details.image_url)
      else setSrc('/music.jpg')
  },[details])

  const SetSong= async(uid,playID,songID)=>{
    try{
      const res= await AddTrackToPlaylist(uid,playID,songID)
      console.log(res)
      if(res=='ok')
      {
        Notify("Song added")
      }
      else{
        Notify("Unable to add song")
      }
    }
    catch(error){
      console.log(error)
      Notify("Unable to add song")
    }
  }

  return (
    <div className="mx-auto flex flex-row justify-between rounded h-16 w-44  bg-neutral-800 p-2 cursor-pointer hover:shadow-[0_0_2px_1px_rgba(_255,_255,_255,_0.7)] " onClick={()=>{SetSong(uid,details.playlist_id,songID)}} >
      <div className="flex flex-row gap-4">
        <div className="object-contain">
          <img src={imageSrc} className="w-12 h-12" alt="" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm capitalize">{details.name}</span>
          <span className="text-xs">{details.doc}</span>
        </div>
      </div>
    </div>
  );
}


export function ViewerSong({onClose,details,songID})
{
  const [data,setData] = useState()
  const {GetUserDetails} = User();
  const [uid,setUID] = useState()
  useEffect(()=>{
    const FetchData=async(uid)=>{
      try{
        const _data = await GetUserPlaylist(uid)
        setData(_data)
      }
      catch(error)
      {
        console.log(error)
      }
    }
    const uid =GetUserDetails().userID
    
    if(uid)
    {
      setUID(uid)
      FetchData(uid)
    }
  },[GetUserDetails])


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 h-full">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl z-10 relative">
        <div className="flex flex-col gap-2 justify-center w-56 ">
        <div className="flex flex-col gap-2 overflow-y-scroll no-scrollbar h-96 p-2">
            { data && data.map((val,k) =>{
              return <PlaylistItems details={val} key={k} uid={uid} songID={songID} />
            })}
          </div>
          <button
            onClick={()=>onClose()}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}