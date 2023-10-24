'use client'
import MusicPlayer from "@/components/MusicPlayer";
import Modal from "@/components/ModalViewer";
import NavBar from "@/components/NavBar";
import DisplayHandler from "@/components/DisplayHandler";
import { UserAuth } from "@/lib/AuthContext";
import { redirect } from 'next/navigation'





export default async function Home() {

  const {user} = UserAuth()

  if(user==null)
  {
    // redirect('/')
    
  }
  console.log(user)
  return (
    <main>
      <Modal />
      <MusicPlayer />
      <NavBar />
      <DisplayHandler/>
    </main>
  );
}


