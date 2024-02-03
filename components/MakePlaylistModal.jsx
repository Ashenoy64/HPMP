"use client";
import React, { useState } from "react";
import { AddPlaylist,SessionRetrive} from "@/lib/utilites";
import Loading from "./Loading";
import { User } from "@/app/player/page";

export default function MakePlaylistModal({ isOpen, onClose}) {
  const [name, setName] = useState();
  const [url, setUrl] = useState("/playlistCover.jpg");


  const [loading, setLoading] = useState(false);
  const {Notify} = User()

  const AddUserPlaylist = async (name) => {
    try {
      const token = SessionRetrive("accessToken")

      if(!token)
      throw Error("Invalid Token")

      const res = await AddPlaylist(token,name,url);
      if (res == "ok") {
        Notify("Made a new Playlist");
      } else {
        Notify("Failed");
      }
    } catch (error) {
      // console.log(error);
      Notify("Failed");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (name && name != "" && url && url!="") {
      await AddUserPlaylist(name);
    }
    else 
    Notify("All fields are required")

    setLoading(false)
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl z-10 relative">
        <div className="flex flex-col justify-center gap-5">
          <h2 className="text-center">Make Your Playlist</h2>
          <div className="flex flex-col gap-2 justify-center w-full">
            <input
              type="text"
              name=""
              id=""
              placeholder="Playlist Name"
              className="w-56 rounded-lg p-2 "
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input type="url" placeholder="Image URL" defaultValue={"/playlistCover.jpg"} className="p-2  rounded-lg w-56" onChange={(e)=>setUrl(e.target.value)} />
          </div>
          <div className="flex flex-row justify-between">
            <button
              onClick={() => {
                onClose();
              }}
              className="text-blue-500 hover:underline cursor-pointer rounded-md"
            >
              Close
            </button>
            {loading ? (
              <div className="flex justify-center w-full">
                <Loading />
              </div>
            ) : (
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="text-green-500 hover:underline cursor-pointer rounded-md"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

