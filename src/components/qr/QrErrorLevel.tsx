import type { ErrorCorrectionLevel } from '../../types/qr.types';

const LEVELS: { value: ErrorCorrectionLevel; label: string; recovery: string; tip: string }[] = [
  { value: 'L', label: 'L', recovery: '7%', tip: 'Pantallas digitales limpias' },
  { value: 'M', label: 'M', recovery: '15%', tip: 'Uso general, balance óptimo' },
  { value: 'Q', label: 'Q', recovery: '25%', tip: 'Impresión profesional' },
  { value: 'H', label: 'H', recovery: '30%', tip: 'Con logo o en exteriores' },
];

interface QrErrorLevelProps {
  errorLevel: ErrorCorrectionLevel;
  onChange: (level: ErrorCorrectionLevel) => void;
}

export function QrErrorLevel({ errorLevel, onChange }: QrErrorLevelProps) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {LEVELS.map((lvl) => {
          const isActive = errorLevel === lvl.value;
          return (
            <label
              key={lvl.value}
              title={lvl.tip}
              className="flex flex-col items-center p-2.5 rounded-lg cursor-pointer transition-all duration-150"
              style={{
                backgroundColor: isActive ? 'rgba(212,176,106,0.1)' : '#1a1a1a',
                border: isActive ? '1px solid rgba(212,176,106,0.4)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: isActive ? '0 0 12px rgba(212,176,106,0.1)' : undefined,
              }}
            >
              <input
                type="radio"
                name="errorLevel"
                value={lvl.value}
                checked={isActive}
                onChange={() => onChange(lvl.value)}
                className="sr-only"
              />
              <span
                className="text-sm font-bold font-syne"
                style={{ color: isActive ? '#d4b06a' : 'rgba(255,255,255,0.6)' }}
              >
                {lvl.label}
              </span>
              <span className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {lvl.recovery}
              </span>
            </label>
          );
        })}
      </div>
      <p className="mt-2.5 text-xs" style={{ color: 'rgba(212,176,106,0.7)' }}>
        Usa nivel H si agregas un logo central
      </p>
    </div>
  );
}
