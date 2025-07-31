import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights} from "@vercel/speed-insights/next";
import Script from 'next/script';
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
  title: "AM Auto Group - Quality Used Cars Australia",
  description: "Find your dream car with AM Auto Group. We source quality used vehicles nationwide across Australia. Trust, excellence, and satisfaction guaranteed.",
  keywords: "used cars, car dealership, vehicle sourcing, Australia, quality cars, car buying",
  authors: [{ name: "AM Auto Group" }],
  openGraph: {
    title: "AM Auto Group - Quality Used Cars Australia",
    description: "Find your dream car with AM Auto Group. We source quality used vehicles nationwide across Australia.",
    type: "website",
    locale: "en_AU",
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <title>AM Auto Group</title>
      {GTM_ID && (
          <Script id="gtm-head" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
      )}
    </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <noscript>
        <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
        {children}

        <Footer />
      <Analytics />
      <SpeedInsights />
      </body>
    </html>
  );
}
