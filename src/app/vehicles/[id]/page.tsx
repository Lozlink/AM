'use client'

import { supabase } from '@/lib/supabase'
import { Car } from '@/lib/supabase'
import Header from '@/components/Header'
import { notFound } from 'next/navigation'
import { useState, useEffect } from 'react'


async function getCar(id: string): Promise<Car | null> {
  try {
    const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) {
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching car:', error)
    return null
  }
}

export default function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [car, setCar] = useState<Car | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    async function fetchCar() {
      const resolvedParams = await params
      const { id } = resolvedParams
      const carData = await getCar(id)

      if (!carData) {
        notFound()
      }

      setCar(carData)
      setLoading(false)
    }

    fetchCar()
  }, [params])

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
    )
  }

  if (!car) {
    notFound()
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-AU').format(mileage)
  }

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  return (
      <div className=" min-h-screen md:min-h-0 bg-gray-50">
        <Header />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {car.year} {car.make} {car.model}
              </h1>
              <p className="text-2xl text-emerald-600">
                {formatPrice(car.price)}
              </p>
            </div>
          </div>
        </section>

        {/* Car Details */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Images and CTA */}
              <div className="space-y-6">
                {/* Images */}
                <div className="space-y-4">
                  {car.images && car.images.length > 0 ? (
                      <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                        <img
                            src={car.images[selectedImageIndex]}
                            alt={`${car.year} ${car.make} ${car.model}`}
                            className="w-full h-full object-cover"
                        />
                      </div>
                  ) : (
                      <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                        <div className="text-8xl">🚗</div>
                      </div>
                  )}

                  {/* Additional Images - Now clickable */}
                  {car.images && car.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {car.images.map((image, index) => (
                            <div
                                key={index}
                                className={`aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                                    selectedImageIndex === index
                                        ? 'ring-4 ring-emerald-600 ring-opacity-50'
                                        : 'hover:ring-2 hover:ring-gray-400'
                                }`}
                                onClick={() => handleImageClick(index)}
                            >
                              <img
                                  src={image}
                                  alt={`${car.year} ${car.make} ${car.model} - Image ${index + 1}`}
                                  className="w-full h-full object-cover"
                              />
                            </div>
                        ))}
                      </div>
                  )}
                </div>

                {/* Contact CTA */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Interested in this vehicle?</h3>
                  <div className="space-y-3">
                    <a
                        href={`tel:0492858699`}
                        className="w-full text-gray-900 bg-white border-2 border-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-emerald-600 transition-colors text-center block"
                    >
                      Call Now: 0492 858 699
                    </a>
                    <a
                        href="/contact"
                        className="w-full bg-gray-900 text-white mb-4 py-3 px-4 rounded-lg font-semibold hover:bg-emerald-600 transition-colors text-center block"
                    >
                      Send Inquiry
                    </a>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-8">
                {/* Price and Condition */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-3xl font-bold text-emerald-600">
                      {formatPrice(car.price)}
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    Stock #: {car.stock_number}
                  </div>
                </div>

                {/* Key Specifications */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Vehicle Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold text-gray-700">Year:</span>
                      <div className="text-gray-900">{car.year}</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Make:</span>
                      <div className="text-gray-900">{car.make}</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Model:</span>
                      <div className="text-gray-900">{car.model}</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Mileage:</span>
                      <div className="text-gray-900">{formatMileage(car.mileage)} km</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Transmission:</span>
                      <div className="text-gray-900">{car.transmission}</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Fuel Type:</span>
                      <div className="text-gray-900">{car.fuel_type}</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Color:</span>
                      <div className="text-gray-900">{car.color}</div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                {car.features && car.features.length > 0 && (
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {car.features.map((feature, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 text-emerald-600 text-sm rounded-full"
                            >
                        {feature}
                      </span>
                        ))}
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
  )
} 