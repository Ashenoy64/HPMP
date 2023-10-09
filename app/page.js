import Search from "@/components/Search"
import MusicPlayer from "@/components/MusicPlayer"
import Playlist from "@/components/Playlist"
import RecentlyPlayed from "@/components/RecentlyPlayed"
import Modal from "@/components/ModalViewer"
import AuthButton from "@/components/AuthButton"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"

export default async function Home() {
  const session=await getServerSession()
  
  if (session){
  return (
    <main>
      <Modal/>
      

      <div className="flex flex-row ">

      <Search/><AuthButton/>
      
      </div>
      
      
      
      <RecentlyPlayed/>
      <Playlist/>
      <MusicPlayer/>
    </main>
  )}
  
    return(

    <main>
      <AuthButton></AuthButton>
    </main>
      )
  
}
