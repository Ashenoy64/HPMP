"use client";
import SideBar from "@/components/SideBar";
import { useState, useEffect } from "react";



export default function Layout({ children }) {

  return (
  <div className="flex flex-col sm:flex-row h-auto sm:h-screen w-full">
        <SideBar/>
        <div className='p-2 w-full'>
            {children}
        </div>
  </div>);
}
