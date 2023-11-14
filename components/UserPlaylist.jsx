"use client";
import React, { useState,useEffect } from "react";
import { PlaylistCard } from "./Card";
import { GetUserPlaylist,GetPlaylistInfo } from "@/lib/utilites";


export default function UserPlaylist({details}) {
  const [data,setData] = useState(null)
  const [modalData,setModalData] =  useState()
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
        {/* Use onClick to open the modal */}
        {data  && data.map((val,ind)=>{
          return <PlaylistCard onClick={handleModalOpen} key={ind} primary={val.name} imageBlob={val.image_blob} secondary={val.doc} k={ind} id={val.playlist_id} uid={val.owner_id}  owner={true} deleteHandler={DeletePlaylist}  />
        })}
      </div>
    </div>
  );
}


function PlaylistSong({ details }) {
  const [imageSrc,setSrc] = useState()

  useEffect(()=>{
      if(details.image) setSrc(`data:image/jpeg;base64,${details.image_blob}`);
      else if(details.image_url) setSrc(details.image_url)
      else setSrc('/music.jpg')
    
  },[details])
  return (
    <div className="mx-auto flex flex-row justify-between rounded h-16 w-56  bg-neutral-800 p-2">
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

function PlaylistDetails({  onClose,details }) {
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
              return <PlaylistSong details={val} key={k}   />
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
