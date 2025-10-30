'use client';

export default function SearchLayout( { children }: {children: React.ReactNode }) {
    return (
        <main className="min-h-screen flex flex-col lg:items-center relative bg-white sm:ml-20 sm:mr-6">
            {children}
        </main>
    )
}
