import { createClient } from '@/lib/supabase/server'
import { PostgrestError } from '@supabase/supabase-js';
import { MainIngredientTag } from "@/app/features/recipes/types/types"

export async function getMainIngredientTags(): Promise<{ data: MainIngredientTag[] | null; error: PostgrestError | null}> {
const supabase = await createClient()
const { data: tagData, error: tagError } = await supabase   
.from('main_ingredients_tag')
.select(`
  id,
  tag_name,
  recipe_count: recipe_main_ingredients_tag(id)
`)
.order(`id`)

if (tagError) {
  console.error('Error calling query for main ingredients tags:', tagError);
  return {data: null, error: tagError};
}  

// This maps to calculate the recipe count for each tag
const mainIngredientTag: MainIngredientTag[] = (tagData || []).map(tag => ({
  id: tag.id,
  tag_name: tag.tag_name,
  recipe_count: tag.recipe_count.length 
}));

return {data: mainIngredientTag as MainIngredientTag[], error: null}
}