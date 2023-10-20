"use client";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { UserAuth } from "../lib/AuthContext";
import { auth } from "@/lib/firebase";
import { sendSignInLinkToEmail,isSignInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
export default function landing() {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const router=useRouter()
  const actionCodeSettings = {
    url: "http://localhost:3000/confirm",
    handleCodeInApp: true,
  };
  const { LoginStatus,setLoginStatus } = UserAuth();

  useEffect(()=>{
    console.log(LoginStatus)
    if (LoginStatus=="Done"){
        router.push("/player")
    }
  })

  //Send login link
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.email.value);
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        setNotice(
          "An email was sent to your email address. Click the link in the email to login."
        );
        setLoginStatus("Confirm")
        console.log(LoginStatus)
      })
      .catch((error) => {
        console.log(error);
        setNotice(
          "An error occurred when sending a login link to your email address: ",
          error.name
        );
      });
  };



  
    return (
      <div className="p-10">
        <h1>Login</h1>
      <div>{notice}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          className="text-black"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          />
        <button type="submit" className="py-5">Submit</button>
      </form>
    </div>
  );  
  }


