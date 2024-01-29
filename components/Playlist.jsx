"use client";
import React, { useEffect, useState } from "react";
import { PlaylistCard,PlaylistCardFollowed } from "./Card";
import PlaylistDetails from "./PlaylistDetails";
import { GetAllPlaylist } from "@/lib/utilites";
import MakePlaylistModal from "./MakePlaylistModal";
import { User } from "@/app/player/page";



export default function Playlist() {
  const [isMakePlaylistOpen, setMakePlaylistModal] = useState(false);
  const [data, setData] = useState(null);
  const [followed, setFollowed] = useState(null);
  const [userPlaylist, setPlaylist] = useState(null);
  const [isModalOpen, setModal] = useState(false);
  const [modalData,setModalData] =useState()
  const [uid,setUID] = useState()

  const {GetUserDetails} = User();

  useEffect(() => {
    const Playlist = async () => {
      const uid = GetUserDetails().userID;
      try {
        const _data = await GetAllPlaylist(uid);

        // setFollowed(_data.followed)
        setPlaylist(_data.data)


      } catch (error) {
        console.log(error);
      }
    };
    const uid = GetUserDetails().userID;
    if (uid) 
    {
      setUID(uid)
      Playlist();
    }
  }, [GetUserDetails]);

  function handleModalOpen(k,type) {
    if(type=='playlist')
      setModalData(userPlaylist[k]);
    else
      setModalData(followed[k])
  
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
          uid={uid}
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
          onClose={handleModalClose}
          uid={uid}
          details={modalData}
        />
      )}
      <div className="grid grid-flow-col justify-start w-full md:mx-8 gap-4 rounded-lg h-64 no-scrollbar overflow-x-auto">
        {userPlaylist &&
          userPlaylist.map((val, ind) => {
            return (
              <PlaylistCard
                onClick={handleModalOpen}
                key={ind}
                primary={val.title}
                imageBlob={val.image_url}
                secondary={val.doc}
                songs={val.songs}
                k={ind}
                id={val.id}
                uid={val.user_id}
              />
            );
          })}
      </div>
    </div>
  );
}
