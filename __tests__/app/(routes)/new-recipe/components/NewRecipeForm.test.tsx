import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { NewRecipeForm } from '@/app/(routes)/new-recipe/components/NewRecipeForm'
import  { createRecipeAction } from '@/app/actions'

// 1. mock the server action so we don't hit DB
jest.mock('@/app/actions', () => ({
    createRecipeAction: jest.fn()
}))

const mockTags = [{id: 1, name: 'Korean', recipe_count: 2}, {id: 2, name: 'Western', recipe_count: 3}]

describe('RecipeForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    }) 
    it('should display a validation error if name is empty', async () => {
        render(<NewRecipeForm tags={mockTags} />);
        const createBtn = screen.getByRole('button', {name: /Create/i });
        fireEvent.click(createBtn);
        const errorMsg = await screen.findByText('Please add a name for your recipe.')
        expect(errorMsg.toBeInTheDocument());
    })

    it('should display tags', )
    
    it('should add more ingredients when "add more" button is clicked', )
    it('should clear the input when "remove" button is clicked', )
    // same for steps and notes
    it('should add youtube thumbnail when a valid youtube link is added',)
    it('should remove the youtube thumbnail when "remove" button is clicked',)
    it('should submit the form when all required fields are filled', )
    it('should display an error message when the server action fails',)
    



})

