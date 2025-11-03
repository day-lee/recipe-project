import { AuthButton } from "@/components/auth-button";
// import { LoginForm } from "@/components/login-form";
import Link from 'next/link'
import { catchPhrase } from "./(routes)/recipes/components/mainPage/MainSearchFilter";
import icon from '@/app/icon.svg'
import Image from "next/image";

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
            <p className="text-5xl sm:text-8xl font-semibold text-red-800 mb-4 sm:mb-8 font-serif ">Bon Appétit,</p>
            <p className="text-lg sm:text-2xl text-gray-600 text-center font-normal">{catchPhrase}</p>
            <div className="flex items-center mt-1 sm:mt-4">
              <Image src={icon} className="w-8 h-8" alt="logo"/>
              <p className="text-lg sm:text-2xl text-red-700 font-medium p-1">Recipe Project</p>
            </div>
          </div>
          <div className="flex flex-col px-4 py-8">
              <Link href={`/recipes`}>
              <button type="submit" 
                      className="w-full bg-red-700 border-2 m-1 px-4 py-4 rounded-md text-lg font-semibold text-white hover:bg-red-800 shadow-2xl active:scale-95 transition duration-400 transform" >
                {ctaButton}
              </button>
              </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
