'use client'

import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import { GiftIcon } from '@heroicons/react/24/outline'; 

import { createClient } from '@/lib/supabase/client'
import Modal from './RandomRecipeModal'

const loadingMessage = "Finding the perfect recipe for you..."
const finalMessage = "Here's your recipe!"

export default function RandomRecipeModalButton({ setIsSidebarOpen, showModal }:
                         {setIsSidebarOpen: Dispatch<SetStateAction<boolean>>, showModal?: boolean}) {
  const router = useRouter()
  const [isRandomRecipeModalOpen, setIsRandomRecipeModalOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<string>(loadingMessage)

  const onClick = useCallback(async () => {
    setIsRandomRecipeModalOpen(true)
    const supabase = await createClient()
    const { data: recipeId, error: recipeIdError } = await supabase
          .rpc('get_random_recipe_public_id');  
    const { public_id } = recipeId[0]
    if (recipeIdError) {
        console.error('Error fetching random id:', recipeIdError);
        return <div>Error loading random id</div>;
      } 
      const startLoading = async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      setLoading(loadingMessage)
      // await new Promise(resolve => setTimeout(resolve, 400))
      // setLoading(finalMessage)
      await new Promise(resolve => setTimeout(resolve, 500))
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { x: 0.5, y: 0.6 }  
      })
      setIsRandomRecipeModalOpen(false)
      setLoading(loadingMessage)
    }
    startLoading()
    setTimeout(() => {
      setIsSidebarOpen(false)
      router.push(public_id ? `/recipes/${public_id}` : '/recipes')
      // router.push(id ? `/recipes/3` : '/recipes')
    }, 900)
  }, [router])
  return (
    <>
     <button onClick={onClick}><div className='flex gap-4 items-center'> 
        <GiftIcon className="w-8 h-8 flex-shrink-0" /> 
       {/* <span>Random </span> */}
       <span className={`whitespace-nowrap transition-all duration-300`}>Random recipe</span>
       </div></button>
      {isRandomRecipeModalOpen && (
        <Modal isOpen={isRandomRecipeModalOpen}>
          <div >
            <div className='text-2xl sm:text-3xl font-semibold text-red-700 border-2 border-white bg-white rounded-md p-2 animate-bounce'>
              {loading}
            </div>
          </div>
         </Modal>
      )}
    </>
  )
}

/*
{isRandomRecipeModalOpen ? ( <span className={`whitespace-nowrap transition-all duration-300
        ${showModal? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>Random recipe</span>) : (<span>Random Recipe</span>)}
*/