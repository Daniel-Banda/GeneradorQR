import type { DotType, CornerSquareType, CornerDotType } from '../../types/qr.types';

interface QrStyleOptionsProps {
  dotType: DotType;
  cornerSquareType: CornerSquareType;
  cornerDotType: CornerDotType;
  onChange: (partial: { dotType?: DotType; cornerSquareType?: CornerSquareType; cornerDotType?: CornerDotType }) => void;
}

const DOT_TYPES: { value: DotType; label: string }[] = [
  { value: 'square', label: 'Cuadrado' },
  { value: 'rounded', label: 'Redondeado' },
  { value: 'dots', label: 'Círculos' },
  { value: 'classy', label: 'Clásico' },
  { value: 'classy-rounded', label: 'Clásico redondeado' },
  { value: 'extra-rounded', label: 'Extra redondeado' },
];

const CORNER_SQUARE_TYPES: { value: CornerSquareType; label: string }[] = [
  { value: 'square', label: 'Cuadrado' },
  { value: 'extra-rounded', label: 'Redondeado' },
  { value: 'dot', label: 'Punto' },
];

const CORNER_DOT_TYPES: { value: CornerDotType; label: string }[] = [
  { value: 'square', label: 'Cuadrado' },
  { value: 'dot', label: 'Punto' },
];

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-colors"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function QrStyleOptions({ dotType, cornerSquareType, cornerDotType, onChange }: QrStyleOptionsProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <SelectField
        label="Estilo de puntos"
        value={dotType}
        options={DOT_TYPES}
        onChange={(v) => onChange({ dotType: v })}
      />
      <SelectField
        label="Estilo de esquinas (marco)"
        value={cornerSquareType}
        options={CORNER_SQUARE_TYPES}
        onChange={(v) => onChange({ cornerSquareType: v })}
      />
      <SelectField
        label="Estilo de puntos de esquina"
        value={cornerDotType}
        options={CORNER_DOT_TYPES}
        onChange={(v) => onChange({ cornerDotType: v })}
      />
    </div>
  );
}
