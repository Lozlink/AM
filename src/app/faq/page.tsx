import Header from '@/components/Header'
import type { Metadata } from 'next'
import FAQContent from './FAQContent'

export const metadata: Metadata = {
  title: "Frequently Asked Questions - AM Auto Group | Car Buying FAQ",
  description: "Find answers to common questions about buying cars, financing options, and our services at AM Auto Group. Get the information you need for a smooth car buying experience.",
  keywords: "car buying FAQ, auto dealership questions, vehicle financing FAQ, AM Auto Group help, used car buying guide",
  openGraph: {
    title: "Frequently Asked Questions - AM Auto Group | Car Buying FAQ",
    description: "Find answers to common questions about buying cars, financing options, and our services at AM Auto Group.",
    type: "website",
    locale: "en_AU",
  },
}

export default function FAQPage() {
  return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <FAQContent />
      </div>
  )
}