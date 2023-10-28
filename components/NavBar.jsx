"use client";

import Search from "./Search";
import { useEffect, useState } from "react";
import {auth} from "@/lib/firebase"
import { signOut,onAuthStateChanged } from "firebase/auth";
export default function NavBar() {
  const [user,setUser]=useState("")
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setUser(user)
        // ...
      } 
    });
  },[])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };
  

  return (
    <div className="flex flex-row w-full justify-between p-2">
      <div className="text-xl font-bold relative inline-block">
        <span className="bg-gradient-to-r from-orange-500 to-green-500 text-transparent bg-clip-text animate-slide-text shadow-blink">
          HPMP
        </span>
      </div>
      <div className="flex flex-row justify-center w-full">
        <Search />
      </div>
      <div >
        <div className="hidden md:flex space-x-6">
          <div className="font-semibold text-lg text-white"> {user.email}</div>

          <div className="">
            <button
              onClick={async () => {
                signOut(auth).then(()=>{
                  console.log("signed out")
                }).catch((error)=>{
                  console.log(error)
                })
                
              }}
              className=" bg-neutral-800 w-24 h-8 rounded-md font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav Links */}
        {isMobileMenuOpen && (
          <div className="md:hidden top-16 right-0 left-0 z-10">
            <div className="">
              <div className="font-semibold text-lg">{user.email}</div>

              <div className="">
                <button
                 onClick={async () => {
                  signOut(auth).then(()=>{
                    console.log("signed out")
                  }).catch((error)=>{
                    console.log(error)
                  })
                  
                }}
                  className=" bg-neutral-800 w-24 h-8 rounded-md font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


