'use client'

import { motion } from 'framer-motion'
import { Car } from '@/lib/supabase'
import Link from 'next/link'

interface CarCardProps {
  car: Car
}

export default function CarCard({ car }: CarCardProps) {
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {car.year} {car.make} {car.model}
        </h3>

        {/* Price */}
        <div className="text-2xl font-bold text-blue-600 mb-4">
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
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
              {car.features.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
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

        {/* CTA Button */}
        <Link
          href={`/vehicles/${car.id}`}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
} 