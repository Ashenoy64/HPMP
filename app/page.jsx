import Search from "@/components/Search"
import MusicPlayer from "@/components/MusicPlayer"
import Playlist from "@/components/Playlist"
import RecentlyPlayed from "@/components/RecentlyPlayed"
import Modal from "@/components/ModalViewer"
import AuthButton from "@/components/AuthButton"
import { getServerSession } from "next-auth"






export default async function Home() {
  await getServerSession()
  
  const session = true

  if (session) {
    return (
      <main>
        <Modal />
        <div className="flex flex-col w-full justify-center gap-8 ">
          <div className="flex flex-row w-full">
            <AuthButton/>
          </div>
          <div className="flex flex-row justify-center h-screen w-full">
            <Search/>
          </div>
        </div>
        <RecentlyPlayed />
        <Playlist />
        <MusicPlayer />
      </main>
    )
  }

  return (

    <main>
      <AuthButton></AuthButton>
    </main>
  )

}