import { useState } from 'react';
import { useUrlShortener } from '../../hooks/useUrlShortener';

export function UrlShortenerTab() {
  const [inputUrl, setInputUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const { shortUrl, loading, error, shorten, reset } = useUrlShortener();

  const isValidUrl = inputUrl.match(/^https?:\/\/.+/) !== null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValidUrl) return;
    await shorten(inputUrl);
  }

  async function handleCopy() {
    if (!shortUrl) return;
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setInputUrl('');
    reset();
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Title */}
      <div className="mb-8">
        <h2
          className="font-syne font-bold text-2xl sm:text-3xl tracking-tight"
          style={{ color: '#fff' }}
        >
          Acorta cualquier{' '}
          <span className="text-shimmer">URL larga</span>
        </h2>
        <p className="mt-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Convierte URLs largas en enlaces cortos y fáciles de compartir.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="long-url"
            className="block text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Syne, sans-serif' }}
          >
            URL larga
          </label>
          <textarea
            id="long-url"
            value={inputUrl}
            onChange={(e) => { setInputUrl(e.target.value); reset(); }}
            placeholder="https://ejemplo.com/pagina-muy-larga/con-muchos-parametros?ref=abc"
            rows={3}
            className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none transition-all duration-200"
            style={{
              backgroundColor: '#111',
              border: inputUrl && !isValidUrl
                ? '1px solid rgba(239,68,68,0.5)'
                : '1px solid rgba(255,255,255,0.08)',
              color: '#fff',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = inputUrl && !isValidUrl
                ? '1px solid rgba(239,68,68,0.6)'
                : '1px solid rgba(212,176,106,0.35)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = inputUrl && !isValidUrl
                ? '1px solid rgba(239,68,68,0.5)'
                : '1px solid rgba(255,255,255,0.08)';
            }}
          />
          {inputUrl && !isValidUrl && (
            <p className="text-xs mt-1.5" style={{ color: 'rgba(239,68,68,0.8)' }}>
              Ingresa una URL válida que empiece con http:// o https://
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValidUrl || loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          style={
            isValidUrl && !loading
              ? {
                  backgroundColor: '#d4b06a',
                  color: '#0a0a0a',
                  boxShadow: '0 0 24px rgba(212,176,106,0.2)',
                }
              : {
                  backgroundColor: '#2a2a2a',
                  color: 'rgba(255,255,255,0.3)',
                }
          }
        >
          {loading ? (
            <>
              <span
                className="animate-spin w-4 h-4 border-2 rounded-full"
                style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#0a0a0a' }}
              />
              Acortando...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Acortar URL
            </>
          )}
        </button>
      </form>

      {/* Error */}
      {error && (
        <div
          className="mt-4 p-4 rounded-xl animate-fade-in"
          style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <p className="text-sm" style={{ color: 'rgba(239,68,68,0.9)' }}>{error}</p>
          <button
            type="button"
            onClick={() => shorten(inputUrl)}
            className="mt-2 text-xs underline"
            style={{ color: 'rgba(239,68,68,0.6)' }}
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Success */}
      {shortUrl && (
        <div
          className="mt-6 p-5 rounded-xl space-y-3 animate-fade-in"
          style={{
            backgroundColor: 'rgba(212,176,106,0.06)',
            border: '1px solid rgba(212,176,106,0.2)',
            boxShadow: '0 0 24px rgba(212,176,106,0.06)',
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: '#d4b06a', fontFamily: 'Syne, sans-serif' }}
          >
            URL acortada
          </p>
          <div className="flex items-center gap-3">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-lg font-bold font-syne truncate transition-opacity hover:opacity-70"
              style={{ color: '#fff' }}
            >
              {shortUrl}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
              style={
                copied
                  ? { backgroundColor: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }
                  : { backgroundColor: 'rgba(212,176,106,0.1)', color: '#d4b06a', border: '1px solid rgba(212,176,106,0.25)' }
              }
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copiado
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar
                </>
              )}
            </button>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs transition-opacity hover:opacity-60"
            style={{ color: 'rgba(255,255,255,0.3)' }}
          >
            Acortar otra URL
          </button>
        </div>
      )}

      {/* Info chips */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        {[
          { icon: '⚡', title: 'Instantáneo', desc: 'Sin registro ni esperas' },
          { icon: '🔗', title: 'Confiable', desc: 'Powered by is.gd' },
          { icon: '📋', title: 'Un clic', desc: 'Para copiar al clipboard' },
        ].map((card) => (
          <div
            key={card.title}
            className="flex flex-col items-center text-center p-3 rounded-xl"
            style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span className="text-xl mb-1">{card.icon}</span>
            <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{card.title}</span>
            <span className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{card.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
