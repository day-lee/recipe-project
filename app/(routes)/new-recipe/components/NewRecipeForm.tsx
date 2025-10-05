'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, RecipeFormData } from "@/utils/validation/recipe";
import { useState } from 'react';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; 
import Link from 'next/link';
import { useRouter } from "next/navigation";

import { VideoState, Tag } from '@/app/types/types';
import { extractVideoId, nameFormatter, mergeIngredients } from '@/utils/utils';
import { createRecipeAction } from "@/app/actions"; 
import ImageFileUpload from '@/app/(routes)/new-recipe/components/ImageFileUpload';
import NameInput from '@/app/(routes)/new-recipe/components/NameInput';
import DurationInput from '@/app/(routes)/new-recipe/components/DurationInput';
import ServingInput from '@/app/(routes)/new-recipe/components/ServingInput';
import StepsInput from '@/app/(routes)/new-recipe/components/StepsInput';
import NotesInput from '@/app/(routes)/new-recipe/components/NotesInput';
import VideoInput from '@/app/(routes)/new-recipe/components/VideoInput';

const addOptionalIngredientsMsg = 'Click the “Add More” button above to add optional ingredients.'
const addSauceIngredientsMsg = 'Click the “Add More” button above to add sauce ingredients.'
const videoDefaultValues: VideoState = {
    videoId: '',
    isVideoValid: false,
    errorMessage: ''
}
const submitSuccessMsg = 'Your recipe has been successfully saved!'
const submitErrorMsg = 'Sorry, something went wrong. Please try again.'

