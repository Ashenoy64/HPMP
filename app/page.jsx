"use client";
import React from "react";
import { useRef, useState } from "react";
import { UserAuth } from "../lib/AuthContext";
import { auth } from "@/lib/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";
export default function landing() {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeActive, setNoticeActive] = useState(false);

  const actionCodeSettings = {
    url: "http://localhost:3000/confirm",
    handleCodeInApp: true,
  };

  const { user } = UserAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        setNotice(
          "An email was sent to your email address. Click the link in the email to login."
        );
        setNoticeActive(true)

        setTimeout(()=>{
          setNoticeActive(false)
        },3000)

      })
      .catch((error) => {
        console.log(error);
        setNotice(
          "An error occurred when sending a login link to your email address: ",
          error.name
        );
        setNoticeActive(true)

        setTimeout(()=>{
          setNoticeActive(false)
        },3000)
      });
  };

  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <div className={`absolute top-0 p-2 bg-orange-100 text-black left-0  ${noticeActive?'block':'hidden'} `}>{notice}This is a notice</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-neutral-800 p-4 shadow-[0_0_20px_5px_rgba(0,_112,_184,_0.7)] ">
        <label className="text-center p-2 font-bold  text-orange-500 text-xl">Sign In</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="text-black rounded-md p-2 "
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <button type="submit" className="p-2 rounded-md bg-slate-600 font-bold">Submit</button>
      </form>
    </div>
  );
}
