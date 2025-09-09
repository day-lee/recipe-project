import { Recipe } from '../../../types/types'
import RecipeCard from './RecipeCard';

export default async function RecipeList({ recipes}: {recipes: Recipe[]}) {
    return (
      <>
      { recipes.length > 0 ?
        (<div className=''>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10'>
            {recipes?.map(recipe => (
              <li key={recipe.id}> <RecipeCard recipe={recipe}/> </li>
            ))}
          </ul>
        </div>) 
        : 
        (<div> 
            <p className='flex justify-center items-center font-bold'> There is nothing in this tag yet — start adding your recipes! </p>
        </div>)}
    </>
    );
  }