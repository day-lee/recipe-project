import { useFieldArray } from 'react-hook-form'
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; 
import { InputUseFieldArrayProps } from '@/app/types/types'

export default function NotesInput ({register, control, watch}: Omit<InputUseFieldArrayProps, "errors">) {
    const maxCharNote = 100
    const notes = watch('notes', []);
    const { fields: noteFields, append: appendNote, remove: removeNote }  
            = useFieldArray({control, name: "notes"})

    return (
            <section>
             <div aria-label="notes section" className='my-8 max-w-xl'>
                <div className='flex flex-row justify-between'>
                    <p className='font-semibold lg:text-xl'>Notes</p>
                    <button aria-label="add more notes button" type="button" 
                            onClick={() => appendNote({ id: 0, desc:""})}
                            className=' px-2 h-8 mx-2 rounded-sm hover:bg-red-200 font-semibold'> 
                        <div className='flex'>
                        <PlusCircleIcon className='w-6 h-6 text-red-500' /> Add more
                        </div>
                    </button>
                </div>
                <div className='border-2 border-gray-200 p-2 lg:p-4 my-4'> 
                {noteFields.map((field, index) => {
                    const currentDesc = notes?.[index]?.desc || ''
                    const charCount = currentDesc.length
                return (
                    <div key={field.id}>
                    <div  className='flex flex-row m-2 items-center'> 
                        <div className='flex items-center w-4 font-bold text-lg'> • </div>
                        <textarea 
                            maxLength={maxCharNote}
                            {...register(`notes.${index}.desc` as const)} 
                            className='border-2 w-full border-gray-300  mx-2 px-2 py-1 pl-2 rounded-sm resize-y min-h-20 max-h-24'
                             id="note" placeholder="Any tips?" /> 
                        <button aria-label="remove notes button" type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' onClick={() => removeNote(index)}>
                        <div className='flex'> <TrashIcon className="h-6 w-6 text-red-700" />  </div>
                        </button>    
                    </div> 
                    <div className='flex text-sm text-gray-600 justify-end mr-16'>
                        {charCount} / {maxCharNote}
                    </div>
                    </div>
                )})}
                </div>                       
            </div>
            </section> 
    )
}

          