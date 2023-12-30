"use client";

import { useState, useCallback, useRef,useEffect } from "react";
import SearchResult from "./DisplayHandler";



export default function Search() {
  const searchRef = useRef(null);

  // Assuming SearchResult is a class
  const _searchDisplay = new SearchResult(); // Make sure SearchResult is defined properly

  const [active, setActive] = useState(true);
  const [filter, setFilter] = useState('track');
  const [dropDown, setDropDown] = useState(false);
  const [query, setQuery] = useState('');

  const onChange = useCallback((event) => {
    _searchDisplay.onSearchOpen(); // Make sure onSearchOpen is defined in SearchResult
    const _query = event.target.value;
    setQuery(_query);
    _searchDisplay.Search(_query, filter); // Make sure Search is defined in SearchResult
  }, [filter]);

  const onClick = useCallback(
    (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setActive(false);
      }
    },
    [setActive, setFilter]
  );

  useEffect(() => {
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [onClick]);

  const onFocus = useCallback(() => {
    setActive(true);
    _searchDisplay.onSearchOpen(); // Make sure onSearchOpen is defined in SearchResult
  }, []);

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  const setDropDownOption = (option) => {
    setFilter(option);
    _searchDisplay.Search(query, option); // Make sure Search is defined in SearchResult
  };

  return (
    <div className="mx-auto md:relative left-16 w-full ">
      <div className="mx-auto flex flex-col justify-between w-3/4 text-white gap-12">
        <div className=" mx-auto flex flex-row justify-between outline-10 object-contain bg-white w-full h-8 rounded-lg overflow-hidden items-center">
          <div className="w-24 group text-black p-1 border-r-2 bg-slate-300">
            <button className=" w-full capitalize font-medium" onClick={handleDropDown}>
              <span>{filter}</span>
            </button>
            <div className={`absolute group-hover:block hidden text-white font-semibold rounded bg-neutral-700 p-2 `}>
              <ul>
                <li className="cursor-pointer hover:border-b-2" onClick={() => setDropDownOption('track')}>
                  Track
                </li>
                <li className="cursor-pointer hover:border-b-2" onClick={() => setDropDownOption('album')}>
                  Album
                </li>
                <li className="cursor-pointer hover:border-b-2" onClick={() => setDropDownOption('podcast')}>
                  Podcast
                </li>
                <li className="cursor-pointer hover:border-b-2" onClick={() => setDropDownOption('playlist')}>
                  Playlist
                </li>
              </ul>
            </div>
          </div>
          <input
            onChange={(e) => onChange(e)}
            onFocus={onFocus}
            ref={searchRef}
            type="text"
            name="name"
            className="text-black w-full md:w-full bg-slate-100 p-3 outline-0 "
            placeholder="Search"
          />
          <button type="submit" className="object-contain w-10 rounded-r p-2" onClick={() => _searchDisplay._Search(query, filter)}>
            <img src="/search.png" alt="" className="bg-slate-100 " />
          </button>
        </div>
      </div>
    </div>
  );
}