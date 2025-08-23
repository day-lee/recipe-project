'use client';
import { usePathname } from 'next/navigation';

import Search from "./components/Search";

export default function SearchLayout( { children }: {children: React.ReactNode }) {
    const pathname = usePathname();
    const showSearch = pathname === '/recipes';
    return (
        <main className="min-h-screen flex flex-col lg:items-center relative">
        {showSearch && (<Search />)}
            {children}
        </main>
    )
}
