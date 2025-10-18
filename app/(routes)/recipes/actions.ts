"use server";

import { z } from "zod";

import { recipeSchema } from "@/app/utils/validation/recipe";
import { createClient } from '@/lib/supabase/server'
import { FormSubmitData } from '@/app/types/types'
import { mergeIngredients } from "@/app/utils/utils";

export async function createRecipeAction(payload: FormSubmitData) {
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