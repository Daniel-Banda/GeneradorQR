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

  const DownloadIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

  const Spinner = ({ dark }: { dark?: boolean }) => (
    <span
      className="animate-spin w-4 h-4 border-2 rounded-full"
      style={{
        borderColor: dark ? 'rgba(212,176,106,0.3)' : 'rgba(255,255,255,0.3)',
        borderTopColor: dark ? '#d4b06a' : '#fff',
      }}
    />
  );

  return (
    <div className="space-y-2.5">
      <p
        className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Syne, sans-serif' }}
      >
        Exportar
      </p>
      <div className="flex gap-2">
        {/* PNG — primary gold button */}
        <button
          type="button"
          onClick={() => handleDownload('png')}
          disabled={!hasUrl || loading !== null}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          style={
            hasUrl
              ? {
                  backgroundColor: '#d4b06a',
                  color: '#0a0a0a',
                  boxShadow: '0 0 20px rgba(212,176,106,0.2)',
                }
              : { backgroundColor: '#2a2a2a', color: 'rgba(255,255,255,0.3)' }
          }
        >
          {loading === 'png' ? <Spinner /> : <DownloadIcon />}
          PNG
        </button>

        {/* JPG — secondary outline button */}
        <button
          type="button"
          onClick={() => handleDownload('jpg')}
          disabled={!hasUrl || loading !== null}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'transparent',
            border: '1px solid rgba(212,176,106,0.3)',
            color: '#d4b06a',
          }}
        >
          {loading === 'jpg' ? <Spinner dark /> : <DownloadIcon />}
          JPG
        </button>
      </div>
      {!hasUrl && (
        <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Ingresa una URL para habilitar la descarga
        </p>
      )}
      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
        PNG: soporta transparencia · JPG: fondo blanco
      </p>
    </div>
  );
}
