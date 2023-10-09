"use client";

import { useState, useCallback, useRef } from "react";


function SearchComp({name,img})
{
    return(
        <div className="flex flex-row justify-between rounded  bg-neutral-800 p-2">
            <div className="object-contain">
                <img src="/music.jpg" className="w-12 h-12" alt="" />
            </div>
            <div>
            {name}
            </div>
        </div>
    )
}

export default function Search() {
   
    const searchRef=useRef(null)

    const [query,setQuery]=useState("")

    //Debug
    const [active,setActive]=useState(true)
    const [results,setResults]=useState([[{name:"Avanish"},{name:"Monish"}]])
    //End

    const onChange=useCallback((event)=>{
        // const query=event.target.value
        // setQuery(query)
        // if(query.length){
        //     fetch(`http://localhost:5000/getRecommendation/${query}`)
        //         .then(res=>res.json())
        //         .then(res=>{setResults([res.result])}) 
        // }

        // else{
        //     setResults([])
        // }

    },[])


    const onClick=useCallback((event)=>{
        
        // if (searchRef.current && !searchRef.current.contains(event.target)){
            
        //     setActive(false)
        //     window.removeEventListener("click",onClick)
        //     setResults([])
        //     setQuery("")
            
        // }
    },[])

    const onFocus=useCallback(()=>{
        setActive(true)
        window.addEventListener("click",onClick)
    },[])
    
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col justify-center text-white gap-4">
                <div className="bg-slate-100 mx-auto flex flex-row outline-10 w-1/2 md:w-3/4 lg:w-1/4 h-8 rounded-lg overflow-hidden">
                    <input   onChange={onChange} onFocus={onFocus} value={query} ref={searchRef} type="text" name="name"  className="bg-slate-100 w-full p-3 outline-0 text-black" placeholder="Search"/>
                    <button type="submit" className="w-8">
                        <img src="/search.png" alt="" className="bg-slate-100  w-8 p-2" />
                    </button>
                </div>
            
                <div className="flex flex-col w-full gap-2">
                    {active && results.length>0 &&(            
                    Object.keys(results[0]).map((k)=>{return <SearchComp key={k} name={results[0][k]["name"]}/> })
                    )
                    } 
                </div>
            </div>
        </div>
       
    );
}
