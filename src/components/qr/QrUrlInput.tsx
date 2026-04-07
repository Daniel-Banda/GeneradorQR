interface QrUrlInputProps {
  url: string;
  onChange: (url: string) => void;
}

export function QrUrlInput({ url, onChange }: QrUrlInputProps) {
  const isInvalid = url.length > 0 && !url.match(/^https?:\/\/.+/);

  return (
    <div className="mb-6">
      <label
        htmlFor="qr-url"
        className="block text-xs font-semibold uppercase tracking-widest mb-2"
        style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Syne, sans-serif' }}
      >
        URL del destino
      </label>
      <input
        id="qr-url"
        type="url"
        value={url}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://ejemplo.com"
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
        style={{
          backgroundColor: '#111',
          border: isInvalid
            ? '1px solid rgba(239,68,68,0.5)'
            : '1px solid rgba(255,255,255,0.08)',
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
          boxShadow: url && !isInvalid ? '0 0 0 1px rgba(212,176,106,0.2)' : undefined,
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = isInvalid
            ? '1px solid rgba(239,68,68,0.6)'
            : '1px solid rgba(212,176,106,0.35)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = isInvalid
            ? '1px solid rgba(239,68,68,0.5)'
            : '1px solid rgba(255,255,255,0.08)';
        }}
        aria-describedby={isInvalid ? 'url-error' : undefined}
      />
      {isInvalid && (
        <p id="url-error" className="mt-1.5 text-xs" style={{ color: 'rgba(239,68,68,0.8)' }}>
          Ingresa una URL válida que empiece con http:// o https://
        </p>
      )}
    </div>
  );
}
