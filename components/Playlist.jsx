"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import PlaylistDetails from "./PlaylistDetails";
import { GetAllPlaylist } from "@/lib/utilites";
import MakePlaylistModal from "./MakePlaylistModal";

export default function Playlist({user,uid}) {
  const [isMakePlaylistOpen, setMakePlaylistModal] = useState(false);
  const [data,setData] = useState(null)
  const [isModalOpen, setModal] = useState(false);

  useEffect(()=>{
    const Playlist = async()=>{

      try{
        const _data = await GetAllPlaylist(uid)
        console.log(_data,'this')
        setData(_data)
      }
      catch(error)
      {
        console.log(error)
      }

    }
    Playlist()
  },[uid])


  function handleModalOpen() {
    setModal(true);
  }

  function handleModalClose() {
    setModal(false);
  }

  function handleMakePlaylistOpen() {
    setMakePlaylistModal(true);
  }

  function handleMakePlaylistClose() {
    setMakePlaylistModal(false);
  }

  return (
    <div className="flex flex-col justify-center">
      {isMakePlaylistOpen && (
        <MakePlaylistModal
          isOpen={isMakePlaylistOpen}
          onClose={handleMakePlaylistClose}
        />
      )}
      <div className="flex flex-row p-4 items-center gap-2">
        <span className="font-bold text-lg">Playlist</span>
        <button
          className="object-contain w-4 h-4"
          onClick={() => {
            handleMakePlaylistOpen();
          }}
        >
          <img src="/plus.png" alt="" className="w-4 h-4" />
        </button>
      </div>
      {isModalOpen && (
        <PlaylistDetails
          isOpen={isModalOpen}
          onClose={handleModalClose}
          data={"This is a data"}
        />
      )}
      <div className="grid grid-flow-col justify-start w-full md:mx-8 gap-4 rounded-lg h-64 no-scrollbar overflow-x-auto">
        {/* Use onClick to open the modal */}
        
      </div>
    </div>
  );
}
