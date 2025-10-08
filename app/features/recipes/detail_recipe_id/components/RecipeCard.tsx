import Image from 'next/image'
import Link from 'next/link'

import { RecipeMain } from '@/app/features/recipes/types/types'
import fallbackImg from '@/app/assets/unavailable.png'

export default function RecipeCard({recipe}: {recipe:RecipeMain}) {
return(
    <>
    <Link href={`/recipes/${recipe.public_id}`}>
        <div title={recipe.recipe_name} 
        className='border-slate-600 shadow-md bg-white sm:w-[230px] h-[330px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
            {recipe.img_link ? 
            <Image className='w-full h-[210px] object-cover' priority={true} src={recipe.img_link} alt={recipe.recipe_name} width={200} height={150}/> 
            :
            <Image className="w-full h-[210px] object-cover" src={fallbackImg} alt='fallbackImg' width={200} height={150}/>
            }
            <div className='px-2 py-2 flex-1 flex flex-col'>
                <div className='text-black font-bold text-lg h-[60px] line-clamp-2'> {recipe.recipe_name} </div>
                <div className='text-gray-600 text-sm mt-auto'> {recipe.duration} mins </div>
                <div className='text-gray-600 text-sm mt-auto'> <span className='mr-2'>#{(recipe.cuisine_tag).toLowerCase()}</span> <span>#{(recipe.main_ingredient_tag).toLowerCase()}</span></div>
            </div>
        </div>
    </Link>
    </>
)
}