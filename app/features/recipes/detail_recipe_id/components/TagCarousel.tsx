'use client';

import { useRef } from 'react';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
  } from '@heroicons/react/24/solid'; 

import { Tag } from '@/app/features/recipes/types/types'

export default function TagCarousel({tags, onClick, selectedTag}: {tags:Tag[] | null;  onClick?: (tagName: string) => void; selectedTag?: string | null;}) {
    const trackRef = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: number) => {
        const track = trackRef.current;
        if (!track) return;
        const slideWidth = track.clientWidth;
        track.scrollBy({ left: direction * slideWidth, behavior: 'smooth'});
    }
    return (
    <>
        <div ref={trackRef} className='flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar my-2 mx-8'>
            {tags?.map((tag) => (
                <div key={tag.id} className="flex-shrink-0 mx-1 my-2 snap-start relative">
                    <button className={`m-2 p-2 text-black font-medium bg-white rounded-sm hover:text-red-600 hover:font-semibold ${selectedTag === tag.name ? 'text-red-600 font-semibold' : ''}`}
                    onClick={() => onClick?.(tag.name)}> 
                    {tag.name} {tag.recipe_count > 0 ? `(${tag.recipe_count})` : '(0)'} 
                    </button>
                </div>
            ))}
        </div>
        <button onClick={() => scroll(-1)} className='absolute left-0 top-1/2 -translate-y-1/2 rounded-full py-2'><ChevronLeftIcon className="w-8 h-8 text-white hover:-translate-x-1" /></button>
        <button onClick={() => scroll(1)} className='absolute right-0 top-1/2 -translate-y-1/2 rounded-full py-2'><ChevronRightIcon className="w-8 h-8 text-white hover:translate-x-1" /></button>
    </>
    )
}
