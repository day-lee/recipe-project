'use client'

import { MainIngTagButtonProps } from '@/app/types/types'

export default function MainIngTagButton({ mainIngredientTags, selectedMainIngTagId, onClick } : MainIngTagButtonProps) {
   return (
<div className="relative w-full">
    <span className="font-semibold mx-2">Main ingredient</span>
    <div className='flex flex-wrap my-2'>
        {mainIngredientTags?.map((tag) => (
            <div key={tag.id} className="mx-1 ">
                <button
                    className={`flex items-center m-1 px-2 h-8 text-sm text-black font-medium rounded-full active:scale-95 
                                hover:bg-red-100 hover:text-red-700 ${
                        selectedMainIngTagId === tag.id ? 'text-white bg-red-700' : 'bg-stone-300'}`}
                    onClick={() => onClick?.(tag.id, tag.tag_name)}>
                    {tag.tag_name} {tag.recipe_count > 0 ? `(${tag.recipe_count})` : '(0)'}
                </button>
            </div>
        ))}
    </div>
</div>
    )
}