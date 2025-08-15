import { createClient } from '@/lib/supabase/server'

export default async function RecipeList({ query, tag }: {query: string; tag:string}) {
    const supabase = await createClient()
    if (query === '*') {throw new Error('Search term cannot be *');}  
    // const { data: recipes, error } = await supabase.from('recipe')
    //                               .select('id, recipe_name, duration, img_link, created_user_id')
    //                               .ilike('recipe_name', `%${query}%`)

    const { data: recipes, error } = await supabase
    .from('recipe')
    .select(`
      id,
      recipe_name,
      is_favourite,
      duration,
      img_link,
      recipe_tag!inner(                 
        tag!inner(                      
          tag_name
        )
      )
    `).ilike('recipe_tag.tag.tag_name', `%${tag}%`)
    .ilike('recipe_name', `%${query}%`);

//  console.log('recipes:', recipes);
//  recipes?.map((recipe)=> ( console.log(recipe.recipe_name, recipe.recipe_tag) )) // [{tag: {tag_name: 'korean'}}]
    
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
          <li key={recipe.id}>{recipe.recipe_name} / {recipe.duration} / {recipe.img_link} </li>
        ))}
        </ul>
      </div>
    );
  }