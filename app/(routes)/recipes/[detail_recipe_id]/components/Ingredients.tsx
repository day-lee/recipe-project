'use client';

import { useState } from 'react';

import { IngredientsProps } from '@/app/types/types'

export default function Ingredients({ingredientsList, defaultServing}: IngredientsProps) {
    const [serving, setServing] = useState<number>(1);
    const [selectedValue, setSelectedValue] = useState<number>(defaultServing);
    const { mainIngredients, optionalIngredients, sauceIngredients} = ingredientsList

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedServing = Number(e.target.value)
        setSelectedValue(selectedServing)
        const count = Number((selectedServing / defaultServing).toFixed(1))
        setServing(count)
    }
return(
<section>
    <div className='flex flex-row items-center justify-between'>
        <div className='font-semibold text-2xl'>Ingredients</div> 
        <div className='mr-4'>
            <label htmlFor="serving"></label>
            <select id="serving" name="serving" className='border border-gray-300 rounded p-2' value={selectedValue} onChange={(e) => handleSelect(e)}>
                <option value=""> Serving</option>
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5 People</option>
            </select>
        </div>
    </div>
    <div className='border-2 border-gray-200 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] p-4 lg:p-8 my-4'>
        {mainIngredients.length > 0 && (<div className='my-4'> 
        <div className='font-semibold text-lg lg:text-xl'> Main ingredients </div>
            <ul className='mx-4'>
                {mainIngredients.map(item => <li key={item.id}> {item.ingredient_name} {item.quantity * serving}{item.unit} </li>)}
            </ul>
        </div>)}
        {optionalIngredients.length > 0 && (<div className='my-4'> 
            <div className='font-semibold text-lg lg:text-xl'> Optional ingredients </div>
            <ul className='mx-4'>
                {optionalIngredients.map(item => <li key={item.id}> {item.ingredient_name} {item.quantity * serving}{item.unit}</li>)}
            </ul>
        </div>) }
        {sauceIngredients.length > 0 && (<div className='my-4'> 
            <div className='font-semibold text-lg lg:text-xl'> Sauces </div>
            <ul className='mx-4'>
                {sauceIngredients.map(item => <li key={item.id}> {item.ingredient_name} {item.quantity * serving}{item.unit}</li>)}
            </ul>
        </div>)} 
    </div>
</section>    
)
}