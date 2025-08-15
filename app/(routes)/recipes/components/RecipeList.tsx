import { Recipe } from '../../../types/types'

export default async function RecipeList({ recipes}: {recipes: Recipe[]}) {
    return (
      <div>
        {/* TODO Each element will be a recipe card component */}
        <h1 className="text-2xl font-bold mt-10">Recipes</h1>
        <ul>
          {recipes?.map(recipe => (
            <li key={recipe.id}>{recipe.recipe_name} / {recipe.duration} / {recipe.img_link}</li>
          ))}
        </ul>
      </div>
    );
  }