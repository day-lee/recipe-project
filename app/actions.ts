'use server';

import { createClient } from '@/lib/supabase/server'
import { Step, Note} from './types/types'
import { extractVideoId } from '@/utils/utils'

export type FormState = {
    message: string;
};

const defaultDuration = 15;
const defaultServing = 1;
const steps: Step[] = []
const step = {desc:"", id: 1, photo_id: 1}
   // '[{"desc": "this is test.", "step": 1, "photo_id": 1}]'
const notes: Note[] = []
const note = {desc: "", id: 1}
// '[{"id": 1, "desc": "this is test"}]'
export async function submitForm(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {
    // 유효성 검사 필요

    // DB: recipe 
    // const img_link = formData.get('img_link') as string;
    const img_link = 'img-link'
    const name = formData.get('name') as string;
    const duration = Number(formData.get('duration')) || defaultDuration;
    const serving = Number(formData.get('serving')) || defaultServing;

    const stepDesc = formData.get('steps') as string;
    step.desc = stepDesc
    steps.push(step)

    const external_video_link_full = formData.get('external_link') as string;
    const external_video_link = extractVideoId(external_video_link_full) 

    const noteDesc = formData.get('note') as string;
    note.desc = noteDesc
    notes.push(note)


    const supabase = await createClient()
    const { error:recipeError } = await supabase.rpc('create_new_recipe',
         { img_link_param:img_link , name_param: name, duration_param: duration, serving_param: serving,
          steps_param: steps, external_link_param: external_video_link, note_param: notes });
    if (recipeError) {
        console.error(`'form error: ${recipeError.message}`);
    }
    // DB: ingredients

    // const main_name = formData.get('main_ingredient_name') as string;
    // const main_amount = formData.get('main_ingredient_amount') as string;
    // const main_unit = formData.get('main_ingredient_unit') as string;

    // const { error:ingredientError } = await supabase.rpc('create_new_ingredient',
    //     { recipe_id_param: recipe_id, name_param: main_name, amount_param: main_amount, unit_param: main_unit})
    // if (ingredientError) {
    //     console.error(`'form error: ${ingredientError.message}`)
    // }

    return {
        message: `name:${name} form submitted`
    };
}