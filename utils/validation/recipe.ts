import { z } from "zod";

const nameErrorMsg = 'Recipe name must be at least 3 characters long'
const ingredientErrorMsg = 'Recipe ingredients must be at least 3 characters long'
const ingredientQuantityErrorMsg = 'Please enter a valid quantity for the ingredient.'
const ingredientUnitErrorMsg = 'Please enter a valid unit for the ingredient.'
const videoErrorMsg = 'Please check the YouTube video URL.'
const stepErrorMsg = 'Please add a step for your recipe.'
const youtubeVideoIdLength = 11;

// Base ingredient schema
const baseIngredient = z.object({
  id: z.number(),
  ingredient_name: z.string().min(3, ingredientErrorMsg),
  quantity: z.number().min(1, ingredientQuantityErrorMsg),
  unit: z.string().min(1, ingredientUnitErrorMsg),
});

// Ingredients variants
const mainIngredient = baseIngredient.extend({
  is_main: z.boolean(),
  is_optional: z.boolean(),
  is_sauce: z.boolean(),
});

const optionalIngredient = baseIngredient.extend({
  is_main: z.boolean(),
  is_optional: z.boolean(),
  is_sauce: z.boolean(),
});

const sauceIngredient = baseIngredient.extend({
  is_main: z.boolean(),
  is_optional: z.boolean(),
  is_sauce: z.boolean()
});

export const recipeSchema = z.object({
  recipe_name: z.string().min(3, nameErrorMsg),
  duration: z.number(),
  serving: z.number(),
  tags: z.array(z.number()),
  steps: z.array(
    z.object({
      id: z.number(),
      photo_id: z.number().optional(),
      desc: z.string().min(10, stepErrorMsg),
    })
  ),
  img_link: z.string(),
  external_link: z.string(),
  notes: z.array(
    z.object({
      id: z.number(),
      desc: z.string(),
    })
  ),
  main_ingredients: z.array(mainIngredient),
  optional_ingredients: z.array(optionalIngredient),
  sauce_ingredients: z.array(sauceIngredient),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;