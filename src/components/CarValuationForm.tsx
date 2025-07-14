
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import clsx from 'clsx'

const valuationSchema = z.object({
  make: z.string().min(1, 'Please select a make'),
  model: z.string().min(1, 'Please select a model'),
  year: z.string().min(4, 'Please select a year'),
  variant: z.string().optional(),
  odometer: z.string().min(1, 'Please enter odometer reading'),
  condition: z.enum(['excellent', 'good', 'fair', 'poor']),
  location: z.string().min(1, 'Please select your location'),
  contactInfo: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().min(10, 'Please enter a valid phone number')
  })
})

type ValuationFormData = z.infer<typeof valuationSchema>

const australianStates = [
  'NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'
]

const vehicleConditions = [
  { value: 'excellent', label: 'Excellent - Like new, no defects' },
  { value: 'good', label: 'Good - Minor wear, well maintained' },
  { value: 'fair', label: 'Fair - Some wear, requires minor repairs' },
  { value: 'poor', label: 'Poor - Significant wear, needs repairs' }
]

export default function CarValuationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedModel, setSelectedModel] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ValuationFormData>({
    resolver: zodResolver(valuationSchema)
  })

  const watchedMake = watch('make')
  const watchedModel = watch('model')

  // Popular Australian car makes
  const popularMakes = [
    'Toyota', 'Ford', 'Holden', 'Mazda', 'Hyundai', 'Nissan', 'Mitsubishi', 
    'Subaru', 'Kia', 'Isuzu', 'Volkswagen', 'Honda', 'BMW', 'Mercedes-Benz', 
    'Audi', 'Jeep', 'Suzuki', 'Renault', 'Peugeot', 'Volvo'
  ]

  // Popular models by make (simplified for demo)
  const popularModels: Record<string, string[]> = {
    'Toyota': ['Camry', 'Corolla', 'Prius', 'RAV4', 'Hilux', 'LandCruiser', 'Yaris'],
    'Ford': ['Territory', 'Focus', 'Fiesta', 'Mondeo', 'Kuga', 'Everest', 'Ranger'],
    'Holden': ['Commodore', 'Cruze', 'Barina', 'Astra', 'Captiva', 'Colorado'],
    'Mazda': ['Mazda3', 'Mazda6', 'CX-5', 'CX-3', 'MX-5', 'BT-50'],
    'Hyundai': ['i30', 'Elantra', 'Tucson', 'Santa Fe', 'Accent', 'Kona'],
    'Nissan': ['Navara', 'X-Trail', 'Pathfinder', 'Micra', 'Pulsar', 'Qashqai']
  }

  const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = currentYear; year >= 1990; year--) {
      years.push(year.toString())
    }
    return years
  }

  const onSubmit = async (data: ValuationFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call - in real implementation, this would call RedBook API
      // or your backend service that integrates with Australian valuation services
      const response = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'redbook',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        setSubmitted(true)
        reset()
      } else {
        throw new Error('Failed to submit valuation request')
      }
    } catch (error) {
      console.error('Error submitting valuation:', error)
      alert('There was an error submitting your valuation request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
      >
        <div className="text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Valuation Request Submitted!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for your valuation request. Our team will review your vehicle details 
            and provide you with a comprehensive valuation report based on RedBook and other 
            factual Australian market data within 24-48 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Submit Another Valuation
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-xl shadow-lg border border-gray-200"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Get Your Car Valued
        </h2>
        <p className="text-gray-600">
          Get an accurate valuation based on RedBook and Australian market data sources
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Vehicle Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Make *
            </label>
            <select
              {...register('make')}
              onChange={(e) => {
                setSelectedMake(e.target.value)
                setValue('model', '')
              }}
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                errors.make ? 'border-red-500' : 'border-gray-300'
              )}
            >
              <option value="">Select Make</option>
              {popularMakes.map((make) => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
            {errors.make && <p className="mt-1 text-sm text-red-600">{errors.make.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model *
            </label>
            <select
              {...register('model')}
              disabled={!watchedMake}
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                errors.model ? 'border-red-500' : 'border-gray-300',
                !watchedMake && 'bg-gray-100'
              )}
            >
              <option value="">Select Model</option>
              {watchedMake && popularModels[watchedMake]?.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
            {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year *
            </label>
            <select
              {...register('year')}
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                errors.year ? 'border-red-500' : 'border-gray-300'
              )}
            >
              <option value="">Select Year</option>
              {generateYears().map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Variant (Optional)
            </label>
            <input
              type="text"
              {...register('variant')}
              placeholder="e.g., GLX, Sport, Turbo"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Odometer (km) *
            </label>
            <input
              type="number"
              {...register('odometer')}
              placeholder="e.g., 85000"
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                errors.odometer ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.odometer && <p className="mt-1 text-sm text-red-600">{errors.odometer.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <select
              {...register('location')}
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                errors.location ? 'border-red-500' : 'border-gray-300'
              )}
            >
              <option value="">Select State</option>
              {australianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Condition *
          </label>
          <div className="space-y-2">
            {vehicleConditions.map((condition) => (
              <label key={condition.value} className="flex items-center">
                <input
                  type="radio"
                  {...register('condition')}
                  value={condition.value}
                  className="mr-3 text-blue-600"
                />
                <span className="text-gray-700">{condition.label}</span>
              </label>
            ))}
          </div>
          {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>}
        </div>

        {/* Contact Information */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                {...register('contactInfo.name')}
                className={clsx(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                  errors.contactInfo?.name ? 'border-red-500' : 'border-gray-300'
                )}
              />
              {errors.contactInfo?.name && <p className="mt-1 text-sm text-red-600">{errors.contactInfo.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                {...register('contactInfo.email')}
                className={clsx(
                  'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                  errors.contactInfo?.email ? 'border-red-500' : 'border-gray-300'
                )}
              />
              {errors.contactInfo?.email && <p className="mt-1 text-sm text-red-600">{errors.contactInfo.email.message}</p>}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              {...register('contactInfo.phone')}
              placeholder="e.g., 0412 345 678"
              className={clsx(
                'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                errors.contactInfo?.phone ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.contactInfo?.phone && <p className="mt-1 text-sm text-red-600">{errors.contactInfo.phone.message}</p>}
          </div>
        </div>

        {/* Data Sources Information */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Our Valuation Sources</h4>
          <p className="text-sm text-blue-800">
            We use multiple Australian data sources including RedBook, Glass's Guide, and current market data 
            to provide you with the most accurate valuation possible.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={clsx(
            'w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors',
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-700 hover:bg-blue-800'
          )}
        >
          {isSubmitting ? 'Submitting...' : 'Get My Vehicle Valuation'}
        </button>
      </form>
    </motion.div>
  )
}
