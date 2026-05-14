'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { supabase, Car, CarStatus } from '@/lib/supabase'

const STATUS_LABEL: Record<CarStatus, string> = {
  in_stock: 'In Stock',
  under_offer: 'Under Offer',
  sold: 'Sold',
}

const STATUS_TONE: Record<CarStatus, string> = {
  in_stock: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  under_offer: 'bg-amber-50 text-amber-700 border-amber-200',
  sold: 'bg-red-50 text-red-700 border-red-200',
}

function formatPrice(p: number) {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0 }).format(p)
}

function formatMileage(m: number) {
  return `${new Intl.NumberFormat('en-AU').format(m)} km`
}

export default function AdminVehiclesPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState<Car | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<CarStatus | 'all'>('all')
  const [makeFilter, setMakeFilter] = useState('all')
  const [fuelFilter, setFuelFilter] = useState('all')
  const [transmissionFilter, setTransmissionFilter] = useState('all')
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'mileage-low'>('newest')

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(() => setDebouncedSearch(search), 250)
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current)
    }
  }, [search])

  const fetchCars = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('cars').select('*').order('created_at', { ascending: false })
    if (!error) setCars(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchCars()
  }, [])

  const makes = useMemo(() => Array.from(new Set(cars.map((c) => c.make))).sort(), [cars])
  const fuels = useMemo(() => Array.from(new Set(cars.map((c) => c.fuel_type).filter(Boolean))).sort(), [cars])
  const transmissions = useMemo(() => Array.from(new Set(cars.map((c) => c.transmission).filter(Boolean))).sort(), [cars])

  const filtered = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase()
    let list = cars.filter((c) => {
      if (statusFilter !== 'all' && (c.status || 'in_stock') !== statusFilter) return false
      if (makeFilter !== 'all' && c.make !== makeFilter) return false
      if (fuelFilter !== 'all' && c.fuel_type !== fuelFilter) return false
      if (transmissionFilter !== 'all' && c.transmission !== transmissionFilter) return false
      if (term) {
        const haystack = `${c.make} ${c.model} ${c.year} ${c.vin} ${c.stock_number}`.toLowerCase()
        if (!haystack.includes(term)) return false
      }
      return true
    })

    const sorted = [...list]
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'mileage-low':
        sorted.sort((a, b) => a.mileage - b.mileage)
        break
      default:
        break
    }
    return sorted
  }, [cars, debouncedSearch, statusFilter, makeFilter, fuelFilter, transmissionFilter, sortBy])

  const filtersActive =
    debouncedSearch ||
    statusFilter !== 'all' ||
    makeFilter !== 'all' ||
    fuelFilter !== 'all' ||
    transmissionFilter !== 'all'

  const clearFilters = () => {
    setSearch('')
    setStatusFilter('all')
    setMakeFilter('all')
    setFuelFilter('all')
    setTransmissionFilter('all')
    setSortBy('newest')
  }

  const handleDelete = async () => {
    if (!deleteModal) return
    setDeleting(true)
    const { error } = await supabase.from('cars').delete().eq('id', deleteModal.id)
    setDeleting(false)
    if (error) {
      alert('Failed to delete vehicle')
      return
    }
    setDeleteModal(null)
    fetchCars()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <Link href="/admin" className="text-sm text-gray-500 hover:text-gray-900">← Back to dashboard</Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">Vehicles</h1>
            <p className="text-sm text-gray-500 mt-1">Search, filter, edit, or delete listings.</p>
          </div>
          <Link
            href="/admin/vehicles/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm"
          >
            + New Vehicle
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search make, model, VIN, stock #…"
              className="lg:col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as CarStatus | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="in_stock">In Stock</option>
              <option value="under_offer">Under Offer</option>
              <option value="sold">Sold</option>
            </select>
            <select
              value={makeFilter}
              onChange={(e) => setMakeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Makes</option>
              {makes.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              value={fuelFilter}
              onChange={(e) => setFuelFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Fuel</option>
              {fuels.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <select
              value={transmissionFilter}
              onChange={(e) => setTransmissionFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Transmission</option>
              {transmissions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest first</option>
                <option value="price-low">Price: low → high</option>
                <option value="price-high">Price: high → low</option>
                <option value="mileage-low">Mileage: low → high</option>
              </select>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-500">
                {loading ? 'Loading…' : `${filtered.length} of ${cars.length} vehicles`}
              </span>
              {filtersActive && (
                <button onClick={clearFilters} className="text-blue-600 hover:text-blue-700 font-medium">
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        {loading && (
          <div className="text-center py-16 text-gray-500">Loading vehicles…</div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-xl text-gray-500">
            No vehicles match your filters.{' '}
            {filtersActive && (
              <button onClick={clearFilters} className="text-blue-600 hover:text-blue-700 font-medium">
                Clear filters
              </button>
            )}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Vehicle</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Stock #</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Price</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Mileage</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Fuel / Trans.</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((car) => {
                  const status: CarStatus = (car.status as CarStatus) || 'in_stock'
                  return (
                    <tr key={car.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">
                          {car.year} {car.make} {car.model}
                        </div>
                        <div className="text-xs text-gray-500">{car.color} · VIN {car.vin}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{car.stock_number}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{formatPrice(car.price)}</td>
                      <td className="px-4 py-3 text-gray-700">{formatMileage(car.mileage)}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {car.fuel_type} · {car.transmission}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full border ${STATUS_TONE[status]}`}>
                          {STATUS_LABEL[status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/vehicles/${car.id}/edit`}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setDeleteModal(car)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Delete Vehicle</h2>
            <p className="text-sm text-gray-600 mb-6">
              Delete{' '}
              <strong className="text-gray-900">
                {deleteModal.year} {deleteModal.make} {deleteModal.model}
              </strong>{' '}
              (stock #{deleteModal.stock_number})? This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModal(null)}
                disabled={deleting}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
