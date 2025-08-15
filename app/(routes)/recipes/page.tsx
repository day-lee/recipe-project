import Search from "./components/Search";
import RecipeList from "./components/RecipeList";
// import TagButton from "./components/TagButton";
import { Suspense } from 'react'

export default async function Page(
  props: {
      searchParams?: Promise<{
        query?: string | undefined;
        tag?: string | undefined;
      }>
  }
) {
  console.log('Page props:', props);
  const searchParam = await props.searchParams;  
  const query = searchParam?.query || '';
  const tag = searchParam?.tag || '';
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center gap-20 max-w-5xl p-5">
      <Suspense fallback={<div className="mt-96">Loading...</div>}>
        <Search />
        {/* <TagButton /> */}
        <RecipeList query={query} tag={tag} />
      </Suspense>
        </div>
    </main>
  );
}


