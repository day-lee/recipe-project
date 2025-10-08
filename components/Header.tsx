'use client';

import { useState } from 'react'; 
import Link  from "next/link";
import { Bars3Icon } from '@heroicons/react/24/solid';

import Sidebar from "@/components/SidebarMobile";

export default function Header() {
const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
const handleClick = () => setIsSidebarOpen(!isSidebarOpen)
const handleMouseLeave = () => setIsSidebarOpen(false)
    return (
        <header>
            <div className="relative mx-auto z-40 bg-white">
                <div className="flex flex-row justify-between px-2  border-b-[1px] border-gray-200 bg-gray-100">
                    <div className="flex items-center py-1 sm:py-2">
                        <Link href="/recipes" className="font-bold text-md sm:text-2xl text-red-700 w-1/2 sm:w-full"> 
                            Recipe Project
                        </Link>
                    </div>                    
                    <div className="flex items-center">
                        <button title="Menu" onClick={handleClick}>
                            <Bars3Icon className="h-8 w-8 font-bold hover:bg-gray-400/50 hover:rounded-full hover:transition-all hover:duration-300" />
                        </button>
                    </div>
                </div>
                {isSidebarOpen && (<Sidebar onClick={handleClick} onMouseLeave={handleMouseLeave} setIsSidebarOpen={setIsSidebarOpen} />)}
            </div>
        </header>
    )
}
