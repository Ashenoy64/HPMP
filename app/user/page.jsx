"use client";

import React,{useState} from "react";
import UserDetails from "@/components/UserDetails";
import EditUserDetails from "@/components/EditUserDetails";

export default function User() {
  const [edit,setEdit] = useState(false)

  const handleToggle=()=>{
    setEdit(!edit)
  }


  return (
  <div className=" w-full h-full flex flex-col justify-center items-center">
    {
      edit ? <EditUserDetails toggle={handleToggle}/> : <UserDetails toggle={handleToggle}/>
    }
  </div>);
}