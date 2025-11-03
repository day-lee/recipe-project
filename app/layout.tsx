import type { Metadata } from "next";
import { Geist } from "next/font/google";
// import { ThemeProvider } from "next-themes";

import "@/app/globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Recipe Project",
  description: "Recipe archive for everyday home cooking.",
  openGraph: {
    title: "Recipe Project",
    description: "Recipe archive for everyday home cooking.",
    images: {
        url: '/recipe_pj_front.png',  
        width: 680,
        height: 430,
      },
    type: 'website',
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <Header />
        <div className="hidden sm:block"><Sidebar /></div>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange> */}
          {children}
        {/* </ThemeProvider> */}
        <Footer />
      </body>
    </html>
  );
}
