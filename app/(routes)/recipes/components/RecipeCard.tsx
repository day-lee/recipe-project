import Image from 'next/image'
import Link from 'next/link'

import { Recipe } from '../../../types/types'
import fallbackImg from '../../../assets/unavailable.png'

export default function RecipeCard({recipe}: {recipe:Recipe}) {
return(
    <>
    <Link href={`/recipes/${recipe.id}`}>
        <div className='border-slate-600 shadow-md bg-white w-[230px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
            {recipe.img_link ? 
            <Image className='w-full' priority={true} src={recipe.img_link} alt={recipe.recipe_name} width={200} height={150}/> :
            <Image className="w-full" src={fallbackImg} alt='fallbackImg' width={200} height={150}/>
            }
            <div className='px-2 py-2'>
                <div className='text-black font-bold text-lg'> {recipe.recipe_name} </div>
                <div className='text-gray-600 text-sm'> {recipe.duration} mins </div>
            </div>
        </div>
    </Link>
    </>
)
}