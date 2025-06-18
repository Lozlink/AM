import { supabase } from '@/lib/supabase'
import { Car } from '@/lib/supabase'
import Header from '@/components/Header'
import { notFound } from 'next/navigation'

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

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const car = await getCar(id)

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {car.year} {car.make} {car.model}
            </h1>
            <p className="text-2xl text-blue-100">
              {formatPrice(car.price)}
            </p>
          </div>
        </div>
      </section>

      {/* Car Details */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Images */}
            <div className="space-y-4">
              {car.images && car.images.length > 0 ? (
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden">
                  <img
                    src={car.images[0]}
                    alt={`${car.year} ${car.make} ${car.model}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                  <div className="text-8xl">🚗</div>
                </div>
              )}
              
              {/* Additional Images */}
              {car.images && car.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {car.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${car.year} ${car.make} ${car.model} - Image ${index + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-8">
              {/* Price and Condition */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-3xl font-bold text-blue-600">
                    {formatPrice(car.price)}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    car.condition === 'excellent' ? 'bg-green-500 text-white' :
                    car.condition === 'good' ? 'bg-blue-500 text-white' :
                    'bg-yellow-500 text-white'
                  }`}>
                    {car.condition.charAt(0).toUpperCase() + car.condition.slice(1)} Condition
                  </span>
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
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Interested in this vehicle?</h3>
                <div className="space-y-3">
                  <a
                    href={`tel:0492858699`}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                  >
                    Call Now: 0492 858 699
                  </a>
                  <a
                    href="/contact"
                    className="w-full border-2 border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center block"
                  >
                    Send Inquiry
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 