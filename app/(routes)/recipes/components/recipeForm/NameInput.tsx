import { InputProps } from '@/app/types/types'

export default function NameInput({register, errors}:InputProps) {
    return (
            <section> 
                <div aria-label="name section" className='flex flex-col max-w-xl'>
                    <div className='mt-8 flex flex-col'> 
                        <p className='font-semibold lg:text-xl pb-2'>Recipe name<span className='text-red-600'>*</span></p> 
                        <label htmlFor="recipeName"></label>
                        <input className='border-2 border-gray-300 p-2 rounded-sm' 
                        id="name" type="text" placeholder="e.g. Kimchi stew"
                        {...register('recipe_name')}/>
                    </div>
                    <div>
                    {errors.recipe_name && (<span className="text-red-700 text-sm">{errors.recipe_name.message}</span>)}  
                    </div>
                </div>   
            </section>    
    )
}