import { useRef, useEffect, useCallback } from 'react';
import QRCodeStyling from 'qr-code-styling';
import type { QrOptions } from '../types/qr.types';

function mapOptionsToLibFormat(opts: QrOptions) {
  return {
    width: opts.width,
    height: opts.width,
    data: opts.url || 'https://example.com',
    margin: opts.margin,
    qrOptions: {
      errorCorrectionLevel: opts.errorLevel,
    },
    dotsOptions: {
      type: opts.dotType,
      color: opts.fgColor,
    },
    cornersSquareOptions: {
      type: opts.cornerSquareType,
      color: opts.fgColor,
    },
    cornersDotOptions: {
      type: opts.cornerDotType,
      color: opts.fgColor,
    },
    backgroundOptions: {
      color: opts.bgColor === 'transparent' ? '#ffffff00' : opts.bgColor,
    },
    ...(opts.logoDataUrl
      ? {
          image: opts.logoDataUrl,
          imageOptions: {
            margin: 4,
            imageSize: opts.logoSizeRatio,
            hideBackgroundDots: true,
          },
        }
      : {}),
  };
}

export function useQrCode(options: QrOptions) {
  const qrRef = useRef<QRCodeStyling | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create QR instance once on mount
  useEffect(() => {
    qrRef.current = new QRCodeStyling(mapOptionsToLibFormat(options));
    if (containerRef.current) {
      qrRef.current.append(containerRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update QR when options change
  useEffect(() => {
    qrRef.current?.update(mapOptionsToLibFormat(options));
  }, [options]);

  const download = useCallback(
    async (format: 'jpeg' | 'png') => {
      return qrRef.current?.getRawData(format) ?? null;
    },
    []
  );

  return { containerRef, qrInstance: qrRef, download };
}
