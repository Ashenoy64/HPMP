"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
import { User,StoreLocal } from "@/lib/utilites";

export default function confirm() {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeActive, setNoticeActive] = useState(false);
  
  const router=useRouter()


  



//   Handle confirmation here
  const callSignInWithEmailLink = async (e) => {
    e.preventDefault();

    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          
          
         console.log(result.user)
         
          setNotice(result.user.email);
          setNoticeActive(true);
          
          setTimeout(() => {
            setNoticeActive(false);
          }, 3000);
          
          try{
            const email = result.user.email
            const res =  User(email.split('@')[0],email)
            if(res.result!="error")
            {
              StoreLocal(email,res.result)
            } 
          }catch(error)
          {
            console.log(error)
            console.log("There is a problem in axios")
          }

          router.push("/player")
        })
        .catch((error) => {
          console.log(error);
          setNotice("An error occured during sign in: ", error.name);
          setNoticeActive(true);


          setTimeout(() => {
            setNoticeActive(false);
          }, 5000);
          router.push("/")
        });
    }
  };


//    return the GUI
  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <div
        className={`absolute top-0 p-2 bg-orange-100 text-black left-0  ${
          noticeActive ? "block" : "hidden"
        } `}
      >
        {notice}
      </div>

      <form className="flex flex-col gap-4 bg-neutral-800 p-4 shadow-[0_0_20px_5px_rgba(0,_112,_184,_0.7)] ">
        <label className="text-center p-2 font-bold  text-orange-500 text-lg">Confirm Your Email</label>
        <input
          type="email"
          placeholder="Email"
          className="text-black rounded-md p-2 "
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <button
          type="submit"
          onClick={(e) => callSignInWithEmailLink(e)}
          className="p-2 rounded-md bg-slate-600 font-bold"
        >
          Confirm
        </button>
      </form>
    </div>
    
    
  );
}
