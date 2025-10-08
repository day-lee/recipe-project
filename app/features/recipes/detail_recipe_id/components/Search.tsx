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
            params.set('search_query', term);
        } else {
            params.delete('search_query');
        }
        replace(`${pathname}?${params.toString()}`);
        // This will update the URL with search data without reloading the page
        // and will trigger a re-render of the component that uses the search term.
    }, 600);
    return (
        <div className="relative">
        <label htmlFor="search" className="sr-only">Search</label>
        <input
            className="border-2 border-red-700 block w-full py-2 px-8 rounded-md focus:outline-none" 
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search recipes"
            defaultValue={searchParams.get('search_query')?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
        </div>
    );
}