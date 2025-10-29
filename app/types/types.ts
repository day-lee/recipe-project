import { Dispatch, SetStateAction } from "react";
import { Control, UseFormWatch, FieldErrors, UseFormRegister, UseFormResetField, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
export interface Tag {
    id: number;
    name: string;
    recipe_count: number;
  }

export interface MainListIngredientTag {
    id: number;
    tag_name: string;
    recipe_count: number;
  }  

export interface CuisineTag {
    id: number;
    cuisine_tag_name: string;
  }  

  export interface Step {
    id: number;
    photo_id?: number;
    desc: string;
  }

export interface Recipe {
    id: number;
    public_id: string;
    created_user_id: string;
    recipe_name: string;
    duration: number;
    img_link: string;
    serving: number;
  }  

  export interface RecipeDetail extends Recipe {
    tag_name_id: number;
    tag_name: string;
    cuisine_tag_id: number;
    cuisine_tag_name: string;
    notes: Note[];
    steps: Step[];
    external_link: string;
    ingredients: GroupedIngredientsList;
  }

  export interface RecipeMain extends Recipe {
    main_ingredient_tag: string;
    cuisine_tag: string;
    notes: Note[]; 
    steps: Step[];
    external_link: string;
  }

  export interface RecipeListProps {
    recipes: RecipeMain[];
  }

  export interface RecipeCardProps {
    recipe: RecipeMain;
  }

  export type user = string | undefined;

  type IngredientType = 'main' | 'optional' | 'sauce';

  export interface Ingredient {
    id: number;
    recipe_id: number;
    ingredient_name: string;
    quantity: number;
    unit: string;
    type: IngredientType;
  }

export interface GroupedIngredientsList {
  mainIngredients: Ingredient[];
  sauceIngredients: Ingredient[];
  optionalIngredients: Ingredient[];
}

export interface IngredientsProps {
  ingredientsList: GroupedIngredientsList;
  defaultServing: number;
}

  export interface Note {
    id: number;
    desc: string;
  }

  type RecipeFormModeType = 'create' | 'edit';

  export interface RecipeFromProps {
      mainIngredientTag: MainListIngredientTag[] | [];
      mode: RecipeFormModeType;
      defaultValues?: FormSubmitData;
      recipeId?: string;
  }

  export interface FormSubmitData {
    recipe_name: string;
    duration: number;
    serving: number;
    main_ingredient_tag: number;
    cuisine_tag: number;
    steps: Step[];
    img_link: string;
    // img_file?: string;
    external_link: string;
    notes: Note[];
    main_ingredients: Omit<Ingredient, "recipe_id">[];
    optional_ingredients: Omit<Ingredient, "recipe_id">[];
    sauce_ingredients: Omit<Ingredient, "recipe_id">[];
}

  export interface VideoState {
    videoId: string;
    isVideoValid: boolean;
    errorMessage: string;
  }

  export interface ImageUploadProps {
    register: UseFormRegister<FormSubmitData>;
    watch: UseFormWatch<FormSubmitData>;
    setValue: UseFormSetValue<FormSubmitData>;
    previewUrl: string;
    setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
  }

  export interface InputProps {
    register: UseFormRegister<FormSubmitData>;
    errors: FieldErrors<FormSubmitData>;
  }

  export interface TagProps {
    mainIngredientTag: MainListIngredientTag[];
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
    mainIngredientTags: MainListIngredientTag[] | null;
    selectedMainIngTagId: number | undefined;
    onClick: (tagId: number, tagName: string) => void;
  }

    export interface SidebarProps {
    onClick?: () => void;
    onMouseLeave?: () => void;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  }

  export interface SearchProps {
    onChange: (term: string) => void
    searchInput: string;
  }

  export interface MainFilterProps {
    onChange: (selectedCuisineTag: string) => void;
    selectedCuisineTag: string;
  }

  export interface RemoveFilterProps {
    onClick: () => void;
    selectedMainIngTagId: number | undefined;
    searchInput: string;
    selectedCuisineTag: string;
  }