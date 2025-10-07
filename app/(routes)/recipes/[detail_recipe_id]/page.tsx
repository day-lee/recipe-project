import { createClient } from '@/lib/supabase/server'

import DetailCard from '@/app/features/recipes/detail_recipe_id/components/DetailCard'

export default async function Page({ params }: {
    params: Promise<{ detail_recipe_id: string }>
}) {
const { detail_recipe_id } = await params     
const supabase = await createClient()
const { data: recipeDetail, error:recipeDetailError } = await supabase
        .rpc('get_detail_recipe_with_tag', { detail_recipe_id });
if (recipeDetailError) {
    console.error('Error fetching recipes:', recipeDetailError);
    return <div>Error loading recipes</div>;
  }   
const { id } = recipeDetail[0];
const { data: ingredients, error:recipeIngredientError } = await supabase
        .rpc('get_ingredients', { ingredient_recipe_id: id});
if (recipeIngredientError) {
    console.error('Error fetching recipe ingredients:', recipeIngredientError);
    return <div>Error loading ingredients</div>;
  }    
    return (
        <DetailCard recipeDetail={recipeDetail[0]} ingredients={ingredients} />
    )
}