'use client'

import Header from '@/components/Header'
import ContactForm from '@/components/ContactForm'
import GoogleMap from '@/components/GoogleMap'
import { motion } from 'framer-motion'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Ready to find your dream car? Contact us today and let us help you 
              find the perfect vehicle that matches your needs and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">📞</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p className="text-gray-600">0402 699 999</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">📧</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">info@amautogroup.com</p>
                      <p className="text-sm text-gray-500">We&apos;ll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">🌏</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Service Area</h3>
                      <p className="text-gray-600">We operate across all of Australia</p>
                      <p className="text-sm text-gray-500">Nationwide vehicle sourcing</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">📍</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Location</h3>
                      <p className="text-gray-600">12/1017 Canley Vale road, Wetherill Park, 2164</p>
                      <p className="text-sm text-gray-500">Operating hours: 9am-5:30pm Mon-Sunday (Viewing via Appointments)</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Find Us on the Map</h3>
                    <GoogleMap 
                      address="12/1017 Canley Vale road, Wetherill Park, 2164" 
                      height="300px"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-blue-100 rounded-xl p-8 border border-blue-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Why Choose AM Auto Group?
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Trusted nationwide sourcing expertise</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Personalized service tailored to your needs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Quality vehicles with full disclosure</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Hassle-free car buying experience</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Extended business hours for your convenience</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-blue-100 rounded-xl p-8 border border-blue-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Response Guarantee
                </h3>
                <p className="text-gray-700 mb-4">
                  We understand that finding the right car is time-sensitive. That&apos;s why we guarantee:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Response within 2 hours during business hours</div>
                  <div>• Same-day vehicle sourcing for urgent requests</div>
                  <div>• 24/7 support for existing customers</div>
                </div>
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
            <p className="text-xl text-gray-600">
              Get answers to common questions about our services
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                question: "How does your vehicle sourcing process work?",
                answer: "We start by understanding your specific requirements, budget, and preferences. Our nationwide network then searches for vehicles that match your criteria, ensuring you get the best possible deal."
              },
              {
                question: "Do you offer financing options?",
                answer: "While we don't provide financing directly, we work with trusted finance brokers and can connect you with suitable financing options for your vehicle purchase."
              },
              {
                question: "What areas do you service?",
                answer: "We operate across all of Australia, providing nationwide vehicle sourcing services. No matter where you are, we can help you find your dream car."
              },
              {
                question: "How do you ensure vehicle quality?",
                answer: "All vehicles in our inventory undergo thorough inspections. We provide detailed condition reports and full disclosure of any issues, ensuring transparency in every transaction."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-blue-100 rounded-xl p-6 border border-blue-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">
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