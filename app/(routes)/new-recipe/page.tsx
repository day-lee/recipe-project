import { NewRecipeForm } from './components/NewRecipeForm'
import { getTags } from '@/lib/supabase/rpc/getTags';

export default async function HomePage() {
    const { data: tags, error: tagError } = await getTags();
    if (tagError) {
      console.error('Error fetching tags:', tagError);
    }  
  return (
    <main className="flex flex-col mx-auto p-8 justify-center items-center">
      <h1 className="text-2xl font-bold text-center">
        Create a new recipe
      </h1>
      <p>Share your yummy ideas!</p>
      <NewRecipeForm tags={tags} />
    </main>
  );
}