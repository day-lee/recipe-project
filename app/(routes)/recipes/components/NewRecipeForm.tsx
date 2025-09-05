'use client';

import { useForm } from 'react-hook-form'
import { submitForm, FormState } from '@/app/actions'
import { useState, useActionState } from 'react';

import Image from 'next/image'
import fallbackImg from '../../../assets/unavailable.png'

interface FormData {
    name: string;
    duration: number;
    serving: number;
    steps: string;
    img_link: string;
    external_link: string;
    note: string;
    main_ingredient_name: string;
    main_ingredient_amount: string;
    main_ingredient_unit: string;
}

export function NewRecipeForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>();
    const initialState: FormState = { message: ''};
    const [state, formAction, pending] = useActionState(submitForm, initialState);
    
    const onSubmit = async (data:FormData) => {
        console.log('Form data:', data);
        setIsSubmitting(true)
        const formData = new FormData();
        try {
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value)
            })
            console.log('Form data:', data);
            formAction(formData);
        }
        catch (error) {
            console.error('Error creating recipe:', error)
        } finally {
            setIsSubmitting(false)
        }
    };
    
    return (
    <main className='min-h-screen flex flex-col m-2 p-8 lg:m-10 items-center border-2 border-gray-200'>
        <form onSubmit={handleSubmit(onSubmit)} >
            <section> 
                <p className='font-semibold text-2xl'>Main photo</p>
                photo upload - how to add image in next.js 
                <div className='flex items-center justify-center'>
                    <Image className="m-8" src={fallbackImg} alt='fallbackImg' width={300} height={150}/>
                </div>
            </section>
            <section> 
                <div className='my-8'> 
                    <p className='font-semibold text-2xl'>Recipe name</p> 
                    <label htmlFor="recipeName"></label>
                    <input className='border-2 w-full border-gray-300 pl-2 py-1 rounded-sm' 
                    id="name" type="text" placeholder="e.g. Kimchi stew"
                    {...register('name', {required: 'Recipe name is required'})}/>
                {errors.name && (
                    <span className="error-message">{errors.name.message}</span>
                )}  
                </div>   
            </section>    
            {/* <div> 
                <label htmlFor="name"> Name</label>
                <input id="name" type="text" 
                {...register('name', { required: 'Name is required'})} className='border-2 border-gray-700' />
                {errors.name && <p>{errors.name.message}</p>}
            </div> */}
            <section>
                <div className='flex items-center my-8'>
                    <p className='font-semibold text-2xl'>Cook time</p> 
                    <div className='text-gray-600 ml-2 border-2 border-gray-300 rounded-sm p-2'>
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
            <div className='flex items-center my-8'>
                    <p className='font-semibold text-2xl'>Serving</p> 
                    <div className='text-gray-600 ml-2 border-2 border-gray-300 rounded-sm p-2'>
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
                <p className='font-semibold text-2xl'>Tag TBC</p> 
                     bring all tags that belongs to a user 
                     <div className='flex flex-row border-2 border-gray-300 rounded-sm p-2 w-full h-40'>
                        <button className='border-2 h-1/3 border-red-700'>Korean</button>
                        <button className='border-2 h-1/3 border-red-700'>Soup</button>
                        <button className='border-2 h-1/3 border-red-700'>Pork</button>
                     </div>
                    {/* <ul className='flex flex-row'>{tag_name.map((tag: string) => 
                        (<li className='border-2 text-gray-800 border-red-600 rounded-full px-2 py-1 text-center mx-1' key={tag}>{tag}</li>))}</ul> */}
                </div>
            </section>     
            <section>
            <div className='my-8'>
                <p className='font-semibold text-2xl'>Ingredients</p> 
                ingredients form - dynamically adding new inputs
                <div className='my-4'>
                    <div className='flex flex-row'>
                    <p className='font-semibold text-2xl'>Main</p>  
                    <button className='border-2 border-red-600'> Add more ingredients </button>
                    </div>
                    <div className='border-2 border-gray-300 rounded-sm p-2'>
                        <label htmlFor=""></label>
                        <input 
                        id="ingredientName" type="text" placeholder="Ingredient name: e.g. Chicken"
                        {...register('main_ingredient_name', {required: 'Main ingredients required'})}
                        className='w-full border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' 
                        /> 
                        <div className='flex flex-row'>
                            <label htmlFor=""></label>
                            <input 
                            id="ingredientAmount" type="text" placeholder="Ingredient amount: e.g. 100"
                            {...register('main_ingredient_amount', {required: 'Main ingredients amount required'})}
                            className='w-full lg:w-3/5 border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' /> 
                            <label htmlFor=""></label>
                            <select 
                            {...register('main_ingredient_unit', {required: 'Main ingredients unit required'})}
                            className='w-2/5 text-gray-600 ml-2 border-2 border-gray-300 rounded-sm px-2 my-2'>
                                <option value="">Unit</option>
                                <option value="tbsp">T</option>
                                <option value="tsp">t</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                                <option value="cups">cups</option>
                                <option value="pieces">pieces</option>
                                <option value="oz">oz</option>
                            </select>
                        </div>
                    </div>    
                </div>
                <div className='my-4'>
                    <div className='flex flex-row'>
                    <p className='font-semibold text-2xl'>Optional</p>  
                    <button className='border-2 border-red-600'> Add more ingredients </button>
                    </div>
                    <div className='border-2 border-gray-300 rounded-sm p-2'>
                        <label htmlFor=""></label>
                        <input className='w-full border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' id="ingredientName" type="text" placeholder="Ingredient name: e.g. Chicken" /> 
                        <div className='flex flex-row'>
                            <label htmlFor=""></label>
                            <input className='w-full lg:w-3/5 border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' id="ingredientAmount" type="text" placeholder="Ingredient amount: e.g. 100"/> 
                            <label htmlFor=""></label>
                            <select className='w-2/5 text-gray-600 ml-2 border-2 border-gray-300 rounded-sm px-2 my-2'>
                                <option value="">Unit</option>
                                <option value="tbsp">T</option>
                                <option value="tsp">t</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                                <option value="cups">cups</option>
                                <option value="pieces">pieces</option>
                                <option value="oz">oz</option>
                            </select>
                        </div>
                    </div>    
                </div>
                <div className='my-4'>
                    <div className='flex flex-row'>
                    <p className='font-semibold text-2xl'>Sauce</p>  
                    <button className='border-2 border-red-600'> Add more ingredients </button>
                    </div>
                    <div className='border-2 border-gray-300 rounded-sm p-2'>
                        <label htmlFor=""></label>
                        <input className='w-full border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' id="ingredientName" type="text" placeholder="Ingredient name: e.g. Chicken" /> 
                        <div className='flex flex-row'>
                            <label htmlFor=""></label>
                            <input className='w-full lg:w-3/5 border-2 border-gray-300 pl-2 py-1 rounded-sm my-2' id="ingredientAmount" type="text" placeholder="Ingredient amount: e.g. 100"/> 
                            <label htmlFor=""></label>
                            <select className='w-2/5 text-gray-600 ml-2 border-2 border-gray-300 rounded-sm px-2 my-2'>
                                <option value="">Unit</option>
                                <option value="tbsp">T</option>
                                <option value="tsp">t</option>
                                <option value="g">g</option>
                                <option value="kg">kg</option>
                                <option value="ml">ml</option>
                                <option value="l">l</option>
                                <option value="cups">cups</option>
                                <option value="pieces">pieces</option>
                                <option value="oz">oz</option>
                            </select>
                        </div>
                    </div>    
                </div>
                </div>
            </section>     
            <section >
                <div className='flex flex-row'>
                    <p className='font-semibold text-2xl'>Steps</p>
                    <button className='border-2 border-red-600'> Add more steps</button>
                </div>
                {/* <div className=' border-2 border-gray-200 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] p-2 lg:p-8 my-4'>  */}
                    <div className='flex flex-row'>
                        <label htmlFor="steps"></label>
                        <input  id="steps" type="textarea" placeholder="e.g. Cut onion thinly" 
                                // {...register('steps', {required: 'Steps are required'})}
                                {...register('steps')}

                                className='border-2 border-gray-300 pl-2 py-1 rounded-sm w-2/3'/> 
                        <button className="border-2 border-red-600">
                        <Image className="m-8" src={fallbackImg} alt='fallbackImg' width={100} height={50}/>
                        </button>

                        {/* <ul className='flex flex-col'> 
                            {steps.map((item: Step) => <li className='flex flex-row' key={item.step}><div className='pr-4'>{item.step}.</div> 
                                                       <div className='mr-8'>{item.desc}</div></li> )}
                        </ul> */}
                    {/* </div> */}
                </div>   
            </section>
            <section>
                <div className='my-8'>
                    <p className='font-semibold text-2xl'>Video</p>
                    <div className='flex flex-col justify-center items-center'>
                    {/* <div className="flex justify-center border-2 border-gray-200 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] lg:h-[350px] p-2 lg:p-8 my-4"> */}
                        <p> * Youtube id extract - https://youtu.be/wttA0mcstQc?si=3TIV0aZNVKV-eCVK
                        프리뷰 보여줄 수 있다면 등록 버튼? </p>
                        <input id="external_link"
                        // {...register('img_link', {required: 'Video link is required'})}
                        {...register('external_link')}

                         className='border-2 w-full border-gray-300 pl-2 py-1 rounded-sm' type="text" placeholder="https://youtu.be/..." /> 
                        <Image className="m-8" src={fallbackImg} alt='fallbackImg' width={200} height={150}/>
                    </div>
                </div>    
            </section>
            <section >
                <div className='flex flex-row'>
                    <p className='font-semibold text-2xl'>Notes</p>
                    <button className='border-2 border-red-600'> Add more note </button>
                </div>
                <div className="w-full"> 
                    {/* <div className='my-4 p-2'> {note.map((item:Note) => <li key={item.id}>{item.desc}</li>)} </div> */}
                    <label htmlFor="note"></label>
                    <input 
                    // {...register('note', {required: 'Note is required'})}
                    {...register('note')}
                    className='border-2 w-full h-20 border-gray-300 pl-2 py-1 rounded-sm' type="textarea" id="note" placeholder="Any tips?" /> 
                </div>   
            </section>

            <div className='flex justify-between my-8 '>
                <div>    
                <button className='border-2 border-red-600'>Cancel</button>
                </div>
                <div>
                <button type="submit" className='border-2 border-red-600'> {isSubmitting ? 'Creating Recipe...' : 'Create Recipe'}</button>
                <button type="submit" disabled={pending}> pending create recipe test</button>
                
                </div>
            </div>            
             {/* Display the success message returned from the server */}
            {state.message && <p className="mt-4 text-green-600">{state.message}</p>}
        </form>
    </main>
    )
}