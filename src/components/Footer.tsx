import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Footer() {
  return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col md:flex-row justify-evenly gap-12">
            {/* Company Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex md:justify-start justify-center">
                <Logo size="3xl" />
              </div>
              <p className="text-gray-300 mb-6 max-w-md mx-auto md:mx-0">
                Your trusted partner in finding quality used vehicles across Australia.
                We make car buying simple, transparent, and enjoyable.
              </p>
              <div className="space-y-2 text-gray-300">
                <div>📞 0492 858 699</div>
                <div>📧 info@amautogroup.com</div>
                <div>🌏 We operate across all of Australia</div>
              </div>
              
              <div className=" space-y-2 text-gray-300">
                
                <div>📍 12/1017 Canley Vale road, Wetherill Park, 2164</div>
                <div>🕒 Operating hours: 9am-5:30pm Mon-Sunday (Viewing via Appointments)</div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex-initial flex flex-col justify-start md:pt-20 text-center md:text-left">
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
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-blue-400 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left w-full md:w-auto">
              © 2023 - 2025 AM Auto Group, ABN: 87 689 164 832
            </div>
            <div className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left w-full md:w-auto">
                All rights reserved.
            </div>
            <div className="text-gray-400 text-sm text-center md:text-left w-full md:w-auto">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
  )
}