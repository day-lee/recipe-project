import { useFieldArray } from 'react-hook-form'
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; 

import { IngredientsInputProps } from '@/app/types/types'
import { nameFormatter } from '@/utils/utils';

export default function OptionalIngredientInput ({register, getValues, errors, control,}: IngredientsInputProps) {
    const { fields: optionalIngredientFields, append: appendOptionalIngredient, remove: removeOptionalIngredient }  
            = useFieldArray({ control, name: "optional_ingredients"}) 
    const addOptionalIngredientsMsg = 'Click the “Add More” button above to add optional ingredients.'
    const OPTIONAL = getValues("optional_ingredients")
   return (
    <div aria-label="optional ingredient section" className='my-4'>
                     <div className='flex flex-row my-2 justify-between'>
                    <p className='font-semibold lg:text-xl'>Optional</p>  
                    <button aria-label="add more optional ingredient input button" type="button" 
                            onClick={() => appendOptionalIngredient({id:1, ingredient_name: "", quantity: 1, unit:"", type:'optional'})}
                                className=' font-medium  rounded-sm px-2 mx-2 hover:bg-red-200 hover:text-red-800'>
                            <div className='flex'>    
                            <PlusCircleIcon className='w-6 h-6 text-red-600' /> Add more 
                            </div>
                            </button>
                    </div>
                    <div className='border-2 border-gray-300 rounded-sm p-2'>
                       <p className='text-sm'>{OPTIONAL.length === 0 && `${addOptionalIngredientsMsg}` }</p>
                    <div>
                        {optionalIngredientFields.map((field, index) => (
                        <div key={field.id}>
                        <div  className='flex flex-col lg:flex-row items-center'>
                        <label htmlFor="ingredientName"></label>
                        <input 
                        id="ingredientName" type="text" placeholder="Ingredient name: e.g. Onion"
                        {...register(`optional_ingredients.${index}.ingredient_name`, {setValueAs: (v) => nameFormatter(v)})}
                        className='lg:w-2/3 w-full border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' 
                        /> 
                        <div className='flex flex-row'>
                            <label htmlFor="ingredientAmount"></label>
                            <input 
                            id="ingredientAmount" type="number"  placeholder="Amount"
                            {...register(`optional_ingredients.${index}.quantity`, { valueAsNumber: true } )}
                            className='w-full lg:w-3/5 border-2 lg:ml-2 border-gray-300 pl-2 py-1 rounded-sm my-2' /> 
                            <label htmlFor="ingredientUnit"></label>
                            <select 
                            id="ingredientUnit" 
                            {...register(`optional_ingredients.${index}.unit`)}
                            className='w-2/5 text-gray-600 border-2 ml-2 lg:mx-2 border-gray-300 rounded-sm px-2 my-2'>
                                <option value="">Unit</option>
                                <option value="tbsp">T</option>
                                <option value="tsp">t</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                                <option value=" cups">cups</option>
                                <option value=" pieces">pieces</option>
                                <option value="oz">oz</option>
                            </select>
                        </div>
                        <div>
                        <button aria-label="remove optional ingredients input button"  type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' 
                                onClick={() => removeOptionalIngredient(index)}> 
                            <div className='flex'> <TrashIcon className="h-6 w-6 text-red-600" />  </div>
                        </button>  
                        </div>  
                        </div>
                        <div>
                            {errors.optional_ingredients?.[index]?.ingredient_name && (<span className="text-red-600 text-sm pl-2">
                            {errors.optional_ingredients[index].ingredient_name.message}</span>)}  
                        </div>
                    </div>
                    ))}
                     </div>
                    </div>    
                </div>  
    )
}

          