'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  BookOpenIcon,
  PlusCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline'; 

import RandomRecipeModalButton from '@/app/(routes)/random-pick/components/RandomRecipeModalButton';

export default function SidebarModal() {
  const [showSidebarModal, setShowSidebarModal] = useState<boolean>(false)
  return (
    <div className={`fixed min-h-screen left-0 top-0 flex flex-col gap-10 border-x-[1px] pt-12
                 border-gray-300 bg-gray-100 z-30 transition-all duration-300 ease-out overflow-hidden
                 ${showSidebarModal ? 'w-48' : 'w-14'}`}
                  onMouseEnter={() => setShowSidebarModal(true)}
                  onMouseLeave={() => setShowSidebarModal(false)}
                >
      <ul className='w-full min-w-0 gap-1 ml-1'>
        <div className='relative flex w-full min-w-0 flex-col p-2 pt-4 gap-4 font-medium'>
          <li>
            <Link href="/recipes">
              <div className='flex items-center gap-4 hover:text-red-700 hover:font-semibold'>
              <BookOpenIcon className="w-8 h-8 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-300
                                ${showSidebarModal ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  My Recipes
                </span>
              </div>
            </Link>
          </li>
          <li>
            <Link href="/recipes/new">
              <div className='flex items-center gap-4 hover:text-red-700 hover:font-semibold'>
                <PlusCircleIcon className="w-8 h-8 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-300
                                ${showSidebarModal ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  New recipe
                </span>
              </div>
            </Link>
          </li>
          <li>
            <div className='flex items-center gap-4 hover:text-red-700 hover:font-semibold'>
              <RandomRecipeModalButton showModal={showSidebarModal} setIsSidebarOpen={setShowSidebarModal} />
            </div>
          </li>
          <li>
            <Link href="/">
              <div className='flex items-center gap-4 hover:text-red-700 hover:font-semibold'>
                <PencilSquareIcon className="w-8 h-8 flex-shrink-0" />
                <span className={`whitespace-nowrap transition-all duration-300
                                ${showSidebarModal ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  Meal plan
                </span>
              </div>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  )
}