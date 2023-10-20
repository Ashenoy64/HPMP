"use client";
import React from "react";
import Card from "./Card";

export default function RecentlyPlayed() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col p-4">
        <span className="font-bold text-lg">Recent</span>
      </div>
      <div className="grid grid-flow-col justify-start  w-full md:mx-8  gap-4  rounded-lg h-64 no-scrollbar overflow-x-auto">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
