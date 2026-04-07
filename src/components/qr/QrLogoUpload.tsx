import { useRef } from 'react';

interface QrLogoUploadProps {
  logoDataUrl: string | null;
  logoSizeRatio: number;
  onChange: (partial: { logoDataUrl?: string | null; logoSizeRatio?: number }) => void;
}

export function QrLogoUpload({ logoDataUrl, logoSizeRatio, onChange }: QrLogoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({ logoDataUrl: event.target?.result as string });
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {logoDataUrl ? (
          <img
            src={logoDataUrl}
            alt="Logo"
            className="w-12 h-12 rounded-lg object-contain"
            style={{ border: '1px solid rgba(255,255,255,0.1)', backgroundColor: '#1a1a1a' }}
          />
        ) : (
          <div
            className="w-12 h-12 rounded-lg flex flex-col items-center justify-center"
            style={{ border: '1px dashed rgba(255,255,255,0.15)', backgroundColor: '#1a1a1a' }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.2)' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}

        <div className="flex-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-sm font-medium transition-colors duration-150 hover:opacity-80"
            style={{ color: '#d4b06a' }}
          >
            {logoDataUrl ? 'Cambiar imagen' : 'Subir logo o imagen'}
          </button>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
            PNG con transparencia recomendado
          </p>
        </div>

        {logoDataUrl && (
          <button
            type="button"
            onClick={() => onChange({ logoDataUrl: null })}
            className="text-xs transition-colors duration-150"
            style={{ color: 'rgba(239,68,68,0.6)' }}
            aria-label="Eliminar logo"
          >
            Quitar
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {logoDataUrl && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Tamaño del logo
            </label>
            <span
              className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md"
              style={{ color: '#d4b06a', backgroundColor: 'rgba(212,176,106,0.1)', border: '1px solid rgba(212,176,106,0.2)' }}
            >
              {Math.round(logoSizeRatio * 100)}%
            </span>
          </div>
          <input
            type="range"
            min={0.15}
            max={0.45}
            step={0.01}
            value={logoSizeRatio}
            onChange={(e) => onChange({ logoSizeRatio: Number(e.target.value) })}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #d4b06a ${((logoSizeRatio - 0.15) / (0.45 - 0.15)) * 100}%, rgba(255,255,255,0.1) ${((logoSizeRatio - 0.15) / (0.45 - 0.15)) * 100}%)`,
            }}
          />
        </div>
      )}
    </div>
  );
}
