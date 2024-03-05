"use client";
import React, { useState, useEffect } from "react";
import { GetPlaylistInfo, GetSong } from "@/lib/utilites";
import { User } from "@/app/player/page";
import { SessionRetrive } from "@/lib/utilites";

function PlaylistSong({ id }) {
  const [imageSrc, setSrc] = useState();
  const { SongHandler } = User();

  const [data, setData] = useState();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const _data = await GetSong(id,SessionRetrive('accessToken'));
        setData(_data.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      if (data.image_url) setSrc(data.image_url);
      else setSrc("/music.jpg");
    }
  }, [data]);

  return (
    <div
      className="mx-auto flex flex-row justify-between rounded h-16 w-56  bg-neutral-800 p-2 cursor-pointer hover:shadow-[0_0_2px_1px_rgba(_255,_255,_255,_0.7)]"
      onClick={() => {
        data && SongHandler(data);
      }}
    >
      <div className="flex flex-row gap-4">
        <div className="object-contain">
          <img src={imageSrc} className="w-12 h-12" alt="" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm">{data && data.title}</span>
          <span className="text-xs">{data && data.artist_names[0]}</span>
        </div>
      </div>
    </div>
  );
}

export default function PlaylistDetails({ onClose, details }) {
  const [data, setData] = useState();
  const { SetPlaylist } = User();

  useEffect(() => {
    const FetchData = async () => {
      try {
        const _data = await GetPlaylistInfo(details.id,SessionRetrive('accessToken'));
        setData(_data.data);
      } catch (error) {
        console.log(error);
      }
    };
    FetchData();
  }, [details]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 h-full">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl z-10 relative">
        <div className="flex flex-col gap-2 justify-center w-56 ">
          <span className="font-bold text-xl text-center capitalize">
            {details.title}
          </span>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-10 items-center justify-between">
              <div className="text-xs w-32">{details.doc}</div>
              {data && data.songs.length > 0 && (
                <button
                  className="object-contain w-12 h-12"
                  onClick={() => SetPlaylist(data.songs)}
                >
                  <img src="/play.png" alt="" />
                </button>
              )}
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-3 overflow-y-scroll no-scrollbar h-96">
            {data &&
              data.songs.map((val, k) => {
                return <PlaylistSong id={val} key={k} />;
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
