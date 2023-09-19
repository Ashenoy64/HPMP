import Search from "@/components/Search"
import MusicPlayer from "@/components/MusicPlayer"
import Playlist from "@/components/Playlist"
import RecentlyPlayed from "@/components/RecentlyPlayed"
import Modal from "@/components/ModalViewer"


export default function Home() {
  return (
    <main>
      <Modal/>
      <Search/>
      <RecentlyPlayed/>
      <Playlist/>
      <MusicPlayer/>
    </main>
  )
}
