"use client";

import React,{useState} from "react";
import UserDetails from "@/components/UserDetails";
import EditUserDetails from "@/components/EditUserDetails";
import { useUser } from "./layout";

export default function User() {
  const [edit,setEdit] = useState(false)
  const {GetUserDetails} =useUser()
  
  const handleToggle=()=>{
    setEdit(!edit)
  }


  return (
  <div className=" w-full h-full flex flex-col justify-center items-center">
    {
      edit ? <EditUserDetails toggle={handleToggle} details={GetUserDetails} /> : <UserDetails toggle={handleToggle} details={GetUserDetails}/>
    }
  </div>);
}