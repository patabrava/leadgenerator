'use client';

import { ShieldCheck, Clock, BadgeCheck, Building, Scale, Compass } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Geprüfte DSGVO-Anbieter',
    description: 'Alle Partner sind zertifizierte Datenschutzbeauftragte mit langjähriger Erfahrung.',
  },
  {
    icon: Clock,
    title: 'Schnelle Vermittlung',
    description: 'Passende Angebote von qualifizierten Anbietern innerhalb von 24 Stunden.',
  },
  {
    icon: BadgeCheck,
    title: 'Nur seriöse Anbieter',
    description: 'Jeder Partner durchläuft unseren Qualifizierungsprozess bevor er aufgenommen wird.',
  },
  {
    icon: Building,
    title: 'Für alle Unternehmensgrößen',
    description: 'Von Start-ups bis Konzerne — wir finden den passenden Anbieter.',
  },
  {
    icon: Scale,
    title: 'Kostenloser Vergleich',
    description: 'Unser Service ist für Sie vollständig kostenlos und unverbindlich.',
  },
  {
    icon: Compass,
    title: 'Neutrale Beratung',
    description: 'Wir vermitteln unabhängig und neutral den besten Anbieter für Sie.',
  },
];

export function TrustPoints() {
  return (
    <>
      {/* Trust Bar */}
      <div className="bg-primary-bg border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-primary font-medium font-body">
            <span>✓ Kostenlos</span>
            <span>✓ Unverbindlich</span>
            <span>✓ Antwort in 24h</span>
            <span>✓ DSGVO-konform</span>
          </div>
        </div>
      </div>

      {/* So funktioniert's */}
      <section className="bg-background py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-display mb-2">
            So funktioniert&rsquo;s
          </h2>
          <p className="text-muted-foreground font-body mb-10 lg:mb-14">
            In drei einfachen Schritten zum passenden Datenschutz-Anbieter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { num: '1', title: 'Anfrage stellen', desc: 'Formular ausfüllen — dauert nur 2 Minuten.' },
              { num: '2', title: 'Angebote erhalten', desc: 'Qualifizierte Anbieter kontaktieren Sie innerhalb von 24h.' },
              { num: '3', title: 'Anbieter wählen', desc: 'Vergleichen Sie und wählen Sie den besten für Ihr Unternehmen.' },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold font-body mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-base font-semibold text-foreground font-body mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-primary-bg py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 lg:mb-14">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-display mb-3">
              Warum deinvergleich.com?
            </h2>
            <p className="text-muted-foreground font-body">
              Wir verbinden Sie mit zertifizierten Datenschutz-Experten — kostenlos und unverbindlich.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground font-body mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-body">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expanded Testimonial */}
      <section className="bg-background py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-l-4 border-primary pl-6 lg:pl-8 max-w-3xl">
            <blockquote>
              <p className="text-lg lg:text-xl text-foreground font-display italic leading-relaxed">
                &ldquo;Dank deinvergleich.com haben wir schnell den perfekten Datenschutz-Anbieter
                gefunden. Kostenlos, unkompliziert und sehr professionell. Wir können den Service
                jedem Unternehmen empfehlen.&rdquo;
              </p>
              <footer className="mt-4 font-body">
                <strong className="text-foreground text-sm">Amelie Kaijo</strong>
                <span className="text-muted-foreground text-sm"> — Geschäftsführerin, Steuerberatung</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-hero-dark py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-card font-display mb-3">
            Bereit für den Vergleich?
          </h2>
          <p className="text-card/60 font-body mb-6">
            Kostenlos, unverbindlich, in 2 Minuten.
          </p>
          <button
            onClick={() => {
              const formInput = document.getElementById('unternehmen');
              if (formInput) {
                formInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => formInput.focus(), 500);
              }
            }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg text-sm font-semibold font-body transition-colors duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            ↑ Jetzt kostenlos vergleichen
          </button>
        </div>
      </section>
    </>
  );
}
