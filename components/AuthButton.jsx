"use client"
import {signIn,signOut,useSession} from "next-auth/react"




export default function AuthButton(){
    const {data:session}=useSession()

    if (session){
        return(
            <>
                {session.user.name}<br/>
                <button onClick={()=>signOut()}>Sign Out</button>
            </>
        )
    }

    return(
        <div>
            Not Signed In<br/>
            <button onClick={()=>signIn()}>Sign in</button>
        </div>
    )
}