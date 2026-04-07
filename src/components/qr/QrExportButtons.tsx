import { useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { downloadQr } from '../../utils/exportQr';

interface QrExportButtonsProps {
  qrInstance: React.RefObject<QRCodeStyling | null>;
  bgColor: string;
  width: number;
  hasUrl: boolean;
}

export function QrExportButtons({ qrInstance, bgColor, width, hasUrl }: QrExportButtonsProps) {
  const [loading, setLoading] = useState<'jpg' | 'png' | null>(null);

  async function handleDownload(format: 'jpg' | 'png') {
    if (!qrInstance.current || !hasUrl) return;
    setLoading(format);
    try {
      await downloadQr(qrInstance.current, format, bgColor, width);
    } catch (err) {
      console.error('Error al descargar QR:', err);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-gray-600 mb-1">Exportar código QR</p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleDownload('png')}
          disabled={!hasUrl || loading !== null}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {loading === 'png' ? (
            <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
          PNG
        </button>
        <button
          type="button"
          onClick={() => handleDownload('jpg')}
          disabled={!hasUrl || loading !== null}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 text-sm font-semibold rounded-lg border border-gray-300 transition-colors"
        >
          {loading === 'jpg' ? (
            <span className="animate-spin w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full" />
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )}
          JPG
        </button>
      </div>
      {!hasUrl && (
        <p className="text-xs text-gray-400 text-center">Ingresa una URL para habilitar la descarga</p>
      )}
      <p className="text-xs text-gray-400">
        PNG soporta fondo transparente · JPG siempre con fondo blanco
      </p>
    </div>
  );
}
