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
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        {logoDataUrl ? (
          <img
            src={logoDataUrl}
            alt="Logo"
            className="w-12 h-12 rounded-lg border border-gray-200 object-contain bg-gray-50"
          />
        ) : (
          <div className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs">
            PNG
          </div>
        )}
        <div className="flex-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
          >
            {logoDataUrl ? 'Cambiar imagen' : 'Subir logo o imagen'}
          </button>
          <p className="text-xs text-gray-400 mt-0.5">PNG con transparencia recomendado</p>
        </div>
        {logoDataUrl && (
          <button
            type="button"
            onClick={() => onChange({ logoDataUrl: null })}
            className="text-xs text-red-500 hover:text-red-700 transition-colors"
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
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-medium text-gray-600">Tamaño del logo</label>
            <span className="text-xs font-mono text-indigo-600 font-semibold">
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
            className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
          />
          <p className="text-xs text-amber-600 mt-1">
            Recomendado: nivel H de corrección con logo
          </p>
        </div>
      )}
    </div>
  );
}
