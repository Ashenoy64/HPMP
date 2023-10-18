"use client";

import { UserAuth ,emailSignIn , logOut} from "@/lib/AuthContext";

export default function AuthButton() {
  
  const {user}=UserAuth()
  
  
    return (
      <div className="flex flex-row w-full justify-between p-2">
        <div className="text-xl font-bold relative inline-block">
          <span className="bg-gradient-to-r from-orange-500 to-green-500 text-transparent bg-clip-text animate-slide-text shadow-blink">
            HPMP
          </span>
        </div>
        <div>
          
        </div>
        <div className="flex flex-row gap-4">
            <div className="font-semibold text-lg">
                {user}
            </div>
            <div className="">
                <button onClick={() => {console.log("signedout")}} className=" bg-neutral-800 w-24 h-8 rounded-md font-medium">Sign Out</button>
            </div>
        </div>
      </div>
    );
  
}
