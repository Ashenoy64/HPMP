"use client";
import React from "react";

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
      <div className="flex flex-row items-center h-full ">
        <button className="object-contain w-4 h-4">
          <img src="/play.png" className="w-4 h-4" alt="" />
        </button>
      </div>
    </div>
  );
}

export default function PlaylistDetails({ isOpen, onClose, data, children }) {
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
            <div className="flex flex-col">
              <div className="object-contain w-4 h-4">
                <img src="/play.png" className="w-4 h-4" alt="" />
              </div>
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
