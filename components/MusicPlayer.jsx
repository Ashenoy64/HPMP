"use client";

import React,{ useEffect, useState } from "react";


class MusicController extends React.Component{
  render()
  {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-center gap-4">
          <button className="w-8 h-8">
            <img src="/backward.png" alt="" className="w-7 h-7" />
          </button>
          <button className="w-8 h-8">
            <img src='/play.png' alt="" className="w-8 h-8" />
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
              value={45}
            ></progress>
          </div>
        </div>
      </div>
    )
  }
}


let instance = null

export default  class MusicPlayer extends React.Component{
  constructor()
  {
    if(instance!=null)
      return instance
    super()

    instance = this
    
    
  }

  render()
  {
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
          <div className="w-2/4">{MusicController}</div>
          <div>Meta Data</div>
        </div>
      </div>
    );
  }
}