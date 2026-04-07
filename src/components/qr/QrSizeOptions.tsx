interface QrSizeOptionsProps {
  width: number;
  margin: number;
  onChange: (partial: { width?: number; margin?: number }) => void;
}

function RangeField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-xs font-medium text-gray-600">{label}</label>
        <span className="text-xs font-mono text-indigo-600 font-semibold">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

export function QrSizeOptions({ width, margin, onChange }: QrSizeOptionsProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <RangeField
        label="Tamaño del QR"
        value={width}
        min={150}
        max={500}
        step={10}
        unit="px"
        onChange={(v) => onChange({ width: v })}
      />
      <RangeField
        label="Margen (zona de silencio)"
        value={margin}
        min={0}
        max={50}
        step={1}
        unit="px"
        onChange={(v) => onChange({ margin: v })}
      />
    </div>
  );
}
