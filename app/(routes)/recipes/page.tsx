import RecipeList from './RecipeList';
import TagList from './TagList'; 

export default async function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
        <TagList />
        <RecipeList />
      </div>
    </main>
  );
}


