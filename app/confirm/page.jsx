"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
import { UserAuth } from "@/lib/AuthContext";

export default function confirm() {
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const {setUserMail, LoginStatus,setLoginStatus} = UserAuth();
  const router=useRouter()


  useEffect(()=>{
    if (LoginStatus=="Done"){
        router.push("/player")
    }
  })



//   Handle confirmation here
  const callSignInWithEmailLink = async (e) => {
    e.preventDefault();

    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          
          
          setUserMail(auth.currentUser.email)
          setLoginStatus("Done")
          
        })
        .catch((error) => {
          console.log(error);
          setNotice("An error occured during sign in: ", error.name);

        });
    }
  };


//    return the GUI
  return (
   <div>
      <div className="text-white">{notice}</div>

      <form>
        <input
          type="email"
          className="text-black"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <label>Please confirm your email address</label>
        <button type="submit" onClick={(e) => callSignInWithEmailLink(e)}>
          Confirm
        </button>
      </form>
    </div>
    
    
  );
}
