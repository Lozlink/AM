import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AM Auto Agents?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make car buying simple, transparent, and enjoyable with our nationwide sourcing expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Personalized Service',
                description: 'Tell us your dream car specifications and we\'ll find the perfect match for your needs and budget.'
              },
              {
                icon: '🌏',
                title: 'Nationwide Sourcing',
                description: 'We search across Australia to find the best deals on quality used vehicles, saving you time and money.'
              },
              {
                icon: '🤝',
                title: 'Trust & Transparency',
                description: 'Our commitment to honesty and quality ensures you get a reliable vehicle with full disclosure.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-blue-100 hover:bg-blue-200 transition-colors border border-blue-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to find your perfect car
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Tell Us Your Dream',
                description: 'Complete a simple form sharing your dream car specifications, whether it\'s a brand-new model or a trusted used gem.'
              },
              {
                step: '02',
                title: 'Sit Back and Relax',
                description: 'Our experts nationwide will tirelessly search for your dream car, ensuring you get the best deals on both new and used options.'
              },
              {
                step: '03',
                title: 'Your Dream Car Awaits',
                description: 'Receive a curated selection of potential cars, choose the one that resonates with you, and leave the rest to us.'
              }
            ].map((step, index) => (
              <div
                key={index}
                className="relative"
              >
                <div className="bg-blue-100 p-8 rounded-xl shadow-lg border border-blue-200">
                  <div className="text-4xl font-bold text-blue-700 mb-4">{step.step}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-blue-700"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Dream Car?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience trust, excellence, and satisfaction. Complete the form today to find your next car!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vehicles"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Browse Vehicles
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
