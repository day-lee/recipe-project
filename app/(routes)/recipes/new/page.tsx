import { NewRecipeForm } from '@/app/features/recipes/new/components/NewRecipeForm'
import { getMainIngredientTags } from '@/lib/supabase/rpc/getMainIngredientTags';

export default async function HomePage() {
    const { data: mainIngredientTag, error: tagError } = await getMainIngredientTags();
    if (tagError) {
      console.error('Error fetching tags:', tagError);
    }  
  return (
    <main className="flex flex-col mx-auto p-8 justify-center items-center">
      <h1 className="text-2xl font-bold text-center">
        Create a new recipe
      </h1>
      <p>Share your yummy ideas!</p>
      <NewRecipeForm mainIngredientTag={mainIngredientTag || []} />
    </main>
  );
}