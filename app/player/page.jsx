"use client";
import  { MusicPlayerV2 } from "@/components/MusicPlayer";
import Modal from "@/components/ModalViewer";
import NavBar from "@/components/NavBar";
import DisplayHandler from "@/components/DisplayHandler";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext, createContext } from "react";
import { GetLocal, SetRecentlyPlayed } from "@/lib/utilites";
import { GetSong,GetPodcast } from "@/lib/utilites";
import Loading from "@/components/Loading";

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
  const [fetchObject,setFetchObject] = useState({})

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
        const res = await SetRecentlyPlayed(userID,trackID);
      } catch (error) {
        console.log(error);
      }
    };

    const FetchSong = async (trackID) => {
      try {
        const _data = await GetSong(trackID);
        setAudioBlob(_data.audio_blob)
        await UpdateRecentlyPlayed(trackID, userID);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    const FetchPodcast = async (podcastID) => {
      try {
        const _data = await GetPodcast(podcastID);
        console.log(_data)
        setAudioBlob(_data.audio_blob);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };



    if (fetchObject && fetchObject.type == 'track') {
      FetchSong(fetchObject.id);
    }
    else if(fetchObject && fetchObject.type == 'podcast')
    {
      FetchPodcast(fetchObject.id)
    }
  }, [fetchObject]);

  
 

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
    setFetchObject({type:"track",id:id})
  };

  const PodcastHandler = (name, username, imageBlob, id) => {
    setLoading(true);
    setSongName(name);
    setArtist(username);
    setImageBlob(imageBlob);
    setTrackID(id);
    setFetchObject({type:"podcast",id:id})
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
      <UserContext.Provider value={{ GetUserDetails, SongHandler, Notify,PodcastHandler }}>
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
  } else {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Loading />
      </div>
    );
  }
}

export const User = () => {
  return useContext(UserContext);
};
