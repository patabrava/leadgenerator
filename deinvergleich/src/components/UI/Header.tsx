'use client';

import { Search, Shield, CheckCircle, Mail, Star } from 'lucide-react';

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
            {/* Trust Badge */}
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium">500+ Anbieter</span>
            </div>

            {/* Quality Badge */}
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Geprüfte Experten</span>
            </div>

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

        {/* Value Proposition Subheader */}
        <div className="pb-6 border-t border-gray-100 pt-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-3">
              Finden Sie den passenden Datenschutz-Experten für Ihr Unternehmen
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-indigo-600" />
                <span>DSGVO-konform</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Kostenloser Vergleich</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>Unabhängig & neutral</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Navigation Pills */}
        <div className="pb-4">
          <div className="flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              Externe DSB
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              DSGVO-Beratung
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Datenschutz-Audit
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Schulungen
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
