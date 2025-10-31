import { createClient } from '@/lib/supabase/server'

import { RecipeForm } from '@/app/(routes)/recipes/components/recipeForm/RecipeForm'
import { getMainIngredientTagsList, getRecipeDetails } from '@/app/(routes)/recipes/actions';

const noAccessMsg = 'You don’t have access to this page.'

export default async function EditRecipeFormPage({ params }: {params: Promise<{detail_recipe_id: string}>}) {
   const { detail_recipe_id } = await params 
    const { data: mainIngredientTag, error: tagError } = await getMainIngredientTagsList();
    if (tagError) {
      console.error('Error fetching tags:', tagError);
    }  
  const { data: recipeDetails, error: recipeDetailsError } = await getRecipeDetails(detail_recipe_id);
  const created_user_id = recipeDetails?.created_user_id
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims?.sub ?? "anonymous";
  
  if (recipeDetailsError) {
    console.error('Error fetching recipe details:', recipeDetailsError);
    return <div> Cannot find the recipe details.</div>
  }
  const defaultValues = {
    created_user_id: recipeDetails?.created_user_id,
    recipe_name: recipeDetails?.recipe_name || '',
    duration: recipeDetails?.duration || 30,
    serving: recipeDetails?.serving || 2, 
    main_ingredient_tag: recipeDetails?.tag_name_id || 1,
    cuisine_tag: recipeDetails?.cuisine_tag_id || 1, 
    external_link: `https://www.youtube.com/watch?v=${recipeDetails?.external_link}` || '',
    img_link: recipeDetails?.img_link || '',
    steps: recipeDetails?.steps || [{id: 1, photo_id: undefined, desc: ''}],
    notes: recipeDetails?.notes || [{id: 1, desc: ''}],
    main_ingredients: recipeDetails?.ingredients.mainIngredients || [],
    optional_ingredients: recipeDetails?.ingredients.optionalIngredients || [],
    sauce_ingredients: recipeDetails?.ingredients.sauceIngredients || [],
  }
  return (
    <main className="flex flex-col mx-auto p-1 py-5 justify-center items-center">
         <h1 className="text-2xl font-bold text-center">
        Edit a recipe
      </h1>
      { user === created_user_id ? (    
        <>  
        <p className='pb-4'>Share your yummy ideas!</p>
      <RecipeForm mainIngredientTag={mainIngredientTag || []} recipeId={detail_recipe_id} mode="edit" defaultValues={defaultValues} userId={user} /> </>) 
      : (<div> {noAccessMsg}</div>)}
    </main>
  );
}