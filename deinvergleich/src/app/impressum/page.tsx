import { Header } from '@/components/UI/Header';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              Impressum
            </h1>
            
            {/* Essential Impressum Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <div className="text-gray-700 space-y-2">
                <p><strong>Betreiber:</strong> deinvergleich.net</p>
                <p><strong>E-Mail:</strong> matthias.frank@deinvergleich.net</p>
              </div>
            </div>

            {/* Data Protection Information */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Datenschutzrechtliche Pflichtinformationen
              </h2>
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4">
                  Im Falle des Erstkontakts sind wir verpflichtet, Ihnen folgende datenschutzrechtliche Pflichtinformationen zur Verfügung zu stellen:
                </p>
                <p className="mb-4">
                  Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre personenbezogenen Daten nur, soweit an der Verarbeitung ein berechtigtes Interesse besteht (Art. 6 Abs. 1 lit. f DSGVO), Sie in die Datenverarbeitung eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO), die Verarbeitung für die Anbahnung, Begründung, inhaltliche Ausgestaltung oder Änderung eines Rechtsverhältnisses zwischen Ihnen und uns erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO) oder eine sonstige Rechtsnorm die Verarbeitung gestattet.
                </p>
                <p className="mb-4">
                  Ihre personenbezogenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere steuer- und handelsrechtliche Aufbewahrungsfristen – bleiben unberührt.
                </p>
                <p>
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Ihnen steht außerdem ein Recht auf Widerspruch, auf Datenübertragbarkeit und ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Ferner können Sie die Berichtigung, Sperrung, Löschung und unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten verlangen.
                </p>
              </div>
            </div>

            {/* Back to Home Link */}
            <div className="pt-6 border-t border-gray-200">
              <a 
                href="/" 
                className="inline-flex items-center text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Zurück zur Startseite
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2025 deinvergleich.net. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
