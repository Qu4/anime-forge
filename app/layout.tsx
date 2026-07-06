import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://anime-forge.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Anime Forge",
    template: "%s | Anime Forge",
  },
  description:
    "Forge your own anime character through fate-driven choices, rarity rolls, AI destiny text, and original character artwork.",
  applicationName: "Anime Forge",
  keywords: [
    "anime character generator",
    "anime forge",
    "anime game",
    "character creator",
    "AI anime character",
    "anime destiny generator",
  ],
  authors: [{ name: "Anime Forge" }],
  creator: "Anime Forge",
  publisher: "Anime Forge",
  openGraph: {
    title: "Anime Forge",
    description:
      "Forge your own anime character with rarity-based choices, AI destiny text, and original character artwork.",
    url: "/",
    siteName: "Anime Forge",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Anime Forge - Forge your anime destiny",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anime Forge",
    description:
      "Forge your own anime character with rarity-based choices, AI destiny text, and original character artwork.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#070313",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}