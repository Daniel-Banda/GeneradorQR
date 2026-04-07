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
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</label>
        <span
          className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md"
          style={{ color: '#d4b06a', backgroundColor: 'rgba(212,176,106,0.1)', border: '1px solid rgba(212,176,106,0.2)' }}
        >
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
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #d4b06a ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
      <div className="flex justify-between text-xs mt-1" style={{ color: 'rgba(255,255,255,0.2)' }}>
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

export function QrSizeOptions({ width, margin, onChange }: QrSizeOptionsProps) {
  return (
    <div className="grid grid-cols-1 gap-5">
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
