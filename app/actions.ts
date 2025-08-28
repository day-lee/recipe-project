'use server';

import { createClient } from '@/lib/supabase/server'

export type FormState = {
    message: string;
};

const defaultDuration = 15;
const defaultServing = 1;

export async function submitForm(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {

    // 유효성 검사 필요
    // const img_link = formData.get('img_link') as string;
    const img_link = 'img-link'
    const name = formData.get('name') as string;
    const duration = Number(formData.get('duration')) || defaultDuration;
    const serving = Number(formData.get('serving')) || defaultServing;
    // const steps = formData.get('steps') as string;
    const steps = 
    '[{"desc": "this is test.", "step": 1, "photo_id": 1}]'
    const external_link = formData.get('external_link') as string;
    // const note = formData.get('note') as string;
    const note = '[{"id": 1, "desc": "this is test"}]'

    const supabase = await createClient()
    const { error } = await supabase.rpc('create_new_recipe',
         { img_link_param:img_link , name_param: name, duration_param: duration, serving_param: serving,
          steps_param: steps, external_link_param: external_link, note_param: note });
    if (error) {
        console.error(`'form error: ${error.message}`);
    }
    return {
        message: `name:${name} form submitted`
    };
}