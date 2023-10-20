import MusicPlayer from "@/components/MusicPlayer";
import Playlist from "@/components/Playlist";
import RecentlyPlayed from "@/components/RecentlyPlayed";
import Modal from "@/components/ModalViewer";
import NavBar from "@/components/NavBar";
import DisplayHandler from "@/components/DisplayHandler";

import {auth} from "@/lib/firebase"
import {onAuthStateChanged} from "firebase/auth"
import { useRouter } from "next/navigation";

export default async function Home() {

      const user=auth.currentUser
      if(user!==null){

        
        return (
          <main>
        <Modal />
        <MusicPlayer />
        
        <NavBar />
        <DisplayHandler/>
        
        </main>
          )
          
        }
      else{
        <main>
          <h1>Loading .....</h1>
        </main>
      }
    }

  



//  {
//   searchActive? <SearchResult/>: <div>
//   <RecentlyPlayed />
//   <Playlist />
//   </div>
// }