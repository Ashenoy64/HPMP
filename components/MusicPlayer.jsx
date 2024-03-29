"use client";
import Loading from "./Loading";
import React, { useEffect, useState, useRef } from "react";

export function MusicPlayerV2({
  name,
  artist,
  audioUrl,
  imageUrl,
  forward,
  backward,
}) {
  const [volume, setVolume] = useState(0.5);
  const [imageSrc, setImageSrc] = useState();
  const [audioSrc, setAudioSrc] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [play, setPlay] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (imageUrl) setImageSrc(imageUrl);
    else setImageSrc("/music.jpg");
  }, [imageUrl]);

  useEffect(() => {
    pauseAudio();
    setProgress(0);
    if (audioUrl) {
      setLoading(true);
      setAudioSrc(audioUrl);
    }
    playAudio();
  }, [audioUrl]);

  useEffect(() => {
    if (audioSrc && name) playAudio();
  }, [audioSrc]);

  const handleSeekForward = () => {
    if (audioRef.current) {
      forward(audioRef.current);
    }
  };

  const handleSeekBackward = () => {
    if (audioRef.current) {
      backward(audioRef.current);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      if (!loading && audioRef.current.currentTime>0) {
        setLoading(false);
      }
      if (audioRef.current && progressRef.current) {
        const percentage =
          (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(percentage);
        progressRef.current.style.width = `${percentage}%`;
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [audioRef, audioUrl, progressRef]);

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      setPlay(true);
      audioRef.current.play();
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      setPlay(false);
      audioRef.current.pause();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-600 text-white w-full no-scrollbar">
      <div className="grid grid-cols-3 w-full justify-between">
        <div className="flex flex-row gap-4">
          <div className="w-14 h-12 overflow-hidden object-contain">
            <img src={imageSrc} alt="" className="w-14 h-12" />
          </div>
          <div className="sm:flex flex-col hidden w-full  overflow-hidden ">
            <div className="font-semibold text-white w-full line-clamp-1 text-lg">
              {name}
            </div>
            <div className="text-xs">{artist}</div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-2 justify-center">
            <audio id="player" ref={audioRef} src={audioSrc}></audio>
            <div className="flex flex-row justify-center gap-4">
              <button className="w-8 h-8" onClick={() => handleSeekBackward()}>
                <img src="/backward.png" alt="" className="w-7 h-7" />
              </button>
              {loading ? (
                <Loading />
              ) : play ? (
                <button className="w-8 h-8" onClick={pauseAudio}>
                  <img src="/pause.png" alt="" className="w-8 h-8" />
                </button>
              ) : (
                <button className="w-8 h-8" onClick={playAudio}>
                  <img src="/play.png" alt="" className="w-8 h-8" />
                </button>
              )}
              <button className="w-8 h-8" onClick={() => handleSeekForward()}>
                <img src="/forward.png" alt="" className="w-7 h-7" />
              </button>
            </div>
            <div>
              <div className="w-full h-2 bg-gray-300 rounded-full">
                <div
                  className="h-full bg-green-400 rounded-full"
                  style={{ width: `${progress}` }}
                  ref={progressRef}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-5 my-auto justify-end px-4">
          <div className="flex flex-row my-auto">
            <div className="w-6 h-6">
              <img src="/volume.png" className="w-6 h-6" alt="" />
            </div>
            <input
              type="range"
              className="hidden sm:block"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => {
                setVolume(e.target.value);
                if (audioRef.current) {
                  audioRef.current.volume = e.target.value;
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
