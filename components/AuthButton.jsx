"use client"
import {signIn,signOut,useSession} from "next-auth/react"




export default function AuthButton(){
    const {data:session}=useSession()

    if (session){
        return(
            <div className="flex flex-col justify-center">
                {session.user.name}
                <button onClick={()=>signOut()}>Sign Out</button>
            </div>
        )
    }

    return(
        <div className="flex flex-col jsutify-center">
            Not Signed In
            <button onClick={()=>signIn()}>Sign in</button>
        </div>
    )
}
