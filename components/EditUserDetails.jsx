"use client";
import React from "react";
import { useState,useEffect } from "react";
import { GetUserDetails } from "@/lib/utilites";
export default function EditUserDetails({ toggle,details }) {
  const [data, setData] = useState();


  const [email,setEmail] = useState("")
  const [username,setUsername] = useState("")
  const [dob,setDob] = useState("")

  useEffect(() => {
    const GetUserData = async (uid) => {
      try {
        const _data = await GetUserDetails(uid);
        setData(_data)
        setUsername(_data.username)
        setEmail(_data.email)
        setDob(_data.dob)

      } catch (error) {
        console.log(error);
      }
    };

    const uid = details().userID;
    if (uid) GetUserData(uid);
  }, [details]);


  const UpdateDetails = async(e)=>{
    e.preventDefault()
    toggle()
    if(email=="" || username == "" || dob== "" )
    return 
    



  }

  return (
    <form className="flex justify-center flex-col w-64  gap-4 bg-[rgba(0,_112,_184,_0.7)] rounded-lg shadow-[0_0_20px_10px_rgba(0,_112,_184,_0.7)]">
      <div className="flex items-center justify-center w-full">
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
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG 
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div>

      { data && <><div className="flex flex-col  gap-4 justify-center text-center rounded-lg text-black  ">
        <input className="p-2 rounded" defaultValue={data.username} placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
        <input
          type="email"
          className="p-2 rounded"
          defaultValue={data.email}
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input type="date" className="p-2 rounded-sm" defaultValue={data.dob} placeholder="DD-MM-YYYY" onChange={(e)=>setDob(e.target.value)} />
      </div>
      <button className="p-2 bg-red-700 rounded-md" onClick={UpdateDetails}>
            Submit
      </button> </> }
    </form>
  );
}
