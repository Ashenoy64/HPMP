"use client";
import React from "react";

export default function MakePlaylistModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl z-10 relative">
        <div className="flex flex-col justify-center gap-5">
          <h2 className="text-center">Make Your Playlist</h2>
          <div className="flex flex-row justify-center w-full">
            <input
              type="text"
              name=""
              id=""
              placeholder="Playlist Name"
              className="w-56 rounded-lg p-2 text-black"
            />
          </div>
          <button
            onClick={onClose}
            className="text-blue-500 hover:underline cursor-pointer rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
