import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "AM Auto Agents - Quality Used Cars Australia | Nationwide Vehicle Sourcing",
  description: "Find your dream car with AM Auto Agents. We source quality used vehicles nationwide across Australia with personalized service, trust, and transparency. Browse our inventory or get a custom quote today.",
  keywords: "used cars Australia, car dealership, vehicle sourcing, quality cars, car buying, nationwide sourcing, personalized service",
  openGraph: {
    title: "AM Auto Agents - Quality Used Cars Australia",
    description: "Find your dream car with AM Auto Agents. We source quality used vehicles nationwide across Australia with personalized service, trust, and transparency.",
    type: "website",
    locale: "en_AU",
  },
}

export default function Home() {
  return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <Hero />

        {/* Welcome Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Welcome to AM Auto Group
              </h2>
              <div className="text-lg text-slate-600 max-w-4xl mx-auto space-y-4">
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

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '💰',
                  title: 'Financing Options',
                  description: 'We offer tailored financing solutions to help you secure your next vehicle with competitive rates and flexible terms to suit your budget.',
                  bgColor: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
                  link: '/contact'
                },
                {
                  icon: '🛡️',
                  title: 'Warranty Coverage',
                  description: 'Drive with confidence knowing your vehicle is protected with our comprehensive warranty options for peace of mind on the road.',
                  bgColor: 'bg-teal-50 border-teal-200 hover:bg-teal-100',
                  link: '/contact'
                },
                {
                  icon: '🚚',
                  title: 'Interstate Transport',
                  description: 'No matter where you are in Australia, we can arrange safe and reliable transport of your vehicle directly to your doorstep.',
                  bgColor: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100',
                  link: '/contact'
                }
              ].map((feature, index) => (
                  <div
                      key={index}
                      className={`text-center p-8 rounded-xl transition-colors border ${feature.bgColor} hover:shadow-lg`}
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 mb-4">{feature.description}</p>
                    <Link 
                      href={feature.link} 
                      className="inline-block bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
              ))}
            </div>
          </div>
        </section>

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
        <section className="py-20 gradient-brand text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Dream Car?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Experience trust, excellence, and satisfaction. Complete the form today to find your next car!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                  href="/vehicles"
                  className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-100 transition-colors shadow-lg"
              >
                Browse Vehicles
              </Link>
              <Link
                  href="/contact"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-slate-900 transition-colors"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </section>
      </div>
  )
}