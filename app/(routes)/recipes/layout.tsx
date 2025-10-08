'use client';

export default function SearchLayout( { children }: {children: React.ReactNode }) {
    return (
        <main className="min-h-screen flex flex-col lg:items-center relative bg-white">
            {children}
        </main>
    )
}
