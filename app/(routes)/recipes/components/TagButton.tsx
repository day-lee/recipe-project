'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from 'react';

import { Tag } from "../../../types/types"
import TagCarousel from './TagCarousel'

export default function TagButton({ tags } : {tags: Tag[]}) {
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const handleTagClick = (tagName:string) => { 
        const params = new URLSearchParams(searchParams.toString());
        if (selectedTag === tagName) {
            setSelectedTag(null);
            params.delete('tag')
        } else {
            setSelectedTag(tagName);
            params.set('tag', tagName);
        }
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div className="relative w-full bg-red-700 ">
            <TagCarousel tags={tags} onClick={handleTagClick} selectedTag={selectedTag} />
        </div>
    )
}