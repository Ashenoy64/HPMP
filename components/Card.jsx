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
          <ImageComponent blob={imageBlob} width={128} height={128} alt="" className=" w-32"  />
        </div>
        <div className="w-32 m-auto over">
          <p className="font-semibold">{primary}</p>
          <p className="text-xs">{secondary}</p>
        </div>
      </div>
    );
}
