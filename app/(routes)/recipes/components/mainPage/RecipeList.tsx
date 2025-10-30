import { RecipeMain } from '@/app/types/types'
import RecipeCard from '@/app/(routes)/recipes/components/mainPage/RecipeCard';

export const emptyListMsg = 'There is nothing in this tag yet — start adding your recipes!'

export default async function RecipeList({ recipes}: {recipes: RecipeMain[]}) {
  const resultLength = recipes.length
    return (
    <div>
      { resultLength > 0 ?
        (<>
        <div className='flex sm:justify-start justify-center pb-4 font-medium'> Found<span className='font-bold mx-1 text-red-700'>{resultLength}</span> recipes</div>
        <div className='w-full min-w-5xl'>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10'>
            {recipes?.map(recipe => (
              <li key={recipe.id}> <RecipeCard recipe={recipe}/> </li>
            ))}
          </ul>
        </div>
        </>) 
        : 
        (<div className='w-full'> 
            <p className='flex justify-center items-center font-bold lg:w-[992px]'> {emptyListMsg} </p>
        </div>)}
   </div>
    );
  }