"use client";
import React, { useState } from "react";
import Card from "./Card";




export default function UserPodcast() {

  const [isModalOpen, setModal] = useState(false);

  function handleModalOpen() {
    setModal(true);
  }

  function handleModalClose() {
    setModal(false);
  }


  

  return (
    <div className="flex flex-col justify-center">
      
      <div className="flex flex-row p-4 items-center gap-2">
        <span className="font-bold text-lg">Podcast</span>
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
        <Card onClick={handleModalOpen} />
        <Card onClick={handleModalOpen} />
        <Card onClick={handleModalOpen} />
        <Card onClick={handleModalOpen} />
      </div>
    </div>
  );
}


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
  
function PlaylistDetails({ isOpen, onClose, data, children }) {
    data = {
      Name: "PlaylistName",
      DOC: "12-12-12",
      Owner: "OwnerName",
      Songs: [
        { name: "MusicName", author: "AuthorName" },
        { name: "MusicName", author: "AuthorName" },
        { name: "MusicName", author: "AuthorName" },
        { name: "MusicName", author: "AuthorName" },
        { name: "MusicName", author: "AuthorName" },
        { name: "MusicName", author: "AuthorName" },
        { name: "MusicName", author: "AuthorName" },
        { name: "MusicName", author: "AuthorName" },
        { name: "MusicName", author: "AuthorName" },
        { name: "MusicName", author: "AuthorName" },
        { name: "MusicName", author: "AuthorName" },
        { name: "MusicName", author: "AuthorName" },
      ],
    };
  
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 h-full">
        <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
        <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl z-10 relative">
          <div className="flex flex-col gap-2 justify-center ">
            <span className="font-bold text-xl text-center">{data.Name}</span>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col gap-2 justify-start">
                <span className="text-sm">{data.Owner}</span>
                <span className="text-xs">{data.DOC}</span>
              </div>
              
            </div>
            <hr />
            <div className="grid grid-cols-1 gap-2 overflow-y-scroll no-scrollbar h-96">
              {Object.keys(data.Songs).map((k) => (
                <PlaylistSong key={k} details={data.Songs[k]} />
              ))}
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
  