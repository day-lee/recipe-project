import React from 'react'
import { render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import { submitSuccessMsg } from '@/app/(routes)/new-recipe/components/NewRecipeForm'

import { NewRecipeForm } from '@/app/(routes)/new-recipe/components/NewRecipeForm'
import { createRecipeAction } from '@/app/actions'
// 1. mock the server action so we don't hit DB
jest.mock('@/app/actions', () => ({
    createRecipeAction: jest.fn()
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

const mockedUseRouter = useRouter as jest.Mock;

const mockTags = [{id: 1, name: 'Korean', recipe_count: 2}, {id: 2, name: 'Western', recipe_count: 3}]

const prefilledValues = {
    recipe_name: 'Test recipe',
    duration: 30,
    serving: 4,
    tags: [1], 
    steps: [{ id: 1, desc: 'Mix ingredients' }],
    main_ingredients: [{ id: 1, ingredient_name: 'Flour', quantity: 200, unit: 'g', type: 'main' as const }],
    optional_ingredients: [],
    sauce_ingredients: [],
    img_link: '',
    external_link: '',
    notes: [{ id: 1, desc: 'Baking at 180°C' }],
};

const defaultValues = {
    "recipe_name": "Test recipe",
    "duration": 120,
    "serving": 1,
    "tags": [
        1
    ],
    "steps": [
        {
            "id": 1,
            "desc": "Ut earum eum fugiat assumenda tempor in quis tempora et aperiam in qui et hic non"
        }
    ],
    "img_link": "",
    "external_link": "Id cillum consequat",
    "notes": [
        {
            "id": 1,
            "desc": "Voluptas ab itaque qui enim rerum nihil ullamco"
        }
    ],
    "main_ingredients": [
        {
            "id": 1,
            "ingredient_name": "Brenna shepard",
            "quantity": 916,
            "unit": "kg",
            "type": "main" as const
        }
    ],
    "optional_ingredients": [],
    "sauce_ingredients": []
}

describe('RecipeForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        const pushMock = jest.fn();
        mockedUseRouter.mockReturnValue({
            push: pushMock
        });
        render(<NewRecipeForm tags={mockTags} />);
    }) 
    it('should display a validation error if name is empty', async () => {
        const createBtn = screen.getByRole('button', { name: /Create/i });
        await userEvent.click(createBtn);
        const errorMsg = await screen.findByText(/Recipe name must be at least 3 characters long/i)
        expect(errorMsg).toBeInTheDocument()
    })
    it('should display tags', async () => {
        const koreanTag = await screen.findByText(/korean/i)
        expect(koreanTag).toBeInTheDocument()
        const westernTag = await screen.findByRole('button', { name: /western/i })
        expect(westernTag).toBeInTheDocument()
    })
    it('should display more "main ingredients" inputs when "add more"/"remove" button is clicked', async () => {
        const mainIngredientSection = screen.getByLabelText('main ingredient section');
        const inputsBefore = within(mainIngredientSection).getAllByPlaceholderText('Ingredient name: e.g. Chicken')
        expect(inputsBefore.length).toBe(1);
        const addMoreBtn = within(mainIngredientSection).getByLabelText('add more main ingredient input button')
        expect(addMoreBtn).toBeInTheDocument();
        await userEvent.click(addMoreBtn);
        const inputsAfter = await within(mainIngredientSection).findAllByPlaceholderText('Ingredient name: e.g. Chicken')
        expect(inputsAfter.length).toBe(2);
    } )
    it('should display fewer "main ingredients" inputs when "remove" button is clicked', async () => {
        const mainIngredientSection = screen.getByLabelText('main ingredient section');  
        const inputsBefore = within(mainIngredientSection).getAllByPlaceholderText('Ingredient name: e.g. Chicken')
        expect(inputsBefore.length).toBe(1);
        const addMoreBtn = within(mainIngredientSection).getByLabelText('add more main ingredient input button')
        expect(addMoreBtn).toBeInTheDocument();
        await userEvent.click(addMoreBtn);
        const removeBtn = await within(mainIngredientSection).findAllByLabelText('remove main ingredients input button')
        await userEvent.click(removeBtn[1])
        const inputsAfter = await within(mainIngredientSection).findAllByPlaceholderText('Ingredient name: e.g. Chicken')
        expect(inputsAfter.length).toBe(1);        
    })
    it('Should display more "optional ingredients" inputs when the "Add more" button is clicked', async () => {
        const optionalIngredientSection = screen.getByLabelText('optional ingredient section');
        const inputsBefore = within(optionalIngredientSection).queryByPlaceholderText('Ingredient name: e.g. Onion')
        expect(inputsBefore).toBeNull();
        const addMoreBtn = within(optionalIngredientSection).getByLabelText('add more optional ingredient input button')
        expect(addMoreBtn).toBeInTheDocument();
        await userEvent.click(addMoreBtn);
        const inputsAfter = await within(optionalIngredientSection).findAllByPlaceholderText('Ingredient name: e.g. Onion')
        expect(inputsAfter.length).toBe(1);
    } )
    it('Should display guide message for addition and remove "optional ingredients" inputs when the "Remove" button is clicked', async () => {
        const optionalIngredientSection = screen.getByLabelText('optional ingredient section');
        const addBtnGuideMsg = within(optionalIngredientSection).getByText('Click the “Add More” button above to add optional ingredients.')
        expect(addBtnGuideMsg).toBeInTheDocument();
        const addMoreBtn = within(optionalIngredientSection).getByLabelText('add more optional ingredient input button')
        expect(addMoreBtn).toBeInTheDocument();
        await userEvent.click(addMoreBtn);
        const removeBtn = await within(optionalIngredientSection).findByLabelText('remove optional ingredients input button')
        await userEvent.click(removeBtn);
        expect(addBtnGuideMsg).toBeInTheDocument();
    } )
    it('Should display more "sauce ingredients" inputs when the "Add more" button is clicked', async () => {
        const sauceIngredientSection = screen.getByLabelText('sauce ingredient section');
        const inputsBefore = within(sauceIngredientSection).queryByPlaceholderText('Ingredient name: e.g. Vinegar')
        expect(inputsBefore).toBeNull();
        const addMoreBtn = within(sauceIngredientSection).getByLabelText('add more sauce ingredient input button')
        expect(addMoreBtn).toBeInTheDocument();
        await userEvent.click(addMoreBtn);
        const inputsAfter = await within(sauceIngredientSection).findAllByPlaceholderText('Ingredient name: e.g. Vinegar')
        expect(inputsAfter.length).toBe(1);
        })
    it('Should display guide message for addition and remove "sauce ingredients" inputs when the "Remove" button is clicked', async () => {
        const sauceIngredientSection = screen.getByLabelText('sauce ingredient section');
        const addBtnGuideMsg = within(sauceIngredientSection).getByText('Click the “Add More” button above to add sauce ingredients.')
        expect(addBtnGuideMsg).toBeInTheDocument();
        const addMoreBtn = within(sauceIngredientSection).getByLabelText('add more sauce ingredient input button')
        await userEvent.click(addMoreBtn);
        const removeBtn = await within(sauceIngredientSection).findByLabelText('remove sauce ingredients input button')
        await userEvent.click(removeBtn)
        expect(addBtnGuideMsg).toBeInTheDocument();
        })        
    it('Should display more "steps" input when the "Add more" button is clicked', async () => {
        const stepsSection = screen.getByLabelText('steps section');
        const inputsBefore = within(stepsSection).getAllByPlaceholderText('e.g. Thinly slice the onion')
        expect(inputsBefore.length).toBe(1);
        const addMoreBtn = within(stepsSection).getByLabelText('add more steps button')
        expect(addMoreBtn).toBeInTheDocument();
        await userEvent.click(addMoreBtn);
        const inputsAfter = await within(stepsSection).findAllByPlaceholderText('e.g. Thinly slice the onion')
        expect(inputsAfter.length).toBe(2);
        })   
    it('Should remove "steps" input when the "Remove" button is clicked', async () => {
        const stepsSection = screen.getByLabelText('steps section');
        const addMoreBtn = within(stepsSection).getByLabelText('add more steps button')
        await userEvent.click(addMoreBtn);
        const inputsBefore = within(stepsSection).getAllByPlaceholderText('e.g. Thinly slice the onion')
        expect(inputsBefore.length).toBe(2);
        const removeBtn = await within(stepsSection).findAllByLabelText('remove steps button')
        await userEvent.click(removeBtn[1]);
        const inputsAfter = await within(stepsSection).findAllByPlaceholderText('e.g. Thinly slice the onion')
        expect(inputsAfter.length).toBe(1);
        })      
    it('Should display the image after correct input is added and "add" button is clicked in video section', async () => {
        const videoSection = screen.getByLabelText('video section');
        const input = within(videoSection).getByPlaceholderText('https://youtu.be/...');
        await userEvent.type(input, 'https://youtu.be/-rRFxzRCHKI?si=3FWxeuni6qPq_LUg');
        const addBtn = within(videoSection).getByLabelText('add video thumbnail button');
        await userEvent.click(addBtn);
        expect(await within(videoSection).findByAltText(/youtubeThumbnail/i)).toBeInTheDocument();
        expect(within(videoSection).getByText(/YouTube video registered successfully!/i)).toBeInTheDocument();
    })
    it('Should the image and the message cleared once "remove" button is clicked in video section', async () => {
        const videoSection = screen.getByLabelText('video section');
        const input = within(videoSection).getByPlaceholderText('https://youtu.be/...');
        await userEvent.type(input, 'https://youtu.be/-rRFxzRCHKI?si=3FWxeuni6qPq_LUg');
        const addBtn = within(videoSection).getByLabelText('add video thumbnail button');
        await userEvent.click(addBtn);
        expect(await within(videoSection).findByAltText(/youtubeThumbnail/i)).toBeInTheDocument();
        expect(within(videoSection).getByText(/YouTube video registered successfully!/i)).toBeInTheDocument();
        const removeBtn = within(videoSection).getByLabelText('remove video thumbnail button');
        await userEvent.click(removeBtn);
        expect(within(videoSection).queryByAltText(/youtubeThumbnail/i)).not.toBeInTheDocument();
        expect(within(videoSection).queryByText(/YouTube video registered successfully!/i)).not.toBeInTheDocument();
        expect(input).toHaveValue('');
    })
    it('Should display the error message after incorrect input is added "add" button is clicked in video section', async () => {
        const videoSection = screen.getByLabelText('video section');
        const input = within(videoSection).getByPlaceholderText('https://youtu.be/...');
        await userEvent.type(input, 'https://wrong-video-url');
        const addBtn = within(videoSection).getByLabelText('add video thumbnail button');
        await userEvent.click(addBtn);
        expect(await within(videoSection).findByAltText(/fallbackThumbnailImg/i)).toBeInTheDocument();
        expect(within(videoSection).getByText(/Please check the YouTube video URL./i)).toBeInTheDocument();
    })
    it('Should display more "notes" input when the "Add more" button is clicked', async () => {
        const notesSection = screen.getByLabelText('notes section');
        const inputsBefore = within(notesSection).getAllByPlaceholderText('Any tips?')
        expect(inputsBefore.length).toBe(1);
        const addMoreBtn = within(notesSection).getByLabelText('add more notes button')
        expect(addMoreBtn).toBeInTheDocument();
        await userEvent.click(addMoreBtn);
        const inputsAfter = await within(notesSection).findAllByPlaceholderText('Any tips?')
        expect(inputsAfter.length).toBe(2);
        })   
    it('Should remove "notes" input when the "Remove" button is clicked', async () => {
        const stepsSection = screen.getByLabelText('notes section');
        const addMoreBtn = within(stepsSection).getByLabelText('add more notes button')
        await userEvent.click(addMoreBtn);
        const inputsBefore = within(stepsSection).getAllByPlaceholderText('Any tips?')
        expect(inputsBefore.length).toBe(2);
        const removeBtn = await within(stepsSection).findAllByLabelText('remove notes button')
        await userEvent.click(removeBtn[1]);
        const inputsAfter = await within(stepsSection).findAllByPlaceholderText('Any tips?')
        expect(inputsAfter.length).toBe(1);
        })  
})
    // describe('RecipeForm submit', () => {
    // it('should submit successfully with prefilled data', async () => {
    //     const pushMock = jest.fn();
    //     mockedUseRouter.mockReturnValue({push: pushMock});
    //     (createRecipeAction as jest.Mock).mockResolvedValueOnce('success');
    //     render(<NewRecipeForm tags={mockTags} />);
    //     // const createBtn = screen.getByLabelText(/create button/i)
    //     const createBtn = screen.getByRole('button', { name: /create/i });
    //     await userEvent.click(createBtn)
    //     expect(createRecipeAction).toHaveBeenCalledTimes(1);
    //     expect(createRecipeAction).toHaveBeenCalledWith(expect.objectContaining({recipe_name: "Test recipe",}));
    //     expect(pushMock).toHaveBeenCalled(); // redirect
    // })    
    // it('should display an error message when the server action fails', async () => {
    //     const pushMock = jest.fn();
    //     mockedUseRouter.mockReturnValue({push: pushMock});
    //     (createRecipeAction as jest.Mock).mockRejectedValueOnce(new Error('Server error'));
    //     render(<NewRecipeForm tags={mockTags} defaultValues={defaultValues} />);
    //     const createBtn = screen.getByLabelText(/create button/i)
    //     await userEvent.click(createBtn)
    //     expect(createRecipeAction).toHaveBeenCalledWith(expect.objectContaining({recipe_name: 'Test recipe',}));
    //     const errorMsg = await screen.findByText('Sorry, something went wrong. Please try again.')
    //     expect(errorMsg).toBeInTheDocument();
    //     expect(pushMock).not.toHaveBeenCalled(); // no redirect
    //     })    
    // })


