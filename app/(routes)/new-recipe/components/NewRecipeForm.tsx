'use client';

import { useForm } from 'react-hook-form';
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
import TagInput from '@/app/(routes)/new-recipe/components/TagInput';
import ServingInput from '@/app/(routes)/new-recipe/components/ServingInput';
import StepsInput from '@/app/(routes)/new-recipe/components/StepsInput';
import NotesInput from '@/app/(routes)/new-recipe/components/NotesInput';
import VideoInput from '@/app/(routes)/new-recipe/components/VideoInput';
import MainIngredientInput from '@/app/(routes)/new-recipe/components/MainIngredientInput';
import OptionalIngredientInput from '@/app/(routes)/new-recipe/components/OptionalIngredientInput';
import SauceIngredientInput from '@/app/(routes)/new-recipe/components/SauceIngredientInput';

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
            <TagInput  tags={tags} control={control}/>
            <section>
                <div className='my-8 max-w-xl'>
                    <p className='font-semibold lg:text-xl'>Ingredients</p> 
                    <MainIngredientInput register={register} errors={errors} control={control} />
                    <OptionalIngredientInput register={register} getValues={getValues} errors={errors} control={control} />
                    <SauceIngredientInput register={register} getValues={getValues} errors={errors} control={control} />
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