'use client';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Image from 'next/image';

import Search from '@/app/(routes)/recipes/components/mainPage/Search'
import MainIngTagButton from '@/app/(routes)/recipes/components/mainPage/MainIngTagButton'
import CuisineFilter from '@/app/(routes)/recipes/components/mainPage/CuisineFilter';
import RemoveFilterButton from '@/app/(routes)/recipes/components/mainPage/RemoveFilterButton';
import { MainListIngredientTag } from '@/app/types/types';
import cookingBg from 'public/cooking-bg.jpg'

export const catchPhrase = 'Effortlessly Delicious Recipes, Just for You!'

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
        if (selectedMainIngTagId === tagId) {
            setSelectedMainIngTagId(undefined)
            params.delete('main_ing_tag_param')
        } else {
            setSelectedMainIngTagId(tagId)
            params.set('main_ing_tag_param', tagName);
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="w-full relative mb-30">
             <Image className='opacity-65 relative' priority width={1200} height={300} style={{ width: '100%', height:'90%' }}  src={cookingBg} alt="Cooking Background" />
            <div className="absolute flex flex-col items-center py-4 h-60 sm:h-72 md:h-80 lg:h-96 top-0 sm:top-[-100] md:top-[-80] lg:top-[-38] left-0 w-full justify-center">
                <p className="text-4xl md:text-5xl font-semibold text-red-800 mb-2 font-serif">Bon Appétit,</p>
                <p className="md:mt-4 text-md md:text-lg text-gray-800 max-w-md text-center">{catchPhrase}</p>
            </div>
            <div className='flex justify-center absolute bottom-[-180] sm:bottom-4 md:bottom-16 lg:bottom-32 left-0 w-full md:px-4'>
                <div className='w-full border-[1px] border-gray-200 rounded-lg my-2 p-4 shadow-2xl bg-white '>
                    <Search onChange={handleSearch} searchInput={searchInput}/>
                    <div className='flex items-center'>
                    <CuisineFilter onChange={handleCuisineTagChange} selectedCuisineTag={selectedCuisineTag}/>
                    <RemoveFilterButton onClick={handleFilterRemove} searchInput={searchInput} selectedCuisineTag={selectedCuisineTag} selectedMainIngTagId={selectedMainIngTagId} />
                    </div>
                    <MainIngTagButton mainIngredientTags={mainIngredientTags} selectedMainIngTagId={selectedMainIngTagId} onClick={handleMainIngTagClick}/>
                </div>
            </div>
        </div>
    );
}