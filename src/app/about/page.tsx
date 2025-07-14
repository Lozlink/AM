'use client'

import Header from '@/components/Header'
import CarValuationForm from '@/components/CarValuationForm'
import { motion } from 'framer-motion'

export default function ValuationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Free Car Valuation
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Get an accurate, professional valuation of your vehicle based on 
              RedBook and Australian market data sources
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div>
              <CarValuationForm />
            </div>

            {/* Information */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Get a Professional Valuation?
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Know your vehicle's true market value
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Make informed buying or selling decisions
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Negotiate with confidence
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Insurance and finance applications
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Our Data Sources
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold">RB</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">RedBook</h4>
                      <p className="text-sm text-gray-600">Australia's leading vehicle valuation guide</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold">GG</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Glass's Guide</h4>
                      <p className="text-sm text-gray-600">Comprehensive automotive data and valuations</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-green-600 font-bold">MD</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Market Data</h4>
                      <p className="text-sm text-gray-600">Real-time Australian automotive market trends</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What You'll Receive
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📊</span>
                    Detailed valuation report
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">💰</span>
                    Trade-in and private sale values
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📈</span>
                    Market trends and insights
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">🎯</span>
                    Condition-adjusted pricing
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">⚡</span>
                    Fast 24-48 hour turnaround
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Common questions about our car valuation service
            </p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "How accurate are your valuations?",
                answer: "Our valuations are based on RedBook and Glass's Guide data, which are the industry standards in Australia. We combine this with real-time market data to provide highly accurate valuations."
              },
              {
                question: "How long does it take to receive my valuation?",
                answer: "Most valuations are completed within 24-48 hours. You'll receive a comprehensive report via email with all the details."
              },
              {
                question: "Is the valuation service free?",
                answer: "Yes, our basic valuation service is completely free. We also offer detailed inspection reports for a small fee if you need a more comprehensive assessment."
              },
              {
                question: "What information do you need for an accurate valuation?",
                answer: "We need the vehicle's make, model, year, variant, odometer reading, condition, and location. The more details you provide, the more accurate your valuation will be."
              },
              {
                question: "Do you cover all vehicle types?",
                answer: "We cover most passenger vehicles, SUVs, and light commercial vehicles. For specialty vehicles or motorcycles, please contact us directly."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}