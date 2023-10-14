"use client";

import { UserAuth ,emailSignIn,logOut} from "@/app/context/AuthContext";

export default function AuthButton() {
  //Debug
  // const {data:session}=useSession()

  // const session = { user: { name: "Avanish" } };
  const {user}=UserAuth()
  
  if(user){

    return (
      <div className="flex flex-row w-full justify-between p-2">
        <div className="text-xl font-bold relative inline-block">
          <span className="bg-gradient-to-r from-orange-500 to-green-500 text-transparent bg-clip-text animate-slide-text shadow-blink">
            HPMP
          </span>
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
  

  return (
    <div className="flex items-center justify-center h-screen ">
      <button
        onClick={() => {console.log("Signed in")}}
        className="hover:shadow-[0_0_15px_3px_rgba(0,0,0,0.3)] hover:shadow-white w-28 h-10 rounded-xl px-4 font-semibold text-lg  bg-neutral-800 "
      >
        Sign in
      </button>
    </div>
  );
}
