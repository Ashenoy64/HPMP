"use client";

import { useEffect, useState } from "react";

export default function MusicPlayer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-600 text-white w-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <div className="w-14 h-12 overflow-hidden">
            <img src="/music.jpg" alt="" className="w-14 h-12" />
          </div>
          <div className="flex flex-col">
            <div className=" font-semibold text-white text-lg">Music Name</div>
            <div className=" text-xs">Autor Name</div>
          </div>
        </div>
        <div className="w-2/4">{MusicController()}</div>
        <div>Meta Data</div>
      </div>
    </div>
  );
}

function MusicController() {
  const [paused, setPaused] = useState(true);
  const [path, setPath] = useState("/play.png");
  const [musicProgress, setMusicProgress] = useState(32);
  const [audio, setAudio] = useState(new Audio('/song.mp3'));
  

  const toggleSongs = () => {
    if (paused) {
      if (audio==null) 
        {
          let musicPath = "/song.mp3";
          setAudio(new Audio(musicPath));
          console.log(audio)
        }
        console.log(audio);
        audio.play();
      } 
      else 
      {
          console.log("her")
            if(audio != null) audio.pause();
      }
    
    
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center gap-4">
        <button className="w-8 h-8">
          <img src="/backward.png" alt="" className="w-7 h-7" />
        </button>
        <button
          className="w-8 h-8"
          onClick={() => {
            toggleSongs()
            if (paused) {
              setPaused(!paused);
              setPath("/pause.png");
            } else {
              setPaused(!paused);
              setPath("/play.png");
            }
          }}
        >
          <img src={path} alt="" className="w-8 h-8" />
        </button>
        <button className="w-8 h-8">
          <img src="/forward.png" alt="" className="w-7 h-7" />
        </button>
      </div>
      <div>
        <div>
          <progress
            className="h-2 bg-white w-full rounded-full"
            max={100}
            value={audio.currentTime}
          >
            <div
              className="h-full bg-white rounded-full absolute"
              style={{ width: `${musicProgress}` }}
            ></div>
          </progress>
        </div>
      </div>
    </div>
  );
}
