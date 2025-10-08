import { Dispatch, SetStateAction } from "react";
import { Control, UseFormWatch, FieldErrors, UseFormRegister, UseFormResetField, UseFormGetValues } from 'react-hook-form';

export interface Tag {
    id: number;
    name: string;
    recipe_count: number;
  }

  export interface Step {
    id: number;
    photo_id?: number;
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

  export interface RecipeDetail extends Recipe {
    tag_name: string;
    cuisine_tag_name: string;
    notes: Note[];
    steps: Step[];
    external_link: string;
  }

  export interface RecipeMain extends Recipe {
    main_ingredient_tag: string;
    cuisine_tag: string;
    notes: Note[];
    steps: Step[];
    external_link: string;
  }


  type IngredientType = 'main' | 'optional' | 'sauce';
  export interface Ingredient {
    id: number;
    recipe_id: number;
    ingredient_name: string;
    quantity: number;
    unit: string;
    type: IngredientType;
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
    onMouseLeave?: () => void;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  }

  export interface FormSubmitData {
    recipe_name: string;
    duration: number;
    serving: number;
    tags: number[];
    steps: Step[];
    img_link: string;
    external_link: string;
    notes: Note[];
    main_ingredients: Omit<Ingredient, "recipe_id">[];
    optional_ingredients: Omit<Ingredient, "recipe_id">[];
    sauce_ingredients: Omit<Ingredient, "recipe_id">[];
}

export interface FormData {
  recipe_name: string;
  duration: number;
  serving: number;
  steps: Step[];
  img_link: string;
  external_link: string;
  notes: Note[];
  ingredients: Omit<Ingredient, "recipe_id">[];
}

export interface VideoState {
  videoId: string;
  isVideoValid: boolean;
  errorMessage: string;
}

export interface InputProps {
    register: UseFormRegister<FormSubmitData>;
    errors: FieldErrors<FormSubmitData>;
}

export interface TagProps {
    tags: Tag[];
    control: Control<FormSubmitData>;
}

export interface InputUseFieldArrayProps extends InputProps{
    control: Control<FormSubmitData>;
    watch: UseFormWatch<FormSubmitData>;
}

export interface VideoInputProps {
    register: UseFormRegister<FormSubmitData>;
    resetField: UseFormResetField<FormSubmitData>;
    getValues: UseFormGetValues<FormSubmitData>;
    video: VideoState;
    setVideo: React.Dispatch<React.SetStateAction<VideoState>>;
}

export interface IngredientsInputProps extends InputProps {
    control: Control<FormSubmitData>;
    getValues: UseFormGetValues<FormSubmitData>;
}

export interface MainIngTagButtonProps {
  tags: Tag[] | null;
  selectedTag: string;
  onClick: (tagName: string) => void;
}