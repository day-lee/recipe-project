import { createClient } from '@/lib/supabase/server'

export default async function RecipesLists() {
    const supabase = await createClient()
    const { data: recipes, error } = await supabase.from('recipe').select('id, recipe_name, duration, img_link, created_user_id');
    
    if (error) {
      console.error('Error fetching recipes:', error);
      return <div>Error loading recipes</div>;
    }   
    return (
      <div>
        {/* TODO 
        Each element will be a recipe card component */}
        <h1 className="text-2xl font-bold mt-10">Recipes</h1>
        <ul>
        {recipes?.map(recipe => (
          <li key={recipe.id}>{recipe.recipe_name} / {recipe.duration} / {recipe.img_link}</li>
        ))}
        </ul>
      </div>
    );
  }
