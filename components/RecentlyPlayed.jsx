"use client";
import React, { useEffect, useState } from "react";
import { RecentlyPlayedCard } from "./Card";
import { GetRecentlyPlayed, SessionRetrive } from "@/lib/utilites";
import { User } from "@/app/player/page";


export default function RecentlyPlayed() {
  const [data, setData] = useState(null);
  const { GetUserDetails, SongHandler } = User();


  useEffect(() => {
    const Recent = async () => {
      try {
        const token = SessionRetrive("accessToken");
        if (!token) throw Error("Invalid token");
        const arr = await GetRecentlyPlayed(token);

        arr.reverse();
        setData(arr);
      } catch (error) {
        console.log(error);
      }
    };
    const uid = GetUserDetails().userID;
    if (uid) Recent();
  }, [GetUserDetails]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col p-4">
        <span className="font-bold text-lg">Recent</span>
      </div>
      <div className="grid grid-flow-col justify-start  w-full md:mx-8  gap-4  rounded-lg h-64 no-scrollbar overflow-x-scroll object-contain">
        {data &&
          data.map((val, ind) => {
            return (
              <RecentlyPlayedCard
                key={ind}
                primary={val.title}
                secondary={val.artist_names[0]}
                imageUrl={val.image_url}
                details={val}
                player={SongHandler}
              />
            );
          })}
      </div>
    </div>
  );
}
