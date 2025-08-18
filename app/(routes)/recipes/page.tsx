import { createClient } from '@/lib/supabase/server'
import { Suspense } from 'react'

import Search from "./components/Search";
import RecipeList from "./components/RecipeList";
import TagButton from "./components/TagButton";
import { Tag } from "../../types/types"

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
    // .eq('recipe.created_user_id', inputUserId)

    if (recipeError) {
      console.error('Error fetching recipes:', recipeError);
      return <div>Error loading recipes</div>;
    }  

    const { data: tagData, error: tagError } = await supabase   
    .from('tag')
    .select(`
      id,
      tag_name,
      recipe_count: recipe_tag(id)
    `)
    
    if (tagError) {
      console.error('Error fetching tags:', tagError);
      return <div>Error loading tags</div>;
    }  

    // This maps to calculate the recipe count for each tag
    const tags: Tag[] = (tagData || []).map(tag => ({
      id: tag.id,
      name: tag.tag_name,
      recipe_count: tag.recipe_count.length 
    }));
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center gap-10 max-w-5xl p-5">
        <Suspense fallback={<div className="mt-96">Loading...</div>}>
          <Search />
          <TagButton tags={tags}/>
          <RecipeList recipes={recipeData} />
        </Suspense>
      </div>
    </main>
  );
}