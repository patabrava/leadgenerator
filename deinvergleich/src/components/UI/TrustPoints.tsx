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
    <section className="bg-secondary py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left-aligned heading */}
        <div className="max-w-2xl mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-display mb-4">
            Warum deinvergleich.com?
          </h2>
          <p className="text-lg text-muted-foreground font-body">
            Als Deutschlands Vergleichsportal für Datenschutz-Dienstleister finden wir
            den passenden DSGVO-Experten für Sie — mit über 200 erfolgreichen Vermittlungen.
          </p>
        </div>

        {/* Benefits — two-column list, no cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-16 lg:mb-20">
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
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial — editorial border-left style */}
        <div className="border-l-4 border-primary pl-6 lg:pl-8 max-w-3xl">
          <blockquote>
            <p className="text-lg lg:text-xl text-foreground font-display italic leading-relaxed">
              &ldquo;Dank deinvergleich.com haben wir schnell den perfekten Datenschutz-Anbieter
              gefunden. Kostenlos, unkompliziert und sehr professionell.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-muted-foreground font-body">
              <strong className="text-foreground">Amelie Kaijo</strong> — Geschäftsführerin, Steuerberatung
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
