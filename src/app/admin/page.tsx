'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { supabase } from '@/lib/supabase'

interface Counts {
  total: number
  inStock: number
  underOffer: number
  sold: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const [counts, setCounts] = useState<Counts>({ total: 0, inStock: 0, underOffer: 0, sold: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from('cars').select('status')
      if (!error && data) {
        setCounts({
          total: data.length,
          inStock: data.filter((c) => (c.status || 'in_stock') === 'in_stock').length,
          underOffer: data.filter((c) => c.status === 'under_offer').length,
          sold: data.filter((c) => c.status === 'sold').length,
        })
      }
      setLoading(false)
    }
    load()
  }, [])

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
  }

  const stat = (label: string, value: number, tone: string) => (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</div>
      <div className={`text-3xl font-bold mt-1 ${tone}`}>{loading ? '…' : value}</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Manage AM Auto Group vehicle inventory.</p>
          </div>
          <button onClick={logout} className="text-sm text-gray-600 hover:text-gray-900">
            Sign out
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stat('Total', counts.total, 'text-gray-900')}
          {stat('In Stock', counts.inStock, 'text-emerald-600')}
          {stat('Under Offer', counts.underOffer, 'text-amber-600')}
          {stat('Sold', counts.sold, 'text-red-600')}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Vehicles</h2>
            <p className="text-sm text-gray-500 mb-4 flex-1">
              Browse the full inventory with search and filters, then edit or remove individual listings.
            </p>
            <div className="flex gap-2">
              <Link
                href="/admin/vehicles"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm"
              >
                Manage Vehicles
              </Link>
              <Link
                href="/admin/vehicles/new"
                className="text-sm text-gray-600 hover:text-gray-900 font-semibold flex items-center px-2"
              >
                + New
              </Link>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Public Site</h2>
            <p className="text-sm text-gray-500 mb-4 flex-1">
              View the customer-facing vehicle listings page.
            </p>
            <div>
              <Link
                href="/vehicles"
                className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-lg text-sm"
              >
                View Listings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
