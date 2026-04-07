import { useState } from 'react';
import { DEFAULT_QR_OPTIONS, type QrOptions } from '../../types/qr.types';
import { useQrCode } from '../../hooks/useQrCode';
import { QrUrlInput } from './QrUrlInput';
import { QrPreview } from './QrPreview';
import { QrCustomizationPanel } from './QrCustomizationPanel';
import { QrStyleOptions } from './QrStyleOptions';
import { QrColorOptions } from './QrColorOptions';
import { QrSizeOptions } from './QrSizeOptions';
import { QrErrorLevel } from './QrErrorLevel';
import { QrLogoUpload } from './QrLogoUpload';
import { QrExportButtons } from './QrExportButtons';

export function QrGeneratorTab() {
  const [opts, setOpts] = useState<QrOptions>(DEFAULT_QR_OPTIONS);
  const { containerRef, qrInstance } = useQrCode(opts);

  function update(partial: Partial<QrOptions>) {
    setOpts((prev) => ({ ...prev, ...partial }));
  }

  const hasValidUrl = opts.url.match(/^https?:\/\/.+/) !== null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 items-start">
      {/* Preview column */}
      <div className="lg:sticky lg:top-8 flex flex-col items-center gap-6">
        <QrPreview
          containerRef={containerRef}
          size={opts.width}
          bgColor={opts.bgColor}
        />
        <div className="w-full max-w-xs">
          <QrExportButtons
            qrInstance={qrInstance}
            bgColor={opts.bgColor}
            width={opts.width}
            hasUrl={hasValidUrl}
          />
        </div>
      </div>

      {/* Controls column */}
      <div className="space-y-6">
        <QrUrlInput url={opts.url} onChange={(url) => update({ url })} />
        <QrCustomizationPanel>
          {{
            style: (
              <QrStyleOptions
                dotType={opts.dotType}
                cornerSquareType={opts.cornerSquareType}
                cornerDotType={opts.cornerDotType}
                onChange={update}
              />
            ),
            colors: (
              <QrColorOptions
                fgColor={opts.fgColor}
                bgColor={opts.bgColor}
                onChange={update}
              />
            ),
            size: (
              <QrSizeOptions
                width={opts.width}
                margin={opts.margin}
                onChange={update}
              />
            ),
            errorLevel: (
              <QrErrorLevel
                errorLevel={opts.errorLevel}
                onChange={(errorLevel) => update({ errorLevel })}
              />
            ),
            logo: (
              <QrLogoUpload
                logoDataUrl={opts.logoDataUrl}
                logoSizeRatio={opts.logoSizeRatio}
                onChange={update}
              />
            ),
            export: (
              <QrExportButtons
                qrInstance={qrInstance}
                bgColor={opts.bgColor}
                width={opts.width}
                hasUrl={hasValidUrl}
              />
            ),
          }}
        </QrCustomizationPanel>
      </div>
    </div>
  );
}
