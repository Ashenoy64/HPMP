"use client";
import React, { useState, useEffect } from "react";
import { GetAllPlaylist } from "@/lib/utilites";
import { User } from "@/app/player/page";

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
