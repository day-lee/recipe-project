import Link  from "next/link";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
    return (
        <>
        <header className="w-full">
            <div className="flex flex-row justify-between max-w-5xl mx-auto px-2 sm:px-6 lg:px-10 border-b-2 border-gray-200">
                <div className="flex items-center py-4 sm:py-8">
                    <Link href="/recipes" className="font-bold text-md sm:text-2xl text-red-700 w-1/2 sm:w-full"> 
                        Recipe Project
                    </Link>
                </div>
                <div className="flex items-center">
                    {/* <XMarkIcon className="h-4 w-4 font-semibold" /> */}
                    <button>
                        <Bars3Icon className=" h-8 w-8 font-bold" />
                    </button>
                </div>
            </div>
        </header>
        </>
    )
}
