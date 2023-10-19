"use client"
import React from 'react'
import { useState } from 'react'
import {auth} from "@/app/firebase"
import {isSignInWithEmailLink,signInWithEmailLink} from "firebase/auth"

import { UserAuth } from '../context/AuthContext'
export default function confirm(){
    const [email,setEmail]=useState("")
    const [notice,setNotice]=useState("")
    const user=UserAuth()
    const callSignInWithEmailLink=async (e)=>{
        e.preventDefault()

        if(isSignInWithEmailLink(auth,window.location.href)){
            signInWithEmailLink(auth,email,window.location.href)
            .then(()=>{
                console.log("signed in")
                console.log(auth.currentUser.email)
                setNotice("welcome ",auth.currentUser.email)
                redirect("/player")

            })
            .catch((error)=>{
                console.log(error)
                setNotice("An error occured during sign in: ",error.name)
            })
        }
    }



    return(
        <div>
            <div className='text-white'>
                {notice}
            </div>

            <form>
                <input type="email" className='text-black' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
                <label>Please confirm your email address</label>
                <button type="submit" onClick={(e)=>callSignInWithEmailLink(e)}>Confirm</button>
            </form>
        </div>
    )


}