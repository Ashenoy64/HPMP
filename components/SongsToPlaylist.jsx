"use client";
import React from "react";

function Playlists({ details }) {
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
            <img src="/plus.png" className="w-4 h-4" alt="" />
          </button>
        </div>
      </div>
    );
  }



export default function SongPlaylist({ onClose }) {
    const data = [
        {
            name:"PlaylistName",
            Author:"Author",
        }
    ]

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl z-10 relative">
        <div className="flex flex-col justify-end gap-4">
          <div className="bg-slate-100 mx-auto flex flex-row  outline-10  w-1/2 h-8 rounded-lg overflow-hidden items-center">
            <input
              className="text-black bg-slate-100 w-full p-3 outline-0 "
              placeholder="Search"
            />
            <button type="submit" className="w-8">
              <img src="/search.png" alt="" className="bg-slate-100  w-8 p-2" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 overflow-y-scroll no-scrollbar h-96">
            {Object.keys(data).map((k) => (
              <Playlists key={k} details={data[k]} />
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
