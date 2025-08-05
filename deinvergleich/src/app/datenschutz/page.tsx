'use client';

import { Header } from '@/components/UI/Header';

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Allgemeine Informationen zur Erhebung und Verarbeitung von Daten</h2>
              <p className="mb-4">
                Wir erheben und verarbeiten personenbezogene Daten, sofern Sie uns diese bei Kontaktaufnahme oder über ein Eingabeformular zur Verfügung stellen. Außerdem erheben und verarbeiten wir Daten, die bei Ihrer Nutzung unserer Webseiten anfallen. Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.
              </p>
              <p className="mb-4">
                Bei Nutzung unserer Webseiten kann es auch sein, dass wir Informationen in der Endeinrichtung speichern, die Sie für den Zugriff auf unsere Webseiten verwenden (z.B. Ihr Rechner oder Smartphone), oder auf Informationen zugreifen, die bereits in dieser Endeinrichtung gespeichert sind, insbesondere durch das Setzen von sogenannten Cookies.
              </p>
              <p className="mb-4">
                Die Verarbeitung Ihrer Daten erfolgt nach Maßgabe der Bestimmungen der EU-Datenschutzgrundverordnung (DS-GVO), des Bundesdatenschutzgesetzes (BDSG) bzw. des Telekommunikation-Telemedien-Datenschutz-Gesetzes (TTDSG).
              </p>
              <p>
                Im Folgenden erläutern wir Ihnen im Einzelnen, wie wir welche Daten auf welcher Rechtsgrundlage verarbeiten. Darüber hinaus erläutern wir Ihnen, welche Rechte Sie haben und wie lange Ihre Daten gespeichert werden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Rechtsgrundlagen für die Verarbeitung von personenbezogenen Daten</h2>
              <p className="mb-4">
                Die Verarbeitung Ihrer personenbezogenen Daten kann aus verschiedenen Gründen erforderlich sein. Die Verarbeitung erfolgt zum Teil auf Grundlage von gesetzlichen Regelungen, z.B. gemäß Art. 6 Abs. 1 S. 1 b) DS-GVO zum Zwecke der Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen, die auf Ihre Anfrage erfolgen, oder gemäß Art. 6 Abs. 1 S. 1 f) DS-GVO aufgrund unserer oder der berechtigten Interessen Dritter, z.B. an der Beantwortung einer von Ihnen an uns gerichteten sonstigen Anfrage. Sofern keine solche gesetzliche Erlaubnis für die Verarbeitung personenbezogener Daten besteht, fragen wir Ihre Einwilligung ab, bevor wir personenbezogene Daten verarbeiten. Im Folgenden möchten wir die unterschiedlichen Formen der Erhebung Ihrer Daten, die Rechtsgrundlagen sowie ggfs. die Weitergabe an Dritte erläutern.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">a) Formulare auf unserer Webseite</h3>
              <p className="mb-4">
                Sie können auf unserer Webseite Ihre Kontaktangaben über die von uns bereitgestellten Formulare angeben, um z.B. Angebote unserer Partner oder einen Preisvergleich anfordern zu können.
              </p>
              <p className="mb-4">
                In diesen Fällen verarbeiten wir die im Formular abgefragten Daten gemäß Art. 6 Abs. 1 S. 1 b) DS-GVO zum Zwecke der Vertragserfüllung nach Maßgabe der auf der Webseite abrufbaren Nutzungsbedingungen.
              </p>
              <p>
                Wenn Sie als Interessent z.B. einen Angebotsvergleich oder ein Angebot anfordern, übermitteln wir alle Daten Ihrer Anfrage sowie Ihre Kontaktdaten auf Grundlage von Art. 6 Abs. 1 S. 1 b) DS-GVO an unsere jeweiligen Partner, so dass diese Ihnen z.B. ein persönliches und auf Ihre Anforderungen zugeschnittenes Angebot erstellen können. Der bzw. die betreffende/n Partner ist bzw. sind – neben uns – selbst verantwortliche Stelle für den Schutz Ihrer personenbezogenen Daten und muss bzw. müssen Sie über die Verarbeitung Ihrer Daten informieren.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">b) Übermittlung von Daten zwecks Lead-Qualifizierung</h3>
              <p>
                Unsere Auftraggeber können auch Agenturen oder sonstige Vermittler sein, die ihrerseits im Auftrag ihrer eigenen Partner tätig werden. Wenn Sie Ihre Kontaktdaten auf unserer Webseite eingeben, können wir Ihre Daten in diesen Fällen auch an diese Agenturen oder sonstigen Vermittler weitergeben. Die Agenturen oder sonstigen Vermittler werden Sie ggfs. kontaktieren, um vor Vermittlung an einen ihrer Partner weitere Details betreffend Ihre Person, Ihr Unternehmen und Ihr Projekt abzufragen. Die Übermittlung Ihrer Daten erfolgt zum Zwecke der Erfüllung des mit Ihnen geschlossenen Vertrags (Art. 6 Abs. 1 S. 1 b) DS-GVO) sowie aufgrund der berechtigten Interessen unsererseits sowie der beteiligten Agenturen, Vermittler und Partner an einer möglichst optimal auf Ihr Unternehmen und Ihr Projekt abgestimmten Angebotsvermittlung (Art. 6 Abs. 1 S. 1 f) DS-GVO).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">c) Verarbeitung von Daten bei Buchen einer Leistung bei uns; Beratungsanfrage per Telefon oder Live-Chat</h3>
              <p>
                Wenn Sie eine Leistung bei uns buchen oder telefonisch anfordern, z.B. Beratung oder Programmier- oder Designleistungen, oder wenn Sie über unseren Live-Chat Kontakt mit uns aufnehmen und uns dabei personenbezogene Daten zur Verfügung stellen, verarbeiten wir Ihre Daten gemäß Art. 6 Abs. 1 S. 1 b) DS-GVO zum Zwecke der Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen, die auf Ihre Anfrage erfolgen, oder gemäß Art. 6 Abs. 1 S. 1 f) DS-GVO aufgrund unseres berechtigten Interesses an der Beantwortung Ihrer Anfrage. Sofern wir Ihre Daten noch weiter zur Erfüllung Ihrer Anfragen benötigen, speichern wir Ihre Daten auch in unser Kundenmanagement-System ab. Ihre Daten können hierfür auch auf Systemen unserer Dienstleister gespeichert werden. Lesen Sie hierzu bitte Ziffer 6 unserer Datenschutzerklärung.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">d) HINWEIS zu Ihren Rechten und der Löschung Ihrer Daten:</h3>
              <p>
                Zusätzlich zu den obigen Informationen nehmen Sie bitte Ziffer 8 dieser Datenschutzerklärung über Ihre Rechte zur Kenntnis. Informationen zur Löschung Ihrer Daten finden Sie außerdem in Ziffer 9 dieser Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Verarbeitung von Daten mittels Cookies und Pixeln; Ihr Widerspruchsrecht</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">a) Was sind Cookies und Pixel?</h3>
              <p className="mb-4">
                Unsere Website verwendet verschiedene Tools, um Nutzer wiedererkennen und ggf. ihr Verhalten auf unserer Webseite nachvollziehen zu können. Dabei kommen Cookies, Pixel und Logfiles (siehe Ziffer 4) zum Einsatz.
              </p>
              <p className="mb-4">
                Cookies sind Textdateien, die auf dem Ihrem Zugriffsgerät (PC, Tablet, Smartphone etc.) bestimmte Informationen speichern können. Wird unsere Website von dem entsprechenden Gerät des Nutzers aufgerufen, kann der Server, von dem der Cookie gesetzt wurde, die im Cookie gespeicherten Informationen anrufen und auf verschiedene Arten auswerten. Zählpixel sind kleine Bilddateien, die im Quelltext unserer Webseite enthalten sind, die aber bei Aufruf unserer Webseite von anderen Servern abgerufen werden, um Informationen unserer Webseitenbesucher an den Anbieter des Pixels zu übermitteln.
              </p>
              <p>
                Ohne Ihre vorherige Einwilligung kommen lediglich solche Tools zum Einsatz, die für die von Ihnen angeforderte, ausdrücklich gewünschte Funktionen unserer Webseiten unbedingt erforderlich sind (§ 25 Abs. 2 b) TTDSG). Sofern durch den Einsatz der Tools auch personenbezogene Daten verarbeitet werden, beachten Sie bitte auch die diesbezüglichen Informationen. Eine in diesen Fällen von Ihnen erteilte Einwilligung erlaubt uns ggfs. sowohl die Speicherung bzw. den Abruf von Informationen als auch die anschließende Verarbeitung Ihrer personenbezogenen Daten.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">b) Kann ich Cookies und Pixel verhindern?</h3>
              <p>
                Grundsätzlich können Sie über Einstellungen in Ihrem Browser oder mit Hilfe spezieller Browser-Plugins Cookies, Pixel oder auch andere Tracking-Methoden beschränken oder sogar verhindern. Allerdings kann es Services unserer Webseite geben, die nicht mehr funktionieren, wenn Sie z.B. Cookies ablehnen. Lesen Sie außerdem unten Ziffer 3 d) und sowie die Ziffern 5 und 8 dieser Datenschutzerklärung über Ihre Möglichkeit, nach erteilter Einwilligung den Einsatz der jeweiligen Tracking-Tools für die Zukunft zu unterbinden. Diese Einstellungen müssen für jeden Browser, den Sie nutzen, gesondert vorgenommen werden.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">c) Cookies und Pixel auf unseren Webseiten: Einsatzzweck, Rechtsgrundlage, Empfänger Ihrer Daten</h3>
              <p>
                Auf unserer Webseite kommen ganz verschiedene Cookies zum Einsatz. Teilweise sind diese notwendig, damit Sie bestimmte Funktionen unserer Webseite nutzen können. Teilweise helfen uns Cookies aber auch, Ihre Nutzung unserer Webseite und Formulare analysieren zu können, damit wir diese besser verstehen und unsere Webseiten sowohl für Sie direkt als auch grundsätzlich besser gestalten können. Aus denselben Gründen kommen Pixel zum Einsatz.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">d) Widerspruchsrecht gegen die Analyse der Nutzung der Webseite durch Sie</h3>
              <p>
                Gegen die Verarbeitung Ihrer Daten zum Zwecke der Analyse unserer Webseite können Sie jederzeit widersprechen, indem Sie unter folgendem Link das Setzen von Cookies und Pixel mit diesem Einsatzzweck verhindern: Auf dieser Seite ganz unten. Für Google Analytics sowie für Mouseflow müssen Sie gesondert widersprechen, die notwendigen Links sowie Erläuterungen hierzu finden Sie in den Ziffern 5 und 8 dieser Datenschutzerklärung.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Verarbeitung von Daten mittels Logfiles</h2>
              <p className="mb-4">
                Bei der Nutzung dieser Webseite werden auf Grundlage von Art. 6 Abs. 1 S. 1 f) DS-GVO sog. Logfiles gespeichert, in denen bei jedem Seitenaufruf Zugriffsdaten gespeichert werden. Der dabei gespeicherte Datensatz enthält die folgenden Daten:
              </p>
              <p className="mb-4">
                Die IP-Adresse, das Datum, die Uhrzeit, auf welche Datei der Zugriff erfolgte, den Status, die Anfrage, die Ihr Browser an den Server gestellt hat, die übertragene Datenmenge sowie die Internetseite, von der Sie auf die angeforderte Seite gekommen sind (Referrer), sowie die Produkt- und Versionsinformationen des verwendeten Browsers, Ihr Betriebssystem sowie Ihr Herkunftsland.
              </p>
              <p>
                Unser berechtigtes Interesse an der Erhebung und Verarbeitung Ihrer Daten stellen wir nachfolgend dar: Die Protokolldaten (Logs) verwenden wir anonymisiert, also ohne Zuordnung oder Hinweise auf Ihre Person, für statistische Auswertungen, um z.B. zu erfahren, an welchen Tagen und zu welchen Uhrzeiten die Angebote dieser Webseiten besonders beliebt sind und wie viel Datenvolumen auf diesen Webseiten erzeugt wird. Zudem ermöglichen die Log-Dateien gegebenenfalls Fehler zu erkennen, z.B. fehlerhafte Links oder Programmfehler. So können wir die Log-Dateien für die Weiterentwicklung dieser Webseiten verwenden. Wir verknüpfen die im Server-Log gespeicherten Seitenabrufe und Nutzungen zu keiner Zeit mit einzelnen Personen. Wir behalten uns aber eine Nutzung von Daten aus Log-Dateien vor, wenn aufgrund bestimmter Tatsachen der Verdacht besteht, dass Nutzer diese Webseiten und/oder Dienste gesetz- oder vertragswidrig nutzen. Bei einem solchen Verdacht müssen ggf. auch vorübergehend IP-Adressen gespeichert werden, die wir jedoch umgehend löschen, sobald diese nicht mehr benötigt werden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Ihre Rechte</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">a) Rechte als betroffene Person</h3>
              <p className="mb-4">
                Sie haben gem. Art 15 DS-GVO das Recht, auf Antrag unentgeltlich Auskunft zu erhalten über die personenbezogenen Daten, die über Sie gespeichert wurden. Sie haben zudem gem. Art. 16, 17 und 18 DS-GVO das Recht auf Berichtigung unrichtiger Daten sowie die Einschränkung der Verarbeitung bzw. die Löschung Ihrer personenbezogenen Daten.
              </p>
              <p>
                Sie sind unter den in Art. 20 DS-GVO bestimmten Voraussetzungen außerdem berechtigt, die Sie betreffenden personenbezogenen Daten, die gespeichert wurden, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten und diese Daten einem anderen Verantwortlichen ohne Behinderung durch uns zu übermitteln.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">b) Insbesondere: Ihr Widerspruchsrecht</h3>
              <p className="mb-4">
                Außerdem sind Sie gem. Art. 21 Abs. 1 DS-GVO berechtigt, gegen die Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund von Art. 6 Abs. 1 S. 1 e) oder f) DS-GVO erfolgt, einschließlich Profiling, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, Widerspruch einzulegen. Wir werden diesem Widerspruch entsprechen, soweit die gesetzlichen Voraussetzungen für dessen Geltendmachung gegeben sind.
              </p>
              <p>
                Wenn Ihre personenbezogenen Daten für Zwecke der Direktwerbung verarbeitet werden, haben Sie gemäß Art. 21 Abs. 2 DS-GVO jederzeit das Recht der Verarbeitung Ihrer Daten für derartige Werbung, einschließlich Profiling, soweit es mit solcher Direktwerbung in Verbindung steht, zu widersprechen. Wir werden in einem solchen Falle Ihre personenbezogenen Daten nicht länger für die Zwecke der Direktwerbung verwenden.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">c) Kontaktadresse für Ausübung Ihrer Rechte</h3>
              <p>
                Jegliche Ersuchen zu Ihren personenbezogenen Daten richten Sie bitte an: <a href="mailto:matthias.frank@deinvergleich.net" className="text-indigo-600 hover:text-indigo-800">matthias.frank@deinvergleich.net</a>
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">d) Beschwerderecht bei der Aufsichtsbehörde</h3>
              <p>
                Jede betroffene Person hat außerdem das Recht, bei einer Datenschutzaufsichtsbehörde eine Beschwerde über die Verarbeitung von personenbezogenen Daten durch uns einzulegen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Dauer der Speicherung und routinemäßige Löschung</h2>
              <p className="mb-4">
                Sofern in dieser Datenschutzerklärung nicht ausdrücklich anders angegeben, verarbeiten und speichern wir personenbezogene Daten nur für den Zeitraum, der zur Erreichung des Verarbeitungszwecks erforderlich ist, oder sobald dies in Gesetzen oder Vorschriften, welchen wir unterliegen, vorgesehen wurde.
              </p>
              <p>
                Entfällt der Speicherungszweck oder läuft eine gesetzlich vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten routinemäßig und entsprechend den gesetzlichen Vorschriften in ihrer Verarbeitung eingeschränkt oder gelöscht. Daten, die wir ins Kundenmanagement-System aufgenommen haben, löschen wir – sofern keine gesetzlichen Aufbewahrungsfristen entgegenstehen – turnusmäßig nach Ablauf von 2 Jahren nach dem letzten Kontakt mit Ihnen.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Stand dieser Datenschutzerklärung: Januar 2025
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Bei Fragen zur Verarbeitung Ihrer personenbezogenen Daten kontaktieren Sie uns gerne unter: <a href="mailto:matthias.frank@deinvergleich.net" className="text-indigo-600 hover:text-indigo-800">matthias.frank@deinvergleich.net</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4">deinvergleich.net</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Einfach, schnell und kostenlos Angebote erhalten
              </p>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">Kontakt</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <p>E-Mail: matthias.frank@deinvergleich.net</p>
                <p>Mo-Fr: 9:00 - 18:00 Uhr</p>
              </div>
            </div>
            <div>
              <h4 className="text-base font-semibold mb-4">Rechtliches</h4>
              <div className="text-gray-300 text-sm space-y-2">
                <a href="/impressum" className="block hover:text-white transition-colors duration-200">
                  Impressum
                </a>
                <a href="/datenschutz" className="block hover:text-white transition-colors duration-200">
                  Datenschutzerklärung
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 deinvergleich.net. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
