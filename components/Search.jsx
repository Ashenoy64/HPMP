"use client";

import { useState, useCallback, useRef } from "react";
import SearchResult from "./DisplayHandler";


export default function Search() {
  const searchRef = useRef(null);

  const [query, setQuery] = useState("");

  const _searchDisplay = new SearchResult

  
  const [results, setResults] = useState([
    [
      { name: "Avanish" },
      { name: "Monish" },
      { name: "Avanish" },
      { name: "Monish" },
      { name: "Avanish" },
      { name: "Monish" },
      { name: "Avanish" },
      { name: "Monish" },
      { name: "Avanish" },
      { name: "Monish" },
      { name: "Avanish" },
      { name: "Monish" },
      { name: "Avanish" },
      { name: "Monish" },
      { name: "Avanish" },
      { name: "Monish" },
      { name: "Avanish" },
      { name: "Monish" },
    ],
  ]);

  //End

  const [active, setActive] = useState(true);


  const onChange = useCallback((event) => {
    const query=event.target.value
    setQuery(query)
    if(query.length){
        // fetch(`http://localhost:5000/getRecommendation/${query}`)
        //     .then(res=>res.json())
        //     .then(res=>{setResults([res.result])})
    }
    else{
        setResults([])
    }
    _searchDisplay.handleSearch(results,true)
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
    _searchDisplay.handleSearch(results,true)
  
  }, []);

  return (
    <div className="mx-auto md:relative left-16  w-full ">
      <div className="mx-auto flex flex-col justify-center w-full text-white gap-12">
        <div className="bg-slate-100 mx-auto flex flex-row  outline-10  w-1/2 h-8 rounded-lg overflow-hidden items-center">
          <input
            onChange={onChange}
            onFocus={()=>{onFocus()}}
            value={query}
            ref={searchRef}
            type="text"
            name="name"
            className="text-black bg-slate-100 w-full p-3 outline-0 "
            placeholder="Search"
          />
          <button type="submit" className="w-8">
            <img src="/search.png" alt="" className="bg-slate-100  w-8 p-2" />
          </button>
        </div>

        
      </div>
    </div>
  );
}


