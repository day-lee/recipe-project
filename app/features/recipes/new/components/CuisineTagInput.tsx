import { InputProps } from '@/app/features/recipes/types/types'

export default function CuisineTagInput({register}:Omit<InputProps, "errors">) {
    return (
            <section>
                <div aria-label="cuisine tag section" className='my-8 max-w-xl'>
                <p className='font-semibold lg:text-xl pb-2'>Cuisine Tag</p> 
                    <div className='flex flex-row border-2 border-gray-300 rounded-sm p-2'>
                        <select aria-label="cuisine tag" id="duration" {...register('cuisine_tag', { valueAsNumber: true })}>
                            <option value="">All Cuisines</option>
                            <option value="1">Korean</option>
                            <option value="2">British</option>
                            <option value="3">Chinese</option>
                            <option value="4">Vietnamese</option>
                            <option value="5">Thai</option>
                            <option value="6">Italian</option>
                            <option value="7">Spanish</option>
                            <option value="8">Mexican</option>
                            <option value="9">French</option>
                            <option value="10">Middle East</option>
                        </select>
                    </div>
                </div>
            </section>     
    )
}