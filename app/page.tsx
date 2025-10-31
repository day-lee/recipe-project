import { AuthButton } from "@/components/auth-button";
// import { LoginForm } from "@/components/login-form";
import Link from 'next/link'

const ctaButton = 'Discover All Amazing Recipes'
export default async function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        {/* <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16"> */}
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <div className="flex items-center gap-2">
              </div>
            </div>
             <AuthButton />
          </div>
        {/* </nav> */}
        <div className="flex-1 flex flex-col gap-10 max-w-5xl p-5 items-center">
          <div className="flex flex-col items-center">
            <p className="text-5xl sm:text-8xl font-semibold text-red-800 mb-4 sm:mb-8 font-serif">Bon Appétit,</p>
            <p className="text-xl sm:text-2xl text-gray-600 text-center">Deliciously Simple Recipe Selection, Just For You!</p>
          </div>
          <div className="flex flex-col px-4 py-8">
              <Link href={`/recipes`}>
              <button type="submit" 
                      className="w-full bg-red-700 border-2 m-1 px-4 py-4 rounded-md text-lg font-bold text-white hover:bg-red-800" >
                {ctaButton}
              </button>
              </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
