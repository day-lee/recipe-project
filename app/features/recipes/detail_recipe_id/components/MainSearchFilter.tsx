'use client';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Search from '@/app/features/recipes/detail_recipe_id/components/Search'
import TagButton from '@/app/features/recipes/detail_recipe_id/components/TagButton'
import Filter from '@/app/features/recipes/detail_recipe_id/components/Filter';
import { Tag } from '@/app/features/recipes/types/types'

export default function MainSearchFilter({tags}: {tags:Tag[]}) {
    const [selectedMainIngTag, setSelectedTag] = useState<string | ''>('');
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleMainIngTagClick = (tagName:string) => { 
        const params = new URLSearchParams(searchParams.toString());
        if (selectedMainIngTag === tagName) {
            setSelectedTag('');
            params.delete('main_ing_tag_param')
        } else {
            setSelectedTag(tagName);
            params.set('main_ing_tag_param', tagName);
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="max-x-4xl">
            <div className="flex flex-col items-center py-8">
                <p className="text-4xl font-semibold text-red-800 mb-2 font-serif">Bon Appétit,</p>
                <p className="text-lg text-gray-600 max-w-md text-center">Deliciously Simple Recipe Selection, Just For You!</p>
            </div>
            <div className="border-[1px] border-gray-200 rounded-lg my-2 p-4 bg-red-50 shadow-xl">
                <Search />
                <Filter />
                <TagButton tags={tags} selectedTag={selectedMainIngTag} onClick={handleMainIngTagClick}/>
            </div>
        </div>
    );
}