"use client";

import { useState, useCallback, useRef } from "react";



export default function Search() {
   
    const searchRef=useRef(null)

    const [query,setQuery]=useState("")
    const [active,setActive]=useState(false)
    const [results,setResults]=useState([])

    const onChange=useCallback((event)=>{
        const query=event.target.value
        setQuery(query)
        if(query.length){
            fetch(`http://localhost:5000/getRecommendation/${query}`)
                .then(res=>res.json())
                .then(res=>{setResults([res.result])}) 
        }

        else{
            setResults([])
        }

    },[])



    const onClick=useCallback((event)=>{
        
        if (searchRef.current && !searchRef.current.contains(event.target)){
            
            setActive(false)
            window.removeEventListener("click",onClick)
            setResults([])
            setQuery("")
            
        }
    },[])

    const onFocus=useCallback(()=>{
        setActive(true)
        window.addEventListener("click",onClick)
    },[])
    
    return (
        <div className="flex flex-row ">
            <div className="flex flex-col justify-center text-white my-12">
                <div className="bg-slate-100 flex flex-row outline-10  w-auto md:w-2/5 h-8 rounded-lg overflow-hidden">
                <input   onChange={onChange} onFocus={onFocus} value={query} ref={searchRef} type="text" name="name"  className="bg-slate-100 w-full p-3 outline-0 text-black" placeholder="Search"/>
                <button type="submit" className="w-8">
                    <img src="/search.png" alt="" className="bg-slate-100  w-8 p-2" />
                </button>
                </div>
            
                <div>
              {active && results.length>0 &&(            
              Object.keys(results[0]).map((k)=>{return <div  key={k}>{results[0][k]["name"]}</div>})
              )
              } 
                </div>
            </div>
        </div>
       
    );
}
