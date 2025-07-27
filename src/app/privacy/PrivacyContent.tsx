
'use client'

import Link from 'next/link'

export default function PrivacyContent() {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                            Your privacy is important to us. Learn how we collect, use, and protect your information.
                        </p>
                    </div>
                </div>
            </section>

            {/* Privacy Policy Content */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose max-w-none">
                        <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-600">
                            <p className="text-sm text-gray-600 mb-0">
                                <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                            </p>
                        </div>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                                <p className="text-gray-600 mb-4">
                                    AM Auto Agents ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us in any way.
                                </p>
                                <p className="text-gray-600">
                                    By using our services, you agree to the collection and use of information in accordance with this Privacy Policy.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                                <p className="text-gray-600 mb-4">We may collect the following personal information:</p>
                                <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                                    <li>Full name and contact information (email, phone, address)</li>
                                    <li>Driver's license information</li>
                                    <li>Financial information for financing applications</li>
                                    <li>Vehicle preferences and purchase history</li>
                                    <li>Trade-in vehicle information</li>
                                    <li>Insurance information</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Non-Personal Information</h3>
                                <p className="text-gray-600 mb-4">We automatically collect certain information, including:</p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                                    <li>IP address and device information</li>
                                    <li>Browser type and version</li>
                                    <li>Pages visited and time spent on our website</li>
                                    <li>Referring website information</li>
                                    <li>Cookies and similar tracking technologies</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                                <p className="text-gray-600 mb-4">We use your information for the following purposes:</p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                                    <li>Processing vehicle purchases and sales transactions</li>
                                    <li>Facilitating financing applications and credit checks</li>
                                    <li>Providing customer service and support</li>
                                    <li>Scheduling test drives and appointments</li>
                                    <li>Evaluating trade-in vehicles</li>
                                    <li>Sending promotional materials and updates (with consent)</li>
                                    <li>Improving our website and services</li>
                                    <li>Complying with legal requirements</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                                <p className="text-gray-600 mb-4">We may share your information in the following circumstances:</p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">With Your Consent</h3>
                                <p className="text-gray-600 mb-4">We share information when you explicitly consent to such sharing.</p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Business Partners</h3>
                                <p className="text-gray-600 mb-4">We may share information with:</p>
                                <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
                                    <li>Financial institutions for loan processing</li>
                                    <li>Insurance companies for coverage quotes</li>
                                    <li>Service providers for vehicle inspections</li>
                                    <li>Marketing partners (with your consent)</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">Legal Requirements</h3>
                                <p className="text-gray-600 mb-4">We may disclose information when required by law or to protect our rights and safety.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                                <p className="text-gray-600 mb-4">
                                    We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                                </p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                                    <li>Encryption of sensitive financial information</li>
                                    <li>Secure servers and data centers</li>
                                    <li>Regular security audits and updates</li>
                                    <li>Employee training on data protection</li>
                                    <li>Limited access to personal information</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
                                <p className="text-gray-600 mb-4">
                                    We use cookies and similar technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. Disabling cookies may limit some website functionality.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights and Choices</h2>
                                <p className="text-gray-600 mb-4">You have the right to:</p>
                                <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
                                    <li>Access and review your personal information</li>
                                    <li>Request corrections to inaccurate information</li>
                                    <li>Request deletion of your information (subject to legal requirements)</li>
                                    <li>Opt-out of marketing communications</li>
                                    <li>Withdraw consent for data processing</li>
                                </ul>
                                <p className="text-gray-600">
                                    To exercise these rights, please <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link> directly.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
                                <p className="text-gray-600 mb-4">
                                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
                                <p className="text-gray-600 mb-4">
                                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                                <p className="text-gray-600 mb-4">
                                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
                                <p className="text-gray-600 mb-4">
                                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                                </p>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <p className="text-gray-600 mb-2"><strong>AM Auto Agents</strong></p>
                                    <p className="text-gray-600 mb-2">Email: <a href="mailto:info@amautoagents.com" className="text-blue-600 hover:underline">info@amautoagents.com</a></p>
                                    <p className="text-gray-600 mb-2">Phone: <a href="tel:0492858699" className="text-blue-600 hover:underline">0492 858 699</a></p>
                                    <p className="text-gray-600">Address: TBC</p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Questions About Our Privacy Policy?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        We're committed to transparency. Contact us if you need clarification on any aspect of our privacy practices.
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