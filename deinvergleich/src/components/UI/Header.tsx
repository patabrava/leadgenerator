'use client';

import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-hero-dark border-b border-hero-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Search className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold text-card font-display block">
                deinvergleich.com
              </span>
              <span className="text-sm text-primary-tint font-medium hidden sm:block font-body">
                Datenschutz-Vergleichsportal
              </span>
            </div>
          </a>

          <button
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2.5 rounded-lg text-sm font-semibold font-body transition-colors duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => {
              const formInput = document.getElementById('unternehmen');
              if (formInput) {
                formInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => formInput.focus(), 500);
              }
            }}
          >
            Angebote erhalten
          </button>
        </div>
      </div>
    </header>
  );
}
