import { type Ref } from 'react';

interface QrPreviewProps {
  containerRef: Ref<HTMLDivElement>;
  size: number;
  bgColor: string;
}

export function QrPreview({ containerRef, size, bgColor }: QrPreviewProps) {
  const displaySize = Math.min(size, 300);

  const isTransparent = bgColor === 'transparent';

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Outer glow frame */}
      <div
        className="relative rounded-2xl p-px glow-gold"
        style={{
          background: 'linear-gradient(135deg, rgba(212,176,106,0.3) 0%, rgba(212,176,106,0.05) 50%, rgba(212,176,106,0.15) 100%)',
        }}
      >
        <div
          className="rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            width: displaySize + 24,
            height: displaySize + 24,
            backgroundColor: isTransparent ? undefined : bgColor,
            background: isTransparent
              ? 'repeating-conic-gradient(#1a1a1a 0% 25%, #111 0% 50%) 0 0 / 16px 16px'
              : bgColor,
          }}
        >
          <div
            id="qr-preview"
            ref={containerRef}
            style={{ width: displaySize, height: displaySize }}
            className="flex items-center justify-center [&>canvas]:!w-full [&>canvas]:!h-full [&>svg]:!w-full [&>svg]:!h-full"
          />
        </div>
      </div>

      <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>
        {size}×{size}px
      </p>
    </div>
  );
}
