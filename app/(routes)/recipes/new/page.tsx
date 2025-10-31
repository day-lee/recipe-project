import { createClient } from '@/lib/supabase/server'

import { RecipeForm } from '@/app/(routes)/recipes/components/recipeForm/RecipeForm'
import { getMainIngredientTagsList } from '@/app/(routes)/recipes/actions';

export default async function NewRecipeFormPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims?.sub ?? "anonymous";
    const { data: mainIngredientTag, error: tagError } = await getMainIngredientTagsList();
    if (tagError) {
      console.error('Error fetching tags:', tagError);
    }  
  return (
    <main className="flex flex-col mx-auto p-1 py-5 justify-center items-center">
      <h1 className="text-2xl font-bold text-center">
        Create a new recipe
      </h1>
      <p className='pb-4'>Share your yummy ideas!</p>
      <RecipeForm mainIngredientTag={mainIngredientTag || []} mode="create" userId={user} />
    </main>
  );
}