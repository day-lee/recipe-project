import Search from "./components/Search";
import RecipeList from "./components/RecipeList";
import { Suspense } from 'react'


export default async function Page({
  searchParams }: {
    searchParams?: {
      query?: string;
    }
}) {
const query = searchParams?.query || '';
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex flex-col items-center gap-20 max-w-5xl p-5">
      <Suspense fallback={<div>Loading recipes...</div>}>
        <Search />
        <RecipeList query={query} />
        </Suspense>
        </div>
    </main>
  );
}


