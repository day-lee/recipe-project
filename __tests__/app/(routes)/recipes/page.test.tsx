import { render, screen, fireEvent } from '@testing-library/react';
import RecipeList from '@/app/(routes)/recipes/components/mainPage/RecipeList';

let mockReplace = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => new URLSearchParams("tag=korean"),
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
        "tag_name": "Korean",
        "recipe_count": 7
    },
    {
        "id": 2,
        "tag_name": "Western",
        "recipe_count": 2
    },
    {
        "id": 3,
        "tag_name": "Chicken",
        "recipe_count": 4
    },
    {
        "id": 11,
        "tag_name": "International",
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

describe("TagsButton", () => {
    test('should render all tags', () => {
        render (<MainIngTagButton mainIngredientTags={mockTags} selectedMainIngTagId={1} onClick={jest.fn()}/>)
        expect(screen.getByText("Korean (7)")).toBeInTheDocument();
        expect(screen.getByText("Western (2)")).toBeInTheDocument();
        expect(screen.getByText("Chicken (4)")).toBeInTheDocument();
        expect(screen.getByText("International (3)")).toBeInTheDocument();
    });
    test('should change the url to "?cuisine_tag_param=..." when clicking the cuisine tag', () => {
        render (<MainIngTagButton mainIngredientTags={mockTags} selectedMainIngTagId={1} onClick={jest.fn()}/>)
        fireEvent.click(screen.getByText("Korean (7)"))
        expect(mockReplace).toHaveBeenCalledWith('/recipes?cuisine_tag_param=Korean')
    });
    test('should remove the query param when clicking again', () => {
        render (<MainIngTagButton mainIngredientTags={mockTags} selectedMainIngTagId={1} onClick={jest.fn()}/>)
        fireEvent.click(screen.getByText('Korean (7)'))
        expect(mockReplace).toHaveBeenCalledWith('/recipes?cuisine_tag_param=Korean')
        mockReplace.mockClear()
        fireEvent.click(screen.getByText('Korean (7)'))
        expect(mockReplace).toHaveBeenCalledWith('/recipes?')
    })
})