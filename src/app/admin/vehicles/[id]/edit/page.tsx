'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import VehicleForm from '@/components/admin/VehicleForm'
import { supabase, Car } from '@/lib/supabase'

export default function EditVehiclePage() {
  const params = useParams<{ id: string }>()
  const [vehicle, setVehicle] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', params.id)
        .single()
      if (error) {
        setError(error.message)
      } else {
        setVehicle(data as Car)
      }
      setLoading(false)
    }
    load()
  }, [params.id])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/admin/vehicles" className="text-sm text-gray-500 hover:text-gray-900">
          ← Back to vehicles
        </Link>
        <div className="mt-4">
          {loading && <div className="text-gray-500">Loading vehicle…</div>}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          {!loading && !error && vehicle && <VehicleForm initialVehicle={vehicle} />}
        </div>
      </div>
    </div>
  )
}
