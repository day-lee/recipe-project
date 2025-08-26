'use client';

import { useState } from 'react'; 
import Link  from "next/link";
import { Bars3Icon } from '@heroicons/react/24/solid';

import Sidebar from "@/components/Sidebar";

export default function Header() {
const [isOpen, setIsOpen] = useState<boolean>(false)
const handleClick = () => setIsOpen(!isOpen)
    return (
        <header>
            <div className="relative max-w-5xl mx-auto">
                <div className="flex flex-row justify-between px-2 sm:px-6 lg:px-10 border-b-2 border-gray-200">
                    <div className="flex items-center py-4 sm:py-8">
                        <Link href="/recipes" className="font-bold text-md sm:text-3xl text-red-700 w-1/2 sm:w-full"> 
                            Recipe Project
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <button title="Menu" onClick={handleClick}>
                            <Bars3Icon className="h-8 w-8 font-bold hover:bg-gray-400/50 hover:rounded-full hover:transition-all hover:duration-300" />
                        </button>
                    </div>
                </div>
                {isOpen && (<Sidebar onClick={handleClick} setIsOpen={setIsOpen} />)}
            </div>
        </header>
    )
}
