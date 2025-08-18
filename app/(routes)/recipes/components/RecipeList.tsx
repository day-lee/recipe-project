import { Recipe } from '../../../types/types'
import RecipeCard from './RecipeCard';

export default async function RecipeList({ recipes}: {recipes: Recipe[]}) {
    return (
      <div className='flex-grow'>
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {recipes?.map(recipe => (
            <li key={recipe.id}> <RecipeCard recipe={recipe}/> </li>
          ))}
        </ul>
      </div>
    );
  }