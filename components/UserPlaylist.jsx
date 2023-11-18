"use client";
import React, { useState,useEffect } from "react";
import { PlaylistCard } from "./Card";
import { GetUserPlaylist,GetPlaylistInfo, RemoveTrackPlaylist, DeleteMedia } from "@/lib/utilites";
import { useUser } from "@/app/user/layout";


export default function UserPlaylist({details}) {
  const [data,setData] = useState(null)
  const [modalData,setModalData] =  useState()
  const [uid,setUID] = useState()
  const {Notify} = useUser()

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
    const uid = details().userID
    if(uid)
    {
      setUID(uid)
      FetchData(uid)
    }
  },[details])

  const [isModalOpen, setModal] = useState(false);

  function handleModalOpen(k) {
    setModalData(data[k])
    setModal(true);
  }

  function handleModalClose() {
    setModal(false);
  }
  const DeletePlaylist=async(k)=>{
    try{
      const res = await DeleteMedia('playlist',data[k].playlist_id,uid)
      if(res=='ok')
      {
        Notify("Deleted the playlist")
      }
      else{
        Notify("Failed to delete the playlist")
      }
    }catch(error)
    {
      Notify("Failed to delete the playlist")
      console.log(error)
    }

  }

 

  return (
    <div className="flex flex-col w-full justify-center">
      <div className="flex flex-row p-4 items-center gap-2">
        <span className="font-bold text-lg"> User Playlists</span>
      </div>
      {isModalOpen && (
        <PlaylistDetails
          onClose={handleModalClose}
          uid={uid}
          details={modalData}
        />
      )}
      <div className="grid grid-flow-col justify-start w-full md:mx-8 gap-4 rounded-lg h-64 no-scrollbar overflow-x-auto">
        {data  && data.map((val,ind)=>{
          return <PlaylistCard onClick={handleModalOpen} key={ind} primary={val.name} imageBlob={val.image_blob} secondary={val.doc} k={ind} id={val.playlist_id} uid={val.owner_id}  owner={true} deleteHandler={DeletePlaylist}  />
        })}
      </div>
    </div>
  );
}



function extractTestValue(inputString) {
  const match = inputString.match(/'([^']*)'/);

  // Check if a match is found
  if (match) {
      return match[1];
  } else {
      return inputString;
  }
} 

function PlaylistSong({ details,playlist_id }) {
  const [imageSrc,setSrc] = useState()
  const {Notify} = useUser()

  const RemoveSong = async(playlist_id,trackid)=>
  {
    try{
      const res = await RemoveTrackPlaylist(playlist_id,trackid);
      if(res == "ok")
      {
        Notify("Removed the track")
      }
      else{
        Notify("Failed to remove track")
      }

    }
    catch(error)
    { 
      Notify("Failed to remove track")
    }
  }

  useEffect(()=>{
      if(details.image_blob) setSrc(`data:image/jpeg;base64,${details.image_blob}`);
      else if(details.image_url) setSrc(details.image_url)
      else setSrc('/music.jpg')
    
  },[details])
  return (
    <div className="mx-auto flex flex-row justify-between rounded h-16 w-56  bg-neutral-800 p-2">
      <div className="flex flex-row gap-4">
        <div className="object-contain">
          <img src={imageSrc} className="w-12 h-12" alt="" />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
          <span className="text-sm">{details.name}</span>
          <span className="text-xs">{extractTestValue(details.artist_name)}</span>

          </div>
          <button className="p-2 object-contain w-8" onClick={(e)=>{e.stopPropagation();RemoveSong(playlist_id,details.track_id)}}>
            <img src="/minus.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PlaylistDetails({  onClose,details,uid }) {
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
          <div className="flex flex-col gap-1 overflow-y-scroll no-scrollbar h-96">
            { data && data.map((val,k) =>{
              return <PlaylistSong details={val} key={k}  playlist_id={details.playlist_id} />
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
