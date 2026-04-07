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

const selectStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff',
  borderRadius: '0.5rem',
  padding: '0.5rem 0.75rem',
  fontSize: '0.8125rem',
  width: '100%',
  outline: 'none',
  cursor: 'pointer',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0.75rem center',
  paddingRight: '2rem',
};

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
      <label
        className="block text-xs mb-1.5"
        style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        style={selectStyle}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ backgroundColor: '#1a1a1a' }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function QrStyleOptions({ dotType, cornerSquareType, cornerDotType, onChange }: QrStyleOptionsProps) {
  return (
    <div className="grid grid-cols-1 gap-3.5">
      <SelectField
        label="Estilo de puntos"
        value={dotType}
        options={DOT_TYPES}
        onChange={(v) => onChange({ dotType: v })}
      />
      <SelectField
        label="Esquinas — marco exterior"
        value={cornerSquareType}
        options={CORNER_SQUARE_TYPES}
        onChange={(v) => onChange({ cornerSquareType: v })}
      />
      <SelectField
        label="Esquinas — punto interior"
        value={cornerDotType}
        options={CORNER_DOT_TYPES}
        onChange={(v) => onChange({ cornerDotType: v })}
      />
    </div>
  );
}
