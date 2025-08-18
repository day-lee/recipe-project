import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import parse from 'html-react-parser';


export default async function Page({ params }: {
    params: Promise<{ detail_recipe_id: number }>
}) {
const { detail_recipe_id } = await params     

const supabase = await createClient()
const { data: recipeDetail, error:recipeDetailError } = await supabase
.rpc('edit_get_detail_recipe_with_tag', { detail_recipe_id: detail_recipe_id});
console.log(recipeDetail)
if (recipeDetailError) {
    console.error('Error fetching recipes:', recipeDetailError);
    return <div>Error loading recipes</div>;
  }     

// const recipeDetail = [
//     {
//         "id": 2,
//         "recipe_name": "Beef and radish soup",
//         "created_user_id": 2,
//         "external_link": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/vG07DHeNH9c?si=HK55Gdcl-SlhWcBe\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
//         "duration": 30,
//         "img_link": "https://day-lee.github.io/recipe-book-food-photos/2-beef-stew.png",
//         "tag_name": [
//             "korean",
//             "beef"
//         ]
//     }
// ]
const { recipe_name, external_link, duration, img_link, tag_name } = recipeDetail[0]
// ingredients query 

    return (
        <div className='m-10'>
        <div className='text-3xl'> {recipe_name}</div>
        <Image priority={true} src={img_link} alt={recipe_name} width={300} height={150}/>
        <div>{tag_name.map((tag: string) => (<li key={tag}>{tag}</li>))}</div>
        <div> {duration} min</div>
        <div> Ingredients - TBC - query 
            <div>Main ingredients: 
                {}
            </div>
            <div>Optional ingredients: 
                {}
            </div>
            <div>Sauces: 
                {}
            </div> 
        </div>
        <div> Note - TBC: jsonb mock data, parse </div>
        {parse(external_link)} 
        </div>
    )
}

/*
beef and radish soup 1인분 

main: beef - 200g, radish - 50g
optional: spring onion 10g
sauce: soy sauce 2T, diced garlic 1T, sesame oil 2T 

note 
- beef in the water for 10 minutes to get rid of the blood
- cut mooli, spring onions into thin slices 
- put sesame oil and beef in the pan
- once browned, add mooli
- add water 300ml
- add soy sauce, garlic 
- simmer over 20 minutes and get rid of the foam
- add spring onions before serving 

external link: youtube embeded link or plain link? 

*/