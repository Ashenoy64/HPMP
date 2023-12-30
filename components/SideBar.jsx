'use client'

import React from "react"
import { useRouter,usePathname } from 'next/navigation';


export default function SideBar() {
    const router = useRouter(); // Initialize the router

    const path = usePathname();
    const handleClick = (path) => {
        
        router.push(path); 
    }

    return (
        <div className="flex flex-row w-auto p-4  gap-1 sm:gap-5 bg-neutral-800justify-center sm:justify-normal text-black ">
        
            <button
                className={`rounded p-2 bg-neutral-900 text-white   hover:shadow-[0_0_5px_1px_rgba(_255,_255,_255,_0.7)] font-semibold ${path === '/player' ? '' : ''}`}
                onClick={() => handleClick('/player')}
            >
                Back
            </button>
        </div>
    );
}
