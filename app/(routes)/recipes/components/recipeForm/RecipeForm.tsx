'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, RecipeFormData } from "@/app/utils/validation/recipe";
import { useState } from 'react';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'; 
import Link from 'next/link';
import { useRouter } from "next/navigation";

import { VideoState, RecipeFormProps } from '@/app/types/types';
import { extractVideoId, nameFormatter, mergeIngredients } from '@/app/utils/utils';
import { upsertRecipe } from "@/app/(routes)/recipes/actions"; 
import MainImageUpload from '@/app/(routes)/recipes/components/recipeForm/MainImageUpload';
import NameInput from '@/app/(routes)/recipes/components/recipeForm/NameInput';
import DurationInput from '@/app/(routes)/recipes/components/recipeForm/DurationInput';
import CuisineTagInput from '@/app/(routes)/recipes/components/recipeForm/CuisineTagInput';
import MainIngredientTagInput from '@/app/(routes)/recipes/components/recipeForm/MainIngredientTagInput';
import ServingInput from '@/app/(routes)/recipes/components/recipeForm/ServingInput';
import StepsInput from '@/app/(routes)/recipes/components/recipeForm/StepsInput';
import NotesInput from '@/app/(routes)/recipes/components/recipeForm/NotesInput';
import VideoInput from '@/app/(routes)/recipes/components/recipeForm/VideoInput';
import MainIngredientInput from '@/app/(routes)/recipes/components/recipeForm/MainIngredientInput';
import OptionalIngredientInput from '@/app/(routes)/recipes/components/recipeForm/OptionalIngredientInput';
import SauceIngredientInput from '@/app/(routes)/recipes/components/recipeForm/SauceIngredientInput';
import { uploadImage } from '@/app/(routes)/recipes/actions';

const videoDefaultValues: VideoState = {
    videoId: '',
    isVideoValid: false,
    errorMessage: ''
}
const submitSuccessMsg = 'Your recipe has been successfully saved!'
const submitErrorMsg = 'Sorry, something went wrong. Please try again.'
const unavailableImg = 'https://uzedwhzjchxkoacuansf.supabase.co/storage/v1/object/public/recipe-image/recipe-main/unavailable.png'

const CREATE_DEFAULT_VALUES: RecipeFormData = {
    recipe_name: '',
    created_user_id: '',
    duration: 30,
    serving: 2,
    main_ingredient_tag: 1,
    cuisine_tag: 1,
    steps: [{id: 1, photo_id: undefined, desc: "" }],
    img_link: "",
    external_link: "",
    notes: [{id: 1, desc:""}],
    main_ingredients: [{id:1, ingredient_name:"", quantity: 0, unit: "", type: "main"}],
    optional_ingredients: [],
    sauce_ingredients: []        
}

const blob = new Blob([], { type: 'image/png'})
export const emptyFile = new File([blob], "null_img.png")

export function RecipeForm({ mainIngredientTag, mode, defaultValues, recipeId, userId} : RecipeFormProps) {
    const previewImg = defaultValues?.img_link || ""
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [msg, setMsg] = useState("")
    const [video, setVideo] = useState<VideoState>(videoDefaultValues)
    const [previewUrl, setPreviewUrl] = useState<string>(previewImg);
    const [selectedFile, setSelectedFile] = useState<File>(emptyFile);
    const router = useRouter();

    const formDefaultValues = () => {
        return mode === 'create' ? CREATE_DEFAULT_VALUES : defaultValues || CREATE_DEFAULT_VALUES
    }
    const { register, control, handleSubmit,
            getValues, setValue, resetField, watch, setError,
            formState: { errors }} = useForm<RecipeFormData>({
        resolver: zodResolver(recipeSchema),
        defaultValues: formDefaultValues()
    });
    const onSubmit = async (data:RecipeFormData) => {
        const ingredientsData = mergeIngredients(data)
        try {
            let imageUrl = data.img_link;
            if (selectedFile && selectedFile.name !== 'null_img.png') {
                const uploadResult = await uploadImage(selectedFile);
                if (!uploadResult.success) {
                    console.error('Image upload failed:', uploadResult);
                    return
                }
                imageUrl = uploadResult.url || ''; 
            }
            setIsSubmitting(true)
            const payload = {
              ...data,
              img_link: imageUrl || unavailableImg, 
              created_user_id: userId,   
              recipe_name: nameFormatter(data.recipe_name),
              duration: data.duration || 15,
              serving: data.serving || 1,
              main_ingredient_tag: data.main_ingredient_tag,
              cuisine_tag: data.cuisine_tag,
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
            const res = await upsertRecipe(payload, mode, recipeId); 
            if (res.success) {
                if (res.data) {
                setMsg(submitSuccessMsg)
                setTimeout(() => {
                    const publicId = res.data.public_id;
                    if (mode === 'create'){
                        router.push(`/recipes/${publicId}`) 
                    } else {
                        router.replace(`/recipes/${publicId}`) 
                    }
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
    <main className='min-h-screen lg:min-w-[800px] flex flex-col m-2 p-8 lg:m-10 items-center border-2 border-red-700'>
        <form className='lg:min-w-[600px] mx-auto' onSubmit={handleSubmit(onSubmit)} >
            <section> 
                <p className='font-semibold lg:text-xl'>Main photo</p>
                <div className='flex items-center justify-center'>
                    <MainImageUpload register={register} watch={watch} setValue={setValue} 
                                     previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} 
                                     selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                </div>
            </section>
            <NameInput register={register} errors={errors} />  
            <DurationInput register={register}/>
            <ServingInput register={register}/>
            <CuisineTagInput register={register}/>
            <MainIngredientTagInput mainIngredientTag={mainIngredientTag} control={control}/>
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
            <div className='my-8 max-w-xl '>
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
                              {mode === 'edit' ? 'Edit' : `${isSubmitting ? 'Creating...' : 'Create'}` } 
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