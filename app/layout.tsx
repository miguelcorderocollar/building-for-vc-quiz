import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

// Get site URL from environment variable, fallback to default
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vc-knowledge-test.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "VC Knowledge Quiz - Test Your Venture Capital Knowledge",
    template: "%s | VC Knowledge Quiz",
  },
  description: "Test your knowledge of venture capital technology and fund operations with 360+ quiz questions. Based on the Building for VC guide by Alex Patow.",
  keywords: ["venture capital", "VC quiz", "VC test", "fund operations", "tech stack", "startup investing", "LP GP", "portfolio management"],
  authors: [{ name: "Building for VC Quiz Platform" }],
  creator: "VC Knowledge Quizz Platform",
  publisher: "VC Knowledge Quizz Platform",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "VC Knowledge Quiz",
    title: "VC Knowledge Quiz - Test Your Venture Capital Knowledge",
    description: "Test your knowledge of venture capital technology and fund operations with 360+ quiz questions.",
    // OG image removed - can be added later when image is ready
  },
  twitter: {
    card: "summary",
    title: "VC Knowledge Quiz - Test Your Venture Capital Knowledge",
    description: "Test your knowledge of venture capital technology and fund operations with 360+ quiz questions.",
  },
  robots: {
    index: true,
    follow: true,
  },
  // Icons are handled automatically by Next.js via app/icon.png and app/apple-icon.png
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
