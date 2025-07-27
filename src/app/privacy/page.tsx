import Header from '@/components/Header'
import type { Metadata } from 'next'
import PrivacyContent from './PrivacyContent'

export const metadata: Metadata = {
  title: "Privacy Policy - AM Auto Group | How We Protect Your Data",
  description: "Learn how AM Auto Group collects, uses, and protects your personal information. Our privacy policy explains your rights and our commitment to data security.",
  keywords: "privacy policy, data protection, personal information, AM Auto Group privacy, customer data security",
  openGraph: {
    title: "Privacy Policy - AM Auto Group | How We Protect Your Data",
    description: "Learn how AM Auto Group collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
    type: "website",
    locale: "en_AU",
  },
}

export default function PrivacyPage() {
  return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <PrivacyContent />
      </div>
  )
}