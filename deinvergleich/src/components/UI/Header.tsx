'use client';

import { Search } from 'lucide-react';

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

          {/* CTA Section */}
          <div className="flex items-center">
            {/* Primary CTA Button - Enhanced for maximum conversion */}
            <button
              className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => {
                const target = document.getElementById('form-start');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                  // Fallback to hash navigation if target not on DOM yet
                  window.location.hash = 'form-start';
                }
              }}
              aria-controls="form-start"
            >
              Angebote erhalten
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
