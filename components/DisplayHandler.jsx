"use client";
import React, { useState } from "react";
import Playlist from "./Playlist";
import RecentlyPlayed from "./RecentlyPlayed";
import {ViewerPlaylist,ViewerSong,ViewerAlbum} from "./SongsToPlaylist";
import ImageComponent from "./Image";
import { SearchRequest } from "@/lib/utilites";
import { User } from "@/app/player/page";
let _intance = null;

function extractTestValue(inputString) {
  const match = inputString.match(/'([^']*)'/);

  // Check if a match is found
  if (match) {
      return match[1];
  } else {
      return inputString;
  }
}  

function SearchComp({ details,type }) {
  const [isModalOpen,setModalOpen] =  useState(false);
  const {SongHandler} =  User()
  function handleModalClose() {
      setModalOpen(false);
    }

    function handleModalOpen()
    {
      setModalOpen(true)
    }

    return (
      <div className="mx-auto flex flex-row justify-between rounded h-16 w-56  bg-neutral-800 p-2">
        { isModalOpen && (type=='playlist') ? <ViewerPlaylist details={details} type={type} onClose={handleModalClose}/> : "" }
        { isModalOpen && (type=='album') ? <ViewerAlbum details={details} type={type} onClose={handleModalClose}/> : "" }
        { isModalOpen && (type=='track') ? <ViewerSong details={details} type={type} songID={details.track_id} onClose={handleModalClose}/> : "" }
        <div className="flex flex-row gap-4">
          <div className="object-contain">
            <ImageComponent blob={details.image_blob} height={48} width={48} />
          </div>
          <div className="flex flex-col">
            <span className="text-md">{details.name}</span>
            <span className="text-sm">{extractTestValue(details.artist_name)}</span>
          </div>
        </div>
        <div className="flex flex-row items-center h-full gap-3">
          {(type=='track' || type == "playlist")&&
          <button className="object-contain w-4 h-4" onClick={handleModalOpen}>
            <img src="/plus.png" className="w-4 h-4" alt="" />
          </button>}
          {(type=='track' || type=='podcast') && <button className="object-contain w-4 h-4" onClick={()=>SongHandler(details.name,details.artist_name,details.image_blob,details.track_id)}>
            <img src="/play.png" className="w-4 h-4" alt="" />
          </button>}
        </div>
      </div>
    );
  }



function SearchResult({result,onSearchClose,type})
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
          result.map((val,k) => {
            return <SearchComp key={k} details={val} type={type} />;
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
        result:[],
        query:"",
        type:"",
        displayContent:[]
    }
    _intance = this;
  }

  Search=(query,type)=>{
    if(this.state.type!=type)
    {
      if(query.length>=3)
      {
        this.setState({query,type})
        this._Search()
      }
      else{
        this.setState({query,type})
      }
    }
    else{
      if(query.length<3)
      {
        console.log("here")
        this.setState({query,type})
      }
      else if(query.length==3)
      {
        this.setState({query,type})
        this._Search()
      }
      else{
        this.setState({query,type})
        if(this.state.result)
        {
          const filteredArray = this.state.result.filter(obj => obj.name.toLowerCase().includes(searchText.toLowerCase()));
          this.setState({displayContent:filteredArray})
        }
      }
    }
  }


  _Search=async()=>{
    const query = this.state.query
    const type =  this.state.type
    if(query && type)
    {
      try{
        const _data = await SearchRequest('track','Break Free')
        const filteredArray = _data.filter(obj => obj.name.toLowerCase().includes(searchText.toLowerCase()));
        this.setState({result:_data,displayContent:filteredArray})
      }
      catch(error)
      {
        console.log(error)
      }
    }
    
  }

  onSearchOpen=()=>{
    this.setState({active:true})

  }

  onSearchClose=()=>{
    this.setState({active:false,result:[],type:""})
    
  }


  render() {

    return (
      <div className="my-16 p-2">
        {this.state.active ? (<SearchResult result={this.state.displayContent} onSearchClose={this.onSearchClose} type={'track'}/>
        ) : (
          <div>
            <RecentlyPlayed/>
            <Playlist />
          </div>
        )}
      </div>
    );


  }
}
