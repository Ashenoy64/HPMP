"use client";
import UserPlaylist from "@/components/UserPlaylist";
import UserPodcast from "@/components/UserPodcast"

export default function Media() {
  return (
  <div className="w-full h-full flex flex-col justify-center items-center">
        <UserPlaylist/>
        <UserPodcast/>
  </div>
  );
}