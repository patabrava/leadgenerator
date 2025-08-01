'use client';

import { Search, Mail } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                deinvergleich.net
              </h1>
              <p className="text-sm text-indigo-600 font-medium hidden sm:block">
                Datenschutz-Vergleichsportal
              </p>
            </div>
          </div>

          {/* Trust Indicators & Contact */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {/* CTA Button */}
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              Angebote erhalten
            </button>

            {/* Contact Info */}
            <div className="flex items-center space-x-4">
              <a 
                href="mailto:info@deinvergleich.net"
                className="flex items-center space-x-2 text-sm text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden md:inline">Kontakt</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
