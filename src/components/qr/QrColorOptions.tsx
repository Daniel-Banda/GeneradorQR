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
    ? 'repeating-conic-gradient(#e5e7eb 0% 25%, #fff 0% 50%) 0 0 / 10px 10px'
    : color;

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <div className="flex items-center gap-2" ref={wrapperRef}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            disabled={isTransparent}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-indigo-400 transition-colors"
            style={{ background: swatchBg }}
            aria-label={`Seleccionar color: ${label}`}
          />
          {open && !isTransparent && (
            <div className="color-picker-popover shadow-xl rounded-xl border border-gray-200 bg-white p-2">
              <HexColorPicker color={color} onChange={onChange} />
              <input
                type="text"
                value={color}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) onChange(v);
                }}
                maxLength={7}
                className="mt-2 w-full px-2 py-1 text-xs font-mono border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-400"
                placeholder="#000000"
              />
            </div>
          )}
        </div>
        <span className="text-sm font-mono text-gray-600">
          {isTransparent ? 'Transparente' : color.toUpperCase()}
        </span>
        {allowTransparent && onTransparentToggle && (
          <label className="ml-auto flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={isTransparent ?? false}
              onChange={(e) => onTransparentToggle(e.target.checked)}
              className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-400"
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
    <div className="grid grid-cols-1 gap-4">
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
