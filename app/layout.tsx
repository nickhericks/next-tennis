import type { Metadata, Viewport } from "next";
import { Amaranth, Roboto } from "next/font/google";
import "./globals.css";

const amaranth = Amaranth({ variable: "--font-amaranth", weight: ["400", "700"], subsets: ["latin"] });
const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"] });

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

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${amaranth.variable} ${roboto.variable} antialiased`}>
      <body className="m-0 min-h-screen overflow-x-hidden p-0 text-center font-sans text-ink">{children}</body>
    </html>
  );
}
