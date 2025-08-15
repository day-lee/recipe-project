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
        <div>
            {tags.map((tag) => (
                <button className={`m-2 p-2 ${selectedTag === tag.name ? 'bg-red-500' : 'bg-blue-500'}`}
                    key={tag.id}
                    onClick={() => handleTagClick(tag.name)}> 
                {tag.name} {tag.recipe_count > 0 ? `(${tag.recipe_count})` : ''} 
                </button> 
            ))}
        </div>
    )
}