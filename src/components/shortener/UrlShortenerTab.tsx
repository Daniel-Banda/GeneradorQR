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
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800">Acortador de URL</h2>
        <p className="text-sm text-gray-500 mt-1">
          Convierte cualquier URL larga en un enlace corto y fácil de compartir
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="long-url" className="block text-sm font-semibold text-gray-700 mb-2">
            URL larga
          </label>
          <textarea
            id="long-url"
            value={inputUrl}
            onChange={(e) => { setInputUrl(e.target.value); reset(); }}
            placeholder="https://ejemplo.com/pagina-muy-larga/con-muchos-parametros?ref=abc&utm_source=newsletter"
            rows={3}
            className={`w-full px-4 py-3 rounded-xl border text-sm resize-none outline-none transition-colors focus:ring-2 focus:ring-indigo-400 ${
              inputUrl && !isValidUrl
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300 bg-white focus:border-indigo-400'
            }`}
          />
          {inputUrl && !isValidUrl && (
            <p className="text-xs text-red-600 mt-1">
              Ingresa una URL válida que empiece con http:// o https://
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValidUrl || loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
        >
          {loading ? (
            <>
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
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

      {/* Error state */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => shorten(inputUrl)}
            className="mt-2 text-xs text-red-600 underline"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Success state */}
      {shortUrl && (
        <div className="mt-6 p-5 bg-indigo-50 border border-indigo-200 rounded-xl space-y-3">
          <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            URL acortada
          </p>
          <div className="flex items-center gap-2">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-lg font-bold text-indigo-700 hover:text-indigo-900 truncate transition-colors"
            >
              {shortUrl}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
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
            className="text-xs text-indigo-400 hover:text-indigo-600 transition-colors"
          >
            Acortar otra URL
          </button>
        </div>
      )}

      {/* Info cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: '⚡', title: 'Instantáneo', desc: 'Sin registro ni esperas' },
          { icon: '🔗', title: 'Confiable', desc: 'Powered by is.gd' },
          { icon: '📋', title: 'Fácil de usar', desc: 'Un clic para copiar' },
        ].map((card) => (
          <div key={card.title} className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-2xl mb-1">{card.icon}</span>
            <span className="text-xs font-semibold text-gray-700">{card.title}</span>
            <span className="text-xs text-gray-400">{card.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
