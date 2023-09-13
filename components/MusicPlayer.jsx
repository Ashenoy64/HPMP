"use client";

import React, { useEffect, useState } from "react";





class MusicController extends React.Component {
  constructor()
  {
    super()
    this.instance = new MusicPlayer()
  }
  render() {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-center gap-4">
          <button className="w-8 h-8">
            <img src="/backward.png" alt="" className="w-7 h-7" />
          </button>
          <button className="w-8 h-8" onClick={()=>{this.instance.playMusic()}}>
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

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audio_context = new AudioContext();

    this.gainNode = this.audio_context.createGain();
    this.gainNode.connect(this.audio_context.destination)
    this.gainNode.gain.value=0.8

    this.audio = new Audio('/song.mp3')
    this.playing=false

    
  }

  playMusic=(params)=> {
    if(this.playing)
    {
      this.audio.pause()
      this.playing =!this.playing
    }
    else
    {
      this.audio.play()
      this.playing =!this.playing
    }
    console.log(this.audio.currentTime)
    
  }

  changeVolume=(params)=>{
    var curr_volume = params.target.value;
    this.gainNode.gain.value = 0;
    
  }


  render() {
    return (
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-600 text-white w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-4">
            <div className="w-14 h-12 overflow-hidden">
              <img src="/music.jpg" alt="" className="w-14 h-12" />
            </div>
            <div className="flex flex-col">
              <div className=" font-semibold text-white text-lg">
                Music Name
              </div>
              <div className=" text-xs">Autor Name</div>
            </div>
          </div>
          <div className="w-2/4">{this.musicController.render()}</div>
          <div className="hidden sm:block">
              <input type="range" className="" min="0" max="1" step="0.1"  onChange={(e)=>this.changeVolume(e)} id="" />
          </div>
        </div>
      </div>
    );
  }
}
