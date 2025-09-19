"use server";

import { z } from "zod";

import { recipeSchema } from "@/utils/validation/recipe";
import { createClient } from '@/lib/supabase/server'
import { FormData } from '@/app/types/types'

export async function createRecipeAction(payload: FormData) {
    const supabase = await createClient();
    const parsed = recipeSchema.safeParse(payload);
    if (!parsed.success) {
      return {
        success: false,
         errors: z.flattenError(parsed.error)
      };
    }
    const { data, error } = await supabase.rpc("create_new_recipe_jsonb", {
      recipe_data: parsed.data,
    }
  );
    if (error) {
      return {
      success: false,
      errors: { global: [error.message]},
    }}
    return {success: true, data };
  }