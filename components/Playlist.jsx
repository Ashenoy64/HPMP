"use client";
import React,{useState} from "react";
import Card from "./Card";
import PlaylistDetails from "./PlaylistDetails";

import MakePlaylistModal from "./MakePlaylistModal";



export default function Playlist() {
  const [isMakePlaylistOpen, setMakePlaylistModal] = useState(false);

  const [isModalOpen,setModal] =useState(false)

  function handleModalOpen() {
    setModal(true);
  }

 
  function handleModalClose() {
    setModal(false);
  }

  function handleMakePlaylistOpen() {
    setModal(true);
  }

 
  function handleMakePlaylistClose() {
    setModal(false);
  }

  return (
    <div className="flex flex-col justify-center">
      {isMakePlaylistOpen && (<MakePlaylistModal isOpen={isModalOpen} onClose={handleMakePlaylistClose} />)}
      <div className="flex flex-row p-4 items-center gap-2">
        <span className="font-bold text-lg">Playlist</span>
        <button className="object-contain w-4 h-4" onClick={()=>{handleMakePlaylistOpen()}}>
          <img src="/plus.png" alt=""  className="w-4 h-4"/>
        </button>
      </div>
      {isModalOpen && (
        <PlaylistDetails isOpen={isModalOpen} onClose={handleModalClose} data={'This is a data'}/>
      )}
      <div className="grid grid-flow-col justify-start w-full md:mx-8 gap-4 rounded-lg h-64 no-scrollbar overflow-x-auto">
        {/* Use onClick to open the modal */}
        <Card onClick={handleModalOpen} />
        <Card onClick={handleModalOpen} />
        <Card onClick={handleModalOpen} />
        <Card onClick={handleModalOpen} />
      </div>
    </div>
  );
}
