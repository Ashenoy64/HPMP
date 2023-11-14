"use client";
import MusicPlayer, { MusicPlayerV2 } from "@/components/MusicPlayer";
import Modal from "@/components/ModalViewer";
import NavBar from "@/components/NavBar";
import DisplayHandler from "@/components/DisplayHandler";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext, createContext } from "react";
import { GetLocal, SetRecentlyPlayed } from "@/lib/utilites";
import { GetSong } from "@/lib/utilites";

const UserContext = createContext();

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [trackID, setTrackID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeActive, setNoticeActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const id = GetLocal(user.email);
        setUserID(id);
        setUser(user);
      } else {
        router.push("/");
      }
    });
  }, []);

  useEffect(() => {
    const UpdateRecentlyPlayed = async (trackID, userID) => {
      try {
        const res = await SetRecentlyPlayed(trackID, userID);
        console.log("This");
      } catch (error) {
        console.log(error);
      }
    };

    const FetchSong = async (trackID) => {
      try {
        const _data = await GetSong(trackID);
        // this.setState({src:`data:audio/mp3;base64,${_data.audio_blob}`})
        // const blob = new Blob([_data.value],{type:"audio/mp3"})
        // const url = URL.createObjectURL(blob)
        // await setAudioBlob(`data:audio/mp3;base64,${_data.audio_blob}`)
        setAudioBlob(_data.audio_url);
        await UpdateRecentlyPlayed(trackID, userID);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    if (trackID) {
      FetchSong(trackID);
    }
  }, [trackID]);

  const GetUserDetails = () => {
    return {
      userID,
      user,
    };
  };

  const SongHandler = (name, artist, imageBlob, id) => {
    setLoading(true);
    setSongName(name);
    setArtist(artist);
    setImageBlob(imageBlob);
    setTrackID(id);
  };

  const Notify = (notice) => {
    setNotice(notice);
    setNoticeActive(true);

    setTimeout(() => {
      setNoticeActive(false);
    }, 3000);
  };

  if (user) {
    return (
      <UserContext.Provider value={{ GetUserDetails, SongHandler, Notify }}>
        <div
          className={`absolute top-0 p-2 bg-neutral-900 border-2 text-white  left-0 rounded z-10  ${
            noticeActive ? "block" : "hidden"
          } `}
        >
          {notice}
        </div>
        <main>
          <Modal />
          <MusicPlayerV2
            name={songName}
            artist={artist}
            imageBlob={imageBlob}
            forward={null}
            audioBlob={audioBlob}
            loading={loading}
          />
          <NavBar />
          <DisplayHandler />
        </main>
      </UserContext.Provider>
    );
  }
}

export const User = () => {
  return useContext(UserContext);
};
