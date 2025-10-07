import { Controller } from 'react-hook-form';

import { TagProps, Tag } from '@/app/features/recipes/types/types'

export default function TagInput({tags, control }:TagProps) {
    return (
            <section>
                <div aria-label="tag section" className='my-8 max-w-xl'>
                <p className='font-semibold lg:text-xl'>Tags</p> 
                    <div className='flex flex-row border-2 border-gray-300 rounded-sm p-2'>
                        <Controller
                        name="tags" 
                        control={control}
                        rules={{ required: false }} 
                        render={({ field: { onChange, value } }) => (
                            <ul className='flex flex-wrap'>
                            {tags?.map((tag: Tag) => {
                                const isSelected = value.includes(tag.id);
                                return (
                                <li key={tag.id} className="inline-block m-1">
                                    <button
                                    aria-label={tag.name}
                                    type="button"
                                    onClick={() => {
                                        const newSelectedIds = isSelected
                                        ? value.filter((id) => id !== tag.id) // Remove tag
                                        : [...value, tag.id]; // Add tag
                                        onChange(newSelectedIds); // Update React Hook Form state
                                    }}
                                    className={`border-2 font-medium rounded-full px-2 py-1 text-center
                                                ${isSelected
                                                ? 'bg-red-600 text-white border-red-600' // Selected 
                                                : 'text-gray-900 border-red-600 hover:bg-red-200' // Unselected 
                                                }`}> {tag.name} 
                                    </button>
                                </li>
                                );
                            })}
                            </ul>
                        )}
                        />
                    </div>
                </div>
            </section>     
    )
}