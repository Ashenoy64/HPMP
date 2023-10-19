import MusicPlayer from "@/components/MusicPlayer";
import Modal from "@/components/ModalViewer";
import NavBar from "@/components/NavBar";
import DisplayHandler from "@/components/DisplayHandler";







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


