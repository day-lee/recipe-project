'use client';

import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/solid';

import { SidebarProps } from '@/app/types/types';

export default function Sidebar({onClick, setIsOpen}: SidebarProps) {
    return(
        <div className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 p-4 border-2 bg-white
                         border-gray-300 rounded-sm absolute top-16 right-0 z-50'
                         onMouseLeave={() => setIsOpen(false)}
                         onPointerLeave={() => setIsOpen(false)}>
            <div className="flex flex-row justify-between items-center h-10 pb-4">
                <div>Hi, User!</div>
                <button title="close" onClick={onClick}><XMarkIcon className="h-5 w-5 font-bold text-gray-700"/></button>
            </div>
            <div className="flex flex-col text-lg font-semibold">
                <div className='flex flex-row hover:text-red-700'>
                    <Link href="/recipe/new">
                    + New recipe
                    </Link>
                </div>
                <div className='flex flex-row hover:text-red-700'>
                    <Link href="/">
                    + Meal plan
                    </Link>
                </div>
                <div className='flex flex-row hover:text-red-700'>
                    <Link href="/">
                    + Random recipe
                    </Link>
                </div>
            </div>
        </div>
    )
}