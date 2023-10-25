"use client";

import React from "react";


export default function UserDetails({toggle}) {
  return (
  <div className="flex justify-center flex-col w-64 gap-2 bg-neutral-800  rounded-lg shadow-[0_0_30px_7px_rgba(_38,_38,_38,_0.7)] ">
        <div className="object-contain w-full rounded-lg">
                <img src="/music.jpg" alt=""  className="rounded-lg w-full" />
        </div>
        <div className="flex flex-col  gap-4 justify-center text-center rounded-lg  bg-neutral-800 ">
            <span className="p-2">Avanish</span>
            <span className="p-2">ashenoy64@gmail.com</span>
            <span className="p-2">27 May 2003</span>
        </div>
        <button className="p-2 bg-red-700 rounded-md" onClick={toggle}> 
            Edit
        </button>
    
  </div>);
}