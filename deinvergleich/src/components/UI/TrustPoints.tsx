export function TrustPoints() {
  const trustPoints = [
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: 'Geprüfte DSGVO-Anbieter',
      description: 'Über 50 qualifizierte Datenschutz-Experten in unserem Netzwerk.'
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Schnelle Vermittlung',
      description: 'Passende Angebote von qualifizierten Anbietern innerhalb von 24h.'
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      title: 'Nur seriöse Anbieter',
      description: 'Alle Partner sind zertifizierte Datenschutzbeauftragte mit langjähriger Erfahrung'
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      title: 'Für alle Unternehmensgrößen',
      description: 'Von Start-ups bis Konzerne - wir finden den passenden Anbieter.'
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
          />
        </svg>
      ),
      title: 'Kostenloser Vergleich',
      description: 'Unser Service ist für Sie vollständig kostenlos und unverbindlich.'
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: 'Neutrale Beratung',
      description: 'Wir vermitteln unabhängig und neutral den besten Anbieter für Sie.'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Warum deinvergleich.net?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Als Deutschlands führendes Vergleichsportal für Datenschutz-Dienstleister 
            finden wir für Sie den passenden DSGVO-Experten - schnell, kostenlos und unverbindlich.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-lg flex items-center justify-center mb-4">
                {point.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {point.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-indigo-600 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-indigo-200">Erfolgreiche Vermittlungen</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">200+</div>
              <div className="text-indigo-200">Qualifizierte Partner</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">24h</div>
              <div className="text-indigo-200">Durchschnittliche Antwortzeit</div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <blockquote className="text-center">
            <p className="text-lg text-gray-700 italic mb-4">
              "Dank deinvergleich.net haben wir schnell den perfekten Datenschutz-Anbieter 
              gefunden. Kostenlos, unkompliziert und sehr professionell."
            </p>
            <footer className="text-sm text-gray-600">
              <strong>Amelie Kaijo</strong>, Geschäftsführerin einer Steuerberatung
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
