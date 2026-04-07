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
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Calculate position when opening
  function handleToggle() {
    if (isTransparent) return;
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPopoverPos({
        top: rect.bottom + 8 + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setOpen((v) => !v);
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        popoverRef.current && !popoverRef.current.contains(target) &&
        buttonRef.current && !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Close on scroll
  useEffect(() => {
    if (!open) return;
    const handleScroll = () => setOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      <div className="flex items-center gap-3">
        {/* Swatch button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          disabled={isTransparent}
          className="w-10 h-10 rounded-lg transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          style={{
            background: swatchBg,
            border: open ? '2px solid #d4b06a' : '2px solid rgba(255,255,255,0.12)',
            boxShadow: open ? '0 0 12px rgba(212,176,106,0.2)' : undefined,
          }}
          aria-label={`Seleccionar color: ${label}`}
        />

        <span className="text-sm font-mono" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {isTransparent ? 'Transparente' : color.toUpperCase()}
        </span>

        {allowTransparent && onTransparentToggle && (
          <label
            className="ml-auto flex items-center gap-1.5 text-xs cursor-pointer"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            <input
              type="checkbox"
              checked={isTransparent ?? false}
              onChange={(e) => onTransparentToggle(e.target.checked)}
            />
            Transparente
          </label>
        )}
      </div>

      {/* Portal-style fixed popover — escapes any overflow:hidden parent */}
      {open && !isTransparent && (
        <div
          ref={popoverRef}
          className="rounded-xl p-3 shadow-2xl"
          style={{
            position: 'fixed',
            top: popoverPos.top,
            left: popoverPos.left,
            zIndex: 9999,
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,176,106,0.1)',
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
