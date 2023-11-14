"use client";
import React from "react";
import ImageComponent from "./Image";

export default function Card({imageBlob,primary,secondary,onClick,uid,type,id}){
  
  return (
      <div
        className="flex flex-col  bg-neutral-800  rounded-lg w-40 h-56 transition-shadow hover:shadow-white hover:shadow-sm "
        onClick={()=>{onClick(uid,type)}}
      >
        <div className="w-32 h-32 object-contain m-auto">
          {type =="url" ? <img src={imageBlob} className=" w-32 h-32"/> : <ImageComponent blob={imageBlob} width={128} height={128} alt="" className=" w-32"  />}
          
        </div>
        <div className="w-32 m-auto over">
          <p className="font-semibold">{primary}</p>
          <p className="text-xs">{secondary}</p>
        </div>
      </div>
    );
}



export function RecentlyPlayedCard({imageBlob,primary,secondary,onClick,uid,type,id,player}){
  
  return (
      <div
        className="flex flex-col  bg-neutral-800  rounded-lg w-40 h-56 transition-shadow hover:shadow-white hover:shadow-sm "
        onClick={()=>{player(primary,secondary,imageBlob,id)}}
      >
        <div className="w-32 h-32 object-contain m-auto">
          {type =="url" ? <img src={imageBlob} className=" w-32 h-32"/> : <ImageComponent blob={imageBlob} width={128} height={128} alt="" className=" w-32"  />}
          
        </div>
        <div className="w-32 m-auto over">
          <p className="font-semibold">{primary}</p>
          <p className="text-xs">{secondary}</p>
        </div>
      </div>
    );
}


export function PlaylistCard({imageBlob,primary,secondary,onClick,uid,id,k,owner,deleteHandler}){
  
  return (
      <div
        className="flex flex-col  bg-neutral-800  rounded-lg w-40 h-56 transition-shadow hover:shadow-white hover:shadow-sm "
        onClick={()=>{onClick(k)}}
      >
        <div className="w-32 h-32 object-contain m-auto">
           <img src={imageBlob ? imageBlob : "/music.jpg"} className=" w-32 h-32"/>
        </div>
        <div className="w-32 m-auto over">
          <p className="font-semibold capitalize">{primary}</p>
          <p className="text-xs">{secondary}</p>
        </div>
        {
          owner && <button className="p-2 rounded w-3/4 mx-auto my-2  bg-red-400 text-center" onClick={(e)=>{e.stopPropagation();deleteHandler(k)}}>Delete</button>
        }
      </div>
    );
}



export function PodcastCard({imageBlob,primary,secondary,onClick,uid,type,id,deleteHandler}){
  
  return (
      <div
        className="flex flex-col  bg-neutral-800  rounded-lg w-40 h-56 transition-shadow hover:shadow-white hover:shadow-sm "
        onClick={()=>{onClick(uid,type)}}
      >
        <div className="w-32 h-32 object-contain m-auto">
          {imageBlob ? <img src={imageBlob} className=" w-32 h-32"/> : <img src="/music.jpg" className=" w-32 h-32"/> }
          
        </div>
        <div className="w-32 m-auto over">
          <p className="font-semibold">{primary}</p>
          <p className="text-xs">{secondary}</p>
        </div>
       <button className="p-2 rounded w-3/4 mx-auto my-2  bg-red-400 text-center" onClick={(e)=>{e.stopPropagation();deleteHandler(k)}}>Delete</button>
      </div>
    );
}