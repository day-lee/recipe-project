'use client';
import { useState, useEffect } from 'react';
import { SearchProps } from '@/app/types/types'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function useLoopingTyping(
    placeholders: string[] = [],   
    typeSpeed = 150,     
    deleteSpeed = 50,    
    pauseTime = 1000     
):string {
  const [placeholder, setPlaceholder] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!placeholders.length) return;

    const currentText = placeholders[textIdx];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // typing mode
      if (charIdx <= currentText.length) {
        timeoutId = setTimeout(() => {
          setPlaceholder(currentText.slice(0, charIdx));
          setCharIdx(charIdx + 1);
        }, typeSpeed);
      }
      // finishing typing, pause before deleting
      if (charIdx === currentText.length + 1) {
        timeoutId = setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      // deleting mode
      if (charIdx >= 0) {
        timeoutId = setTimeout(() => {
          setPlaceholder(currentText.slice(0, charIdx));
          setCharIdx(charIdx - 1);
        }, deleteSpeed);
      }
      // all deleted, move to next string
      if (charIdx === -1) {
        setIsDeleting(false);
        setTextIdx((textIdx + 1) % placeholders.length);
        setCharIdx(0);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [
    placeholders,
    textIdx,
    charIdx,
    isDeleting,
    typeSpeed,
    deleteSpeed,
    pauseTime,
  ]);
  return placeholder;
}

export default function Search({onChange, searchInput}:SearchProps ) {
      const placeholder = useLoopingTyping(
    ['kimchi', 'english breakfast', 'green curry', 'hainanese chicken rice', 'beef stew'],
    100, 50, 800
  );
    return (
        <div className='flex'>
            <div className="relative w-5/6">
            <label htmlFor="search" className="sr-only">Search</label>
            <input
                className="border-[1px] border-stone-700 block w-full m-2 py-2 h-10 px-8 rounded-md focus:outline-none placeholder:italic" 
                type="text"
                onChange={(e) => onChange?.(e.target.value)}
                value={searchInput}
                placeholder={placeholder}
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
            <div className="w-2/6 flex items-center justify-end">
                <button className="bg-red-700 text-white h-10 w-full mx-4 px-1 rounded-md font-semibold"> Search </button>
            </div>
      </div>
    );
}