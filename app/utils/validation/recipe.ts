import { z } from "zod";

const nameErrorMsg = 'Recipe name must be at least 3 characters long'
const ingredientErrorMsg = 'Recipe ingredients must be at least 3 characters long'
const ingredientQuantityErrorMsg = 'Please enter a valid quantity for the ingredient.'
const ingredientUnitErrorMsg = 'Please enter a valid unit for the ingredient.'
const stepErrorMsg = 'Please add a step for your recipe.'
export const MAX_MAIN_IMG_SIZE = 2 * 1024 * 1024; // 2MB

const step =  z.object({
    photo_id: z.number().optional(),
    id: z.number(),
    desc: z.string().min(10, stepErrorMsg)
    });

const note = z.object({
    id: z.number(),
    desc: z.string(),
})
const ingredient = z.object({
    id: z.number(),
    ingredient_name: z.string().min(3, ingredientErrorMsg),
    quantity: z.number().min(1, ingredientQuantityErrorMsg),
    unit: z.string().min(1, ingredientUnitErrorMsg),
    type: z.enum(['main', 'optional', 'sauce']) 
});

export const recipeSchema = z.object({
  recipe_name: z.string().min(3, nameErrorMsg),
  duration: z.number(),
  serving: z.number(),
  main_ingredient_tag: z.number(),
  cuisine_tag: z.number(),
  steps: z.array(step),
  img_link: z.string(),
  img_file: z.instanceof(File).refine(file => file.size <= MAX_MAIN_IMG_SIZE, 'Image must be less than 2MB'),
  external_link: z.string(),
  notes: z.array(note),
  main_ingredients: z.array(ingredient),
  optional_ingredients: z.array(ingredient),
  sauce_ingredients: z.array(ingredient),
  created_user_id: z.string()
});

export type RecipeFormData = z.infer<typeof recipeSchema>;