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
      title: 'DSGVO-Experten seit 2018',
      description: 'Über 500 Unternehmen vertrauen auf unsere Expertise im Datenschutz.'
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
      title: 'Antwort in 24h',
      description: 'Schnelle Reaktionszeiten für Ihre dringenden Datenschutz-Fragen.'
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
      title: 'Rechtssichere Betreuung',
      description: 'Zertifizierte Datenschutzbeauftragte mit Anwaltshaftung.'
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: 'Für alle Unternehmensgrößen',
      description: 'Von Start-ups bis Konzerne - maßgeschneiderte Lösungen.'
    },
    {
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: 'Kostenlose Erstberatung',
      description: '30 Minuten unverbindliche Beratung zu Ihrem Datenschutz.'
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
      title: 'Sofortige Entlastung',
      description: 'Wir kümmern uns um alle DSGVO-Anforderungen für Ihr Unternehmen.'
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Warum deinvergleich.net?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Als Ihre DSGVO-Experten sorgen wir für rechtssichere Datenschutz-Compliance 
            in Ihrem Unternehmen - professionell, zuverlässig und kostengünstig.
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
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-indigo-200">Betreute Unternehmen</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">5+ Jahre</div>
              <div className="text-indigo-200">DSGVO-Erfahrung</div>
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
              "Seit wir mit deinvergleich.net zusammenarbeiten, sind alle unsere 
              Datenschutz-Sorgen Geschichte. Professionell, schnell und immer erreichbar."
            </p>
            <footer className="text-sm text-gray-600">
              <strong>Maria Schmidt</strong>, Geschäftsführerin einer Steuerberatung
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
