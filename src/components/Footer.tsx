import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-orange-500 mb-4">AM Auto Agents</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner in finding quality used vehicles across Australia. 
              We make car buying simple, transparent, and enjoyable.
            </p>
            <div className="space-y-2 text-gray-300">
              <div>📞 0492 858 699</div>
              <div>📧 info@amautoagents.com</div>
              <div>🕒 Monday – Sunday: 8am to 9pm</div>
              <div>🌏 We operate across all of Australia</div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Vehicle Sourcing</li>
              <li className="text-gray-300">Nationwide Search</li>
              <li className="text-gray-300">Quality Inspection</li>
              <li className="text-gray-300">Purchase Assistance</li>
              <li className="text-gray-300">Finance Brokerage</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2023 - 2025 AM Auto Agents. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
} 