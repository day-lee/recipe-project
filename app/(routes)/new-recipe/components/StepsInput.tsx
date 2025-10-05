import { useFieldArray } from 'react-hook-form'
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; 
import { InputUseFieldArrayProps } from '@/app/types/types'

export default function StepsInput ({register, errors, control, watch}: InputUseFieldArrayProps) {
    const maxCharStep = 150;
    const steps = watch('steps', []);
    const { fields: stepFields, append: appendStep, remove: removeStep } 
            = useFieldArray({control, name: "steps"});
    return (
  <section >
            <div aria-label="steps section" className='my-8 max-w-xl'>
                <div className='flex flex-row justify-between mt-8 max-w-xl'>
                    <p className='font-semibold lg:text-xl'>Steps</p>
                    <button aria-label="add more steps button" type="button" 
                            onClick={() => appendStep({ id: 0, photo_id: 0, desc:""})}
                            className='font-medium px-2 h-8 mx-2 rounded-sm hover:bg-red-200 '> 
                     <div className='flex'>
                        <PlusCircleIcon className='w-6 h-6 text-red-600' /> Add more
                        </div></button>
                </div>
                <div className='border-2 border-gray-200 p-2 lg:p-4 my-4'> 
                {stepFields.map((field, index) => { 
                    const currentDesc = steps?.[index]?.desc || ''
                    const charCount = currentDesc.length
                    return(
                    <div key={field.id}>
                    <div className='w-full'>
                    <div className='flex flex-row m-2 items-center'> 
                        <div className='flex items-center w-4 font-bold text-lg'>{index + 1}</div>
                        <textarea 
                        className='border-2 border-gray-300 mx-2 px-2 py-1 rounded-sm w-full h-16 resize-y min-h-20 max-h-32'
                            maxLength={maxCharStep}
                            placeholder="e.g. Thinly slice the onion" 
                                {...register(`steps.${index}.desc` as const)}/>
                           
                        <button aria-label="remove steps button" type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' onClick={() => removeStep(index)}> 
                            <div className='flex'> <TrashIcon className="h-6 w-6 text-red-600" />  </div>
                        </button>  
                        </div>
                    </div> 
                    <div className=''>
                        <div className='flex'>
                         {errors.steps?.[index]?.desc ? (<span className="text-red-600 pl-8 text-sm w-9/12">
                         {errors.steps[index].desc.message}</span>):(<span className='w-9/12'></span>)}
                         <span className='flex text-sm text-gray-600 justify-end w-1/6 pr-4'>  {charCount} / {maxCharStep} </span>
                        </div>
                    </div>
                    </div>
                )})}
                </div>    
                </div>
            </section>
    )
}

          