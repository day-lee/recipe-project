'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'

import { createClient } from '@/lib/supabase/client'
import Modal from './RandomRecipeModal'

const  finalMessage = "Surprise! Here's your recipe!"

export default function RandomRecipeModalButton() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number | string>(3)

  const onClick = useCallback(async () => {
    setIsOpen(true)
    const supabase = await createClient()
    const { data: recipeId, error: recipeIdError } = await supabase
          .rpc('get_random_recipe_id');  
    const { id } = recipeId[0]
    if (recipeIdError) {
        console.error('Error fetching random id:', recipeIdError);
        return <div>Error loading random id</div>;
      } 

      const startCountdown = async () => {
      for (let i = 3; i > 1; i--) {
        setCountdown(i)
        await new Promise(resolve => setTimeout(resolve, 600))
      }
      setCountdown(1)
      await new Promise(resolve => setTimeout(resolve, 600))
      setCountdown(finalMessage)
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { x: 0.5, y: 0.6 }  
      })
    }
    startCountdown()
    setTimeout(() => {
      router.push(id ? `/recipes/${id}` : '/recipes')
      setIsOpen(false)
    }, 2500)
  }, [router])
  return (
    <>
      <button onClick={onClick}>+ Random recipe</button>
      {isOpen && (
        <Modal isOpen={isOpen}>
          <div >
            <div className='text-2xl sm:text-4xl font-semibold text-red-700'>
              {countdown}
            </div>
          </div>
         </Modal>
      )}
    </>
  )
}