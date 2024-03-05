"use client";
import React, {useState  } from "react";
import { useRouter } from "next/navigation";
import { UserSignup } from "@/lib/utilites";


export default function Landing() {
  const router = useRouter();

  const [notice, setNotice] = useState("");
  const [noticeActive, setNoticeActive] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();

  const [loading,setLoading] = useState(false)


  const Notify = (notice) => {
    setNotice(notice);
    setNoticeActive(true);

    setTimeout(() => {
      setNoticeActive(false);
    }, 3000);
  };

  


  const validatePassword=()=>{
    if(password.length<6)
    {
      Notify("Password should be atleast 6 character long.")
      
      return false
    }
    if(password !=confirmPassword)
    {
      Notify("Password doesnt match!")
      
      return false
    }

    return true
    
  }

  const RouteLogin = ()=>{
    return router.push('/login')
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    if(validatePassword())
    {
      try{
        const response = await UserSignup(username,email,password)

        if(response.status == "ok")
        {
          Notify("You have been Registered Successfully!")
          RouteLogin()
          
        }
        else{
          Notify(response.data)
        }
      }
      catch(error)
      {
        Notify("Something Went Wrong!") 
      }
      
    }
      setLoading(false)
  };

  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      
      <div
        className={` w-1/4 absolute left-1 top-1 toast toast-top toast-start alert alert-info ${
          noticeActive ? "block" : "hidden"
        } `}
      >
        {notice}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-neutral-800 p-4 shadow-[0_0_20px_5px_rgba(0,_112,_184,_0.7)]  "
      >
        <label className="text-center p-2 font-bold  text-orange-500 text-xl">
          Sign In
        </label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="rounded-md p-2 input input-bordered"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="rounded-md p-2 input input-bordered "
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={username}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="rounded-md p-2 input input-bordered "
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />

        <input
          type="password"
          name="confirmPassowrd"
          placeholder="Confirm Password"
          className="rounded-md p-2 input input-bordered "
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          required
        />

        <button type="submit" className="btn rounded-md bg-slate-600 font-bold text-white">
            {loading?<span className="loading text-warning loading-infinity loading-lg"></span>:"Submit"}
        </button>
        <div className="w-full text-center text-sm hover:underline" onClick={RouteLogin}>Already have an Account?</div>
      </form>

    </div>
  );
}
