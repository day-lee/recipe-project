'use client';
import { useState } from 'react'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { TrashIcon } from '@heroicons/react/24/outline'; 

export default function Filter() {
    const [selectedCuisineTag, setSelected] = useState('');
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleCuisineTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString());

        const selectedCuisine = e.target.value.trim();
        if (selectedCuisine) {
            setSelected(selectedCuisine)
            params.set('cuisine_tag_param', selectedCuisine);
        } else {
            params.delete('cuisine_tag_param');
        }
        replace(`${pathname}?${params.toString()}`);
    }
    const handleRemove = () => {
        setSelected('')
        const params = new URLSearchParams(searchParams.toString());
        params.delete('cuisine_tag_param');
        params.delete('main_ing_tag_param');

        replace(`${pathname}?${params.toString()}`);

    }
    return (
    <div className="flex items-center mx-1 my-2">
        <label htmlFor="search" className="sr-only">Filter</label>
          <span className="font-semibold ml-1">Filter</span>
        <select onChange={handleCuisineTagChange} 
                value={selectedCuisineTag}
                className="border-2 border-red-700 rounded-sm ml-2 p-1">
            <option value="">All Cuisines</option>
            <option value="Korean">Korean</option>
            <option value="British">British</option>
            <option value="Chinese">Chinese</option>
            <option value="Vietnamese">Vietnamese</option>
            <option value="Thai">Thai</option>
            <option value="Italian">Italian</option>
            <option value="Spanish">Spanish</option>
            <option value="Mexican">Mexican</option>
            <option value="French">French</option>
            <option value="Middle East">Middle East</option>
        </select>
        { selectedCuisineTag && (<button type="button" onClick={handleRemove}
            className=""> 
            <div className='flex items-center hover:bg-red-200 rounded-sm px-2 py-1 mx-2  border-2 border-red-700 text-red-700 font-medium'>
            <TrashIcon className="h-4 w-4 mr-2 text-red-600" />  Clear
            </div>
        </button>)}
        
    </div>
    );
}