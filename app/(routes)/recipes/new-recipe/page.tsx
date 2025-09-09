import { NewRecipeForm } from '../recipes/components/NewRecipeForm'

export default function HomePage() {

  return (
    <main className="flex flex-col mx-auto p-8 justify-center items-center">
      <h1 className="text-2xl font-bold text-center">
        Create a new recipe
      </h1>
      <p>Share your yummy ideas!</p>
      <NewRecipeForm />
    </main>
  );
}