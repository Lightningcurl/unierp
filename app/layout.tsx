import type { Metadata } from "next";
import { Outfit } from 'next/font/google'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { getCurrentUserProfile } from "@/lib/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniErp",
  description: "ERP operations for Unirsal",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const name = await getCurrentUserProfile();

  return (
    <html lang="en" className={`dark ${outfit.variable}`}>
      <body className="bg-background font-sans antialiased">
        <div className="flex min-h-svh bg-background">
          <Sidebar name={name} />
          <div className="flex min-w-0 flex-1 flex-col">{children}</div>
        </div>
      </body>
    </html>
  )
}
