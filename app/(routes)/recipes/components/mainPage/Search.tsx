'use client';

import { SearchProps } from '@/app/types/types'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
export default function Search({onChange, searchInput}:SearchProps ) {
    return (
        <div className='flex'>
            <div className="relative w-5/6">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
                className="border-[1px] border-stone-700 block w-full m-2 py-2 h-10 px-8 rounded-md focus:outline-none" 
                type="text"
                onChange={(e) => onChange?.(e.target.value)}
                value={searchInput}
                placeholder="Search recipes"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            <div className="w-2/6 flex items-center justify-end">
                <button className="bg-red-700 text-white h-10 w-full mx-4 px-1 rounded-md font-semibold"> Search </button>
            </div>
      </div>
    );
}