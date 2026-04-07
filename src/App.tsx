import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { QrGeneratorTab } from './components/qr/QrGeneratorTab';
import { UrlShortenerTab } from './components/shortener/UrlShortenerTab';
import { SeoSection } from './components/seo/SeoSection';

type Tab = 'qr' | 'shortener';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('qr');

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a0a0a', color: '#fff' }}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
        <div
          role="tabpanel"
          className="animate-fade-in"
          key={activeTab}
          aria-label={activeTab === 'qr' ? 'Generador de código QR' : 'Acortador de URL'}
        >
          {activeTab === 'qr' ? <QrGeneratorTab /> : <UrlShortenerTab />}
        </div>

        <SeoSection />
      </main>

      <Footer />
    </div>
  );
}
