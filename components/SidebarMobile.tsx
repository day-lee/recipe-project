'use client';

import Link from 'next/link';
import {
    XMarkIcon,
    PlusCircleIcon,
    PencilSquareIcon } from '@heroicons/react/24/outline'; 

import { SidebarProps } from '@/app/types/types';
import RandomRecipeModalButton from '@/app/(routes)/recipes/components/RandomRecipeModalButton';

export default function SidebarMobile({onClick, onMouseLeave, setIsSidebarOpen}: SidebarProps) {
    return(
        <div className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-4 border-2 bg-white
                         border-gray-300 rounded-sm absolute top-16 right-0 z-20'
                         onMouseLeave={onMouseLeave}>
            <div className="flex flex-row justify-between items-center h-10 pb-4">
                <div>Hi, User</div>
                <button className='hover:bg-gray-400/50 hover:rounded-full hover:transition-all hover:duration-300' title="close" onClick={onClick}>
                    <XMarkIcon className="h-5 w-5 font-bold text-gray-700"/>
                </button>
            </div>
            <div className="flex flex-col text-lg font-semibold">
                <div className='flex flex-row hover:text-red-700'>
                    <Link href="/new-recipe">
                    <div className='flex items-center gap-4 hover:text-red-700'>
                    <PlusCircleIcon className="w-8 h-8 hover:-translate-x-1" /> 
                    <span>New recipe</span>
                    </div>
                    </Link>
                </div>
                <div className='flex flex-row hover:text-red-700 my-2'>
                    <Link href="/">
                    <div className='flex items-center gap-4 hover:text-red-700'>
                    <PencilSquareIcon className="w-8 h-8 hover:-translate-x-1" /> 
                    <span> Meal plan</span>
                     </div>
                    </Link>
                </div>
                <div className='flex flex-row hover:text-red-700'>
                    <RandomRecipeModalButton setIsSidebarOpen={setIsSidebarOpen} />
                </div>
            </div>
        </div>
    )
}