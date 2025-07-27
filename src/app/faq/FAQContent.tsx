'use client'

import { useState } from 'react'
import Link from 'next/link'


const FAQItem = ({ question, answer }: { question: string; answer: string  }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
                <span>{question}</span>
                <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="mt-3 text-gray-600">
                    {answer}
                </div>
            )}
        </div>
    )
}

export default function FAQContent() {
    // FAQ data organized by categories
    const faqCategories = [
        {
            title: "Car Buying Process",
            faqs: [
                {
                    question: "How do I start the car buying process with AM Auto Group?",
                    answer: "Starting is easy! You can browse our inventory online, visit our dealership, or contact us directly. Our team will guide you through the entire process, from selecting the right vehicle to finalizing the paperwork."
                },
                {
                    question: "Do you offer test drives?",
                    answer: "Yes, we encourage test drives! You can schedule a test drive by contacting us or visiting our dealership. We believe experiencing the vehicle firsthand is an important part of making the right choice."
                },
                {
                    question: "What documents do I need to purchase a vehicle?",
                    answer: "You'll need a valid driver's license, proof of insurance, and proof of income. If you're financing, additional documentation may be required, such as proof of residence and references."
                },
                {
                    question: "Can I trade in my current vehicle?",
                    answer: "Absolutely! We accept trade-ins and will provide a fair market value for your vehicle. The trade-in value can be applied to your new purchase, reducing the overall cost."
                }
            ]
        },
        {
            title: "Financing & Payment",
            faqs: [
                {
                    question: "What financing options do you offer?",
                    answer: "We offer various financing options to suit different needs and credit situations. We work with multiple lenders to ensure you get the best possible rate and terms for your situation."
                },
                {
                    question: "Can I get financing with bad credit?",
                    answer: "Yes, we have financing options for all credit situations. Our finance team specializes in helping customers with challenging credit histories find suitable financing solutions."
                },
                {
                    question: "Do you require a down payment?",
                    answer: "Down payment requirements vary based on the vehicle, your credit history, and the financing terms. While a down payment can lower your monthly payments and interest costs, we have options with minimal down payments."
                },
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept cash, bank transfers, certified checks, and most major credit cards. For financed purchases, payments are typically made directly to the lender according to your agreement."
                }
            ]
        },
        {
            title: "Vehicle Warranty & Service",
            faqs: [
                {
                    question: "Do your vehicles come with a warranty?",
                    answer: "Yes, all our vehicles come with a limited warranty. The specific terms and coverage vary by vehicle. We also offer extended warranty options for additional peace of mind."
                },
                {
                    question: "What if I have issues with my vehicle after purchase?",
                    answer: "Customer satisfaction is our priority. If you experience any issues, contact us immediately, and we'll work to resolve them promptly. Depending on the nature of the issue and warranty coverage, repairs may be covered."
                },
                {
                    question: "Do you offer service and maintenance?",
                    answer: "While we don't have an in-house service department, we have partnerships with trusted local service centers. We can provide recommendations and help coordinate service appointments."
                }
            ]
        },
        {
            title: "About Our Inventory",
            faqs: [
                {
                    question: "How often do you update your inventory?",
                    answer: "Our inventory is updated regularly, often daily. We're constantly acquiring new vehicles to provide a wide selection for our customers."
                },
                {
                    question: "Can you help me find a specific vehicle that's not in your inventory?",
                    answer: "Absolutely! We have an extensive network and can help source specific vehicles. Let us know what you're looking for, and we'll do our best to find it for you."
                },
                {
                    question: "Do you sell new vehicles or only used?",
                    answer: "We specialize in quality used vehicles. This allows us to offer excellent value while ensuring each vehicle meets our high standards for condition and reliability."
                },
                {
                    question: "How do you ensure the quality of your vehicles?",
                    answer: "Each vehicle undergoes a comprehensive inspection process before being added to our inventory. We check mechanical components, safety features, and cosmetic condition to ensure they meet our standards."
                }
            ]
        }
    ]

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                            Find answers to common questions about our vehicles, financing options, and services.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-gray-600 mb-12 text-center">
                        Browse through our frequently asked questions to find the information you need. If you don't see your question here, please <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link> directly.
                    </p>

                    {faqCategories.map((category, index) => (
                        <div key={index} className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">{category.title}</h2>
                            <div className="space-y-1">
                                {category.faqs.map((faq, faqIndex) => (
                                    <FAQItem
                                        key={faqIndex}
                                        question={faq.question}
                                        answer={faq.answer}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Still Have Questions?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Our friendly team is here to help. Contact us directly for personalized assistance.
                    </p>
                    <div>
                        <Link
                            href="/contact"
                            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}