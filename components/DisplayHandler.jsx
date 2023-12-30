"use client";
import React, { useState } from "react";
import Playlist from "./Playlist";
import RecentlyPlayed from "./RecentlyPlayed";
import Top10 from "@/components/Top10Songs";
import {ViewerPlaylist,ViewerSong,ViewerAlbum} from "./SongsToPlaylist";
import ImageComponent,{PodcastImage} from "./Image";
import { SearchRequest,FollowPlaylist } from "@/lib/utilites";
import { User } from "@/app/player/page";
let _intance = null;

function extractTestValue(inputString) {
  try{
    const match = inputString.match(/'([^']*)'/);

    // Check if a match is found
    if (match) {
        return match[1];
    } else {
        return inputString;
    }
  }
  catch(error)
  {
    return inputString
  }
 
}  

function SearchComp({ details,type }) {
  const [isModalOpen,setModalOpen] =  useState(false);
  const {SongHandler,GetUserDetails,Notify,PodcastHandler} =  User()
  function handleModalClose(e) {
      setModalOpen(false);
    }

    function handleModalOpen(e)
    {
      e.stopPropagation()
      setModalOpen(true)
    }

    const FollowPlayList=async(e)=>{
      e.stopPropagation()
      const uid = GetUserDetails().userID
      try{
        const res= await FollowPlaylist(uid,details.playlist_id)
        if(res == 'ok')
        Notify("Playlist followed")
        else
        Notify("Unable to follow playlist")
      }catch(error)
      { 
        Notify("Unable to follow playlist")
        console.log(error)
      }
    }

    return (
      <div className="mx-auto flex flex-row justify-between rounded h-16 w-56  bg-neutral-800 p-2" onClick={(e)=>{type=='playlist'||type=="album"?handleModalOpen(e):""}}>
        { isModalOpen && (type=='playlist') ? <ViewerPlaylist details={details} type={type} onClose={handleModalClose}/> : "" }
        { isModalOpen && (type=='album') ? <ViewerAlbum details={details} type={type} onClose={handleModalClose}/> : "" }
        { isModalOpen && (type=='track') ? <ViewerSong details={details} type={type} songID={details.track_id} onClose={handleModalClose}/> : "" }
        <div className="flex flex-row gap-4">
          <div className="object-contain">
            {type == 'podcast'?<PodcastImage blob={details.image_blob} height={24} width={24} />:<ImageComponent blob={details.image_blob} height={48} width={48} />}
          </div>
          <div className="flex flex-col">
            <span className="text-md overflow-hidden">{type=="album"?details.album_name:details.name}</span>
            <span className="text-sm">{type=='track' || type =="album"?extractTestValue(details.artist_name):details.username}</span>
          </div>
        </div>
        <div className="flex flex-row items-center h-full gap-3">
          {(type=='track' || type == "playlist")&&
          <button className="object-contain w-4 h-4" onClick={(e)=>{type == 'track'?handleModalOpen(e):FollowPlayList(e)}}>
            <img src="/plus.png" className="w-4 h-4" alt="" />
          </button>}
          {(type=='track' || type=='podcast') && <button className="object-contain w-4 h-4" onClick={(e)=>{e.stopPropagation();type=='track'?SongHandler(details.name,extractTestValue(details.artist_name),details.image_blob,details.track_id):PodcastHandler(details.name,details.username,details.image_blob,details.podcast_id)}}>
            <img src="/play.png" className="w-4 h-4" alt="" />
          </button>}
        </div>
      </div>
    );
  }



function SearchResult({result,onSearchClose,type})
{
  // console.log(type)
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
  static _instance = null;

  constructor(props) {
    super(props);

    if (DisplayHandler._instance !== null) {
      return DisplayHandler._instance;
    }

    this.state = {
      active: false,
      result: [],
      query: "",
      type: "",
      displayContent: [],
    };

    DisplayHandler._instance = this;
  }

  Search = (query, type) => {
    if (this.state.type !== type) {
      if (query.length >= 3) {
        this.setState({ query, type });
        this._Search(query, type);
      } else {
        this.setState({ query, type });
      }
    } else {
      if (query.length < 3) {
        this.setState({ query, type });
      } else if (query.length === 3) {
        this.setState({ query, type });
        this._Search(query, type);
      } else {
        this.setState({ query, type });
        if (this.state.result && this.state.result.length > 0) {
          const filteredArray = this.state.result.filter((obj) =>
            obj.name ? obj.name.toLowerCase().includes(query.toLowerCase()):obj.album_name?obj.album_name.toLowerCase().includes(query.toLowerCase()):true
          );
          this.setState({ displayContent: filteredArray });
        }
      }
    }
  };

  _Search = async (query, type) => {
    if (query && type) {
      try {
        const _data = await SearchRequest(type, query);
        const filteredArray = _data.filter((obj) =>
        obj.name ? obj.name.toLowerCase().includes(query.toLowerCase()):obj.album_name?obj.album_name.toLowerCase().includes(query.toLowerCase()):true
        );
        this.setState({ result: _data, displayContent: filteredArray,type:type });
      } catch (error) {
        console.log(error);
      }
    }
  };

  onSearchOpen = () => {
    this.setState({ active: true });
  };

  onSearchClose = () => {
    this.setState({ active: false, result: [], type: "" });
  };

  render() {
    return (
      <div className="my-16 p-2">
        {this.state.active ? (
          <SearchResult
            result={this.state.displayContent}
            onSearchClose={this.onSearchClose}
            type={this.state.type}
          />
        ) : (
          <div>
            <Top10/>
            <RecentlyPlayed />
            <Playlist />
          </div>
        )}
      </div>
    );
  }
}
