import Search from "@/components/Search"
import MusicPlayer from "@/components/MusicPlayer"
import Card from "@/components/Card"


export default function Home() {
  return (
    <main>
      <Search/>
      <div className="grid grid-cols-4 gap-2">
          <Card/>
          <Card/>
      </div>
      <MusicPlayer/>
    </main>
  )
}
