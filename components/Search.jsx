"use client";

import { useState, useCallback, useRef } from "react";
import SearchResult from "./DisplayHandler";


export default function Search() {
  const searchRef = useRef(null);

  const _searchDisplay = new SearchResult
  const [active, setActive] = useState(true);
  const [filter,setFilter] = useState('track')
  const [dropDown,setDropDown] = useState(false)
  const [query,setQuery] = useState("")

  const onChange = useCallback((event) => {
    _searchDisplay.onSearchOpen()
    const _query=event.target.value
    setQuery(_query)
    _searchDisplay.Search(_query,filter)
    
  }, []);

  const onClick = useCallback((event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setActive(false)
      window.removeEventListener("click",onClick)
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
      console.log(option)
      _searchDisplay.Search(query,option)
  }

  return (
    <div className="mx-auto md:relative left-16  w-full ">
      <div className="mx-auto flex flex-col justify-between w-3/4 text-white gap-12">
        <div className=" mx-auto flex flex-row justify-between  outline-10 object-contain bg-white  w-full h-8 rounded-lg overflow-hidden items-center">
          <div className=" w-24 text-black p-1  border-r-2 bg-slate-300">
            <button className="w-full capitalize" onClick={()=>handleDropDown()}>
              <span>{filter}</span>
            </button>
            <div className={`absolute text-white font-semibold rounded bg-neutral-700 p-2 ${dropDown?"block":"hidden"}`}>
                <ul >
                  <li className=" cursor-pointer" onClick={()=>{setDropDownOption('track')}}>Track</li>
                  <li className=" cursor-pointer" onClick={()=>{setDropDownOption('album')}}>Album</li>
                  <li className=" cursor-pointer" onClick={()=>{setDropDownOption('podcast')}}>Podcast</li>
                  <li  className=" cursor-pointer" onClick={()=>{setDropDownOption('playlist')}}>Playlist</li>
                </ul>
            </div>
          </div>
          <input
            onChange={(e)=>onChange(e)}
            onFocus={()=>{onFocus()}}
            ref={searchRef}
            type="text"
            name="name"
            className="text-black w-full md:w-full bg-slate-100 p-3 outline-0 "
            placeholder="Search"
          />
          <button type="submit" className=" object-contain w-10 rounded-r" onClick={()=>{_searchDisplay._Search(query,filter)}}>
            <img src="/search.png" alt="" className="bg-slate-100 p-2  w-10  " />
          </button>
        </div>
      </div>
    </div>
  );
}


