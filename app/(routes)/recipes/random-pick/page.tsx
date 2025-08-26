import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server';

function sleep(ms: number) {
    return new Promise((res) => setTimeout(res, ms))}
    
export default async function RandomRecipePage () {
    const supabase = await createClient()
    const { data: recipeId, error: recipeIdError } = await supabase
        .rpc('get_random_recipe_id');  
    const { id } = recipeId[0]
  if (recipeIdError) {
    console.error('Error fetching random id:', recipeIdError);
    return <div>Error loading random id</div>;
  }    
  await sleep(800)
  redirect(`/recipes/${id}`)
};
