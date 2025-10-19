import { RecipeForm } from '@/app/(routes)/recipes/components/recipeForm/RecipeForm'
import { getMainIngredientTags } from '@/app/(routes)/recipes/actions';

export default async function EditRecipeFormPage({ params }: {params: Promise<{detail_recipe_id: string}>}) {
   const { detail_recipe_id } = await params 
    const { data: mainIngredientTag, error: tagError } = await getMainIngredientTags();
    if (tagError) {
      console.error('Error fetching tags:', tagError);
    }  
    const testValues = {
            recipe_name: 'Edit test value',
            duration: 60,
            serving: 1,
            main_ingredient_tag: 3,
            cuisine_tag: 4,
            steps: [{id: 1, photo_id: undefined, desc: "test steps" }],
            img_link: "",
            external_link: "vG07DHeNH9c",
            notes: [{id: 1, desc:"test note"}],
            main_ingredients: [{id:1, ingredient_name:"m_ing", quantity: 1, unit: "T", type: "main" as const}],
            optional_ingredients: [{id:1, ingredient_name:"o_ing", quantity: 1, unit: "T", type: "optional" as const}],
            sauce_ingredients:  [{id:1, ingredient_name:"s_ing", quantity: 1, unit: "T", type: "sauce" as const}],
    }

    // get_detail_recipe_with_tag, get_ingredients RPC separately -> action 
/*
{
    "id": 10,
    "public_id": "64c7fdb9-717a-4f31-91c3-fbe0904e7242",
    "recipe_name": "Seaweed soup",
    "created_user_id": 3,
    "external_link": "xsTFsunt6-8",
    "duration": 30,
    "img_link": "https://day-lee.github.io/recipe-book-food-photos/seaweed-soup.png",
    "notes": [
        {
            "id": 1,
            "desc": "You can add 1 teaspoon of fish sauce, according to your preference."
        }
    ],
    "steps": [
        {
            "id": 1,
            "desc": "Soak dried seaweed (miyeok) in cold water for 30 minutes until fully expanded, then drain and cut into bite-sized pieces."
        },
        {
            "id": 2,
            "desc": "Cut beef (brisket or shank) into small cubes and season with soy sauce and minced garlic."
        },
        {
            "id": 3,
            "desc": "Heat sesame oil in a pot over medium heat, then add the seasoned beef and stir-fry for 3-4 minutes until browned."
        },
        "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.",
        "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.",
        "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects.",
        "This object has been omitted by React in the console log to avoid sending too much data from the server. Try logging smaller or more specific objects."
    ],
    "serving": 1,
    "tag_name": "Beef",
    "cuisine_tag_name": "Korean"
}
*/

/*
[
    {
        "id": 17,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Beef",
        "quantity": 100,
        "unit": "g",
        "type": "main"
    },
    {
        "id": 18,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Seaweed",
        "quantity": 5,
        "unit": "g",
        "type": "main"
    },
    {
        "id": 20,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Soybean sauce",
        "quantity": 1,
        "unit": "T",
        "type": "sauce"
    },
    {
        "id": 19,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Sesame oil",
        "quantity": 1,
        "unit": "T",
        "type": "sauce"
    },
    {
        "id": 16,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Minced garlic",
        "quantity": 1,
        "unit": "t",
        "type": "sauce"
    }
]
*/
  return (
    <main className="flex flex-col mx-auto p-8 justify-center items-center">
      <h1 className="text-2xl font-bold text-center">
        Edit a recipe
      </h1>
      <p>Share your yummy ideas!</p>
      <RecipeForm mainIngredientTag={mainIngredientTag || []} recipeId={detail_recipe_id} mode="edit" defaultValues={testValues} /> 
    </main>
  );
}