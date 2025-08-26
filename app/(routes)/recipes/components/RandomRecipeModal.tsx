'use client'

import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function RandomRecipeModal({
    isOpen, children,
}: {
    isOpen: boolean
    children: ReactNode
}) {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => setIsMounted(true), [])
    if (!isMounted || !isOpen) return null
    return createPortal(
        <div className='fixed inset-0 bg-gray-600/70 z-60 flex items-center justify-center'> 
            {children}
        </div>, document.body)
}