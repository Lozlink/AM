'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import UppyUploader from '@/components/UppyUploader'
import { supabase } from '@/lib/supabase'

interface Vehicle {
  id: number
  make: string
  model: string
  year: number
  stock_number: string
}

export default function AdminPage() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
          .from('cars')
          .select('id, make, model, year, stock_number')
          .order('created_at', { ascending: false })

      if (error) throw error
      setVehicles(data || [])
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUploadComplete = async (files: any[]) => {
    setUploadedFiles(files)
    console.log('Upload completed:', files)

    // If a vehicle is selected, associate the images with it
    if (selectedVehicle && files.length > 0) {
      try {
        const updates = files.map(file => ({
          id: file.id,
          vehicle_id: selectedVehicle
        }))

        for (const update of updates) {
          if (update.id) {
            await supabase
                .from('vehicle_images')
                .update({ vehicle_id: update.vehicle_id })
                .eq('id', update.id)
          }
        }

        console.log('Images associated with vehicle:', selectedVehicle)
      } catch (error) {
        console.error('Error associating images with vehicle:', error)
      }
    }
  }

  const setPrimaryImage = async (imageId: number, vehicleId: number) => {
    try {
      // First, unset any existing primary image for this vehicle
      await supabase
          .from('vehicle_images')
          .update({ is_primary: false })
          .eq('vehicle_id', vehicleId)

      // Then set the new primary image
      await supabase
          .from('vehicle_images')
          .update({ is_primary: true })
          .eq('id', imageId)

      console.log('Primary image updated')
    } catch (error) {
      console.error('Error setting primary image:', error)
    }
  }

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          </div>
        </div>
    )
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Admin Panel - Vehicle Image Management
            </h1>

            {/* Vehicle Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Vehicle (Optional)
              </label>
              <select
                  value={selectedVehicle || ''}
                  onChange={(e) => setSelectedVehicle(e.target.value ? Number(e.target.value) : null)}
                  className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Select a vehicle to associate images...</option>
                {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.year} {vehicle.make} {vehicle.model} ({vehicle.stock_number})
                    </option>
                ))}
              </select>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Upload Vehicle Images
              </h2>
              <UppyUploader onUploadComplete={handleUploadComplete} />
            </div>

            {uploadedFiles.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Recently Uploaded Files:
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className="border rounded-lg p-2 bg-gray-50">
                          <div className="relative">
                            <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-32 object-cover rounded"
                            />
                            {selectedVehicle && file.id && (
                                <button
                                    onClick={() => setPrimaryImage(file.id, selectedVehicle)}
                                    className="absolute top-2 right-2 bg-emerald-600 text-white px-2 py-1 rounded text-xs hover:bg-emerald-700"
                                >
                                  Set Primary
                                </button>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-2 truncate">
                            {file.originalName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                    ))}
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  )
}