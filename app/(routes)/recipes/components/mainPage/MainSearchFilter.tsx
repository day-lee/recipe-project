'use client';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import Search from '@/app/(routes)/recipes/components/mainPage/Search'
import MainIngTagButton from '@/app/(routes)/recipes/components/mainPage/MainIngTagButton'
import CuisineFilter from '@/app/(routes)/recipes/components/mainPage/CuisineFilter';
import RemoveFilterButton from '@/app/(routes)/recipes/components/mainPage/RemoveFilterButton';
import { MainListIngredientTag } from '@/app/types/types';

export default function MainSearchFilter({mainIngredientTags}: {mainIngredientTags: MainListIngredientTag[]}) {
    const [searchInput, setSearchInput] = useState<string | ''>('');
    const [selectedMainIngTagId, setSelectedMainIngTagId] = useState<number | undefined>(undefined);
    const [selectedCuisineTag, setSelectedCuisineTag] = useState<string | ''>('');
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearchDebounced = useDebouncedCallback((term: string) => {
        if (term === '*') { 
            throw new Error('Search term cannot be *'); }
        else if (term) {
            params.set('search_query', term);
        } else {
            params.delete('search_query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 600);   

    const handleSearch = ((term: string) => {
        setSearchInput(term)
        handleSearchDebounced(term)
    })

    const handleCuisineTagChange = (selectedCuisineTag: string) => {
        if (selectedCuisineTag) {
            setSelectedCuisineTag(selectedCuisineTag)
            params.set('cuisine_tag_param', selectedCuisineTag);
        } else {
            params.delete('cuisine_tag_param');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const handleFilterRemove = () => {
        setSelectedCuisineTag('');
        setSearchInput('');
        setSelectedMainIngTagId(undefined)
        params.delete('cuisine_tag_param');
        params.delete('main_ing_tag_param');
        params.delete('search_query');
        replace(`${pathname}?${params.toString()}`);
    }  

    const handleMainIngTagClick = (tagId:number, tagName: string) => { 
        setSelectedMainIngTagId(tagId)
        if (selectedMainIngTagId === tagId) {
            setSelectedMainIngTagId(undefined)
            params.delete('main_ing_tag_param')
        } else {
            params.set('main_ing_tag_param', tagName);
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="max-x-4xl">
            <div className="flex flex-col items-center py-8">
                <p className="text-4xl font-semibold text-red-800 mb-2 font-serif">Bon Appétit,</p>
                <p className="text-md text-gray-600 max-w-md text-center">Deliciously Simple Recipe Selection, Just For You!</p>
            </div>
            <div className="border-[1px] border-gray-200 rounded-lg my-2 p-4 bg-red-50 shadow-xl">
                <Search onChange={handleSearch} searchInput={searchInput}/>
                <div className='flex items-center'>
                <CuisineFilter onChange={handleCuisineTagChange} selectedCuisineTag={selectedCuisineTag}/>
                <RemoveFilterButton onClick={handleFilterRemove} searchInput={searchInput} selectedCuisineTag={selectedCuisineTag} selectedMainIngTagId={selectedMainIngTagId} />
                </div>
                <MainIngTagButton mainIngredientTags={mainIngredientTags} selectedMainIngTagId={selectedMainIngTagId} onClick={handleMainIngTagClick}/>
            </div>
        </div>
    );
}