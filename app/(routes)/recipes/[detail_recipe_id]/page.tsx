import Link from 'next/link';

import DetailCard from '@/app/(routes)/recipes/[detail_recipe_id]/components/DetailCard'
import { getDetailRecipeWithTag, getIngredients } from '@/app/(routes)/recipes/actions';

export default async function Page({ params }: {
    params: Promise<{ detail_recipe_id: string }>
}) {
const { detail_recipe_id: recipe_public_id } = await params     
const { data: recipeDetail, error: recipeError } = await getDetailRecipeWithTag(recipe_public_id)
const { id } = recipeDetail!;
const { data: ingredients, error: ingredientError } = await getIngredients(id)

if (recipeError || ingredientError || !recipeDetail || !ingredients) {
  return (
    <div className='flex flex-col items-center mt-20'> Cannot find the recipe. 
      <Link 
        href="/recipes" 
        className="mt-4 text-blue-500 hover:underline">
        Back to recipe list
      </Link>
    </div>
  )
} 
  return (
    <DetailCard recipeDetail={recipeDetail} ingredients={ingredients} />
  )
}