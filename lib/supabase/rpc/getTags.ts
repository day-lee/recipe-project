import { createClient } from '@/lib/supabase/server'
import { PostgrestError } from '@supabase/supabase-js';
import { Tag } from "@/app/features/recipes/types/types"

export async function getTags(): Promise<{ data: Tag[] | null; error: PostgrestError | null}> {
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
const tags: Tag[] = (tagData || []).map(tag => ({
  id: tag.id,
  name: tag.tag_name,
  recipe_count: tag.recipe_count.length 
}));

return {data: tags as Tag[], error: null}
}