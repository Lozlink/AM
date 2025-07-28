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
                    answer: "Starting is easy! You can browse our inventory To start, simply browse our online inventory or contact us directly. You can either inquire about a specific vehicle or let us know what you’re looking for, and our team will guide you every step of the way., visit our dealership, or contact us directly. Our team will guide you through the entire process, from selecting the right vehicle to finalizing the paperwork."
                },
                {
                    question: "Do you offer test drives?",
                    answer: "Yes! We encourage you to test drive any vehicle you are interested in before making a purchase. Please contact us to schedule an appointment."


                },
                {
                    question: "What documents do I need to purchase a vehicle?",
                    answer: "You’ll need to bring a valid photo ID (such as a driver’s license), proof of address, and any financing or loan documents if applicable. We’ll also need proof of income for financing, if you’re looking to secure a loan."
                },
                {
                    question: "Can I trade in my current vehicle?",
                    answer: "Absolutely! We accept trade-ins and will offer you a fair price based on the condition and market value of your vehicle. Contact us to get an initial estimate or bring your car in for an appraisal."
                }
            ]
        },
        {
            title: "Financing & Payment",
            faqs: [
                {
                    question: "What financing options do you offer?",
                    answer: "We offer a variety of financing options through trusted partners. Our team will help you secure a loan that fits your budget, whether you’re looking for a short or long-term loan."
                },
                {
                    question: "Can I get financing with bad credit?",
                    answer: "Yes! We work with multiple lenders who specialize in helping customers with less-than-perfect credit. Contact us to discuss the best options for you."
                },
                {
                    question: "Do you require a down payment?",
                    answer: "A down payment may be required depending on the vehicle and financing terms. Our team will guide you through this process and find a solution that suits your needs."
                },
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept payments via bank transfer, credit card, and other secure methods. If you're using financing, we will work with you to ensure your loan terms are clear."
                }
            ]
        },
        {
            title: "Vehicle Warranty & Service",
            faqs: [
                {
                    question: "Do your vehicles come with a warranty?",
                    answer: "Yes, all of our vehicles come with a limited warranty. The specific terms depend on the vehicle's age and condition. Our team will provide full details on any warranty available at the time of purchase."
                },
                {
                    question: "What if I have issues with my vehicle after purchase?",
                    answer: "If you experience any issues with your vehicle, don’t hesitate to reach out. We’ll work with you to resolve the problem, whether through repairs under warranty or assisting with service options."
                },
                {
                    question: "Do you offer service and maintenance?",
                    answer: "Yes, we provide ongoing service and maintenance options for all vehicles sold. Regular maintenance is key to keeping your car running smoothly, and we offer competitive rates for servicing."
                }
            ]
        },
        {
            title: "About Our Inventory",
            faqs: [
                {
                    question: "How often do you update your inventory?",
                    answer: "Our inventory is updated regularly as we acquire new used vehicles. Be sure to check back frequently or sign up for updates to receive notifications when new cars arrive."
                },
                {
                    question: "Can you help me find a specific vehicle that's not in your inventory?",
                    answer: "Yes! If you're looking for a particular model that isn’t currently in stock, let us know. We’ll do our best to source it for you or offer a similar option."

                },
                {
                    question: "Do you sell new vehicles or only used?",
                    answer: "At AM Auto Group, we specialize in offering quality pre-owned vehicles, but we occasionally feature new models. Our focus is on providing a wide selection of used cars to meet various budgets and needs."
                },
                {
                    question: "How do you ensure the quality of your vehicles?",
                    answer: "We rigorously inspect all vehicles before they are listed for sale. Our team conducts thorough checks, including mechanical, cosmetic, and safety inspections, to ensure that each vehicle meets high standards of quality."
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