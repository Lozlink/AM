import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AM Auto Agents - Quality Used Cars Australia",
  description: "Find your dream car with AM Auto Agents. We source quality used vehicles nationwide across Australia. Trust, excellence, and satisfaction guaranteed.",
  keywords: "used cars, car dealership, vehicle sourcing, Australia, quality cars, car buying",
  authors: [{ name: "AM Auto Agents" }],
  openGraph: {
    title: "AM Auto Agents - Quality Used Cars Australia",
    description: "Find your dream car with AM Auto Agents. We source quality used vehicles nationwide across Australia.",
    type: "website",
    locale: "en_AU",
  },
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
        <Footer />
      </body>
    </html>
  );
}
