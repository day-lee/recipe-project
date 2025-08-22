import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { ClockIcon } from '@heroicons/react/24/solid'

import { Step, Note } from '../../../types/types'
import Ingredients from '../components/Ingredients'
import fallbackImg from '../../../assets/unavailable.png'

export default async function Page({ params }: {
    params: Promise<{ detail_recipe_id: number }>
}) {
const { detail_recipe_id } = await params     
const supabase = await createClient()
const { data: recipeDetail, error:recipeDetailError } = await supabase
        .rpc('edit_get_detail_recipe_with_tag', { detail_recipe_id: detail_recipe_id});
const { recipe_name, external_link, duration, img_link, tag_name, note, steps, serving } = recipeDetail[0]
if (recipeDetailError) {
    console.error('Error fetching recipes:', recipeDetailError);
    return <div>Error loading recipes</div>;
  }   
const { data: ingredients, error:recipeIngredientError } = await supabase
        .rpc('get_ingredients', { ingredient_recipe_id: detail_recipe_id});
if (recipeIngredientError) {
    console.error('Error fetching recipe ingredients:', recipeIngredientError);
    return <div>Error loading ingredients</div>;
  }    
    return (
        <main className='min-h-screen flex flex-col m-2 md:m-16 lg:m-32 items-center border-2 border-gray-200'>
            {img_link ? <Image className='m-8' priority={true} src={img_link} alt={recipe_name} width={400} height={150}/> 
                      : <Image className="m-8" src={fallbackImg} alt='fallbackImg' width={400} height={150}/>}
            <div className='text-3xl font-semibold'> {recipe_name}</div>   
            <div className='flex flex-row items-center m-4'>
                <ClockIcon className="h-6 w-6 ml-2 text-gray-500" />
                <div className='text-gray-700 ml-2'> <span> {duration} mins</span></div>
            </div>
            <div className='mb-4'>
                <ul className='flex flex-row'>{tag_name.map((tag: string) => 
                    (<li className='border-2 text-gray-800 border-red-600 rounded-full px-2 py-1 text-center mx-1' key={tag}>{tag}</li>))}</ul>
            </div>
            <Ingredients ingredientsList={ingredients} defaultServing={serving} />
            <section >
                <p className='font-semibold text-2xl'>Steps</p>
                <div className='border-2 border-gray-200 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] p-2 lg:p-8 my-4'> 
                    <div className='my-4 p-2'>
                        <ul className='flex flex-col'> 
                            {steps.map((item: Step) => <li className='flex flex-row' key={item.step}><div className='pr-4'>{item.step}.</div> 
                                                       <div className='mr-8'>{item.desc}</div></li> )}
                        </ul>
                    </div>
                </div>   
            </section>
            {external_link && (            
            <section>
                <p className='font-semibold text-2xl'>Video</p>
                    <div className="flex justify-center border-2 border-gray-200 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] lg:h-[350px] p-2 lg:p-8 my-4">
                        <iframe
                            src={`https://www.youtube.com/embed/${external_link}`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen />
                    </div>
            </section>)}
            {note && (
            <section >
                <p className='font-semibold text-2xl'>Notes</p>
                <div className='border-2 border-gray-200 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] p-2 lg:p-8 my-4'> 
                    <div className='my-4 p-2'> {note.map((item:Note) => <li key={item.id}>{item.desc}</li>)} </div>
                </div>   
            </section>
            )}
        </main>
    )
}