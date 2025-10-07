import { FormSubmitData } from "@/app/features/recipes/types/types"

export const extractVideoId = (url: string): string | null => {
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|v\/|embed\/))([^#&?]*).*/;
    const match = url.match(regExp);
    const youtubeVideoIdLength = 11;
    return match && match[1].length === youtubeVideoIdLength ? match[1] : null;
  };

  export const nameFormatter = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) return '';
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
  }

  export const mergeIngredients = (data:FormSubmitData) => {
    return [
      ...(data.main_ingredients || []).map(item => ({ ...item, type: 'main' as const })),
      ...(data.optional_ingredients || []).map(item => ({ ...item, type: 'optional' as const })),
      ...(data.sauce_ingredients || []).map(item => ({ ...item, type: 'sauce' as const })),
    ];
  }