import { InputProps } from '@/app/types/types'

export default function DurationInput({register}:Omit<InputProps, "errors">) {
    return (
            <section>
                <div aria-label="duration section" className='flex flex-col my-8 max-w-xl'>
                    <p className='font-semibold lg:text-xl pb-2'>Cook time</p> 
                    <div className='text-gray-600 border-2 border-gray-300 rounded-sm p-2'>
                        <select aria-label="cook time" id="duration" {...register('duration', { valueAsNumber: true })}>
                            {/* <option value="">Cook time</option> */}
                            <option value="15">15 mins</option>
                            <option value="30">30 mins</option>
                            <option value="45">45 mins</option>
                            <option value="60">60 mins</option>
                            <option value="90">90 mins</option>
                            <option value="120">120 mins</option>
                        </select>
                    </div>
                </div>
            </section>

    )}