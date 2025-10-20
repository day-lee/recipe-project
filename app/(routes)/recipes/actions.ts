"use server";

import { z } from "zod";
import { PostgrestError } from '@supabase/supabase-js';

import { recipeSchema } from "@/app/utils/validation/recipe";
import { createClient } from '@/lib/supabase/server'
import { FormSubmitData, MainListIngredientTag, RecipeDetail } from '@/app/types/types'
import { mergeIngredients } from "@/app/utils/utils";

export async function getMainIngredientTagsList(): Promise<{ data: MainListIngredientTag[] | null; error: PostgrestError | null}> {
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
const mainIngredientTag: MainListIngredientTag[] = (tagData || []).map(tag => ({
  id: tag.id,
  tag_name: tag.tag_name,
  recipe_count: tag.recipe_count.length 
}));

return {data: mainIngredientTag as MainListIngredientTag[], error: null}
}

export async function upsertRecipe(payload: FormSubmitData, mode: 'create' | 'edit', recipeId?: string) {
    const supabase = await createClient();
    const result = recipeSchema.safeParse(payload); 
    if (!result.success) {
      return {
        success: false,
         errors: z.flattenError(result.error)
      };
    }
    const ingredients = mergeIngredients(result.data)
    const mergedData = {
      ...result.data, ingredients
    }
    if (mode === 'create') {
        const { data, error } = await supabase.rpc("create_new_recipe_jsonb", {
          recipe_data: mergedData,
        });
        if (error) {
          return {
          success: false,
          errors: { global: [error.message]},
        }}
        return {success: true, data };
      } else {
            const { data, error } = await supabase.rpc("update_recipe_jsonb", {
          recipe_id_param: recipeId, recipe_data: mergedData
        });
        if (error) {
          return {
          success: false,
          errors: { global: [error.message]},
        }}
        return {success: true, data };
      }
  }

  export async function getRecipeDetails(detail_recipe_id: string) {
    const supabase = await createClient()
    const { data: recipeDetails, error:recipeDetailError } = await supabase
            .rpc('get_recipe_details', { detail_recipe_id });
    if (recipeDetailError) {
        console.error('Error fetching full recipe details:', recipeDetailError);
        return {data: null, error: recipeDetailError};
      }   
    const recipeDetailResult = Array.isArray(recipeDetails) ? recipeDetails[0] : recipeDetails 
      return {data: recipeDetailResult as RecipeDetail, error: null};
  }