export function NewRecipeForm({ tags } : { tags: Tag[] | []}) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [msg, setMsg] = useState("")
    const [video, setVideo] = useState<VideoState>(videoDefaultValues)
    const router = useRouter();
    const { register, control, handleSubmit,
            getValues, resetField, watch, setError,
            formState: { errors }} = useForm<RecipeFormData>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            recipe_name: '',
            duration: 30,
            serving: 2,
            tags: [],
            steps: [{id: 1, photo_id: undefined, desc: "" }],
            img_link: "",
            external_link: "",
            notes: [{id: 1, desc:""}],
            main_ingredients: [{id:1, ingredient_name:"", quantity: 0, unit: "", type:"main"}],
            optional_ingredients: [],
            sauce_ingredients: []
        }
    }
);
    const OPTIONAL = getValues("optional_ingredients")
    const SAUCE = getValues("sauce_ingredients")
    const onSubmit = async (data:RecipeFormData) => {
        const ingredientsData = mergeIngredients(data)
        try {
            setIsSubmitting(true)
            const payload = {
              ...data,
              img_link: "https://day-lee.github.io/recipe-book-food-photos/placeholder-image.png", 
              created_user_id: 2,   
              recipe_name: nameFormatter(data.recipe_name),
              duration: data.duration || 15,
              serving: data.serving || 1,
              tags: data.tags, 
              external_link: extractVideoId(data.external_link) ?? "",
              steps: data.steps.map((step, idx) => ({
                id: idx + 1,
                desc: step.desc,
                photo_id: 1,
              })),
              notes: data.notes.map((item, idx) => ({
                id: idx + 1,
                desc: item.desc,
              })),
            ingredients: ingredientsData
            };
            const res = await createRecipeAction(payload); 
            if (res.success) {
                if (res.data) {
                setMsg(submitSuccessMsg)
                setTimeout(() => {
                    const publicId = res.data[0].public_id;
                    router.push(`recipes/${publicId}`)            
                }, 1500)}
            } 
            else if (!res.success && res.errors) {
                 setMsg(submitErrorMsg)
                // Map server-side errors into RHF `setError`
                for (const [field] of Object.entries(res.errors)) {
                if (field in data) {
                setError(field as keyof RecipeFormData, {
                type: "server",
                message: "Invalid value",

                });
                } else if (field === "global") {
                setError("root", {
                type: "server",
                message: "global error",
                });}
                }}
            } catch(error){
                console.error('Error:', error)
            } finally{
                setIsSubmitting(false)
            }}

    const { fields: mainIngredientFields, append: appendMainIngredient, remove: removeMainIngredient }  
            = useFieldArray({ control, name: "main_ingredients" })
    const { fields: optionalIngredientFields, append: appendOptionalIngredient, remove: removeOptionalIngredient }  
            = useFieldArray({ control, name: "optional_ingredients"}) 
    const { fields: sauceIngredientFields, append: appendSauceIngredient, remove: removeSauceIngredient }  
            = useFieldArray({ control, name: "sauce_ingredients"}) 
    return (
    <main className='min-h-screen lg:min-w-[800px] flex flex-col m-2 p-8 lg:m-10 items-center border-2 border-gray-200'>
        <form className='lg:min-w-[600px] mx-auto' onSubmit={handleSubmit(onSubmit)} >
            <section> 
                <p className='font-semibold lg:text-xl'>Main photo</p>
                <div className='flex items-center justify-center'>
                    <ImageFileUpload />
                </div>
            </section>
            <NameInput register={register} errors={errors} />  
            <DurationInput register={register}/>
            <ServingInput  register={register}/>
            <section>
                <div aria-label="tag section" className='my-8 max-w-xl'>
                <p className='font-semibold lg:text-xl'>Tags</p> 
                    <div className='flex flex-row border-2 border-gray-300 rounded-sm p-2'>
                        <Controller
                        name="tags" 
                        control={control}
                        rules={{ required: false }} 
                        render={({ field: { onChange, value } }) => (
                            <ul className='flex flex-wrap'>
                            {tags?.map((tag: Tag) => {
                                const isSelected = value.includes(tag.id);
                                return (
                                <li key={tag.id} className="inline-block m-1">
                                    <button
                                    aria-label={tag.name}
                                    type="button"
                                    onClick={() => {
                                        const newSelectedIds = isSelected
                                        ? value.filter((id) => id !== tag.id) // Remove tag
                                        : [...value, tag.id]; // Add tag
                                        onChange(newSelectedIds); // Update React Hook Form state
                                    }}
                                    className={`border-2 font-medium rounded-full px-2 py-1 text-center
                                                ${isSelected
                                                ? 'bg-red-600 text-white border-red-600' // Selected 
                                                : 'text-gray-900 border-red-600 hover:bg-red-200' // Unselected 
                                                }`}> {tag.name} 
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
            <section>
            <div className='my-8 max-w-xl'>
                <p className='font-semibold lg:text-xl'>Ingredients</p> 
                <div aria-label="main ingredient section" className='my-4'>
                    <div className='flex flex-row my-2 justify-between'>
                    <p className='font-semibold lg:text-xl'>Main</p>  
                    <button aria-label="add more main ingredient input button" type="button" 
                            onClick={() => appendMainIngredient({id:1, ingredient_name: "", quantity: 1, unit:"", type:'main'})}
                            className=' font-medium  rounded-sm px-2 mx-2 hover:bg-red-200 hover:text-red-800'>
                            <div className='flex'>    
                            <PlusCircleIcon className='w-6 h-6 text-red-600' /> Add more
                            </div>
                            </button>
                    </div>
                    <div className='border-2 border-gray-300 rounded-sm p-2'>
                    <div>
                        {mainIngredientFields.map((field, index) => (
                        <div key={field.id}>
                        <div className='flex flex-col lg:flex-row items-center'>
                        <label htmlFor="ingredientName"></label>
                        <input 
                        id="ingredientName" type="text" placeholder="Ingredient name: e.g. Chicken"
                        {...register(`main_ingredients.${index}.ingredient_name`, {setValueAs: (v) => nameFormatter(v)})}
                        className='lg:w-2/3 w-full border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' 
                        /> 
                        <div className='flex flex-row'>
                            <label htmlFor="ingredientAmount"></label>
                            <input 
                            aria-label="main ingredient quantity"
                            id="ingredientAmount" type="number" placeholder="Amount"
                            {...register(`main_ingredients.${index}.quantity`, {valueAsNumber: true})}
                            className='w-full lg:w-3/5 border-2 lg:ml-2 border-gray-300 pl-2 py-1 rounded-sm my-2' /> 
                            <label htmlFor="ingredientUnit"></label>
                            <select 
                            aria-label="main ingredient unit"
                            id="ingredientUnit" 
                            {...register(`main_ingredients.${index}.unit`)}
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
                        <button aria-label="remove main ingredients input button" type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm'
                                onClick={() => removeMainIngredient(index)}> 
                            <div className='flex'> <TrashIcon className="h-6 w-6 text-red-600" /> </div>
                        </button>    
                        </div>
                    </div>
                    <div>
                        {errors.main_ingredients?.[index]?.ingredient_name && (<span className="text-red-600 text-sm pl-2">
                        {errors.main_ingredients[index].ingredient_name.message}</span>)}  
                    </div>
                    </div>
                    ))}
                    </div>
                    </div>  
                </div>
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
                <div aria-label="sauce ingredient section" className='my-4'>
                     <div className='flex flex-row my-2 justify-between'>
                    <p className='font-semibold lg:text-xl'>Sauce</p>  
                    <button aria-label="add more sauce ingredient input button" type="button" 
                            onClick={() => appendSauceIngredient({id:1, ingredient_name: "", quantity: 1, unit:"",
                                type: "sauce"})}
                                className='font-medium rounded-sm px-2 mx-2 hover:bg-red-200 hover:text-red-800'>
                            <div className='flex'>    
                            <PlusCircleIcon className='w-6 h-6 text-red-600' /> Add more 
                            </div>
                            </button>
                    </div>
                    <div className='border-2 border-gray-300 rounded-sm p-2'>
                    <p className='text-sm'>{SAUCE.length === 0 && `${addSauceIngredientsMsg}` }</p>
                    {sauceIngredientFields.map((field, index) => (
                        <div key={field.id}>
                        <div className='flex flex-col lg:flex-row items-center'>
                        <label htmlFor="ingredientName"></label>
                        <input 
                        id="ingredientName" type="text" placeholder="Ingredient name: e.g. Vinegar"
                        {...register(`sauce_ingredients.${index}.ingredient_name`, {setValueAs: (v) => nameFormatter(v)})}
                        className='lg:w-2/3 w-full border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' 
                        /> 
                        <div className='flex flex-row'>
                            <label htmlFor="ingredientAmount"></label>
                            <input 
                            id="ingredientAmount" type="number" placeholder="Amount"
                            {...register(`sauce_ingredients.${index}.quantity`, { valueAsNumber: true } )}
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
                        <button aria-label="remove sauce ingredients input button"  type="button" className='px-2 h-8 hover:bg-red-200 rounded-sm' 
                                onClick={() => removeSauceIngredient(index)}>
                            <div className='flex'> <TrashIcon className="h-6 w-6 text-red-600" />  </div>
                        </button>  
                        </div>
                        </div>
                        <div>
                        {errors.sauce_ingredients?.[index]?.ingredient_name && (<span className="text-red-600 text-sm pl-2">
                        {errors.sauce_ingredients[index].ingredient_name.message}</span>)}  
                    </div>
                    </div>
                    ))}
                     </div>
                    </div>    
                    </div>   
            </section>     
            <StepsInput register={register} errors={errors} control={control} watch={watch}/>
            <VideoInput register={register} resetField={resetField} getValues={getValues} video={video} setVideo={setVideo} />
            <NotesInput register={register} control={control} watch={watch}/>
            <div className='my-8 max-w-xl lg:text-xl '>
                <div className='flex flex-row justify-between max-w-xl'>
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
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                   { isSubmitting ? (<span className='font-medium text-xl- mt-4 w-1/2 h-8 bg-gray-300 rounded animate-pulse text-center'>Saving your recipe...</span>) : (<span className='font-medium text-xl mt-4'>{msg}</span>)}
                </div>
            </div>            
        </form>
    </main>
    )
}