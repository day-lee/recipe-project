export interface Tag {
    id: number;
    name: string;
    recipe_count: number;
  }

  export interface Step {
    step: number;
    photo_id: number;
    desc: string;
  }

export interface Recipe {
    id: number;
    recipe_name: string;
    duration: number;
    img_link: string;
    serving: number;
  }  

  export interface Ingredient {
    id: number;
    recipe_id: number;
    recipe_name: string;
    ingredient_name: string;
    quantity: number;
    unit: string;
    is_main: boolean;
    is_optional: boolean;
    is_sauce: boolean;
  }

  export interface IngredientsProps {
    ingredientsList: Ingredient[];
    defaultServing: number;
}

  export interface Note {
    id: number;
    desc: string;
  }