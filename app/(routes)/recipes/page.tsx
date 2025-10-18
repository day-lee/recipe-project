import { createClient } from '@/lib/supabase/server'
import { Suspense } from 'react'

import RecipeList from '@/app/(routes)/recipes/components/mainPage/RecipeList'
import MainSearchFilter from '@/app/(routes)/recipes/components/mainPage/MainSearchFilter'
import { getMainIngredientTags } from '@/lib/supabase/rpc/getMainIngredientTags';

export default async function Page(props: {
    searchParams?: Promise<{
        main_ing_tag_param?: string | undefined;
        cuisine_tag_param?: string | undefined;
        search_query?: string | undefined;
      }>;
}) {
  const searchParam = await props.searchParams;  
  const main_ing_tag_param = searchParam?.main_ing_tag_param || '';
  const cuisine_tag_param = searchParam?.cuisine_tag_param || '';
  const search_query = searchParam?.search_query || '';
  const supabase = await createClient()
    if (search_query === '*') {
      throw new Error('Search term cannot be *');
    }
    /* LOGIC: search input onChange event -> debounced: searchParams update(params.set('search_query', term);) 
              -> sever component(this page) re-render 
              -> RPC call with different argument fetch different data */
    const { data: recipeData, error: recipeError } = await supabase.rpc('get_main_recipe_with_tag', { main_ing_tag_param, cuisine_tag_param, search_query });
    if (recipeError) {
      console.error('Error fetching recipes:', recipeError);
      return <div>Error loading recipes</div>;
    }
    const { data: mainIngredientTag, error: tagError } = await getMainIngredientTags();
    if (tagError) {
      console.error('Error fetching main ingredients tags:', tagError);
    }
  return (
      <div className="flex bg-white">
        <div className="flex flex-col items-center gap-6 max-w-5xl">
        <Suspense fallback={<div className="mt-96">Loading...</div>}>
           <MainSearchFilter mainIngredientTags={mainIngredientTag || []} />
          <RecipeList recipes={recipeData} />
        </Suspense>
        </div>
      </div>
  );
}