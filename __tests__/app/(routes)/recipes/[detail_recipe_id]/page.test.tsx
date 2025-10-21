import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event'
import DetailCard from '@/app/(routes)/recipes/[detail_recipe_id]/components/DetailCard';

const mockRecipeDetail = 
    {
        "id": 11,
        "public_id": "64c7fdb9-717a-4f31-91c3-fbe0904e7242",
        "recipe_name": "Seaweed soup",
        "duration": 30,
        "img_link": "https://day-lee.github.io/recipe-book-food-photos/seaweed-soup.png",
        "serving": 1,
        "tag_name": 'Beef',
        "tag_name_id": 2,
        "cuisine_tag_name": "Korean",
        "cuisine_tag_id": 1,
        "notes": [
            {
                "id": 1,
                "desc": "You can add 1 teaspoon of fish sauce, according to your preference."
            }
        ],
        "steps": [
            {
                "id": 10,
                "photo_id": 0,
                "desc": "Soak dried seaweed (miyeok) in cold water for 30 minutes until fully expanded, then drain and cut into bite-sized pieces."
            },],
        "external_link": "xsTFsunt6-8",
        "ingredients": {
            "mainIngredients": [{
            "id": 17,
            "recipe_id": 10,
            "recipe_name": "Seaweed soup",
            "ingredient_name": "Beef",
            "quantity": 100,
            "unit": "g",
            "type": "main" as const
        }, {
            "id": 18,
            "recipe_id": 10,
            "recipe_name": "Seaweed soup",
            "ingredient_name": "Seaweed",
            "quantity": 5,
            "unit": "g",
            "type": "main" as const
        }], "optionalIngredients":[],
     "sauceIngredients":[{
        "id": 16,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Minced garlic",
        "quantity": 1,
        "unit": "t",
        "type": "sauce" as const
    },  {
        "id": 19,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Sesame oil",
        "quantity": 1,
        "unit": "T",
        "type": "sauce" as const
    },     {
        "id": 20,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Soybean sauce",
        "quantity": 1,
        "unit": "T",
        "type": "sauce" as const

    }]}
    }
const mockIngredients =  {
    "mainIngredients": [{
        "id": 17,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Beef",
        "quantity": 100,
        "unit": "g",
        "type": "main" as const
    }, {
        "id": 18,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Seaweed",
        "quantity": 5,
        "unit": "g",
        "type": "main" as const
    }], 
    "optionalIngredients":[],
    "sauceIngredients":[{
        "id": 16,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Minced garlic",
        "quantity": 1,
        "unit": "t",
        "type": "sauce" as const
    }, {
        "id": 19,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Sesame oil",
        "quantity": 1,
        "unit": "T",
        "type": "sauce" as const
    }, {
        "id": 20,
        "recipe_id": 10,
        "recipe_name": "Seaweed soup",
        "ingredient_name": "Soybean sauce",
        "quantity": 1,
        "unit": "T",
        "type": "sauce" as const
    }]}

const mockReplace = jest.fn();

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: mockReplace,
        push: jest.fn()
    }),
    usePathname: () => "/recipes",
    useSearchParams: () => new URLSearchParams("main_ing_tag_param=Chicken")
}))

describe("RecipeDetailPage", () => {
    it('should render recipe detail page - required details: name, time, tag, serving, ingredients, steps ', () => {
        render(<DetailCard recipeDetail={mockRecipeDetail} ingredients={mockIngredients} />) 
        expect(screen.getByText("Seaweed soup")).toBeInTheDocument();
        expect(screen.getByText(/30 mins/)).toBeInTheDocument();
        expect(screen.getByText("Korean")).toBeInTheDocument();
        expect(screen.getByText("Beef")).toBeInTheDocument();
        expect(screen.getByRole("option", { name: /1 Person/})).toBeInTheDocument();
        expect(screen.getByText(/Beef 100g/)).toBeInTheDocument();
        expect(screen.getByText(/Sesame oil/)).toBeInTheDocument();
        expect(screen.getByText(mockRecipeDetail.steps[0].desc)).toBeInTheDocument();
        expect(screen.getByText(mockRecipeDetail.notes[0].desc)).toBeInTheDocument();
    })
    it("should increase/decrease ingredient amounts when serving changes", async () => {
        render(<DetailCard recipeDetail={mockRecipeDetail} ingredients={mockIngredients} />) 
        expect(screen.getByText(/Beef 100g/)).toBeInTheDocument();
        const select = screen.getByRole('combobox');
        await userEvent.selectOptions(select, '2')
        expect(screen.getByText(/Beef 200g/)).toBeInTheDocument();
        await userEvent.selectOptions(select, '3')
        expect(screen.getByText(/Beef 300g/)).toBeInTheDocument();
    })
    it('should load a youtube video when there is video section', () => {
        render(<DetailCard recipeDetail={mockRecipeDetail} ingredients={mockIngredients} />) 
        const iframe = screen.getByTitle('youtube video');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/${mockRecipeDetail.external_link}`)
    } )
    it("should render image when there is img_link", () => {
        render(<DetailCard recipeDetail={mockRecipeDetail} ingredients={mockIngredients} />) 
        const image = screen.getByAltText("Seaweed soup");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(mockRecipeDetail.img_link)))
    })
})