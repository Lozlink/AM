'use client'

import { supabase } from '@/lib/supabase'
import { Car, CarStatus } from '@/lib/supabase'
import Header from '@/components/Header'
import { notFound } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'

const statusConfig: Record<CarStatus, { label: string; bg: string; text: string; border: string }> = {
  in_stock: { label: 'In Stock', bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-600' },
  sold: { label: 'Sold', bg: 'bg-red-600', text: 'text-white', border: 'border-red-700' },
  deposit_taken: { label: 'Deposit Taken', bg: 'bg-amber-500', text: 'text-white', border: 'border-amber-600' },
}


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
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

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

  const lightboxPrev = useCallback(() => {
    if (!car?.images) return
    setLightboxIndex(prev => (prev - 1 + car.images.length) % car.images.length)
  }, [car?.images])

  const lightboxNext = useCallback(() => {
    if (!car?.images) return
    setLightboxIndex(prev => (prev + 1) % car.images.length)
  }, [car?.images])

  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') lightboxPrev()
      if (e.key === 'ArrowRight') lightboxNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [lightboxOpen, lightboxPrev, lightboxNext])

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

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

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
              <div className="flex items-center justify-center gap-4">
                <p className="text-2xl text-emerald-600">
                  {formatPrice(car.price)}
                </p>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${statusConfig[car.status || 'in_stock'].bg} ${statusConfig[car.status || 'in_stock'].text} shadow-md`}>
                  {statusConfig[car.status || 'in_stock'].label}
                </span>
              </div>
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
                      <div
                        className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden cursor-pointer"
                        onClick={() => openLightbox(selectedImageIndex)}
                      >
                        <img
                            src={car.images[selectedImageIndex]}
                            alt={`${car.year} ${car.make} ${car.model}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                  ) : (
                      <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                        <div className="text-8xl">🚗</div>
                      </div>
                  )}

                  {/* Additional Images - clickable thumbnails */}
                  {car.images && car.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {car.images.map((image, index) => (
                            <div
                                key={index}
                                className={`aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
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
                        href={`tel:0414225660`}
                        className="w-full text-gray-900 bg-white border-2 border-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-emerald-600 transition-colors text-center block"
                    >
                      Call Now: 0414 225 660
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

                {/* Description */}
                {car.description && (
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Vehicle Description</h3>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {car.description}
                      </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightboxOpen && car.images && car.images.length > 0 && (
            <div
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                onClick={closeLightbox}
            >
              {/* Close button */}
              <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 text-white text-4xl font-light hover:text-gray-300 transition-colors z-10"
                  aria-label="Close lightbox"
              >
                &times;
              </button>

              {/* Image counter */}
              <div className="absolute top-4 left-4 text-white text-sm font-medium z-10">
                {lightboxIndex + 1} / {car.images.length}
              </div>

              {/* Previous button */}
              {car.images.length > 1 && (
                  <button
                      onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl font-light hover:text-gray-300 transition-colors z-10 px-2"
                      aria-label="Previous image"
                  >
                    &#8249;
                  </button>
              )}

              {/* Main image */}
              <img
                  src={car.images[lightboxIndex]}
                  alt={`${car.year} ${car.make} ${car.model} - Image ${lightboxIndex + 1}`}
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                  onClick={(e) => e.stopPropagation()}
              />

              {/* Next button */}
              {car.images.length > 1 && (
                  <button
                      onClick={(e) => { e.stopPropagation(); lightboxNext() }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl font-light hover:text-gray-300 transition-colors z-10 px-2"
                      aria-label="Next image"
                  >
                    &#8250;
                  </button>
              )}
            </div>
        )}
      </div>
  )
} 