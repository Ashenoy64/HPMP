"use client";
import MusicPlayer from "@/components/MusicPlayer";
import Modal from "@/components/ModalViewer";
import NavBar from "@/components/NavBar";
import DisplayHandler from "@/components/DisplayHandler";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetLocal } from "@/lib/utilites";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userID,setUserID] = useState(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const id = GetLocal(user.email)
        setUserID(id)
        setUser(user);
      } else {
        router.push("/");
      }
    });
  }, []);




  if (user) {
    return (
      <main>
        <Modal user={user} uid={userID} />
        <MusicPlayer user={user} uid={userID}  />
        <NavBar user={user} uid={userID}/>
        <DisplayHandler user={user} uid={userID} />
      </main>
    );
  }
}
