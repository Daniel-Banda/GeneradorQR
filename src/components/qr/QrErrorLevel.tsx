import type { ErrorCorrectionLevel } from '../../types/qr.types';

const LEVELS: { value: ErrorCorrectionLevel; label: string; recovery: string; tip: string }[] = [
  { value: 'L', label: 'L — Bajo', recovery: '7%', tip: 'Ideal para pantallas digitales limpias' },
  { value: 'M', label: 'M — Medio', recovery: '15%', tip: 'Balance entre densidad y fiabilidad' },
  { value: 'Q', label: 'Q — Alto', recovery: '25%', tip: 'Recomendado para impresión general' },
  { value: 'H', label: 'H — Máximo', recovery: '30%', tip: 'Necesario cuando usas logo central' },
];

interface QrErrorLevelProps {
  errorLevel: ErrorCorrectionLevel;
  onChange: (level: ErrorCorrectionLevel) => void;
}

export function QrErrorLevel({ errorLevel, onChange }: QrErrorLevelProps) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-600 mb-2">
        Nivel de corrección de errores
      </p>
      <div className="grid grid-cols-2 gap-2">
        {LEVELS.map((lvl) => (
          <label
            key={lvl.value}
            title={`${lvl.tip} — Recupera hasta el ${lvl.recovery} del código dañado`}
            className={`flex flex-col p-2.5 rounded-lg border-2 cursor-pointer transition-all ${
              errorLevel === lvl.value
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 bg-white hover:border-indigo-200'
            }`}
          >
            <input
              type="radio"
              name="errorLevel"
              value={lvl.value}
              checked={errorLevel === lvl.value}
              onChange={() => onChange(lvl.value)}
              className="sr-only"
            />
            <span className={`text-xs font-bold ${errorLevel === lvl.value ? 'text-indigo-700' : 'text-gray-700'}`}>
              {lvl.label}
            </span>
            <span className="text-xs text-gray-500">Recupera {lvl.recovery}</span>
          </label>
        ))}
      </div>
      <p className="mt-2 text-xs text-amber-600">
        Tip: usa nivel H si agregas un logo central
      </p>
    </div>
  );
}
