import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  variable: "--font-inter", // Define a CSS variable
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eric John Ariate",
  description: "Full Stack Developer, Web Designer, Shopify Expert",
  openGraph: {
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
      <GoogleAnalytics gaId="G-GE31YEFR8W" />
    </html>
  );
}
