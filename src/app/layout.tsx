import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "CV Labs - High-Converting Landing Pages That Drive Results",
  description: "Get a conversion-optimized landing page that turns visitors into customers. Fast launches, revenue-first UX, and performance-focused design. Book a call today.",
  keywords: ["landing page design", "conversion optimization", "web design", "UX design", "marketing pages"],
  authors: [{ name: "CV Labs" }],
  openGraph: {
    title: "CV Labs - High-Converting Landing Pages That Drive Results",
    description: "Get a conversion-optimized landing page that turns visitors into customers. Fast launches, revenue-first UX, and performance-focused design.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV Labs - High-Converting Landing Pages That Drive Results",
    description: "Get a conversion-optimized landing page that turns visitors into customers. Fast launches, revenue-first UX, and performance-focused design.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          defer
          data-domain="cvlabs.dev"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
