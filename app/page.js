import Search from "@/components/Search"
import MusicPlayer from "@/components/MusicPlayer"
import Playlist from "@/components/Playlist"
import RecentlyPlayed from "@/components/RecentlyPlayed"

export default function Home() {
  return (
    <main>
      <Search/>
      <RecentlyPlayed/>
      <Playlist/>
      <MusicPlayer/>
    </main>
  )
}
