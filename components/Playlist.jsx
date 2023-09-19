"use client";
import React from "react";
import Card from "./Card";

export default function Playlist() {
  return (
    
      <div className="w-full">
        <span className=" font-bold text-xl text-orange-100 relative lg:left-12">
          Playlist
        </span>
        <div className="grid grid-cols-2 justify-center sm:justify-evenly sm:grid-cols-4 p-4 w-full md:w-4/5 bg-slate-800 rounded-lg h-44 overflow-y-auto gap-y-12 mx-auto no-scrollbar">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          
        </div>  
      </div>
    
  );
}
