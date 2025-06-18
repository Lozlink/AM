'use client'

import Header from '@/components/Header'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About AM Auto Agents
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Your trusted partner in finding quality used vehicles across Australia. 
              We&apos;re passionate about making car buying simple, transparent, and enjoyable.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              AM Auto Agents was founded with a simple mission: to revolutionize the car buying experience 
              by putting customers first. We understand that finding the right vehicle can be overwhelming, 
              which is why we&apos;ve built a service that takes the stress out of car shopping.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg max-w-none text-gray-700"
          >
            <p>
              Embarking on the journey of providing our exceptional service is no easy feat, but we thrive 
              on the challenge and deliver without fail. Our commitment to excellence in quality and service 
              is a relentless pursuit, ensuring that we continuously earn the trust of each individual we 
              have the privilege to serve.
            </p>
            
            <p>
              Your trust is the bedrock of our ability to deliver a flawless experience every time. Our 
              clients consistently depart with smiles, while our team is always regarded with trust. Trust 
              forms the very essence of our service. Placing our clients at the pinnacle of our priorities 
              drives us to maintain an unwaveringly positive approach.
            </p>
            
            <p>
              Our dedication to each individual is a testament to our fervent passion for our work, ensuring 
              that every interaction leaves them feeling not just satisfied, but truly valued and secure. 
              The foundation of our service lies in building and maintaining trust, a commitment we honor 
              with unwavering resolve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and ensure we deliver the best possible experience for our clients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤝',
                title: 'Trust & Transparency',
                description: 'We believe in complete honesty and transparency in all our dealings. Every vehicle comes with full disclosure of its condition and history.'
              },
              {
                icon: '🎯',
                title: 'Customer Focus',
                description: 'Our clients are our top priority. We listen carefully to your needs and work tirelessly to find the perfect vehicle for you.'
              },
              {
                icon: '⭐',
                title: 'Excellence',
                description: 'We maintain the highest standards of quality and service, ensuring every interaction exceeds your expectations.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-blue-100 p-8 rounded-xl shadow-lg text-center border border-blue-200"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              How We Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven process ensures you get the best possible vehicle at the best possible price.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Initial Consultation',
                description: 'We discuss your car needs, preferences, and budget to understand exactly what you&apos;re looking for.'
              },
              {
                step: '02',
                title: 'Tailored Search',
                description: 'Our nationwide network searches for vehicles that match your criteria, ensuring the best possible options.'
              },
              {
                step: '03',
                title: 'Curated Selection',
                description: 'We present you with a carefully curated selection of vehicles, complete with detailed information and pricing.'
              },
              {
                step: '04',
                title: 'Seamless Purchase',
                description: 'We handle negotiations, paperwork, and logistics to ensure a smooth and hassle-free purchase experience.'
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-200">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '100+', label: 'Happy Clients' },
              { number: '500+', label: 'Vehicles Sold' },
              { number: '5★', label: 'Customer Rating' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-300 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Ready to Experience the Difference?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8"
          >
            Join hundreds of satisfied customers who have found their dream cars with AM Auto Agents.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/vehicles"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse Vehicles
            </a>
            <a
              href="/contact"
              className="border-2 border-blue-700 text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 hover:text-white transition-colors"
            >
              Get Started
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 