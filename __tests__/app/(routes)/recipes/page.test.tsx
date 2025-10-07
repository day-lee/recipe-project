import { render, screen, fireEvent } from '@testing-library/react';
import RecipeList from '@/app/features/recipes/detail_recipe_id/components/RecipeList'

let mockReplace = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => new URLSearchParams("tag=korean"),
  usePathname: () => "/recipes",
}))

import TagButton from '@/app/features/recipes/detail_recipe_id/components/TagButton'

const mockRecipes = [
    {
        "id": 11,
        "public_id": "1b6c3e20-b340-4abc-a533-61487c3a10b1",
        "recipe_name": "Kimchi stew (Kimchi Jjigae)",
        "duration": 30,
        "img_link": "https://day-lee.github.io/recipe-book-food-photos/kimchi-stew.png",
        "serving": 2,
    },
    {
        "id": 5,
        "public_id": "2de913c1-1cc1-462e-aa65-42a3e7ed029d",
        "recipe_name": "English breakfast",
        "duration": 30,
        "img_link": "https://day-lee.github.io/recipe-book-food-photos/5-english-breakfast.png",
        "serving": 1,
    }]

const mockTags = [
    {
        "id": 1,
        "name": "Korean",
        "recipe_count": 7
    },
    {
        "id": 2,
        "name": "Western",
        "recipe_count": 2
    },
    {
        "id": 3,
        "name": "Chicken",
        "recipe_count": 4
    },
    {
        "id": 11,
        "name": "International",
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
        render (<TagButton tags={mockTags} />)
        expect(screen.getByText("Korean (7)")).toBeInTheDocument();
        expect(screen.getByText("Western (2)")).toBeInTheDocument();
        expect(screen.getByText("Chicken (4)")).toBeInTheDocument();
        expect(screen.getByText("International (3)")).toBeInTheDocument();
    });
    test('should change the url to "?tags=..." when clicking the tag', () => {
        render (<TagButton tags={mockTags} />)
        fireEvent.click(screen.getByText("Korean (7)"))
        expect(mockReplace).toHaveBeenCalledWith('/recipes?tag=Korean')
    });
    test('should remove the query param when clicking again', () => {
        render (<TagButton tags={mockTags} />)
        fireEvent.click(screen.getByText('Korean (7)'))
        expect(mockReplace).toHaveBeenCalledWith('/recipes?tag=Korean')
        mockReplace.mockClear()
        fireEvent.click(screen.getByText('Korean (7)'))
        expect(mockReplace).toHaveBeenCalledWith('/recipes?')
    })
})