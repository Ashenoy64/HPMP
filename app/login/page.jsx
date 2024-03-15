"use client";

import React,{ useState } from "react";
import { useRouter } from "next/navigation";
import { SessionStore,UserLogin } from "@/lib/utilites";

export default function Confirm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [notice, setNotice] = useState("");
  const [noticeActive, setNoticeActive] = useState(false);
  
  const router=useRouter()


  const Notify = (notice) => {
    setNotice(notice);
    setNoticeActive(true);

    setTimeout(() => {
      setNoticeActive(false);
    }, 3000);
  };

  const Route=(path)=>{
    return router.push(path)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try{
      const response =  await UserLogin(email,password)

      if(response.status == "ok")
      {
        Notify("Successfully Logged In")
        SessionStore("accessToken",response.token)
        console.log(response)
        SessionStore("userid",response.user_id)
        SessionStore("username",response.user_name)
        Route('/player')
      }
      else{
        Notify(response.data)
      }
    }
    catch(error)
    {
      // console.log(error)
      Notify("Something went wrong!")
    }
    setLoading(false)
  };

  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      
       <div
        className={` w-1/4 absolute left-1 top-1 toast toast-top toast-start alert alert-info ${
          noticeActive ? "block" : "hidden"
        } `}
      >
        {notice}
      </div>


      <form className="flex flex-col gap-4 bg-neutral-800 p-4 shadow-[0_0_20px_5px_rgba(0,_112,_184,_0.7)] " onSubmit={handleSubmit}>
        <label className="text-center p-2 font-bold  text-orange-500 text-lg">Login</label>
        <input
          type="email"
          placeholder="Email"
          className=" rounded-md p-2 input input-bordered "
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="rounded-md p-2 input input-bordered"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button type="submit" className="btn rounded-md bg-slate-600 font-bold text-white">
            {loading?<span className="loading text-warning loading-infinity loading-lg"></span>:"Login"}
        </button>
        <div className="w-full text-center text-sm hover:underline" onClick={()=>Route('/')}>Don&apos;t have an Account?</div>
      </form>
    </div>
  );
}
