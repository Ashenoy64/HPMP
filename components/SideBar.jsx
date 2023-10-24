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
        <div className="flex flex-row w-auto sm:w-44 sm:flex-col gap-1 sm:gap-5 bg-neutral-800 h-full p-1 sm:p-4 justify-center sm:justify-normal">
            <button
                className={`rounded p-1 sm:p-2 text-center text-md md:text-lg w-12-h-8 ${path === '/user' ? 'bg-slate-400 shadow-[0_0_5px_1px]' : 'bg-zinc-400'}`}
                onClick={() => handleClick('/user')}
            >
                Profile
            </button>
            <button
                className={`rounded p-1 sm:p-2 text-center text-md md:text-lg  ${path === '/user/upload' ? 'bg-slate-400 shadow-[0_0_5px_1px]' : 'bg-zinc-400'}`}
                onClick={() => handleClick('/user/upload')}
            >
                Podcast
            </button>
            <button
                className={`rounded p-1 sm:p-2 text-center text-md md:text-lg w-12-h-8 ${path === '/user/media' ? 'bg-slate-400 shadow-[0_0_5px_1px]' : 'bg-zinc-400'}`}
                onClick={() => handleClick('/user/media')}
            >
                Media
            </button>
            <button
                className={`rounded p-1 sm:p-2 text-center text-md md:text-lg w-12-h-8 ${path === '/player' ? 'bg-slate-400 shadow-[0_0_5px_1px]' : 'bg-zinc-400'}`}
                onClick={() => handleClick('/player')}
            >
                Player
            </button>
        </div>
    );
}
