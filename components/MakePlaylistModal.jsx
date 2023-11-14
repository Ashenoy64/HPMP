"use client";
import React,{useState,useEffect} from "react";
import { AddPlaylist } from "@/lib/utilites";


export default function MakePlaylistModal({ isOpen, onClose,uid}) {
  const [name,setName] = useState()

  const AddUserPlaylist=async(uid,name)=>{
    try{
      const res = await AddPlaylist(uid,name)
      if(res=='ok')
      {
        alert("DONE")
      }
      else{
        alert("Failed")
      }
    }
    catch(error)
    {
      console.log(error)
    }
  }

  const HandlerSubmit=()=>{
    if(name && name!="")
    {
      AddUserPlaylist(uid,name)
    }
    onClose()
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl z-10 relative">
        <div className="flex flex-col justify-center gap-5">
          <h2 className="text-center">Make Your Playlist</h2>
          <div className="flex flex-col gap-2 justify-center w-full">
            <input
              type="text"
              name=""
              id=""
              placeholder="Playlist Name"
              className="w-56 rounded-lg p-2 text-black"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between">
          <button
            onClick={()=>{onClose()}}
            className="text-blue-500 hover:underline cursor-pointer rounded-md"
          >
            Close
          </button>
          <button
            onClick={()=>{HandlerSubmit()}}
            className="text-green-500 hover:underline cursor-pointer rounded-md"
          >
            Submit
          </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}


{/* <div className="flex items-center justify-center w-full">
              <label
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div> */}