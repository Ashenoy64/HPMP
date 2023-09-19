"use client";

import React, { useEffect, useState } from "react";





class MusicController extends React.Component {
  constructor()
  {
    super()
    this.instance = new MusicPlayer()
    this.audioRef = React.createRef()
  }

  volumeHandler = (params)=>{
    if(this.audioRef.current)
    this.audioRef.current.volume = params.target.value
  }


  changeMusic = (source) => {
    if (this.audioRef.current) {
      this.audioRef.current.src = source;
    }
  }

  pauseAudio = ()=>{
    if(this.audioRef.current)
    this.audioRef.current.pause()
  }

  playAudio = ()=>{
  
    this.audioRef.current.play()


    // if(this.audioRef.current)
    // this.audioRef.current.play()
  }


  render() {
    return (
      <div className="flex flex-col gap-2">
        <audio id="player" ref={this.audioRef}>

        </audio>
        <div className="flex flex-row justify-center gap-4">
          <button className="w-8 h-8">
            <img src="/backward.png" alt="" className="w-7 h-7" />
          </button>
          <button className="w-8 h-8" onClick={()=>{this.playAudio()}}>
            <img src="/play.png" alt="" className="w-8 h-8" />
          </button>
          <button className="w-8 h-8">
            <img src="/forward.png" alt="" className="w-7 h-7" />
          </button>
        </div>
        <div>
          <div className="w-full h-2 bg-gray-300 rounded-full">
            <div
              className="h-full bg-green-400 rounded-full"
              style={{ width: `2%` }}
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
    this.musicController = new MusicController();

    // window.AudioContext = window.AudioContext || window.webkitAudioContext;
    // this.audio_context = new AudioContext();

    // this.gainNode = this.audio_context.createGain();
    // this.gainNode.connect(this.audio_context.destination)
    // this.gainNode.gain.value=0.8

    this.playing=false

    this.musicController.changeMusic('/song.mp3')
  }

  playMusic=(params)=> {
    if(this.playing)
    {
      this.musicController.pauseAudio()
      this.playing =!this.playing
    }
    else
    {
      this.musicController.playAudio()
      this.playing =!this.playing
    }
    
  }

  


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
          <div className="w-2/4">{this.musicController.render()}</div>
          <div className="flex flex-row gap-5 my-auto">
            <div className="w-6 h-6 my-auto">
                <img src="/info.png" alt="" className="w-6 h-6 my-auto" />
            </div>
          <div className="flex flex-row my-auto" >
              <div className="w-6 h-6">
                <img src="/volume.png" className="w-6 h-6" alt="" />
              </div>
              <input type="range" className="hidden sm:block" min="0" max="1" step="0.1"  onChange={(e)=>this.musicController.volumeHandler(e)} id="" />
          </div>
          </div>
        </div>
      </div>
    );
  }
}
