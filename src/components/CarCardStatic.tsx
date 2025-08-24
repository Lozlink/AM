'use client'

import { Car } from '@/lib/supabase'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface CarCardStaticProps {
  car: Car
  hideContentOnMd?: boolean
}

export default function CarCardStatic({ car, hideContentOnMd = false }: CarCardStaticProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Add entrance animation after component mounts
    if (cardRef.current) {
      cardRef.current.style.opacity = '0'
      cardRef.current.style.transform = 'translateY(20px)'

      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
          cardRef.current.style.opacity = '1'
          cardRef.current.style.transform = 'translateY(0)'
        }
      }, 100)
    }
  }, [])

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

  const getContentClasses = () => {
    if (hideContentOnMd) {
      return "p-4 flex flex-col flex-grow max-sm:flex min-[640px]:hidden min-[1180px]:hidden"
    }
    return "p-4 flex flex-col flex-grow"
  }

  return (
      <div
          ref={cardRef}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
      >
        {/* Image */}
        <Link href={`/vehicles/${car.id}`}>
          <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
            {car.images && car.images.length > 0 ? (
                <img
                    src={car.images[0]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-4xl">🚗</div>
                </div>
            )}


          </div>
        </Link>

        {/* Content */}
        <div className={getContentClasses()}>
          {/* Title & Price */}
          <Link href={`/vehicles/${car.id}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {car.year} {car.make} {car.model}
            </h3>
          </Link>
          <div className="text-xl font-bold text-emerald-600 mb-3">
            {formatPrice(car.price)}
          </div>

          {/* Compact Details */}
          <div className="text-sm text-gray-600 mb-3 space-y-1">
            <div className="flex justify-between">
              <span>{formatMileage(car.mileage)} km</span>
              <span>{car.transmission}</span>
            </div>
            <div className="flex justify-between">
              <span>{car.fuel_type}</span>
              <span>{car.color}</span>
            </div>
          </div>

          {/* Features (compact) */}
          {car.features && car.features.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {car.features.slice(0, 2).map((feature, index) => (
                      <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-emerald-600 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                  ))}
                  {car.features.length > 2 && (
                      <span className="px-2 py-1 bg-blue-100 text-emerald-600 text-xs rounded-full">
                        +{car.features.length - 2} more
                      </span>
                  )}
                </div>
              </div>
          )}

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* Compact Buttons */}
          <div className="space-y-2">
            <Link
                href="/contact?enquiry=general"
                className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-600 transition-colors text-center block text-sm"
            >
              Enquire Now
            </Link>
            <Link
                href="tel:0402699999"
                className="w-full text-gray-900 bg-white border border-gray-300 py-2 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center block text-sm"
            >
              Call Now
            </Link>
          </div>
        </div>
      </div>
  )
}
