import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { TennisBall } from "@/components/ui";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tennis",
  description: "Claim your spot on the tennis court in Maputo.",
  authors: [{ name: "Nick Hericks" }],
  icons: {
    icon: { url: "/tennis-favicon.png", sizes: "192x192", type: "image/png" },
    shortcut: "/tennis-favicon.png",
    apple: "/tennis-favicon.png",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#323643" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-screen flex-col font-sans text-ink">
        <header className="sticky top-0 z-20 px-4 pt-4">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full bg-ink/90 py-2 pr-2 pl-4 text-white shadow-lift backdrop-blur-xl">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight whitespace-nowrap">
              <TennisBall className="size-7" />
              <span>Tennis Signup</span>
            </Link>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Link href="/add-event" className="rounded-full px-3 py-2 whitespace-nowrap text-white/80 transition hover:bg-white/10 hover:text-white">
                Add<span className="hidden sm:inline"> event</span>
              </Link>
              <Link href="/remove-event" className="rounded-full px-3 py-2 whitespace-nowrap text-white/80 transition hover:bg-white/10 hover:text-white">
                Remove<span className="hidden sm:inline"> event</span>
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:py-14">{children}</main>

        <footer className="px-4 pb-8 text-center text-sm text-ink/60">
          Built by{" "}
          <a className="font-semibold text-ink underline-offset-4 hover:underline" target="_blank" href="http://nickhericks.com/">
            Nick Hericks
          </a>
        </footer>
      </body>
    </html>
  );
}
