'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (term === '*') { 
            throw new Error('Search term cannot be *'); }
        else if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
        // This will update the URL with search data without reloading the page
        // and will trigger a re-render of the component that uses the search term.
    }, 600);
    return (
        <div className="absolute top-[-60] sm:top-[-70] left-1/4 sm:left-1/2 sm:-translate-x-1/2 flex flex-1 flex-shrink-0"> 
        <label htmlFor="search" className="sr-only">Search</label>
        <input
            className="border-2 border-gray-300 block w-full p-2 bg-neutral-100 rounded-md focus:outline-none" 
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search recipes"
            defaultValue={searchParams.get('query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
    );
}