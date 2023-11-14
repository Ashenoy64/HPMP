"use client";

import { useState, useCallback, useRef } from "react";
import SearchResult from "./DisplayHandler";


export default function Search() {
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const _searchDisplay = new SearchResult
  const [results, setResults] = useState();
  const [active, setActive] = useState(true);
  const [filter,setFilter] = useState('Songs')
  const [dropDown,setDropDown] = useState(false)

  const onChange = useCallback((event) => {
    _searchDisplay.onSearchOpen()
    const _query=event.target.value
    setQuery(_query)
    _searchDisplay.Search(query,filter)
    
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener("click",onClick)
      setResults([])
      setQuery("")
    }
  },[]);

  
  const onFocus = useCallback(() => {
    setActive(true);
    _searchDisplay.onSearchOpen()
  
  }, []);
  const handleDropDown=()=>{
    setDropDown(!dropDown)
  }
  const setDropDownOption=(option)=>{
      setFilter(option)
      _searchDisplay.Search(query,filter)
  }

  return (
    <div className="mx-auto md:relative left-16  w-full ">
      <div className="mx-auto flex flex-col justify-between w-3/4 text-white gap-12">
        <div className=" mx-auto flex flex-row justify-between  outline-10 object-contain bg-white  w-full h-8 rounded-lg overflow-hidden items-center">
          <div className=" w-24 text-black p-1  border-r-2 bg-slate-300">
            <button className="w-full" onClick={()=>handleDropDown()}>
              <span>{filter}</span>
            </button>
            <div className={`absolute text-white font-semibold rounded bg-neutral-700 p-2 ${dropDown?"block":"hidden"}`}>
                <ul >
                  <li className=" cursor-pointer" onClick={()=>{setDropDownOption('track')}}>Songs</li>
                  <li className=" cursor-pointer" onClick={()=>{setDropDownOption('album')}}>Album</li>
                  <li className=" cursor-pointer" onClick={()=>{setDropDownOption('podcast')}}>Podcast</li>
                  <li  className=" cursor-pointer" onClick={()=>{setDropDownOption('playlist')}}>Playlist</li>
                </ul>
            </div>
          </div>
          <input
            onChange={onChange}
            onFocus={()=>{onFocus()}}
            value={query}
            ref={searchRef}
            type="text"
            name="name"
            className="text-black w-full md:w-full bg-slate-100 p-3 outline-0 "
            placeholder="Search"
          />
          <button type="submit" className=" object-contain w-12 sm:w-8 rounded-r" onClick={()=>{_searchDisplay._Search()}}>
            <img src="/search.png" alt="" className="bg-slate-100  w-12 sm:w-8  " />
          </button>
        </div>
      </div>
    </div>
  );
}


