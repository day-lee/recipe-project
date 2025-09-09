'use client';

import { useForm, getValues, useFieldArray } from 'react-hook-form'
import { useState, useActionState } from 'react';
import { PlusCircleIcon, TrashIcon, XCircleIcon } from '@heroicons/react/24/outline'; 
import Link from 'next/link'

import Image from 'next/image'
import fallbackImg from '../../../assets/unavailable.png'
import { FormData, FormSubmitData, VideoState, Ingredient } from '@/app/types/types'
import { extractVideoId, nameFormatter } from '@/utils/utils'
import { createRecipeAction, submitForm, FormState } from "@/app/actions"; 
import ImageFileUpload from '@/app/(routes)/new-recipe/components/ImageFileUpload'

const videoErrorMsg = 'Please check the YouTube video URL.'
const videoDefaultValues: VideoState = {
    videoId: '',
    isVideoValid: false,
    errorMessage: ''
}

export function NewRecipeForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [video, setVideo] = useState<VideoState>(videoDefaultValues)
    const { register, control, handleSubmit, getValues, resetField, formState: { errors }} = useForm<FormSubmitData>({
        defaultValues: {
            recipe_name: '',
            duration: 30,
            serving: 2,
            steps: [{id: 1, photo_id: 1, desc: "" }],
            img_link: "",
            external_link: "",
            note: [{id: 1, desc:""}],
            // UX improvement: optional, Sauce default show no input 
            main_ingredients: [{id:1, ingredient_name: "", quantity: undefined, unit:"",
                                is_main: true, is_optional: false, is_sauce: false}], 
            optional_ingredients: [{id:1, ingredient_name: "", quantity: 0, unit:"",
                                is_main: false, is_optional: true, is_sauce: false}],
            sauce_ingredients: [{id:1, ingredient_name: "", quantity: 0, unit:"",
                                 is_main: false, is_optional: false, is_sauce: true}]                                                              
        }
    });
    // const initialState: FormState = { message: ''};
    // const [state, formAction, pending] = useActionState(submitForm, initialState);
    const addThumbnail = () => {
        const externalVideoLink = getValues("external_link")
        const id = extractVideoId(externalVideoLink)
        if (id){
            setVideo({
                videoId: id,
                isVideoValid: true,
                errorMessage: ''
            })
        } else {
            setVideo({
                videoId: '',
                isVideoValid: false,
                errorMessage: videoErrorMsg
            })
        }
    }
    const removeThumbnail = () => {
        resetField("external_link");
        setVideo({
            videoId: '',
            isVideoValid: false,
            errorMessage: ''
        })
    }
    const onSubmit = async (data:FormSubmitData) => {
        const mainIngredients = data.main_ingredients.map((item, idx) => ({
            id: idx + 1, ingredient_name: nameFormatter(item.ingredient_name), quantity: item.quantity, unit:item.unit,
                is_main: true, is_optional: false, is_sauce: false
            }))
        const optionalIngredients =  data.optional_ingredients.map((item, idx) => ({
            id: idx + 1, ingredient_name: nameFormatter(item.ingredient_name), quantity: item.quantity, unit:item.unit,
                is_main: false, is_optional: true, is_sauce: false
            }))  
        const sauceIngredients = data.sauce_ingredients.map((item, idx) => ({
            id: idx + 1, ingredient_name: nameFormatter(item.ingredient_name), quantity: item.quantity, unit:item.unit,
                is_main: false, is_optional: false, is_sauce: true
            }))       
        const ingredientsData = [...mainIngredients, ...optionalIngredients, ...sauceIngredients]
        try {
            setIsSubmitting(true)
            const payload = {
              ...data,
              img_link: "img-link", 
              created_user_id: 2,   
              recipe_name: nameFormatter(data.recipe_name),
              duration: data.duration || 15,
              serving: data.serving || 1,
              external_link: extractVideoId(data.external_link) ?? "",
              steps: data.steps.map((step, idx) => ({
                id: idx + 1,
                desc: step.desc,
                photo_id: 1,
              })),
              note: data.note.map((item, idx) => ({
                id: idx + 1,
                desc: item.desc,
              })),
            ingredients: ingredientsData
            };
            const res = await createRecipeAction(payload);  
            console.log("Recipe form inserted:", res);
        } catch(error){
            console.error('Error:', error)
        } finally{
            setIsSubmitting(false)
        }}

    const { fields: stepFields, append: appendStep, remove: removeStep } = useFieldArray({
        control,
        name: "steps"
    });
    const { fields: noteFields, append: appendNote, remove: removeNote } = useFieldArray({
        control,
        name: "note"
    })
    const { fields: mainIngredientFields, append: appendMainIngredient, remove: removeMainIngredient } = useFieldArray({
        control,
        name: "main_ingredients"
    })
    const { fields: optionalIngredientFields, append: appendOptionalIngredient, remove: removeOptionalIngredient } = useFieldArray({
        control,
        name: "optional_ingredients"
    }) 
    const { fields: sauceIngredientFields, append: appendSauceIngredient, remove: removeSauceIngredient } = useFieldArray({
        control,
        name: "sauce_ingredients"
    }) 
    return (
    <main className='min-h-screen lg:min-w-[800px] flex flex-col m-2 p-8 lg:m-10 items-center border-2 border-gray-200'>
        <form className='lg:min-w-[600px]' onSubmit={handleSubmit(onSubmit)} >
            <section> 
                <p className='font-semibold lg:text-xl'>Main photo</p>
                <div className='flex items-center justify-center'>
                    <ImageFileUpload />
                </div>
            </section>
            <section> 
                <div className='flex flex-col'>
                    <div className='mt-8 flex flex-col'> 
                        <p className='font-semibold lg:text-xl'>Recipe name</p> 
                        <label htmlFor="recipeName"></label>
                        <input className='border-2 border-gray-300 p-2 rounded-sm' 
                        id="name" type="text" placeholder="e.g. Kimchi stew"
                        {...register('recipe_name', { setValueAs: (v) => nameFormatter(v), required: 'Recipe name is required'})}/>
                    </div>
                    <div>
                    {errors.recipe_name && (<span className="text-red-600">{errors.recipe_name.message}</span>)}  
                    </div>
                </div>   
            </section>    
            <section>
                <div className='flex flex-col my-8'>
                    <p className='font-semibold lg:text-xl'>Cook time</p> 
                    <div className='text-gray-600 border-2 border-gray-300 rounded-sm p-2'>
                        <select id="duration" {...register('duration', {required: 'Please select cook time'})}>
                            {/* <option value="">Cook time</option> */}
                            <option value="15">15 mins</option>
                            <option value="30">30 mins</option>
                            <option value="60">60 mins</option>
                            <option value="90">90 mins</option>
                            <option value="120">120 mins</option>
                        </select>
                    </div>
                </div>
            </section>
            <section>
            <div className='flex flex-col my-8'>
                    <p className='font-semibold lg:text-xl'>Serving</p> 
                    <div className='text-gray-600 border-2 border-gray-300 rounded-sm p-2'>
                        <select id="serving" {...register('serving', {required: 'Please select serving'})}>
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
            <section>
                <div className='my-8 '>
                <p className='font-semibold lg:text-xl'>Tag TBC</p> 
                     bring all tags that belongs to a user 
                     <div className='flex flex-row border-2 border-gray-300 rounded-sm p-2 w-full h-40 gap-2'>
                        <button className='border-2 h-1/3 border-red-700 px-2'>Korean</button>
                        <button className='border-2 h-1/3 border-red-700 px-2'>Soup</button>
                        <button className='border-2 h-1/3 border-red-700 px-2'>Pork</button>
                     </div>
                    {/* <ul className='flex flex-row'>{tag_name.map((tag: string) => 
                        (<li className='border-2 text-gray-800 border-red-600 rounded-full px-2 py-1 text-center mx-1' key={tag}>{tag}</li>))}</ul> */}
                </div>
            </section>     
            <section>
            <div className='my-8'>
                <p className='font-semibold lg:text-xl'>Ingredients</p> 
                <div className='my-4'>
                    <div className='flex flex-row my-2 justify-between'>
                    <p className='font-semibold lg:text-xl'>Main</p>  
                    <button type="button" 
                            onClick={() => appendMainIngredient({id:1, ingredient_name: "", quantity: 1, unit:"",
                                is_main: true, is_optional: false, is_sauce: false})}
                            className=' font-medium  rounded-sm px-2 mx-2 hover:bg-red-200 hover:text-red-800'>
                            <div className='flex'>    
                            <PlusCircleIcon className='w-6 h-6 text-red-600' /> Add more
                            </div>
                            </button>
                    </div>
                    <div className='border-2 border-gray-300 rounded-sm p-2'>

                    {mainIngredientFields.map((field, index) => (
                        <div key={field.id} className='flex flex-col lg:flex-row items-center'>
                        <label htmlFor="ingredientName"></label>
                        <input 
                        id="ingredientName" type="text" placeholder="Ingredient name: e.g. Chicken"
                        {...register(`main_ingredients.${index}.ingredient_name`, {setValueAs: (v) => nameFormatter(v), required: 'Main ingredient is required'})}
                        className='lg:w-2/3 w-full border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' 
                        /> 
                        <div className='flex flex-row'>
                            <label htmlFor="ingredientAmount"></label>
                            <input 
                            id="ingredientAmount" type="text" placeholder="Amount"
                            {...register(`main_ingredients.${index}.quantity`, {required: 'Main ingredients amount required'})}
                            className='w-full lg:w-3/5 border-2 lg:ml-2 border-gray-300 pl-2 py-1 rounded-sm my-2' /> 
                            <label htmlFor="ingredientUnit"></label>
                            <select 
                            id="ingredientUnit" 
                            {...register(`main_ingredients.${index}.unit`, {required: 'Main ingredients unit required'})}
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
                        <button type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' onClick={() => removeMainIngredient(index)}> 
                            <div className='flex'> <TrashIcon className="h-6 w-6 text-red-600" /> </div>
                        </button>    
                        </div>
                        </div>
                    ))}
                    </div>  
                </div>
                <div className='my-4'>
                     <div className='flex flex-row my-2 justify-between'>
                    <p className='font-semibold lg:text-xl'>Optional</p>  
                    <button type="button" 
                            onClick={() => appendOptionalIngredient({id:1, ingredient_name: "", quantity: 1, unit:"",
                                is_main: false, is_optional: true, is_sauce: false})}
                                className=' font-medium  rounded-sm px-2 mx-2 hover:bg-red-200 hover:text-red-800'>
                            <div className='flex'>    
                            <PlusCircleIcon className='w-6 h-6 text-red-600' /> Add more 
                            </div>
                            </button>
                    </div>
                    <div className='border-2 border-gray-300 rounded-sm p-2'>
                    {optionalIngredientFields.map((field, index) => (
                        <div key={field.id} className='flex flex-col lg:flex-row items-center'>
                        <label htmlFor="ingredientName"></label>
                        <input 
                        id="ingredientName" type="text" placeholder="Ingredient name: e.g. Chicken"
                        {...register(`optional_ingredients.${index}.ingredient_name`, {setValueAs: (v) => nameFormatter(v)})}
                        className='lg:w-2/3 w-full border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' 
                        /> 
                        <div className='flex flex-row'>
                            <label htmlFor="ingredientAmount"></label>
                            <input 
                            id="ingredientAmount" type="text" placeholder="Amount"
                            {...register(`optional_ingredients.${index}.quantity` )}
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
                        <button type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' onClick={() => removeOptionalIngredient(index)}> 
                            <div className='flex'> <TrashIcon className="h-6 w-6 text-red-600" />  </div>
                        </button>    
                        </div>
                        </div>
                    ))}
                     </div>
                    </div>    
                </div> 
                <div className='my-4'>
                     <div className='flex flex-row my-2 justify-between'>
                    <p className='font-semibold lg:text-xl'>Sauce</p>  
                    <button type="button" 
                            onClick={() => appendSauceIngredient({id:1, ingredient_name: "", quantity: 1, unit:"",
                                is_main: false, is_optional: false, is_sauce: true})}
                                className='font-medium rounded-sm px-2 mx-2 hover:bg-red-200 hover:text-red-800'>
                            <div className='flex'>    
                            <PlusCircleIcon className='w-6 h-6 text-red-600' /> Add more 
                            </div>
                            </button>
                    </div>
                    <div className='border-2 border-gray-300 rounded-sm p-2'>
                    {sauceIngredientFields.map((field, index) => (
                        <div key={field.id} className='flex flex-col lg:flex-row items-center'>
                        <label htmlFor="ingredientName"></label>
                        <input 
                        id="ingredientName" type="text" placeholder="Ingredient name: e.g. Chicken"
                        {...register(`sauce_ingredients.${index}.ingredient_name`, {setValueAs: (v) => nameFormatter(v)})}
                        className='lg:w-2/3 w-full border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' 
                        /> 
                        <div className='flex flex-row'>
                            <label htmlFor="ingredientAmount"></label>
                            <input 
                            id="ingredientAmount" type="text" placeholder="Amount"
                            {...register(`sauce_ingredients.${index}.quantity` )}
                            className='w-full lg:w-3/5 border-2 lg:ml-2 border-gray-300 pl-2 py-1 rounded-sm my-2' /> 
                            <label htmlFor="ingredientUnit"></label>
                            <select 
                            id="ingredientUnit" 
                            {...register(`sauce_ingredients.${index}.unit`)}
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
                        <button type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' onClick={() => removeSauceIngredient(index)}>
                            <div className='flex'> <TrashIcon className="h-6 w-6 text-red-600" />  </div>
                        </button>  
                        </div>
                        </div>
                    ))}
                     </div>
                    </div>    
                 
            </section>     
            <section >
                <div className='flex flex-row justify-between mt-8'>
                    <p className='font-semibold lg:text-xl'>Steps</p>
                    <button type="button" 
                            onClick={() => appendStep({ id: 0, photo_id: 0, desc:""})}
                            className='font-medium px-2 h-8 mx-2 rounded-sm hover:bg-red-200 '> 
                     <div className='flex'>
                        <PlusCircleIcon className='w-6 h-6 text-red-600' /> Add more
                        </div></button>
                </div>
                <div className='border-2 border-gray-200 p-2 lg:p-4 my-4'> 
                {stepFields.map((field, index) => (
                    <div key={field.id} className='flex flex-row m-2 items-center'> 
                        <div className='flex items-center w-4 font-bold text-lg'>{index + 1}</div>
                        <textarea 
                            maxLength={150}
                            placeholder="e.g. Cut onion thinly" 
                            {...register(`steps.${index}.desc` as const)} 
                            className='border-2 border-gray-300 mx-2 px-2 py-1 rounded-sm w-full h-16 resize-y min-h-20 max-h-32'/>  
                        <button type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' onClick={() => removeStep(index)}> 
                        <div className='flex'> <TrashIcon className="h-6 w-6 text-red-600" />  </div>
                        </button>    
                    </div> 
                ))}
                </div>    
            </section>
            <section>
                <div className='my-8'>
                    <p className='font-semibold lg:text-xl'>Video</p>
                    <div className='flex flex-col justify-center border-2 border-gray-200 p-2 lg:p-4 my-4'> 
                        <div className='flex flex-col lg:flex-row'>
                        <input id="external_link" 
                            type="text"
                            {...register('external_link')}
                            className='border-2 w-full border-gray-300 pl-2 py-1 rounded-sm' placeholder="https://youtu.be/..." /> 
                            <button type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' onClick={(addThumbnail)}> <div className='flex'>
                                <PlusCircleIcon className='w-6 h-6 text-red-600 '/>Add</div></button>    
                            <button type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' onClick={removeThumbnail}>  
                                <div className='flex'> <TrashIcon className="h-6 w-6 text-red-600" />  </div></button>    
                        </div>
                        <div className='flex justify-center'> 
                        { video.isVideoValid && (
                            <div className='flex flex-col items-center'>
                           <Image className="m-6" src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`} alt='youtube thumbnail' width={300} height={150}/>
                            <p className='font-medium'>YouTube video registered successfully!</p>
                            </div>
                        )}
                        {!video.isVideoValid && video.errorMessage && (
                            <div className='flex flex-col items-center'>
                             <Image className="m-6" src={fallbackImg} alt='fallbackImg' width={200} height={150}/>
                             <p className='text-red-600 font-medium'>{video.errorMessage}</p>
                             </div>
                        )}
                        </div>
                    </div>
                </div>    
            </section>
            <section>
                <div className='flex flex-row justify-between'>
                    <p className='font-semibold lg:text-xl'>Notes</p>
                    <button type="button" 
                            onClick={() => appendNote({ id: 0, desc:""})}
                            className=' px-2 h-8 mx-2 rounded-sm hover:bg-red-200 font-semibold'> 
                        <div className='flex'>
                        <PlusCircleIcon className='w-6 h-6 text-red-500' /> Add more
                        </div>
                    </button>
                </div>
                <div className='border-2 border-gray-200 p-2 lg:p-4 my-4'> 
                {noteFields.map((field, index) => (
                    <div key={field.id} className='flex flex-row m-2 items-center'> 
                        <div className='flex items-center w-4 font-bold text-lg'> • </div>
                        <textarea 
                            maxLength={100}
                            {...register(`note.${index}.desc` as const)} 
                            className='border-2 w-full border-gray-300  mx-2 px-2 py-1 pl-2 rounded-sm resize-y min-h-20 max-h-24' id="note" placeholder="Any tips?" /> 
                        <button type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' onClick={() => removeNote(index)}>
                        <div className='flex'> <TrashIcon className="h-6 w-6 text-red-600" />  </div></button>    
                    </div> 
                ))}
                </div>
            </section>
            <div className='flex justify-between my-8 lg:text-xl '>
                <div className=' hover:bg-red-200 rounded-sm'>    
                <Link href={`/recipes`}>
                    <button className='h-8 '>
                        <div className='flex font-semibold items-center pr-2'>
                            <TrashIcon className='w-6 h-6 text-red-500 mx-2' /> Cancel
                        </div>
                    </button>
                    </Link>
                </div>
                <div className=' hover:bg-red-200 rounded-sm'>   
                    <button type="submit" className='h-8 '>
                        <div className='flex font-semibold items-center pr-2'>
                            <PlusCircleIcon className='w-6 h-6 text-red-500 mx-2' />
                            {isSubmitting ? 'Creating...' : 'Create'}
                        </div>
                    </button>
                    {/* <button type="submit" disabled={pending}> pending create recipe test</button> */}
                </div>
            </div>            
             {/* Display the success message returned from the server */}
            {/* {state.message && <p className="mt-4 text-green-600">{state.message}</p>} */}
        </form>
    </main>
    )
}