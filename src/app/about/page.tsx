import Header from '@/components/Header'
import Link from 'next/link'
import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: "About AM Auto Group - Trusted Car Dealers Australia | Our Story",
  description: "Learn about AM Auto Group, Australia's trusted car dealership specializing in quality used vehicles. Discover our story, values, and commitment to exceptional customer service since our founding.",
  keywords: "about AM Auto Group, car dealership Australia, our story, trusted dealers, quality service, customer focus",
  openGraph: {
    title: "About AM Auto Group - Trusted Car Dealers Australia",
    description: "Learn about AM Auto Group, Australia's trusted car dealership specializing in quality used vehicles. Discover our story, values, and commitment to exceptional customer service.",
    type: "website",
    locale: "en_AU",
  },
}

export default function AboutPage() {
  return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <AboutContent />
      </div>
  )
}

