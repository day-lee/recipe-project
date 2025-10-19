import { Controller } from 'react-hook-form';

import { TagProps, MainListIngredientTag } from '@/app/types/types'

export default function MainIngredientTagInput({mainIngredientTag, control }:TagProps) {
    return (
            <section>
                <div aria-label="tag section" className='my-8 max-w-xl'>
                <p className='font-semibold lg:text-xl pb-2'>Main Ingredient Tag <span className='text-sm'> (Please choose one)</span></p> 
                    <div className='flex flex-row border-2 border-gray-300 rounded-sm p-2'>
                        <Controller
                        name="main_ingredient_tag" 
                        control={control}
                        rules={{ required: true }} 
                        render={({ field: { onChange, value } }) => (
                            <ul className='flex flex-wrap'>
                            {mainIngredientTag?.map((tag: MainListIngredientTag) => {
                                const isSelected = value === tag.id;
                                return (
                                <li key={tag.id} className="inline-block m-1">
                                    <button
                                    aria-label={tag.tag_name}
                                    type="button"
                                    onClick={() => {
                                        onChange(isSelected ? null : tag.id) 
                                    }}
                                    className={`border-2 font-medium rounded-full px-2 py-1 text-center
                                                ${isSelected
                                                ? 'bg-red-600 text-white border-red-600' // Selected 
                                                : 'text-gray-900 border-red-600 hover:bg-red-200' // Unselected 
                                                }`}> {tag.tag_name} 
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