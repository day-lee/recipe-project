import { TrashIcon } from '@heroicons/react/24/outline'; 
import { RemoveFilterProps } from '@/app/types/types'

export default function RemoveFilterButton({selectedCuisineTag, selectedMainIngTagId, searchInput, onClick}: RemoveFilterProps) {
    return(
    <>
    { (searchInput || selectedCuisineTag || selectedMainIngTagId ) && (
        <button type="button" onClick={onClick}
            className=""> 
            <div className='flex items-center hover:bg-red-200 rounded-sm px-2 py-1 mx-2 
                            border-2 border-red-700 text-red-700 font-medium'>
            <TrashIcon className="h-4 w-4 mr-2 text-red-700" />  Clear
            </div>
        </button>
    )}
    </>
    )
}