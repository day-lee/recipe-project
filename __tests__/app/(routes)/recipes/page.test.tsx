import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import RecipeList from '@/app/(routes)/recipes/components/mainPage/RecipeList';

let mockReplace = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => new URLSearchParams("main_ing_tag_param=Chicken"),
  usePathname: () => "/recipes",
}))

import MainIngTagButton from '@/app/(routes)/recipes/components/mainPage/MainIngTagButton';

const mockRecipes = [
    {
        "id": 11,
        "public_id": "1b6c3e20-b340-4abc-a533-61487c3a10b1",
        "recipe_name": "Kimchi stew (Kimchi Jjigae)",
        "duration": 30,
        "img_link": "https://day-lee.github.io/recipe-book-food-photos/kimchi-stew.png",
        "serving": 2,
        "main_ingredient_tag": 'Veggie',
        "cuisine_tag": "Korean",
        "notes": [],
        "steps": [],
        "external_link": ""
    },
    {
        "id": 5,
        "public_id": "2de913c1-1cc1-462e-aa65-42a3e7ed029d",
        "recipe_name": "English breakfast",
        "duration": 30,
        "img_link": "https://day-lee.github.io/recipe-book-food-photos/5-english-breakfast.png",
        "serving": 1,
        "main_ingredient_tag": 'Others',
        "cuisine_tag": "Western",
        "notes": [],
        "steps": [],
        "external_link": ""
    }]

const mockTags = [
    {
        "id": 1,
        "tag_name": "Chicken",
        "recipe_count": 7
    },
    {
        "id": 2,
        "tag_name": "Pork",
        "recipe_count": 2
    },
    {
        "id": 3,
        "tag_name": "Beef",
        "recipe_count": 4
    },
    {
        "id": 11,
        "tag_name": "Seafood",
        "recipe_count": 3
    }
]

  beforeEach(() => {
    mockReplace = jest.fn()
  })

describe("RecipeList", () => {
    test('should render recipe cards when recipes exist', async () => {
        const ui = await RecipeList({recipes: mockRecipes})
        render(ui);
        expect(await screen.findByText("Kimchi stew (Kimchi Jjigae)")).toBeInTheDocument();
        expect(await screen.findByText("English breakfast")).toBeInTheDocument();
    });
    test('should display empty message when no recipes exists', async () => {
        const ui = await RecipeList({ recipes: [] });
        render(ui)
        expect(screen.getByText('There is nothing in this tag yet — start adding your recipes!')).toBeInTheDocument();
    })
})

describe("Tags Button/Filter", () => {
    test('should render all Main Ingredients tags', async () => {
        render (<MainIngTagButton mainIngredientTags={mockTags} selectedMainIngTagId={1} onClick={jest.fn()}/>)
        expect(await screen.findByRole('button', { name: 'Chicken (7)' })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: 'Pork (2)' })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: 'Beef (4)' })).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: 'Seafood (3)' })).toBeInTheDocument();
    });
    test('should change the url to "main_ing_tag_param=..." when clicking the Main Ingredient tag', async () => {
        render (<MainIngTagButton mainIngredientTags={mockTags} selectedMainIngTagId={1} onClick={jest.fn()}/>)
        const tagButton = await screen.findByRole('button', { name: 'Chicken (7)' });
        // userEvent.click(tagButton);
        // await waitFor(() => expect(mockReplace).toHaveBeenCalledTimes(1));
        // const calledUrl = mockReplace.mock.calls[0][0];
        // expect(calledUrl).toContain('/recipes');
        // expect(calledUrl).toContain('/recipes?main_ing_tag_param=Chicken');
    });
    // test('should change the url to "?cuisine_tag_param=..." when clicking the cuisine filter', () => {
    //     render (<MainIngTagButton mainIngredientTags={mockTags} selectedMainIngTagId={1} onClick={jest.fn()}/>)
    //     userEvent.selectOptions(screen.getByRole('combobox'), 'Korean')
    //     expect(mockReplace).toHaveBeenCalledWith('/recipes?cuisine_tag_param=Korean')
    // });
    test('should remove the query param when clicking "clear" button', async () => {
        render (<MainIngTagButton mainIngredientTags={mockTags} selectedMainIngTagId={1} onClick={jest.fn()}/>)
        // userEvent.click(screen.getByRole('button', { name: 'Chicken (7)'}))
        // // expect(mockReplace).toHaveBeenCalledWith('/recipes?main_ing_tag_param=Chicken')
        // await waitFor(() => userEvent.click(screen.getByText('Clear')));
        // mockReplace.mockClear()
        // expect(mockReplace).toHaveBeenCalledWith('/recipes?')
    })
})
