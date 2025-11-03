'use client';

import { useTransition } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { deleteRecipe } from '@/app/(routes)/recipes/actions';

export default function DeleteRecipeBtn( { recipePublicId }: { recipePublicId: string }) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
            return;
        }
        startTransition( async () => {
            const result = await deleteRecipe(recipePublicId);
            if (result.success) {
                alert('Recipe deleted successfully.');
                router.replace('/recipes');
            } else {
                alert('Failed to delete recipe.');
            }
        });
    };
    return (
    <div className=' hover:bg-red-200 rounded-sm transform translate-all duration-300 active:scale-95'>   
        <button 
            className='h-8'
            onClick={handleDelete}
            disabled={isPending}>
                <div className='flex font-semibold items-center pr-2'>
                    <TrashIcon className='w-6 h-6 mx-2' />
                    <span>{isPending ? 'Deleting...' : 'Delete Recipe'}</span>
                </div>
        </button> 
    </div>
    );
}