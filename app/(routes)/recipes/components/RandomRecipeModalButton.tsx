'use client'

import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'

import { createClient } from '@/lib/supabase/client'
import Modal from './RandomRecipeModal'

const loadingMessage = "Finding the perfect recipe for you..."
const finalMessage = "Here's your recipe!"

export default function RandomRecipeModalButton({ setIsSidebarOpen }:
                         {setIsSidebarOpen: Dispatch<SetStateAction<boolean>>}) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<string>(loadingMessage)

  const onClick = useCallback(async () => {
    setIsModalOpen(true)
    const supabase = await createClient()
    const { data: recipeId, error: recipeIdError } = await supabase
          .rpc('get_random_recipe_public_id');  
    const { public_id } = recipeId[0]
    if (recipeIdError) {
        console.error('Error fetching random id:', recipeIdError);
        return <div>Error loading random id</div>;
      } 
      const startLoading = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setLoading(loadingMessage)
      await new Promise(resolve => setTimeout(resolve, 600))
      setLoading(finalMessage)
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { x: 0.5, y: 0.6 }  
      })
    }
    startLoading()
    setTimeout(() => {
      setIsSidebarOpen(false)
      router.push(public_id ? `/recipes/${public_id}` : '/recipes')
      // router.push(id ? `/recipes/3` : '/recipes')
    }, 2700)
  }, [router])
  return (
    <>
      <button onClick={onClick}>+ Random recipe</button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
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
