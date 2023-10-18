import MusicPlayer from "@/components/MusicPlayer";
import Playlist from "@/components/Playlist";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import Modal from "@/components/ModalViewer";
import NavBar from "@/components/NavBar";

// import {auth} from "@/lib/firebase"

export default async function Home() {
  return (
    <main>
      <Modal />
      <div className="flex flex-col w-full justify-center gap-8 ">
        <div className="flex flex-row w-full">
          <NavBar />
        </div>
      </div>
      <RecentlyPlayed />
      <Playlist />
      <MusicPlayer />
    </main>
  );
}
