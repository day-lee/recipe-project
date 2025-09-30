"use server";

import { z } from "zod";

import { recipeSchema } from "@/utils/validation/recipe";
import { createClient } from '@/lib/supabase/server'
import { FormData } from '@/app/types/types'
import { mergeIngredients } from "@/utils/utils";

export async function createRecipeAction(payload: FormData) {
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
     console.log('action------------------',data[0].public_id)
    return {success: true, data };
  }