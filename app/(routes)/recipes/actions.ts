"use server";

import { z } from "zod";
import { PostgrestError } from '@supabase/supabase-js';

import { recipeSchema } from "@/app/utils/validation/recipe";
import { createClient } from '@/lib/supabase/server'
import { FormSubmitData, MainListIngredientTag, RecipeDetail } from '@/app/types/types'
import { mergeIngredients } from "@/app/utils/utils";

export async function getMainIngredientTags(): Promise<{ data: MainListIngredientTag[] | null; error: PostgrestError | null}> {
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

export async function createRecipe(payload: FormSubmitData) {
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
    const { data, error } = await supabase.rpc("create_new_recipe_jsonb", {
      recipe_data: mergedData,
    }
  );
    if (error) {
      return {
      success: false,
      errors: { global: [error.message]},
    }}
    return {success: true, data };
  }

  export async function getDetailRecipeWithTag(detail_recipe_id: string) {
    const supabase = await createClient()
    const { data: recipeDetail, error:recipeDetailError } = await supabase
            .rpc('get_detail_recipe_with_tag', { detail_recipe_id });
    if (recipeDetailError) {
        console.error('Error fetching recipe detail with tag:', recipeDetailError);
        return {data: null, error: recipeDetailError};
      }   
    const recipeDetailResult = Array.isArray(recipeDetail) ? recipeDetail[0] : recipeDetail  
      return {data: recipeDetailResult as RecipeDetail, error: null};
  }

export async function getIngredients(ingredient_recipe_id: number) {
    const supabase = await createClient();
    const { data: ingredients, error:recipeIngredientError } = await supabase
            .rpc('get_ingredients', { ingredient_recipe_id: ingredient_recipe_id});
    if (recipeIngredientError) {
        console.error('Error fetching recipe ingredients:', recipeIngredientError);
        return {data: null, error: recipeIngredientError};
      }    
    return {data: ingredients, error: null};  
}