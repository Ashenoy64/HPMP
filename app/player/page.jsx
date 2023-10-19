import MusicPlayer from "@/components/MusicPlayer";
import Playlist from "@/components/Playlist";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import Modal from "@/components/ModalViewer";
import NavBar from "@/components/NavBar";
import DisplayHandler from "@/components/DisplayHandler";

// import {auth} from "@/lib/firebase"





export default async function Home() {

  
  return (
    <main>
      <Modal />
      <MusicPlayer />
      
      <NavBar />
      <DisplayHandler/>
      
    </main>
  );
}


//  {
//   searchActive? <SearchResult/>: <div>
//   <RecentlyPlayed />
//   <Playlist />
//   </div>
// }