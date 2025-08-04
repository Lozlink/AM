import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Link from 'next/link'
import type { Metadata } from 'next'
import {supabase} from "@/lib/supabase";
import { Car } from '@/lib/supabase'
import CarCardStatic from '@/components/CarCardStatic'


export const metadata: Metadata = {
  title: "AM Auto Group - Quality Used Cars Australia | Nationwide Vehicle Sourcing",
  description: "Find your dream car with AM Auto Group. We source quality used vehicles nationwide across Australia with personalized service, trust, and transparency. Browse our inventory or get a custom quote today.",
  keywords: "used cars Australia, car dealership, vehicle sourcing, quality cars, car buying, nationwide sourcing, personalized service",
  openGraph: {
    title: "AM Auto Group - Quality Used Cars Australia",
    description: "Find your dream car with AM Auto Group. We source quality used vehicles nationwide across Australia with personalized service, trust, and transparency.",
    type: "website",
    locale: "en_AU",
  },
}

async function getFeaturedCars(): Promise<Car[]> {
  try {
    const { data, error } = await supabase
        .from('cars')
        .select('*')
        .limit(3)

    if (error) {
      console.error('Error fetching featured cars:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getFeaturedCars:', error)
    return []
  }
}


export default async function Home() {
  const featuredCars = await getFeaturedCars()

  return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <Hero />

        {/* Welcome Section */}
        <section className="py-20 bg-slate-100 relative overflow-hidden">
          {/* Background image and overlay */}
          <div className="absolute inset-0 w-full h-full z-0">
            <img
                src="/welcomeplacerholder.jpg"
                alt="Car dealership background"
                className="w-full h-full object-cover object-center blur-sm scale-105"
                style={{ filter: 'brightness(0.4) blur(4px)' }}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
            <div className="flex flex-col items-center mb-16">
              <div className="mb-4">
                <span className="inline-block w-12 h-1 rounded bg-emerald-400"></span>
              </div>
              <div className="bg-gradient-to-b from-white/40 to-transparent backdrop-blur-sm p-8 w-full max-w-4xl text-center rounded-xl drop-shadow-lg">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg ">
                  Welcome to AM Auto Group
                </h2>
                <div className="text-lg text-white/90 space-y-4 drop-shadow-md">
                  <p>
                    Located in Wetherill Park, AM Auto Group is your trusted destination for buying and selling quality vehicles across Australia. Whether you're looking for a compact car, family SUV, or a high-performance sports car, we offer a wide range of pre-owned vehicles to suit every lifestyle and budget.
                  </p>
                  <p>
                    Our team of experienced professionals is dedicated to providing an exceptional car-buying experience. We pride ourselves on offering a diverse selection of vehicles, each thoroughly inspected to ensure it meets our high standards of quality, safety, and reliability.
                  </p>
                  <p>
                    At AM Auto Group, we go beyond just selling cars – we provide tailored financing solutions to help you secure your next vehicle with ease, along with comprehensive after-sales services to keep your car running smoothly for years to come.
                  </p>
                  <p>
                    Visit us today to explore our inventory and discover why AM Auto Group is the preferred choice for customers across Australia. Your next vehicle is waiting for you!
                  </p>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '💰',
                  title: 'Financing Options',
                  description: 'We offer tailored financing solutions to help you secure your next vehicle with competitive rates and flexible terms to suit your budget.',
                  link: '/contact?enquiry=financing',
                  ctaText: 'Get Financing Quote'
                },
                {
                  icon: '🛡️',
                  title: 'Warranty Coverage',
                  description: 'Drive with confidence knowing your vehicle is protected with our comprehensive warranty options for peace of mind on the road.',
                  link: '/contact?enquiry=warranty',
                  ctaText: 'Learn About Warranty'
                },
                {
                  icon: '🚚',
                  title: 'Interstate Transport',
                  description: 'No matter where you are in Australia, we can work at your convenience to arrange safe and reliable transport of your vehicle to your doorstep.',
                  link: '/contact?enquiry=transport',
                  ctaText: 'Get Transport Quote'
                }
              ].map((feature, index) => (
                  <div
                      key={index}
                      className="text-center rounded-xl p-8 bg-gradient-to-br from-white/25 via-white/15 to-transparent backdrop-blur-sm transition-all hover:from-white/35 hover:via-white/25 hover:to-white/10"
                  >
                    <div className="text-4xl mb-4 drop-shadow-lg">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-md">{feature.title}</h3>
                    <p className="text-white/85 mb-4 drop-shadow-sm">{feature.description}</p>
                    <Link
                        href={feature.link}
                        className="inline-block bg-white/80 text-slate-900 px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors shadow-lg backdrop-blur-sm"
                    >
                      {feature.ctaText}
                    </Link>
                  </div>
              ))}
            </div>
          </div>
        </section>





        {/*/!* Quick Contact CTA *!/*/}
        {/*<section className="py-16 bg-slate-100">*/}
        {/*  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">*/}
        {/*    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">*/}
        {/*      Need Immediate Assistance?*/}
        {/*    </h2>*/}
        {/*    <p className="text-lg text-slate-600 mb-8">*/}
        {/*      Call us directly for quick answers to your questions*/}
        {/*    </p>*/}
        {/*    <a*/}
        {/*        href="tel:0402699999"*/}
        {/*        className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"*/}
        {/*    >*/}
        {/*      📞 Call 0402 699 999*/}
        {/*    </a>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/* How It Works Section */}
        {/*<section className="py-12 bg-slate-50">*/}
        {/*  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">*/}
        {/*    <div className="text-center mb-12">*/}
        {/*      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">*/}
        {/*        How It Works*/}
        {/*      </h2>*/}
        {/*      <p className="text-xl text-slate-600 max-w-3xl mx-auto">*/}
        {/*        Simple steps to find your perfect car*/}
        {/*      </p>*/}
        {/*    </div>*/}

        {/*    <div className="grid md:grid-cols-3 gap-8">*/}
        {/*      {[*/}
        {/*        {*/}
        {/*          step: '01',*/}
        {/*          title: 'Tell Us Your Dream',*/}
        {/*          description: 'Complete a simple form sharing your dream car specifications, whether it\'s a brand-new model or a trusted used gem.',*/}
        {/*          bgColor: 'bg-emerald-100',*/}
        {/*          stepColor: 'text-emerald-700',*/}
        {/*          borderColor: 'border-emerald-200'*/}
        {/*        },*/}
        {/*        {*/}
        {/*          step: '02',*/}
        {/*          title: 'Sit Back and Relax',*/}
        {/*          description: 'Our experts nationwide will tirelessly search for your dream car, ensuring you get the best deals on both new and used options.',*/}
        {/*          bgColor: 'bg-teal-100',*/}
        {/*          stepColor: 'text-teal-700',*/}
        {/*          borderColor: 'border-teal-200'*/}
        {/*        },*/}
        {/*        {*/}
        {/*          step: '03',*/}
        {/*          title: 'Your Dream Car Awaits',*/}
        {/*          description: 'Receive a curated selection of potential cars, choose the one that resonates with you, and leave the rest to us.',*/}
        {/*          bgColor: 'bg-cyan-100',*/}
        {/*          stepColor: 'text-cyan-700',*/}
        {/*          borderColor: 'border-cyan-200'*/}
        {/*        }*/}
        {/*      ].map((step, index) => (*/}
        {/*          <div*/}
        {/*              key={index}*/}
        {/*              className="relative"*/}
        {/*          >*/}
        {/*            <div className={`${step.bgColor} p-8 rounded-xl shadow-lg border ${step.borderColor}`}>*/}
        {/*              <div className={`text-4xl font-bold ${step.stepColor} mb-4`}>{step.step}</div>*/}
        {/*              <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>*/}
        {/*              <p className="text-slate-600">{step.description}</p>*/}
        {/*            </div>*/}
        {/*            {index < 2 && (*/}
        {/*                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">*/}
        {/*                  <div className="w-8 h-0.5 bg-emerald-600"></div>*/}
        {/*                </div>*/}
        {/*            )}*/}
        {/*          </div>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/* CTA Section */}
        {/*<section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">*/}
        {/*  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">*/}
        {/*    <h2 className="text-3xl md:text-4xl font-bold mb-4">*/}
        {/*      Ready to Find Your Dream Car?*/}
        {/*    </h2>*/}
        {/*    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">*/}
        {/*      Experience trust, excellence, and satisfaction. Complete the form today to find your next car!*/}
        {/*    </p>*/}
        {/*    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">*/}
        {/*      <Link*/}
        {/*          href="/vehicles"*/}
        {/*          className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-colors shadow-lg"*/}
        {/*      >*/}
        {/*        Browse Vehicles*/}
        {/*      </Link>*/}
        {/*      <Link*/}
        {/*          href="/contact"*/}
        {/*          className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-slate-900 transition-colors"*/}
        {/*      >*/}
        {/*        Get Quote*/}
        {/*      </Link>*/}
        {/*    </div>*/}
        {/*    <div className="border-t border-white border-opacity-20 pt-8">*/}
        {/*      <p className="text-lg mb-4">Or call us directly for immediate assistance:</p>*/}
        {/*      <a*/}
        {/*          href="tel:0402699999"*/}
        {/*          className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"*/}
        {/*      >*/}
        {/*        📞 Call 0402 699 999*/}
        {/*      </a>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        {/* Featured Vehicles Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Featured Vehicles
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Discover some of our premium quality vehicles available now
              </p>
            </div>

            {featuredCars.length > 0 ? (
                <div className="grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
                  {featuredCars.map((car) => (
                      <CarCardStatic key={car.id} car={car} hideContentOnMd={true} />
                  ))}
                </div>
            ) : (


                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    New Inventory Coming Soon
                  </h3>
                  <p className="text-slate-600 mb-6">
                    We're currently updating our featured vehicles. Check back soon for our latest arrivals!
                  </p>
                  <Link
                      href="/contact"
                      className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    Contact Us for Availability
                  </Link>
                </div>
            )}

            <div className="text-center">
              <Link
                  href="/vehicles"
                  className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                View All Vehicles →
              </Link>
            </div>
          </div>
        </section>


      </div>
  )
}