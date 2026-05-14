'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import VehicleForm from '@/components/admin/VehicleForm'

export default function NewVehiclePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/admin/vehicles" className="text-sm text-gray-500 hover:text-gray-900">
          ← Back to vehicles
        </Link>
        <div className="mt-4">
          <VehicleForm />
        </div>
      </div>
    </div>
  )
}
