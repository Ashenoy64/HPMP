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
        <div className="flex flex-row w-auto sm:w-44 sm:flex-col gap-1 sm:gap-5 bg-neutral-800 h-full p-1 sm:p-4 justify-center sm:justify-normal text-black ">
            <button
                className={`rounded p-1 sm:p-2 text-center text-md md:text-lg w-12-h-8 bg-green-400 ${path === '/user' ? 'shadow-[0_0_5px_1px_rgba(_255,_255,_255,_0.7)] font-semibold' : ''}`}
                onClick={() => handleClick('/user')}
            >
                Profile
            </button>
            <button
                className={`rounded p-1 sm:p-2 text-center text-md md:text-lg bg-green-400  ${path === '/user/upload' ? ' shadow-[0_0_5px_1px_rgba(_255,_255,_255,_0.7)] font-semibold' : ''}`}
                onClick={() => handleClick('/user/upload')}
            >
                Podcast
            </button>
            <button
                className={`rounded p-1 sm:p-2 text-center text-md md:text-lg w-12-h-8 bg-green-400 ${path === '/user/media' ? 'shadow-[0_0_5px_1px_rgba(_255,_255,_255,_0.7)] font-semibold' : ''}`}
                onClick={() => handleClick('/user/media')}
            >
                Media
            </button>
            <button
                className={`rounded p-1 sm:p-2 text-center text-md md:text-lg w-12-h-8 bg-green-400 ${path === '/player' ? ' shadow-[0_0_5px_1px_rgba(_255,_255,_255,_0.7)] font-semibold' : ''}`}
                onClick={() => handleClick('/player')}
            >
                Player
            </button>
        </div>
    );
}
