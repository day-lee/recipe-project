'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from 'react';

import { Tag } from "../../../types/types"

export default function TagButton({ tags } : {tags: Tag[]}) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const handleTagClick = (tag_name:string) => { 
        const params = new URLSearchParams(searchParams.toString());
        if (selectedTag === tag_name) {
            setSelectedTag(null);
            params.delete('tag')
        } else {
            setSelectedTag(tag_name);
            params.set('tag', tag_name);
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="bg-red-700">
            <ul className="flex flex-wrap">
                {tags.map((tag) => (
                    <li key={tag.id} >
                        <button className={`m-2 p-2 text-black font-medium bg-white rounded-sm ${selectedTag === tag.name ? 'text-red-600 font-semibold' : ''}`}
                        onClick={() => handleTagClick(tag.name)}> 
                        {tag.name} {tag.recipe_count > 0 ? `(${tag.recipe_count})` : ''} 
                        </button> 
                    </li>
                ))} 
            </ul>
        </div>
    )
}