import { RecipeForm } from '@/app/(routes)/recipes/components/recipeForm/RecipeForm'
import { getMainIngredientTags } from '@/lib/supabase/rpc/getMainIngredientTags';

export default async function EditRecipeFormPage({ params }: {params: Promise<{detail_recipe_id: string}>}) {
   const { detail_recipe_id } = await params 
    const { data: mainIngredientTag, error: tagError } = await getMainIngredientTags();
    if (tagError) {
      console.error('Error fetching tags:', tagError);
    }  
    const testValues = {
            recipe_name: 'Edit test value',
            duration: 30,
            serving: 2,
            main_ingredient_tag: 2,
            cuisine_tag: 4,
            steps: [{id: 1, photo_id: undefined, desc: "" }],
            img_link: "",
            external_link: "",
            notes: [{id: 1, desc:""}],
            main_ingredients: [{id:1, ingredient_name:"m_ing", quantity: 1, unit: "T", type: "main" as const}],
            optional_ingredients: [{id:1, ingredient_name:"o_ing", quantity: 1, unit: "T", type: "optional" as const}],
            sauce_ingredients:  [{id:1, ingredient_name:"s_ing", quantity: 1, unit: "T", type: "sauce" as const}],
    }

  return (
    <main className="flex flex-col mx-auto p-8 justify-center items-center">
      <h1 className="text-2xl font-bold text-center">
        Edit a recipe
      </h1>
      <p>Share your yummy ideas!</p>
      <RecipeForm mainIngredientTag={mainIngredientTag || []} recipeId={detail_recipe_id} mode="edit" defaultValues={testValues} /> 
    </main>
  );
}