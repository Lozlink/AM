'use client'

import Header from '@/components/Header'
import CarCardStatic from '@/components/CarCardStatic'
import { Car } from '@/lib/supabase'
import { useState, useEffect } from 'react'

interface VehiclesPageClientProps {
  cars: Car[]
}

export default function VehiclesPageClient({ cars }: VehiclesPageClientProps) {
  console.log('Cars received:', cars)
  console.log('Cars length:', cars?.length)

  const [filteredCars, setFilteredCars] = useState<Car[]>(cars)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedCondition, setSelectedCondition] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [sortBy, setSortBy] = useState('newest')

  // Get unique makes for filter dropdown
  const makes = [...new Set(cars.map(car => car.make))].sort()

  useEffect(() => {
    let filtered = [...cars]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.year.toString().includes(searchTerm)
      )
    }

    // Make filter
    if (selectedMake) {
      filtered = filtered.filter(car => car.make === selectedMake)
    }

    // Condition filter
    if (selectedCondition) {
      filtered = filtered.filter(car => car.condition === selectedCondition)
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter(car => car.price >= parseInt(priceRange.min))
    }
    if (priceRange.max) {
      filtered = filtered.filter(car => car.price <= parseInt(priceRange.max))
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'year-new':
        filtered.sort((a, b) => b.year - a.year)
        break
      case 'year-old':
        filtered.sort((a, b) => a.year - b.year)
        break
      case 'mileage-low':
        filtered.sort((a, b) => a.mileage - b.mileage)
        break
      case 'mileage-high':
        filtered.sort((a, b) => b.mileage - a.mileage)
        break
      default:
        // newest (by created_at) - already sorted from server
        break
    }

    setFilteredCars(filtered)
  }, [cars, searchTerm, selectedMake, selectedCondition, priceRange, sortBy])

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedMake('')
    setSelectedCondition('')
    setPriceRange({ min: '', max: '' })
    setSortBy('newest')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Vehicle Inventory
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Browse our carefully selected collection of quality used vehicles. 
              Each car has been thoroughly inspected and comes with our guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                placeholder="Make, model, or year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-gray-900 bg-white"
              />
            </div>

            {/* Make Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Make
              </label>
              <select
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-gray-900 bg-white"
              >
                <option value="">All Makes</option>
                {makes.map(make => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-gray-900 bg-white"
              >
                <option value="">All Conditions</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-gray-900 bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest</option>
                <option value="year-old">Year: Oldest</option>
                <option value="mileage-low">Mileage: Low to High</option>
                <option value="mileage-high">Mileage: High to Low</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Price
              </label>
              <input
                type="number"
                placeholder="Min price..."
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-gray-900 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <input
                type="number"
                placeholder="Max price..."
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-blue-700 text-gray-900 bg-white"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>as
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCars.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Available Vehicles ({filteredCars.length})
                </h2>
                <p className="text-gray-600">
                  Found {filteredCars.length} vehicle{filteredCars.length !== 1 ? 's' : ''} matching your criteria
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map((car) => (
                  <CarCardStatic key={car.id} car={car} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Vehicles Found
              </h2>
              <p className="text-gray-600 mb-8">
                No vehicles match your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={clearFilters}
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            We can source any vehicle you&apos;re looking for. Tell us your requirements and we&apos;ll find the perfect match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Request a Vehicle
            </a>
            <a
              href="tel:0492858699"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Call Us: 0492 858 699
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 