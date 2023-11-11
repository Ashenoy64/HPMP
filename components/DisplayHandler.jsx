"use client";
import React, { useState } from "react";
import Playlist from "./Playlist";
import RecentlyPlayed from "./RecentlyPlayed";
import SongPlaylist from "./SongsToPlaylist";
import ImageComponent from "./Image";
let _intance = null;

function SearchComp({ primary,secondary, imgBlob }) {
  const [isModalOpen,setModalOpen] =  useState(false);
    
  function handleModalClose() {
      setModalOpen(false);
    }

    function handleModalOpen()
    {
      setModalOpen(true)
    }

    return (
      <div className="mx-auto flex flex-row justify-between rounded h-16 w-56  bg-neutral-800 p-2">
        {isModalOpen && <SongPlaylist onClose={handleModalClose}></SongPlaylist> }
        <div className="flex flex-row gap-4">
          <div className="object-contain">
            <ImageComponent blob={imgBlob} height={48} width={48} />
          </div>
          <div className="flex flex-col">
            <span className="text-md">{primary}</span>
            <span className="text-sm">{secondary}</span>
          </div>
        </div>
        <div className="flex flex-row items-center h-full gap-3">
          <button className="object-contain w-4 h-4" onClick={handleModalOpen}>
            <img src="/plus.png" className="w-4 h-4" alt="" />
          </button>
          <button className="object-contain w-4 h-4">
            <img src="/play.png" className="w-4 h-4" alt="" />
          </button>
        </div>
      </div>
    );
  }



function SearchResult({result,onSearchClose,user,id})
{
  
  return(
  <div className="flex flex-col justify-center gap-4">
    <div className="flex flex-row justify-between ">
       <div className="text-xl font-bold">
          Search Result
       </div>
       <button className="object-contain w-8 h-8" onClick={()=>onSearchClose()}>
          <img src="/x.png" alt=""  className="w-8 h-8"/>
       </button>
    </div>
  <div
        className={`grid grid-cols-0  grid-flow-row md:grid-cols-3 lg:grid-cols-4 mx-auto md:w-11/12  gap-2  overflow-y-auto no-scrollbar h-screen`}>
        {result.length > 0 &&
          Object.keys(result[0]).map((k) => {
            return <SearchComp key={k} name={result[0][k]["name"]} />;
          })}
      </div>
      </div>)
}

export default class DisplayHandler extends React.Component {
  constructor(props) {
    super(props);
    if (_intance != null) {
      return _intance;
    }
    this.state={
        active:false,
        result:[[]],
    }
    _intance = this;
  }

  handleSearch=(result,activity)=>
  { 
    this.setState({active:activity,result:result})
  }

  onSearchClose=()=>{
    this.setState({active:false})
  }


  render() {

    return (
      <div className="my-16 p-2">
        {this.state.active ? (<SearchResult result={this.state.result} onSearchClose={this.onSearchClose} user={this.user} id={this.id}/>
        ) : (
          <div>
            <RecentlyPlayed  uid={1} />
            <Playlist  uid={1} />
          </div>
        )}
      </div>
    );


  }
}
