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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <div
          role="tabpanel"
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
