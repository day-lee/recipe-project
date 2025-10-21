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

export async function upsertRecipe(payload: FormSubmitData, mode: 'create' | 'edit', recipeId?: string) {
    const supabase = await createClient();
    try {
      if (mode === 'edit' && !recipeId) {
        return {
          success: false,
          errors: { global: ['Recipe Id is required for editing a recipe.']}
        }
      };
  
    const result = recipeSchema.safeParse(payload); 
    if (!result.success) {
      return {
        success: false,
         errors: z.flattenError(result.error)
      };
    }

    const ingredients = mergeIngredients(result.data)
    const mergedRecipeData = {
      ...result.data, ingredients
    }

    const rpcParams = mode === 'create' 
    ? { function: 'create_new_recipe_jsonb', params: { recipe_data: mergedRecipeData}}
    : { function: 'update_recipe_jsonb', params: { recipe_id_param: recipeId, recipe_data: mergedRecipeData}}

    const { data, error } = await supabase.rpc(rpcParams.function, rpcParams.params); 

    if (error) {
      console.error(`${mode} recipe error`, {
        code: error.code,
        message: error.message
      })
      return {
        success: false,
        errors: { global: error}
      }}

    return {
      success: true,
      data: Array.isArray(data) ? data[0] : data
    }
  } catch (error) {
    console.error('Unexpected error in upsertRecipe;, error', error);
    return {
      success: false,
      errors: { global: ['An unexpected error occurred. Please try again later.']}
    }
  }
  }

export async function deleteRecipe(recipePublicId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc('delete_recipe', { recipe_id_param: recipePublicId });
    if (error) {
      console.error('Error deleting recipe:', error);
      return {
        success: false,
        error: error.message
      }
    }
    if (!data.success) {
      return {
          success: false,
          error: data.error
      };
    }
    return {
      success: true,
      deletedRecipeId: data.deleted_recipe_id,     
      deletedAt: data.deleted_at
    }
  }
  catch(error) {
    console.error('Unexpected error deleting recipe:', error);
    return {
      success: false,
      error: 'Failed to delete recipe'
    }
  }
}


