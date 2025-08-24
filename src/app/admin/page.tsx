'use client'

import { useState, useCallback, useEffect } from 'react'
import Header from '@/components/Header'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import UppyUploader from '@/components/UppyUploader'
import { Car } from '@/lib/supabase'

const carSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  price: z.number().min(0, 'Price must be positive'),
  mileage: z.number().min(0, 'Mileage must be positive'),
  fuel_type: z.string().min(1, 'Fuel type is required'),
  transmission: z.string().min(1, 'Transmission is required'),
  color: z.string().min(1, 'Color is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  vin: z.string().min(1, 'VIN is required'),
  stock_number: z.string().min(1, 'Stock number is required'),
  features: z.string().optional(),
  images: z.string().optional(),
})

type CarFormData = z.infer<typeof carSchema>

export default function AdminPage() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [vehicles, setVehicles] = useState<Car[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<string>('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Fetch vehicles from Supabase
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching vehicles:', error)
          return
        }

        setVehicles(data || [])
      } catch (error) {
        console.error('Error fetching vehicles:', error)
      }
    }

    fetchVehicles()
  }, [deleteStatus]) // Refetch when delete status changes

  // Handle vehicle deletion
  const handleDeleteVehicle = async () => {
    if (!selectedVehicle) return;

    setIsDeleting(true);
    setDeleteStatus('idle');

    try {
      const vehicleId = parseInt(selectedVehicle);
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', vehicleId);

      if (error) {
        console.error('Error deleting vehicle:', error);
        setDeleteStatus('error');
        throw error;
      }

      setDeleteStatus('success');
      setSelectedVehicle('');

      // Reset success message after 5 seconds
      setTimeout(() => setDeleteStatus('idle'), 5000);
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      setDeleteStatus('error');
    } finally {
      setIsDeleting(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
  })

  const handleUploadComplete = useCallback((files: any[]) => {
    console.log('🔍 Raw files from Uppy:', files)

    const imageUrls = files.map(file => {
      return file.url ||
          file.uploadURL ||
          file.response?.body?.[0]?.url || // Array access for body[0]
          file.response?.body?.url
    }).filter(Boolean)

    console.log('✅ Extracted URLs:', imageUrls)
    setUploadedFiles(imageUrls)
  }, [])

  const onSubmit = async (data: CarFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Parse features and images from strings to arrays
      const carData = {
        ...data,
        features: data.features ? data.features.split(',').map(f => f.trim()) : [],
        images: uploadedFiles.length > 0 ? uploadedFiles : (data.images ? data.images.split(',').map(img => img.trim()) : []),
        created_at: new Date().toISOString(),
      }

      console.log('🚗 Submitting car data:', carData)

      // Submit to Supabase
      const { error } = await supabase.from('cars').insert([carData])

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      setSubmitStatus('success')
      reset()
      setUploadedFiles([])
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting car:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
    <Header />
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Vehicle</h1>

        {submitStatus === 'success' && (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center">
                <div className="text-green-600 mr-3">✓</div>
                <div className="text-green-800">
                  Vehicle added successfully!
                </div>
              </div>
            </motion.div>
        )}
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           {/* Delete Vehicle Section */}
           <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Vehicles</h1>

          {deleteStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center">
                <div className="text-green-600 mr-3">✓</div>
                <div className="text-green-800">
                  Vehicle deleted successfully!
                </div>
              </div>
            </motion.div>
          )}

          {deleteStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center">
                <div className="text-red-600 mr-3">✕</div>
                <div className="text-red-800">
                  There was an error deleting the vehicle. Please try again.
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-3">
              <label htmlFor="vehicleSelect" className="block text-sm font-medium text-gray-700 mb-2">
                Select Vehicle
              </label>
              <select
                id="vehicleSelect"
                value={selectedVehicle}
                onChange={(e) => setSelectedVehicle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a vehicle to delete</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.stock_number}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-1">
              <button
                type="button"
                onClick={handleDeleteVehicle}
                disabled={!selectedVehicle || isDeleting}
                className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isDeleting ? 'Deleting...' : 'Delete Vehicle'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Add Vehicle Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Vehicle</h1>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center">
                <div className="text-green-600 mr-3">✓</div>
                <div className="text-green-800">
                  Vehicle added successfully!
                </div>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center">
                <div className="text-red-600 mr-3">✕</div>
                <div className="text-red-800">
                  There was an error adding the vehicle. Please try again.
                </div>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Make */}
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
                  Make *
                </label>
                <input
                  {...register('make')}
                  type="text"
                  id="make"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.make ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Toyota"
                />
                {errors.make && (
                  <p className="mt-1 text-sm text-red-600">{errors.make.message}</p>
                )}
              </div>

              {/* Model */}
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Model *
                </label>
                <input
                  {...register('model')}
                  type="text"
                  id="model"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.model ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Camry"
                />
                {errors.model && (
                  <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Year */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  {...register('year', { valueAsNumber: true })}
                  type="number"
                  id="year"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.year ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="2020"
                />
                {errors.year && (
                  <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (AUD) *
                </label>
                <input
                  {...register('price', { valueAsNumber: true })}
                  type="number"
                  id="price"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.price ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="25000"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              {/* Mileage */}
              <div>
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-2">
                  Mileage (km) *
                </label>
                <input
                  {...register('mileage', { valueAsNumber: true })}
                  type="number"
                  id="mileage"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.mileage ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="50000"
                />
                {errors.mileage && (
                  <p className="mt-1 text-sm text-red-600">{errors.mileage.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Fuel Type */}
              <div>
                <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type *
                </label>
                <select
                  {...register('fuel_type')}
                  id="fuel_type"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select fuel type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="LPG">LPG</option>
                </select>
                {errors.fuel_type && (
                  <p className="mt-1 text-sm text-red-600">{errors.fuel_type.message}</p>
                )}
              </div>

              {/* Transmission */}
              <div>
                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-2">
                  Transmission *
                </label>
                <select
                  {...register('transmission')}
                  id="transmission"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
                {errors.transmission && (
                  <p className="mt-1 text-sm text-red-600">{errors.transmission.message}</p>
                )}
              </div>

              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Color */}
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                  Color *
                </label>
                <input
                  {...register('color')}
                  type="text"
                  id="color"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.color ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Silver"
                />
                {errors.color && (
                  <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
                )}
              </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* VIN */}
                <div>
                  <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-2">
                    VIN *
                  </label>
                  <input
                      {...register('vin')}
                      type="text"
                      id="vin"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          errors.vin ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="17-character VIN"
                  />
                  {errors.vin && (
                      <p className="mt-1 text-sm text-red-600">{errors.vin.message}</p>
                  )}
                </div>

              {/* Stock Number */}
              <div>
                <label htmlFor="stock_number" className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Number *
                </label>
                <input
                  {...register('stock_number')}
                  type="text"
                  id="stock_number"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.stock_number ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., AM001"
                />
                {errors.stock_number && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock_number.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Detailed description of the vehicle..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Features */}
            <div>
              <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-2">
                Features (comma-separated)
              </label>
              <input
                {...register('features')}
                type="text"
                id="features"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Bluetooth, Navigation, Leather Seats"
              />
            </div>

            {/* Images */}

            <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Images</h3>
                <div className="mb-4">
                  <UppyUploader onUploadComplete={handleUploadComplete} />
                </div>

                {uploadedFiles.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Uploaded Images ({uploadedFiles.length}):
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {uploadedFiles.map((file, index) => (
                            <div key={index} className="relative">
                              <img
                                  src={file.url || file.response?.body?.url}
                                  alt={`Upload ${index + 1}`}
                                  className="w-full h-20 object-cover rounded border"
                              />
                            </div>
                        ))}
                      </div>
                    </div>
                )}
            </div>

            <div>
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                Image URLs (comma-separated)
              </label>
              <input
                {...register('images')}
                type="text"
                id="images"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Adding Vehicle...' : 'Add Vehicle'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
    </motion.div>
    </div>
    </div>
    )
}