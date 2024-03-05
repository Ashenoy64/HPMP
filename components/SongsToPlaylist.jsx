"use client";
import React, { useState, useEffect } from "react";
import { GetAllPlaylist,SessionRetrive,AddTrackToPlaylist } from "@/lib/utilites";
import { User } from "@/app/player/page";

function PlaylistItems({ details,uid,song_details }) {

  const [imageSrc,setSrc] = useState()
  const {Notify} = User()
  
  // console.log(details)

  useEffect(()=>{
      if(details.image_url) setSrc(details.image_url);
      else setSrc('/music.jpg')
  },[details])

  const SetSong= async(uid,playID,song_details)=>{
    try{
      const token = SessionRetrive("accessToken");
        if (!token) throw Error("Invalid token");
      const res= await AddTrackToPlaylist(token,playID,song_details)
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
    <div className="mx-auto flex flex-row justify-between rounded h-16 w-44  bg-neutral-800 p-2 cursor-pointer hover:shadow-[0_0_2px_1px_rgba(_255,_255,_255,_0.7)] " onClick={()=>{SetSong(uid,details.id,song_details)}} >
      <div className="flex flex-row gap-4">
        <div className="object-contain">
          <img src={imageSrc} className="w-12 h-12" alt="" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm capitalize">{details.title}</span>
          <span className="text-xs">{details.doc}</span>
        </div>
      </div>
    </div>
  );
}

export function ViewerSong({ onClose, details, songID }) {
  const [data, setData] = useState();
  const { GetUserDetails } = User();
  const [uid, setUID] = useState();
  useEffect(() => {
    const FetchData = async () => {
      try {
        const token = SessionRetrive("accessToken");
        if (!token) throw Error("Invalid token");
        const _data = await GetAllPlaylist(token);
        setData(_data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const uid = GetUserDetails().userID;

    if (uid) {
      setUID(uid);
      FetchData();
    }
  }, [GetUserDetails]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 h-full">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl z-10 relative">
        <div className="flex flex-col gap-2 justify-center w-56 ">
          <div className="flex flex-col gap-2 overflow-y-scroll no-scrollbar h-96 p-2">
            {data &&
              data.map((val, k) => {
                return (
                  <PlaylistItems
                    details={val}
                    key={k}
                    uid={uid}
                    song_details={details}
                  />
                );
              })}
          </div>
          <button
            onClick={() => onClose()}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
