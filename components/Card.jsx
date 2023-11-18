"use client";
import React, { useEffect, useState } from "react";
import ImageComponent from "./Image";
import { User } from "@/app/player/page";
import { UnfollowPlaylist } from "@/lib/utilites";

export default function Card({
  imageBlob,
  primary,
  secondary,
  onClick,
  uid,
  type,
  id,
}) {
  return (
    <div
      className="flex flex-col  bg-neutral-800  rounded-lg w-40 h-56 transition-shadow hover:shadow-white hover:shadow-sm "
      onClick={() => {
        onClick(uid, type);
      }}
    >
      <div className="w-32 h-32 object-contain m-auto">
        {type == "url" ? (
          <img src={imageBlob} className=" w-32 h-32" />
        ) : (
          <ImageComponent
            blob={imageBlob}
            width={128}
            height={128}
            alt=""
            className=" w-32"
          />
        )}
      </div>
      <div className="w-32 m-auto over">
        <p className="font-semibold">{primary}</p>
        <p className="text-xs">{secondary}</p>
      </div>
    </div>
  );
}

export function RecentlyPlayedCard({
  imageBlob,
  primary,
  secondary,
  onClick,
  uid,
  type,
  id,
  player,
}) {
  return (
    <div
      className="flex flex-col  bg-neutral-800  rounded-lg w-40 h-56 transition-shadow hover:shadow-white hover:shadow-sm "
      onClick={() => {
        player(primary, secondary, imageBlob, id);
      }}
    >
      <div className="w-32 h-32 object-contain m-auto">
        {type == "url" ? (
          <img src={imageBlob} className=" w-32 h-32" />
        ) : (
          <ImageComponent
            blob={imageBlob}
            width={128}
            height={128}
            alt=""
            className=" w-32"
          />
        )}
      </div>
      <div className="w-32 m-auto over">
        <p className="font-semibold truncate">{primary}</p>
        <p className="text-xs">{secondary}</p>
      </div>
    </div>
  );
}

export function PlaylistCardFollowed({
  imageBlob,
  primary,
  secondary,
  onClick,
  k,
  uid,
  id,
}) {
  const [src, setSrc] = useState();
  const { Notify } = User();
  const Unfollow = async (uid, playlist_id) => {
    try {
      const res = await UnfollowPlaylist(uid, playlist_id);
      if (res == "ok") {
        Notify("Unfollowed the Playlist");
      } else {
        Notify("Unable to unfollow");
      }
    } catch (error) {
      Notify("Unable to unfollow");
      console.log(error);
    }
  };

  useEffect(() => {
    if (imageBlob) {
      setSrc(`data:image/jpeg;base64,${imageBlob}`);
    } else {
      setSrc("/playlistCover.jpg");
    }
  }, [imageBlob]);
  return (
    <div
      className="flex flex-col  bg-neutral-800  rounded-lg w-40 h-56 transition-shadow hover:shadow-white hover:shadow-sm "
      onClick={() => {
        onClick(k, "followed");
      }}
    >
      <div className="w-32 h-32 object-contain m-auto">
        <img src={src} className=" w-32 h-32" />
      </div>
      <div className="flex flex-row justify-between w-32 m-auto over">
        <div>
          <p className="font-semibold capitalize">{primary}</p>
          <p className="text-xs">{secondary}</p>
        </div>
        <button
          className="p-2 rounded object-contain w-8 h-8  text-center"
          onClick={(e) => {
            e.stopPropagation();
            Unfollow(uid, id);
          }}
        >
          <img src="/minus.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export function PlaylistCard({
  imageBlob,
  primary,
  secondary,
  onClick,
  k,
  owner,
  deleteHandler,
}) {
  const [src, setSrc] = useState();
  useEffect(() => {
    if (imageBlob) {
      setSrc(`data:image/jpeg;base64,${imageBlob}`);
    } else {
      setSrc("/playlistCover.jpg");
    }
  }, [imageBlob]);
  return (
    <div
      className="flex flex-col  bg-neutral-800  rounded-lg w-40 h-56 transition-shadow hover:shadow-white hover:shadow-sm "
      onClick={() => {
        onClick(k, "playlist");
      }}
    >
      <div className="w-32 h-32 object-contain m-auto">
        <img src={src} className=" w-32 h-32" />
      </div>
      <div className="w-32 m-auto max-w-xs overflow-hidden">
        <p className="font-semibold capitalize">{primary}</p>
        <p className="text-xs">{secondary}</p>
      </div>
      {owner && (
        <button
          className="p-2 rounded w-3/4 mx-auto my-2  bg-red-400 text-center"
          onClick={(e) => {
            e.stopPropagation();
            deleteHandler(k);
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
}

export function PodcastCard({
  imageBlob,
  primary,
  secondary,
  onClick,
  k,
  deleteHandler,
}) {
  
  const [src, setSrc] = useState();
  useEffect(() => {
    if (imageBlob) {
      setSrc(`data:image/jpeg;base64,${imageBlob}`);
    } else {
      setSrc("/playlistCover.jpg");
    }
  }, [imageBlob]);

  useEffect;
  return (
    <div
      className="flex flex-col  bg-neutral-800  rounded-lg w-40 h-56 transition-shadow hover:shadow-white hover:shadow-sm "
      onClick={() => {
        onClick(uid, type);
      }}
    >
      <div className="w-32 h-32 object-contain m-auto">
        <img src={src} className=" w-32 h-32" />
      </div>
      <div className="w-32 m-auto max-w-xs overflow-hidden">
        <span className="font-semibold truncate">{primary}</span>
        <p className="text-xs">{secondary}</p>
      </div>
      <button
        className="p-2 rounded w-3/4 mx-auto my-2  bg-red-400 text-center"
        onClick={(e) => {
          e.stopPropagation();
          deleteHandler(k);
        }}
      >
        Delete
      </button>
    </div>
  );
}
