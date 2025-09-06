"use server";

import { createClient } from '@/lib/supabase/server'
import { FormData } from '@/app/types/types'

export async function createRecipeAction(payload: FormData) {
    const supabase = await createClient();
    
    const { data, error } = await supabase.rpc("create_new_recipe_jsonb", {
      recipe_data: payload,
    });
  
    if (error) {
      console.error("DB error:", error);
      throw new Error("Failed to insert recipe");
    }
  
    return data;
  }