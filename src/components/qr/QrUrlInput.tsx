interface QrUrlInputProps {
  url: string;
  onChange: (url: string) => void;
}

export function QrUrlInput({ url, onChange }: QrUrlInputProps) {
  const isInvalid = url.length > 0 && !url.match(/^https?:\/\/.+/);

  return (
    <div className="mb-6">
      <label htmlFor="qr-url" className="block text-sm font-semibold text-gray-700 mb-2">
        URL para generar el QR
      </label>
      <div className="flex gap-2">
        <input
          id="qr-url"
          type="url"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://ejemplo.com"
          className={`flex-1 px-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-indigo-400 ${
            isInvalid
              ? 'border-red-400 bg-red-50 focus:ring-red-300'
              : 'border-gray-300 bg-white focus:border-indigo-400'
          }`}
          aria-describedby={isInvalid ? 'url-error' : undefined}
        />
      </div>
      {isInvalid && (
        <p id="url-error" className="mt-1 text-xs text-red-600">
          Ingresa una URL válida que empiece con http:// o https://
        </p>
      )}
    </div>
  );
}
