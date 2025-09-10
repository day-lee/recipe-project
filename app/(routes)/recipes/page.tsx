import { createClient } from '@/lib/supabase/server'
import { Suspense } from 'react'

import RecipeList from "./components/RecipeList";
import TagButton from "./components/TagButton";
import { getTags } from '@/lib/supabase/rpc/getTags';

export default async function Page(
  props: {
      searchParams?: Promise<{
        query?: string | undefined;
        tag?: string | undefined;
      }>
  }
) {
  const searchParam = await props.searchParams;  
  const query = searchParam?.query || '';
  const tag = searchParam?.tag || '';
  const supabase = await createClient()
    if (query === '*') {
      throw new Error('Search term cannot be *');
    }  
    const { data: recipeData, error: recipeError } = await supabase
    .from('recipe')
    .select(`
      id,
      public_id,
      recipe_name,
      is_favourite,
      duration,
      img_link,
      serving,
      recipe_tag!inner(                 
        tag!inner(                      
          tag_name
        )
      )
    `).ilike('recipe_tag.tag.tag_name', `%${tag}%`)
    .ilike('recipe_name', `%${query}%`);
    // .eq('recipe.created_user_id', inputUserId)
    if (recipeError) {
      console.error('Error fetching recipes:', recipeError);
      return <div>Error loading recipes</div>;
    }  

    const { data: tags, error: tagError } = await getTags();
    if (tagError) {
      console.error('Error fetching tags:', tagError);
    }

  return (
      <div className="flex flex-col items-center gap-10 max-w-5xl">
        <Suspense fallback={<div className="mt-96">Loading...</div>}>
          <TagButton tags={tags}/>
          <RecipeList recipes={recipeData} />
        </Suspense>
      </div>
  );
}