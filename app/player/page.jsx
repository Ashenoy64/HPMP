"use client"
import MusicPlayer from "@/components/MusicPlayer";
import Modal from "@/components/ModalViewer";
import NavBar from "@/components/NavBar";
import DisplayHandler from "@/components/DisplayHandler";
import {auth} from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect,useState} from "react";

export default  function Home() {

  const router=useRouter()
    const [user,setUser]=useState("")
    
    
    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log(user)
          setUser(user)
          // ...
        } else {
          router.push("/")
        }
      });
      
    },[])
  
  
    
    
    if (user)
    {

      return (
        <main>
      <Modal />
      <MusicPlayer />
      
      <NavBar />
      <DisplayHandler/>
      
      </main>
        )
    }
      
      
    }

  



