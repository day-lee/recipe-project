import { render, screen } from '@testing-library/react';
import RecipeList from '@/app/(routes)/recipes/components/RecipeList'

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


