'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactForm() {
  const [enquiryType, setEnquiryType] = useState('general')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleCondition: '',
    budget: '',
    preferredLocation: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your form submission logic here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const getEnquiryTypeTitle = () => {
    switch (enquiryType) {
      case 'sell':
        return 'Sell Your Car'
      case 'financing':
        return 'Financing Enquiry'
      case 'warranty':
        return 'Warranty Information'
      case 'transport':
        return 'Interstate Transport'
      default:
        return 'Send us a message'
    }
  }

  const getEnquiryTypeDescription = () => {
    switch (enquiryType) {
      case 'sell':
        return 'Get a competitive offer for your vehicle. Provide details below for a quick valuation.'
      case 'financing':
        return 'Learn about our flexible financing options and get pre-approved.'
      case 'warranty':
        return 'Find out about our comprehensive warranty coverage options.'
      case 'transport':
        return 'Get a quote for interstate vehicle transport anywhere in Australia.'
      default:
        return 'Tell us about your dream car or any questions you have...'
    }
  }

  return (
      <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl p-8 shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {getEnquiryTypeTitle()}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Enquiry Type Selector */}
          <div>
            <label htmlFor="enquiryType" className="block text-sm font-medium text-gray-700 mb-2">
              What can we help you with? *
            </label>
            <select
                id="enquiryType"
                value={enquiryType}
                onChange={(e) => setEnquiryType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="general">General Enquiry</option>
              <option value="sell">Sell Your Car</option>
              <option value="financing">Financing Options</option>
              <option value="warranty">Warranty Information</option>
              <option value="transport">Interstate Transport</option>
            </select>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="0400 000 000"
            />
          </div>

          {/* Conditional fields based on enquiry type */}
          {enquiryType === 'sell' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Make
                  </label>
                  <input
                      type="text"
                      id="vehicleMake"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., Toyota, Ford, BMW"
                  />
                </div>
                <div>
                  <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Model
                  </label>
                  <input
                      type="text"
                      id="vehicleModel"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., Camry, Ranger, X5"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Year
                  </label>
                  <input
                      type="text"
                      id="vehicleYear"
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., 2020"
                  />
                </div>
                <div>
                  <label htmlFor="vehicleCondition" className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Condition
                  </label>
                  <select
                      id="vehicleCondition"
                      name="vehicleCondition"
                      value={formData.vehicleCondition}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select condition</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
              </div>
            </>
          )}



          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {enquiryType === 'sell' ? 'Additional Details' : 'Message'} *
            </label>
            <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                placeholder={getEnquiryTypeDescription()}
            />
          </div>

          <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {enquiryType === 'sell' ? 'Get Valuation' : 'Send Message'}
          </motion.button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          We'll get back to you within 24 hours during business days.
        </p>
      </motion.div>
  )
}
