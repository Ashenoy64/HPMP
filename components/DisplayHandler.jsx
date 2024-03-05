"use client";
import React, { useState } from "react";
import Playlist from "./Playlist";
import RecentlyPlayed from "./RecentlyPlayed";
import {ViewerSong} from "./SongsToPlaylist";
import ImageComponent from "./Image";
import { SearchRequest, SessionRetrive} from "@/lib/utilites";
import { User } from "@/app/player/page";


function SearchComp({ details,type }) {
  const [isModalOpen,setModalOpen] =  useState(false);
  const {SongHandler} =  User()

  function handleModalClose(e) {
      setModalOpen(false);
    }

    function handleModalOpen(e)
    {
      e.stopPropagation()
      setModalOpen(true)
    }

    
    return (
      <div className="mx-auto flex flex-row justify-between rounded w-full h-24 items-center  bg-neutral-800 p-2">
        { isModalOpen ? <ViewerSong details={details} type={type} songID={details.id} onClose={handleModalClose}/> : "" }
        <div className="flex flex-row gap-4">
          <div className="object-contain w-16 h-16">
            <ImageComponent url={details.image_url} />
          </div>
          <div className="flex flex-col">
            <span className="text-md overflow-hidden line-clamp-1">{details.title}</span>
            <span className="text-sm line-clamp-1">{details.artist_names[0]}</span>
          </div>
        </div>
        <div className="flex flex-row items-center h-full gap-3">
          
          <button className="object-contain w-4 h-4" onClick={(e)=>{handleModalOpen(e)}}>
            <img src="/plus.png" className="w-4 h-4" alt="" />
          </button>
           <button className="object-contain w-4 h-4" onClick={(e)=>{e.stopPropagation();SongHandler(details)}}>
            <img src="/play.png" className="w-4 h-4" alt="" />
          </button>
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
      token :SessionRetrive('accessToken')
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
             obj.title.toLowerCase().includes(query.toLowerCase()))
          this.setState({ displayContent: filteredArray });
        }
      }
    }
  };

  _Search = async (query, type) => {

    if (query && type) {
      try {
        const _response= await SearchRequest(query,this.state.token);

        if(_response.status !="ok")
        {
          throw("Search Failes")
        }
        const _data = _response.data

        const filteredArray = _data.filter((obj) =>
         obj.title.toLowerCase().includes(query.toLowerCase())
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
    if(this.state.active)
    return (
      <div className="my-16 p-2">
      <SearchResult
        result={this.state.displayContent}
        onSearchClose={this.onSearchClose}
        type={this.state.type}
      />
      </div>
    )

    else
    return (
      <div className="my-16 p-2">
          <div>
            {/* <Top10/> */}
            <RecentlyPlayed />
            <Playlist />
          </div>
      </div>
    );
  }
}
