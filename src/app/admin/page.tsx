'use client'

import { useState, useCallback, useEffect } from 'react'
import Header from '@/components/Header'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import UppyUploader from '@/components/UppyUploader'
import { Car, CarStatus } from '@/lib/supabase'

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
  status: z.enum(['in_stock', 'sold', 'under_offer']),
  features: z.string().optional(),
  images: z.string().optional(),
})

type CarFormData = z.infer<typeof carSchema>

export default function AdminPage() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [vehicles, setVehicles] = useState<Car[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<string>('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteStatus, setDeleteStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [editingVehicle, setEditingVehicle] = useState<Car | null>(null)
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [refreshKey, setRefreshKey] = useState(0)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CarFormData>({
    resolver: zodResolver(carSchema),
    defaultValues: { status: 'in_stock' },
  })

  // Fetch vehicles from Supabase
  const fetchVehicles = useCallback(async () => {
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
  }, [])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles, refreshKey])

  // Handle selecting a vehicle to edit
  const handleEditVehicle = (vehicleId: string) => {
    if (!vehicleId) {
      setEditingVehicle(null)
      resetForm()
      return
    }

    const vehicle = vehicles.find(v => v.id.toString() === vehicleId)
    if (!vehicle) return

    setEditingVehicle(vehicle)
    setExistingImages(vehicle.images || [])
    setUploadedFiles([])

    // Populate the form
    setValue('make', vehicle.make)
    setValue('model', vehicle.model)
    setValue('year', vehicle.year)
    setValue('price', vehicle.price)
    setValue('mileage', vehicle.mileage)
    setValue('fuel_type', vehicle.fuel_type)
    setValue('transmission', vehicle.transmission)
    setValue('color', vehicle.color)
    setValue('description', vehicle.description)
    setValue('vin', vehicle.vin)
    setValue('stock_number', vehicle.stock_number)
    setValue('status', vehicle.status || 'in_stock')
    setValue('features', vehicle.features?.join(', ') || '')
    setValue('images', '')
  }

  const resetForm = () => {
    reset({ status: 'in_stock' })
    setEditingVehicle(null)
    setUploadedFiles([])
    setExistingImages([])
  }

  // Handle vehicle deletion
  const handleDeleteVehicle = async () => {
    if (!selectedVehicle) return

    setIsDeleting(true)
    setDeleteStatus('idle')

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', selectedVehicle)

      if (error) {
        console.error('Error deleting vehicle:', error)
        setDeleteStatus('error')
        throw error
      }

      setDeleteStatus('success')
      setSelectedVehicle('')
      setRefreshKey(prev => prev + 1)
      setTimeout(() => setDeleteStatus('idle'), 5000)
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      setDeleteStatus('error')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleUploadComplete = useCallback((files: any[]) => {
    const imageUrls = files.map(file => {
      return file.url ||
          file.uploadURL ||
          file.response?.body?.[0]?.url ||
          file.response?.body?.url
    }).filter(Boolean) as string[]

    setUploadedFiles(imageUrls)
  }, [])

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index))
  }

  const onSubmit = async (data: CarFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Build images array: existing images (for edit) + new uploads + manual URLs
      let images: string[] = []
      if (editingVehicle) {
        images = [...existingImages]
      }
      if (uploadedFiles.length > 0) {
        images = [...images, ...uploadedFiles]
      }
      if (data.images) {
        const manualUrls = data.images.split(',').map(img => img.trim()).filter(Boolean)
        images = [...images, ...manualUrls]
      }
      // For new vehicles with no images at all, allow empty
      if (!editingVehicle && images.length === 0 && !data.images) {
        images = []
      }

      const carData = {
        make: data.make,
        model: data.model,
        year: data.year,
        price: data.price,
        mileage: data.mileage,
        fuel_type: data.fuel_type,
        transmission: data.transmission,
        color: data.color,
        description: data.description,
        vin: data.vin,
        stock_number: data.stock_number,
        status: data.status,
        features: data.features ? data.features.split(',').map(f => f.trim()) : [],
        images,
      }

      if (editingVehicle) {
        // Update existing vehicle
        const { error } = await supabase
          .from('cars')
          .update(carData)
          .eq('id', editingVehicle.id)

        if (error) {
          console.error('Supabase error:', error)
          throw error
        }

        setSubmitMessage('Vehicle updated successfully!')
      } else {
        // Insert new vehicle
        const { error } = await supabase
          .from('cars')
          .insert([{ ...carData, created_at: new Date().toISOString() }])

        if (error) {
          console.error('Supabase error:', error)
          throw error
        }

        setSubmitMessage('Vehicle added successfully!')
      }

      setSubmitStatus('success')
      resetForm()
      setRefreshKey(prev => prev + 1)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting car:', error)
      setSubmitStatus('error')
      setSubmitMessage(editingVehicle ? 'Error updating vehicle.' : 'Error adding vehicle.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
      hasError ? 'border-red-300' : 'border-gray-300'
    }`

  const selectClass = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Manage Vehicles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
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
                <div className="text-green-800">Vehicle deleted successfully!</div>
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
                <div className="text-red-800">Error deleting vehicle. Please try again.</div>
              </div>
            </motion.div>
          )}

          {/* Edit Vehicle Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Vehicle to Edit
            </label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-3">
                <select
                  value={editingVehicle?.id?.toString() || ''}
                  onChange={(e) => handleEditVehicle(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select a vehicle to edit...</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.year} {vehicle.make} {vehicle.model} - {vehicle.stock_number} [{(vehicle.status || 'in_stock').replace('_', ' ')}]
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-1">
                {editingVehicle && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Delete Vehicle */}
          <div className="border-t pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delete Vehicle
            </label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="md:col-span-3">
                <select
                  id="vehicleSelect"
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Select a vehicle to delete...</option>
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
          </div>
        </motion.div>

        {/* Add / Edit Vehicle Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {editingVehicle
              ? `Edit: ${editingVehicle.year} ${editingVehicle.make} ${editingVehicle.model}`
              : 'Add New Vehicle'}
          </h1>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div className="flex items-center">
                <div className="text-green-600 mr-3">✓</div>
                <div className="text-green-800">{submitMessage}</div>
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
                <div className="text-red-800">{submitMessage}</div>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Make & Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-2">
                  Make *
                </label>
                <input
                  {...register('make')}
                  type="text"
                  id="make"
                  className={inputClass(!!errors.make)}
                  placeholder="e.g., Toyota"
                />
                {errors.make && <p className="mt-1 text-sm text-red-600">{errors.make.message}</p>}
              </div>

              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Model *
                </label>
                <input
                  {...register('model')}
                  type="text"
                  id="model"
                  className={inputClass(!!errors.model)}
                  placeholder="e.g., Camry"
                />
                {errors.model && <p className="mt-1 text-sm text-red-600">{errors.model.message}</p>}
              </div>
            </div>

            {/* Year, Price, Mileage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year *
                </label>
                <input
                  {...register('year', { valueAsNumber: true })}
                  type="number"
                  id="year"
                  className={inputClass(!!errors.year)}
                  placeholder="2020"
                />
                {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>}
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (AUD) *
                </label>
                <input
                  {...register('price', { valueAsNumber: true })}
                  type="number"
                  id="price"
                  className={inputClass(!!errors.price)}
                  placeholder="25000"
                />
                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
              </div>

              <div>
                <label htmlFor="mileage" className="block text-sm font-medium text-gray-700 mb-2">
                  Mileage (km) *
                </label>
                <input
                  {...register('mileage', { valueAsNumber: true })}
                  type="number"
                  id="mileage"
                  className={inputClass(!!errors.mileage)}
                  placeholder="50000"
                />
                {errors.mileage && <p className="mt-1 text-sm text-red-600">{errors.mileage.message}</p>}
              </div>
            </div>

            {/* Fuel Type, Transmission, Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="fuel_type" className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type *
                </label>
                <select {...register('fuel_type')} id="fuel_type" className={selectClass}>
                  <option value="">Select fuel type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="LPG">LPG</option>
                </select>
                {errors.fuel_type && <p className="mt-1 text-sm text-red-600">{errors.fuel_type.message}</p>}
              </div>

              <div>
                <label htmlFor="transmission" className="block text-sm font-medium text-gray-700 mb-2">
                  Transmission *
                </label>
                <select {...register('transmission')} id="transmission" className={selectClass}>
                  <option value="">Select transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
                {errors.transmission && <p className="mt-1 text-sm text-red-600">{errors.transmission.message}</p>}
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Listing Status *
                </label>
                <select {...register('status')} id="status" className={selectClass}>
                  <option value="in_stock">In Stock</option>
                  <option value="under_offer">Under Offer</option>
                  <option value="sold">Sold</option>
                </select>
                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
              </div>
            </div>

            {/* Color */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                  Color *
                </label>
                <input
                  {...register('color')}
                  type="text"
                  id="color"
                  className={inputClass(!!errors.color)}
                  placeholder="e.g., Silver"
                />
                {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>}
              </div>
            </div>

            {/* VIN & Stock Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-2">
                  VIN *
                </label>
                <input
                  {...register('vin')}
                  type="text"
                  id="vin"
                  className={inputClass(!!errors.vin)}
                  placeholder="17-character VIN"
                />
                {errors.vin && <p className="mt-1 text-sm text-red-600">{errors.vin.message}</p>}
              </div>

              <div>
                <label htmlFor="stock_number" className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Number *
                </label>
                <input
                  {...register('stock_number')}
                  type="text"
                  id="stock_number"
                  className={inputClass(!!errors.stock_number)}
                  placeholder="e.g., AM001"
                />
                {errors.stock_number && <p className="mt-1 text-sm text-red-600">{errors.stock_number.message}</p>}
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
                className={inputClass(!!errors.description)}
                placeholder="Detailed description of the vehicle..."
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
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

            {/* Existing Images (edit mode) */}
            {editingVehicle && existingImages.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Images</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {existingImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Current image ${index + 1}`}
                        className="w-full h-24 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Images */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingVehicle ? 'Add More Images' : 'Vehicle Images'}
              </h3>
              <div className="mb-4">
                <UppyUploader onUploadComplete={handleUploadComplete} />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Images ({uploadedFiles.length}):
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {uploadedFiles.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
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
                className={`w-full py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white ${
                  editingVehicle
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting
                  ? (editingVehicle ? 'Updating Vehicle...' : 'Adding Vehicle...')
                  : (editingVehicle ? 'Update Vehicle' : 'Add Vehicle')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
