import { type Ref } from 'react';

interface QrPreviewProps {
  containerRef: Ref<HTMLDivElement>;
  size: number;
  bgColor: string;
}

export function QrPreview({ containerRef, size, bgColor }: QrPreviewProps) {
  const displaySize = Math.min(size, 320);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="rounded-xl shadow-lg border border-gray-200 overflow-hidden flex items-center justify-center"
        style={{
          width: displaySize + 16,
          height: displaySize + 16,
          background: bgColor === 'transparent'
            ? 'repeating-conic-gradient(#e5e7eb 0% 25%, #f9fafb 0% 50%) 0 0 / 16px 16px'
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
      <p className="text-xs text-gray-400">
        Vista previa — {size}×{size}px
      </p>
    </div>
  );
}
