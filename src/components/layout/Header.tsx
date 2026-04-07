type Tab = 'qr' | 'shortener';

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        backgroundColor: 'rgba(10,10,10,0.85)',
        borderColor: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-syne font-bold text-sm"
              style={{
                backgroundColor: 'rgba(212,176,106,0.1)',
                border: '1px solid rgba(212,176,106,0.3)',
                color: '#d4b06a',
              }}
            >
              QR
            </div>
            <div>
              <h1
                className="font-syne font-bold text-base leading-none tracking-tight"
                style={{ color: '#fff' }}
              >
                Generador QR
              </h1>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Gratis · Sin registro
              </p>
            </div>
          </div>

          {/* Tab switcher */}
          <nav
            role="tablist"
            aria-label="Herramientas"
            className="flex rounded-xl p-1 w-full sm:w-auto"
            style={{
              backgroundColor: '#111',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {(['qr', 'shortener'] as Tab[]).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => onTabChange(tab)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={
                  activeTab === tab
                    ? {
                        backgroundColor: 'rgba(212,176,106,0.1)',
                        color: '#d4b06a',
                        border: '1px solid rgba(212,176,106,0.25)',
                      }
                    : {
                        color: 'rgba(255,255,255,0.45)',
                        border: '1px solid transparent',
                      }
                }
              >
                {tab === 'qr' ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="3" height="3" rx="0.5" />
                      <rect x="18" y="14" width="3" height="3" rx="0.5" />
                      <rect x="14" y="18" width="3" height="3" rx="0.5" />
                      <rect x="18" y="18" width="3" height="3" rx="0.5" />
                    </svg>
                    Código QR
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Acortar URL
                  </>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
