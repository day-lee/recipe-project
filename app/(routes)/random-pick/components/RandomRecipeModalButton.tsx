'use client'

import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import { GiftIcon } from '@heroicons/react/24/outline'; 

import { createClient } from '@/lib/supabase/client'
import Modal from './RandomRecipeModal'

const loadingMessage = "Finding the perfect recipe for you..."
const finalMessage = "Enjoy your random recipe!"

export default function RandomRecipeModalButton({ setIsSidebarOpen }:
                         {setIsSidebarOpen: Dispatch<SetStateAction<boolean>>}) {
  const router = useRouter()
  const [isRandomRecipeModalOpen, setIsRandomRecipeModalOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<string>(loadingMessage)

  const onClick = useCallback(async () => {
    setIsRandomRecipeModalOpen(true)
    const supabase = createClient()
    const { data: recipeId, error: recipeIdError } = await supabase
          .rpc('get_random_recipe_public_id');  
    if (!recipeId || recipeId.length === 0 || !recipeId[0].public_id) {
      throw new Error(`Error fetching random id:${recipeIdError?.message}`)
    }
    if (recipeIdError) {
        console.error('Error fetching random id:', recipeIdError);
        return <div>Error loading random id</div>;
      } 
      const { public_id } = recipeId[0]
      const startLoading = async () => {
      await new Promise(resolve => {
        setTimeout(()=> {
          setLoading(finalMessage)
          resolve('done')
        }, 700)
      })        
      await new Promise(resolve => {
        setTimeout(()=> {
          resolve('done')
        }, 800)
      })
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { x: 0.5, y: 0.6 }  
      })
      setIsRandomRecipeModalOpen(false)
      setLoading(loadingMessage)
    }
    await startLoading()
    setIsSidebarOpen(false)
    router.push(public_id ? `/recipes/${public_id}` : '/recipes')
  }, [router, setIsSidebarOpen])
  return (
    <>
     <button onClick={onClick}><div className='flex gap-4 items-center'> 
        <GiftIcon className="w-8 h-8 flex-shrink-0" /> 
       <span className={`whitespace-nowrap transition-all duration-300`}>Random recipe</span>
       </div></button>
      {isRandomRecipeModalOpen && (
        <Modal isOpen={isRandomRecipeModalOpen}>
          <div >
            <div className={`text-xl sm:text-3xl font-extrabold text-white rounded-md p-2 animate-bounce ${loading === finalMessage && 'bg-red-500'}`}>
              {loading}
            </div>
          </div>
         </Modal>
      )}
    </>
  )
}