"use client";
import React from "react";
import Card from "./Card";

export default function RecentlyPlayed() {
  return (
    
      <div className="w-full">
        <span className=" font-bold text-xl text-orange-600 relative lg:left-12">
          Recently Played
        </span>
        <div className="grid grid-cols-2 justify-center sm:justify-between sm:grid-cols-4 p-4 w-full md:w-4/5 bg-slate-800 rounded-lg h-44 overflow-y-auto gap-y-12 mx-auto no-scrollbar">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          
        </div>  
      </div>
    
  );
}
