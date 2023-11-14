"use client";
import Loading from "./Loading";
import React, { useEffect, useState, useRef } from "react";
import { GetSong } from "@/lib/utilites";
import pako from 'pako';
class MusicController extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.progressRef = React.createRef();
    this.player = new MusicPlayer();
    this.state = {
      isPlaying: false,
      music: {},
      musicList: [],
      type: "",
      current: 0,
      musicBlob: [],
      src: null,
    };
  }

  componentDidMount = () => {
    this.audioRef.current.addEventListener("timeupdate", this.handleTimeUpdate);
  };

  componentWillUnmount = () => {
    this.audioRef.current.removeEventListener(
      "timeupdate",
      this.handleTimeUpdate
    );
  };

  GetSongData = async (id) => {
    try {
      console.log("Enetered");
      const _data = await GetSong(id);
      // this.setState({src:`data:audio/mp3;base64,${_data.audio_blob}`})
      const blob = new Blob([_data.value], { type: "audio/wav" });
      const url = URL.createObjectURL(blob);
      this.setState({ src: url });
    } catch (error) {
      console.log(error);
    }
  };

  HandlePlayer = (details, type) => {
    if (type == "track" || type == "podcast") {
      this.setState({ type, details });
      this.player.HandleData(details.name, details.artist, details.imageBlob);
      this.GetSongData(details.id);
    } else {
      this.setState({ musicList: details, type, current: 0 });
    }
  };

  handleTimeUpdate = () => {
    if (this.audioRef.current) {
      const currentTime = this.audioRef.current.currentTime;
      const duration = this.audioRef.current.duration;

      const progress = (currentTime / duration) * 100;

      this.progressRef.current.style.width = `${progress}%`;
    }
  };

  handleSeekTo = (time) => {
    if (this.audioRef.current) {
      this.audioRef.current.currentTime += time;
    }
  };

  handleVolume = (e) => {
    if (this.audioRef) {
      this.audioRef.current.volume = e.target.value;
    }
  };

  convertBlobToSrc = (blob) => {
    try {
      return URL.createObjectURL(blob);
    } catch (error) {
      console.log(error);
      return blob;
    }
  };

  handleMusicSource = (source) => {
    if (this.audioRef && source) {
      this.audioRef.current.src = source;
      this.audioRef.current.play();
      this.setState({ isPlaying: true });
    }
  };

  pauseAudio = () => {
    if (this.audioRef.current) {
      this.audioRef.current.pause();

      this.setState({ isPlaying: false });
    }
  };

  playAudio = () => {
    if (this.audioRef.current) {
      if (!this.audioRef.current.src) {
        this.audioRef.current.src = "/song.mp3";
      }
      console.log(this.audioRef.current.src);
      this.audioRef.current.play();
      this.setState({ isPlaying: true });
    }
  };

  render() {
    return (
      <div className="flex flex-col gap-2">
        <audio id="player" ref={this.audioRef} src={this.state.src}></audio>
        <div className="flex flex-row justify-center gap-4">
          <button className="w-8 h-8" onClick={() => this.handleSeekTo(0)}>
            <img src="/backward.png" alt="" className="w-7 h-7" />
          </button>
          {this.state.isPlaying ? (
            <button className="w-8 h-8" onClick={() => this.pauseAudio()}>
              <img src="/pause.png" alt="" className="w-8 h-8" />
            </button>
          ) : (
            <button className="w-8 h-8" onClick={() => this.playAudio()}>
              <img src="/play.png" alt="" className="w-8 h-8" />
            </button>
          )}
          <button className="w-8 h-8" onClick={() => this.handleSeekTo(10)}>
            <img src="/forward.png" alt="" className="w-7 h-7" />
          </button>
        </div>
        <div>
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <div
              className="h-full bg-green-400 rounded-full"
              style={{ width: "0%" }}
              ref={this.progressRef}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

let instance = null;

export default class MusicPlayer extends React.Component {
  constructor(props) {
    if (instance != null) return instance;

    super(props);
    instance = this;
    this.musicController = React.createRef();
    this.state = {
      name: "None",
      artist: "None",
      blob: null,
    };
    this.playing = false;
  }

  PlayMusic = (details, type) => {
    this.musicController.current.HandlePlayer(details, type);
  };

  HandleData = (name, artist, blob) => {
    this.setState({
      name,
      artist,
      blob,
    });
    console.log(blob);
  };

  render() {
    return (
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-600 text-white w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <div className="w-14 h-12 overflow-hidden">
              <img className="w-14 h-12" />
              <img
                src={`data:image/jpeg;base64,${this.state.blob}`}
                className=" w-14 h-14"
              />
            </div>
            <div className="sm:flex flex-col hidden ">
              <div className=" font-semibold text-white text-lg">
                {this.state.name}
              </div>
              <div className=" text-xs">{this.state.artist}</div>
            </div>
          </div>
          <div className="w-2/4">
            <MusicController ref={this.musicController} />
          </div>
          <div className="flex flex-row gap-5 my-auto">
            <div className="w-6 h-6 my-auto">
              <img src="/info.png" alt="" className="w-6 h-6 my-auto" />
            </div>
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
                onChange={(e) => {
                  this.musicController.current.handleVolume(e);
                }}
                id=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export function MusicPlayerV2({
  name,
  artist,
  audioBlob,
  imageBlob,
  forward,
  loading,
}) {
  const [volume, setVolume] = useState(0.5);
  const [imageSrc, setImageSrc] = useState();
  const [audioSrc, setAudioSrc] = useState();
  const [progress, setProgress] = useState(0);

  const [play, setPlay] = useState(false);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    if (imageBlob) setImageSrc(`data:image/jpeg;base64,${imageBlob}`);
    else setImageSrc("/music.jpg");
  }, [imageBlob]);
  
  useEffect(() => {
    
      const check = play
      if(check)
      {
        setPlay(false)
        setProgress(0)
      }
      if(audioBlob)
      { 
        setAudioSrc(`data:audio/wav;base64,${(audioBlob)}`)
      }
      else{
        setAudioSrc(`/song.mp3`)
      }

      if(check)
      {
        setPlay(true)
        playAudio()
      }

  }, [audioBlob]);

  useEffect(() => {
    const updateProgress = () => {
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
  }, [audioRef, audioBlob, progressRef]);

  const handleSeekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
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
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-600 text-white w-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <div className="w-14 h-12 overflow-hidden object-contain">
            <img src={imageSrc} alt="" className="w-14 h-12" />
          </div>
          <div className="sm:flex flex-col hidden ">
            <div className="font-semibold text-white text-lg">{name}</div>
            <div className="text-xs">{artist}</div>
          </div>
        </div>
        <div className="w-2/4">
          <div className="flex flex-col gap-2">
            <audio id="player" ref={audioRef} src={audioSrc}></audio>
            <div className="flex flex-row justify-center gap-4">
              <button className="w-8 h-8" onClick={() => handleSeekTo(0)}>
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
              <button className="w-8 h-8" onClick={() => forward()}>
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
        <div className="flex flex-row gap-5 my-auto">
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
