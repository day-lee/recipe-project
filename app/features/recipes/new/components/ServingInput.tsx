import { InputProps } from '@/app/features/recipes/types/types'

export default function ServingInput({register}:Omit<InputProps, "errors">) {
    return (
            <section>
                <div aria-label="serving section" className='flex flex-col my-8 max-w-xl'>
                    <p className='font-semibold lg:text-xl'>Serving</p> 
                    <div className='text-gray-600 border-2 border-gray-300 rounded-sm p-2'>
                        <select aria-label="serving" id="serving" {...register('serving', { valueAsNumber: true })}>
                        {/* <option value="">Serving</option> */}
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5 People</option>
                        </select>
                    </div>
                </div>
            </section>   

    )}