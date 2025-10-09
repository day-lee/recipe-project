'use client';

import { SearchProps } from '@/app/features/recipes/types/types'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
export default function Search({onChange, searchInput}:SearchProps ) {
    return (
        <div className="relative">
        <label htmlFor="search" className="sr-only">Search</label>
        <input
            className="border-2 border-red-700 block w-full py-2 px-8 rounded-md focus:outline-none" 
            type="text"
            onChange={(e) => onChange?.(e.target.value)}
            value={searchInput}
            placeholder="Search recipes"
        />
        <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
    );
}