export function Footer() {
  return (
    <footer className="bg-foreground py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-lg font-semibold text-card mb-4 font-display">
              deinvergleich.com
            </div>
            <p className="text-card/70 text-sm leading-relaxed font-body">
              Einfach, schnell und kostenlos Angebote erhalten
            </p>
          </div>
          <div>
            <div className="text-base font-semibold text-card mb-4 font-body">Kontakt</div>
            <address className="text-card/70 text-sm space-y-2 not-italic font-body">
              <p>Hagenauer Str. 16, 10435 Berlin</p>
              <p>E-Mail: matthias.frank@deinvergleich.com</p>
            </address>
          </div>
          <nav aria-label="Rechtliche Informationen">
            <div className="text-base font-semibold text-card mb-4 font-body">Rechtliches</div>
            <div className="text-card/70 text-sm space-y-2 font-body">
              <a href="/impressum" className="block hover:text-card transition-colors duration-200">
                Impressum
              </a>
              <a href="/datenschutz" className="block hover:text-card transition-colors duration-200">
                Datenschutzerklärung
              </a>
            </div>
          </nav>
        </div>
        <div className="border-t border-card/20 mt-8 pt-8 text-center text-card/50 text-sm font-body">
          <p>&copy; {new Date().getFullYear()} deinvergleich.com. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
