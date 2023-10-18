"use client";

import React, { useEffect, useState } from "react";

class MusicController extends React.Component {
  constructor() {
    super();
    this.audioRef = React.createRef();
    this.progressRef = React.createRef();
    this.state = {
      isPlaying: false,
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

  handleMusicSource = (source) => {
    if (this.audioRef && source) {
      this.audioRef.current.src = source;
      this.setState({ isPlaying: true });
      this.audioRef.current.play();
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

      this.audioRef.current.play();
      this.setState({ isPlaying: true });
    }
  };

  render() {
    return (
      <div className="flex flex-col gap-2">
        <audio id="player" ref={this.audioRef}></audio>
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
  constructor() {
    if (instance != null) return instance;

    super();
    instance = this;
    this.musicController = React.createRef();

    this.playing = false;

    //this.musicController.changeMusic('/song.mp3')
  }

  playMusic = (params) => {
    if (this.playing) {
      this.musicController.pauseAudio();
      this.playing = !this.playing;
    } else {
      this.musicController.playAudio();
      this.playing = !this.playing;
    }
  };

  render() {
    return (
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-600 text-white w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <div className="w-14 h-12 overflow-hidden">
              <img src="/music.jpg" alt="" className="w-14 h-12" />
            </div>
            <div className="sm:flex flex-col hidden ">
              <div className=" font-semibold text-white text-lg">
                Music Name
              </div>
              <div className=" text-xs">Autor Name</div>
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
