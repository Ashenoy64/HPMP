"use client";
import { MusicPlayerV2 } from "@/components/MusicPlayer";
import Modal from "@/components/ModalViewer";
import NavBar from "@/components/NavBar";
import DisplayHandler from "@/components/DisplayHandler";
import Loading from "@/components/Loading";

import { useRouter } from "next/navigation";
import { useEffect, useState, useContext, createContext } from "react";



import {
  GetSong,
  SessionRetrive,
  SetRecentlyPlayed,
  ValidateUser,
} from "@/lib/utilites";

const UserContext = createContext();

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [userID, setUserID] = useState("");
  const [token, setToken] = useState("");

  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
  const [trackID, setTrackID] = useState(null);
  const [url, setUrl] = useState(null);
  const [details, setDetails] = useState(null);

  const [notice, setNotice] = useState("");

  const [noticeActive, setNoticeActive] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [index, setIndex] = useState(-1);

  const Notify = (notice) => {
    setNotice(notice);
    setNoticeActive(true);

    setTimeout(() => {
      setNoticeActive(false);
    }, 3000);
  };

  useEffect(() => {
    const token = SessionRetrive("accessToken");
    if (!token) {
      return router.push("/login");
    }

    const AuthenticateUser = async () => {
      try {
        const response = await ValidateUser(token);
        // console.log(response)
        if (response.status == "ok") {
          Notify("Welcome " + SessionRetrive("username"));
          setUser(response.user_id);
          setToken(token)
          setUserID(SessionRetrive("userid"))

        } else {
          Notify("Something went wrong");
          router.push("/login");
        }
      } catch (error) {
        Notify("Something went wrong");
        router.push("/login");
      }
    };

    AuthenticateUser()
  }, []);

  useEffect(() => {
    const UpdateRecentlyPlayed = async (token, details) => {
      try {
        const res = await SetRecentlyPlayed(token, details);
      } catch (error) {
        console.log(error);
      }
    };

    if (userID && details) UpdateRecentlyPlayed(token, details);
  }, [trackID]);

  const GetUserDetails = () => {
    return {
      userID,
      user,
    };
  };

  const SongHandler = (details) => {
      setPlaylist(null)
      return UpdatePlayer(details)
  };


  const UpdatePlayer=(details)=>{

    setSongName(details.title);
    setArtist(details.artist_names[0]);
    setImageBlob(details.image_url);
    setTrackID(details.id);
    setUrl(details.song_url);
    setDetails(details);

  }

  const GetPlaylistSong=async(id)=>{
    try{
      const res = await GetSong(id);
      return UpdatePlayer(res.data)
    }
    catch(error){
      console.log(error)
      Notify("Something Happend While playing song")
    }
  }

  const SetPlaylist = (details) => {

    setPlaylist(details)
    setIndex(0)
    GetPlaylistSong(details[0])

  };

  const PlayNext = (audioRef) => {
      if(playlist)
      {
        setUrl("")
        GetPlaylistSong(playlist[(index+1)%playlist.length])
        setIndex(index+1);

      }
      else
     audioRef.currentTime += 5;
  };

  const PlayPrevious = (audioRef) => {
    if(playlist)
    {
      setUrl("")
      GetPlaylistSong(playlist[(index-1+playlist.length)%playlist.length])
      setIndex(index-1+playlist.length);
    }
    else
    audioRef.currentTime -= 5;
  };

  if (user) {
    return (
      <UserContext.Provider value={{ GetUserDetails, SongHandler, Notify, SetPlaylist}}>
        <div
          className={`absolute top-0 p-2 bg-neutral-900 border-2 text-white  left-0 rounded z-10 no-scrollbar ${
            noticeActive ? "block" : "hidden"
          } `}
        >
          {notice}
        </div>
        <main className="no-scrollbar">
          <Modal />
          <MusicPlayerV2
            name={songName}
            artist={artist}
            imageUrl={imageBlob}
            forward={PlayNext}
            backward={PlayPrevious}
            audioUrl={url}
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
