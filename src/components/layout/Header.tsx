type Tab = 'qr' | 'shortener';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              QR
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-none">
                Generador QR
              </h1>
              <p className="text-xs text-gray-500">Gratis · Sin registro</p>
            </div>
          </div>

          {/* Tab switcher */}
          <nav
            role="tablist"
            aria-label="Herramientas"
            className="flex bg-gray-100 rounded-xl p-1 w-full sm:w-auto"
          >
            <button
              role="tab"
              aria-selected={activeTab === 'qr'}
              onClick={() => onTabChange('qr')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'qr'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 3.5a.5.5 0 11-1 0 .5.5 0 011 0zm-12 0a.5.5 0 11-1 0 .5.5 0 011 0z" />
              </svg>
              Código QR
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'shortener'}
              onClick={() => onTabChange('shortener')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'shortener'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Acortar URL
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
