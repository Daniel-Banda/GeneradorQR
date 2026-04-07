import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorSwatchProps {
  label: string;
  color: string;
  onChange: (color: string) => void;
  allowTransparent?: boolean;
  isTransparent?: boolean;
  onTransparentToggle?: (v: boolean) => void;
}

function ColorSwatch({ label, color, onChange, allowTransparent, isTransparent, onTransparentToggle }: ColorSwatchProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const swatchBg = isTransparent
    ? 'repeating-conic-gradient(#2a2a2a 0% 25%, #1a1a1a 0% 50%) 0 0 / 10px 10px'
    : color;

  return (
    <div>
      <label
        className="block text-xs mb-2"
        style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </label>
      <div className="flex items-center gap-3" ref={wrapperRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            disabled={isTransparent}
            className="w-10 h-10 rounded-lg transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: swatchBg,
              border: open ? '2px solid #d4b06a' : '2px solid rgba(255,255,255,0.12)',
              boxShadow: open ? '0 0 12px rgba(212,176,106,0.2)' : undefined,
            }}
            aria-label={`Seleccionar color: ${label}`}
          />
          {open && !isTransparent && (
            <div
              className="color-picker-popover rounded-xl p-3 shadow-2xl"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <HexColorPicker color={color} onChange={onChange} />
              <input
                type="text"
                value={color}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
                }}
                maxLength={7}
                className="mt-2 w-full px-2 py-1.5 text-xs font-mono rounded-lg outline-none"
                style={{
                  backgroundColor: '#111',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                }}
                placeholder="#000000"
              />
            </div>
          )}
        </div>
        <span className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {isTransparent ? 'Transparente' : color.toUpperCase()}
        </span>
        {allowTransparent && onTransparentToggle && (
          <label className="ml-auto flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <input
              type="checkbox"
              checked={isTransparent ?? false}
              onChange={(e) => onTransparentToggle(e.target.checked)}
            />
            Transparente
          </label>
        )}
      </div>
    </div>
  );
}

interface QrColorOptionsProps {
  fgColor: string;
  bgColor: string;
  onChange: (partial: { fgColor?: string; bgColor?: string }) => void;
}

export function QrColorOptions({ fgColor, bgColor, onChange }: QrColorOptionsProps) {
  const isTransparent = bgColor === 'transparent';

  return (
    <div className="grid grid-cols-1 gap-5">
      <ColorSwatch
        label="Color de puntos (frente)"
        color={fgColor}
        onChange={(v) => onChange({ fgColor: v })}
      />
      <ColorSwatch
        label="Color de fondo"
        color={isTransparent ? '#ffffff' : bgColor}
        onChange={(v) => onChange({ bgColor: v })}
        allowTransparent
        isTransparent={isTransparent}
        onTransparentToggle={(v) => onChange({ bgColor: v ? 'transparent' : '#ffffff' })}
      />
    </div>
  );
}
