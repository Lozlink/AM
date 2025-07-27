'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface CarouselSlide {
  id: number
  image: string
  title: string
  subtitle: string
  description: string
}

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)


  const slides: CarouselSlide[] = [
    {
      id: 1,
      image: '/image1.jpg',
      title: 'Find Your Dream Car',
      subtitle: 'Quality Used Vehicles',
      description: 'Discover our carefully selected collection of premium used vehicles'
    },
    {
      id: 2,
      image: '/image2.webp',
      title: 'Trusted Nationwide',
      subtitle: 'Australia Wide Service',
      description: 'Serving customers across Australia with reliable car sourcing'
    },
    {
      id: 3,
      image: '/image1.jpg',
      title: 'Expert Guidance',
      subtitle: 'Professional Service',
      description: 'Our experienced team helps you find the perfect vehicle'
    }
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])
 // Pause auto-play when user manually navigates
  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)

    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
      <section className="relative h-screen overflow-hidden">
        {/* Carousel Container */}
        <div className="relative h-full">
          <AnimatePresence mode="wait">
            <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                {slides[currentSlide] && (
                    <>
                      <Image
                          src={slides[currentSlide].image}
                          alt={slides[currentSlide].title}
                          fill
                          className="object-cover"
                          priority={currentSlide === 0}
                          sizes="100vw"
                      />
                      <div
                          className="absolute inset-0"
                          style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 999
                          }}
                      />
                    </>
                )}
              </div>






              {/* Content */}
              {/* Content */}
              <div className="relative h-full flex items-center justify-center" style={{ zIndex: 1000 }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-white"
                  >
                    <h2 className="text-lg md:text-xl text-emerald-400 font-semibold mb-4">
                      {slides[currentSlide].subtitle}
                    </h2>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                      {slides[currentSlide].title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
                      {slides[currentSlide].description}
                    </p>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <Link
                          href="/vehicles"
                          className="inline-block bg-emerald-500 text-black px-8 py-4 rounded-lg text-lg font-bold hover:bg-orange-400 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                      >
                        Browse Vehicles
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all duration-300 z-[1001] backdrop-blur-sm"
            aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-3 rounded-full transition-all duration-300 z-[1001] backdrop-blur-sm"
            aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-[1001]">
          {slides.map((_, index) => (
              <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                          ? 'bg-orange-500 scale-125'
                          : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
              />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black bg-opacity-20">
          <motion.div
              className="h-full bg-emerald-500"
              initial={{ width: '0%' }}
              animate={{ width: isAutoPlaying ? '100%' : '0%' }}
              transition={{
                duration: isAutoPlaying ? 5 : 0,
                ease: 'linear',
                repeat: isAutoPlaying ? Infinity : 0
              }}
          />
        </div>
      </section>
  )
}