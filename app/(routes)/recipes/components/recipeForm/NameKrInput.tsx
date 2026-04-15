import { InputProps } from '@/app/types/types'

export default function NameKrInput({register, errors}: InputProps) {
    return (
        <section>
            <div aria-label="name kr section" className='flex flex-col max-w-xl'>
                <div className='mt-8 flex flex-col'>
                    <p className='font-semibold lg:text-xl pb-2'>Recipe name (Korean)<span className='text-red-600'>*</span></p>
                    <label htmlFor="nameKr"></label>
                    <input
                        className='border-2 border-gray-300 p-2 rounded-sm'
                        id="nameKr"
                        type="text"
                        placeholder='e.g. 김치찌개'
                        {...register('recipe_name_kr')}
                    />
                </div>
                <div>
                    {errors.recipe_name_kr && (<span className="text-red-700 text-sm">{errors.recipe_name_kr.message}</span>)}
                </div>
            </div>
        </section>
    )
}
