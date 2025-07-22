import Header from '@/components/Header'
import type { Metadata } from 'next'
import ValuationContent from './ValuationContent'

export const metadata: Metadata = {
  title: "Free Car Valuation Australia | Professional Vehicle Assessment | AM Auto Agents",
  description: "Get a free, accurate car valuation from AM Auto Agents. Professional vehicle assessment using RedBook and Glass's Guide data. Fast 24-48 hour turnaround for all Australian vehicles.",
  keywords: "car valuation Australia, free vehicle assessment, car appraisal, RedBook valuation, Glass's Guide, vehicle worth, car value",
  openGraph: {
    title: "Free Car Valuation Australia | Professional Vehicle Assessment",
    description: "Get a free, accurate car valuation from AM Auto Agents. Professional vehicle assessment using RedBook and Glass's Guide data with fast turnaround.",
    type: "website",
    locale: "en_AU",
  },
}

export default function ValuationPage() {
  return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <ValuationContent />
      </div>
  )
}