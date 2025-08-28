import { NewRecipeForm } from '../components/NewRecipeForm'

export default function HomePage() {

  return (
    <main className="mx-auto p-8">
      <h1 className="text-3xl font-bold text-center">
        Create a recipe
      </h1>
      <NewRecipeForm />
    </main>
  );
}