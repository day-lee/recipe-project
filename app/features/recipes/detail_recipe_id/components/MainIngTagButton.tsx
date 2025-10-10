'use client'

import { MainIngTagButtonProps } from '@/app/features/recipes/types/types'

export default function MainIngTagButton({ mainIngredientTags, selectedMainIngTagId, onClick } : MainIngTagButtonProps) {
   return (
<div className="relative w-full">
    <span className="font-semibold mx-2">Main ingredients</span>
    <div className='flex flex-wrap my-2'>
        {mainIngredientTags?.map((tag) => (
            <div key={tag.id} className="mx-1 ">
                <button
                    className={`m-1 px-2 py-1 text-sm text-black font-medium rounded-full border-2
                                hover:bg-red-100 hover:text-red-700 ${
                        selectedMainIngTagId === tag.id ? 'bg-red-700 text-white border-red-700' : 'bg-white border-red-700'}`}
                    onClick={() => onClick?.(tag.id, tag.tag_name)}>
                    {tag.tag_name} {tag.recipe_count > 0 ? `(${tag.recipe_count})` : '(0)'}
                </button>
            </div>
        ))}
    </div>
</div>
    )
}