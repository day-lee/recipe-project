'use client'
import { useState, useEffect, } from 'react';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import fetchTag from "./TagList";


export default function TagButton() {
    const [tags, setTags] = useState<string[]>([]);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const selectedTag = searchParams.get('tag') || '';

    useEffect(() => {
        const loadTags = async () => { 
            const data = await fetchTag();
            if (Array.isArray(data)) {
                const tagNames = data.map(item => item.tag_name);
                setTags(tagNames);}
            }
    loadTags();
    },[]);

    const handleTagClick = (tag:string) => { 
        const params = new URLSearchParams(searchParams.toString());
        if (selectedTag === tag) {
            params.delete('tag')
        } else {
            params.set('tag', tag);
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
        {tags.map((tag: string) => (
            <button className="m-2 p-1 ${selectedTag === tag ? 'bg-red-500' : 'bg-blue-500'}" 
            key={tag}
            onClick={() => handleTagClick(tag)}> 
            {tag} 
            </button> 
        ))}
        </div>
    )
}