import { Dispatch, SetStateAction } from "react";

export interface Tag {
    id: number;
    name: string;
    recipe_count: number;
  }

  export interface Step {
    id: number;
    photo_id: number;
    desc: string;
  }

export interface Recipe {
    id: number;
    public_id: string;
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

  export interface SidebarProps {
    onClick?: () => void;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  }

  export interface FormData {
    recipe_name: string;
    duration: number;
    serving: number;
    steps: Step[];
    img_link: string;
    external_link: string;
    note: string;
    // main_ingredient_name: string;
    // main_ingredient_amount: string;
    // main_ingredient_unit: string;
}

export interface VideoState {
  videoId: string;
  isVideoValid: boolean;
  errorMessage: string;
}