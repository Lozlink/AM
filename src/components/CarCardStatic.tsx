'use client'

import { Car } from '@/lib/supabase'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

interface CarCardStaticProps {
  car: Car
}

export default function CarCardStatic({ car }: CarCardStaticProps) {
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

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
        {car.images && car.images.length > 0 ? (
          <img
            src={car.images[0]}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl">🚗</div>
          </div>
        )}
        
        {/* Condition Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            car.condition === 'excellent' ? 'bg-green-500 text-white' :
            car.condition === 'good' ? 'bg-blue-500 text-white' :
            'bg-yellow-500 text-white'
          }`}>
            {car.condition.charAt(0).toUpperCase() + car.condition.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {car.year} {car.make} {car.model}
        </h3>

        {/* Price */}
        <div className="text-2xl font-bold text-blue-700 mb-4">
          {formatPrice(car.price)}
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
          <div>
            <span className="font-semibold">Mileage:</span> {formatMileage(car.mileage)} km
          </div>
          <div>
            <span className="font-semibold">Transmission:</span> {car.transmission}
          </div>
          <div>
            <span className="font-semibold">Fuel:</span> {car.fuel_type}
          </div>
          <div>
            <span className="font-semibold">Color:</span> {car.color}
          </div>
        </div>

        {/* Features */}
        {car.features && car.features.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-semibold text-gray-700 mb-2">Features:</div>
            <div className="flex flex-wrap gap-1">
              {car.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
              {car.features.length > 3 && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  +{car.features.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Stock Number */}
        <div className="text-xs text-gray-500 mb-4">
          Stock #: {car.stock_number}
        </div>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow"></div>

        {/* CTA Button */}
        <Link
          href={`/vehicles/${car.id}`}
          className="w-full bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  )
} 