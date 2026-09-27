import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { builtLessonIds } from "@/content/loaders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CCAR-F Prep",
  description: "Study app for the Claude Certified Architect – Foundations exam.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans lg:flex-row">
        <Sidebar builtIds={[...builtLessonIds]} />
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">{children}</main>
          <footer className="border-t border-border px-4 py-5 text-center text-xs text-muted sm:px-8">
            Independent study aid. Not affiliated with or endorsed by Anthropic. Contains no actual exam content.
          </footer>
        </div>
      </body>
    </html>
  );
}
