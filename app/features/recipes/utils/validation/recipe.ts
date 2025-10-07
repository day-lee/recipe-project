import { z } from "zod";

const nameErrorMsg = 'Recipe name must be at least 3 characters long'
const ingredientErrorMsg = 'Recipe ingredients must be at least 3 characters long'
const ingredientQuantityErrorMsg = 'Please enter a valid quantity for the ingredient.'
const ingredientUnitErrorMsg = 'Please enter a valid unit for the ingredient.'
const videoErrorMsg = 'Please check the YouTube video URL.'
const stepErrorMsg = 'Please add a step for your recipe.'
const youtubeVideoIdLength = 11;

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
  tags: z.array(z.number()),
  steps: z.array(step),
  img_link: z.string(),
  external_link: z.string(),
  notes: z.array(note),
  main_ingredients: z.array(ingredient),
  optional_ingredients: z.array(ingredient),
  sauce_ingredients: z.array(ingredient),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;