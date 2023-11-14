"use client";
import UserPlaylist from "@/components/UserPlaylist";
import UserPodcast from "@/components/UserPodcast"
import { useUser } from "../layout";

export default function Media() {
  const {GetUserDetails} =useUser()
  return (
  <div className="w-full h-full flex flex-col justify-center items-center">
        <UserPlaylist details={GetUserDetails} />
        <UserPodcast details={GetUserDetails} />
  </div>
  );
}