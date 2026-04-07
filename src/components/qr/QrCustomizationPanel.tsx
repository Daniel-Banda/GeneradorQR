import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  icon: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}

function Section({ title, icon, defaultOpen = false, children }: SectionProps) {
  return (
    <details
      open={defaultOpen}
      className="rounded-xl transition-all"
      style={{ border: '1px solid rgba(255,255,255,0.07)', overflow: 'visible' }}
    >
      <summary
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none transition-colors duration-150 hover:bg-white/5"
        style={{ backgroundColor: '#111', borderRadius: '0.75rem' }}
      >
        <span
          className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Syne, sans-serif' }}
        >
          <span style={{ color: '#d4b06a' }}>{icon}</span>
          {title}
        </span>
        <svg
          className="chevron w-3.5 h-3.5"
          style={{ color: 'rgba(255,255,255,0.25)' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-4 py-4" style={{ backgroundColor: '#0d0d0d' }}>
        {children}
      </div>
    </details>
  );
}

interface QrCustomizationPanelProps {
  children: {
    style: ReactNode;
    colors: ReactNode;
    size: ReactNode;
    errorLevel: ReactNode;
    logo: ReactNode;
    export: ReactNode;
  };
}

export function QrCustomizationPanel({ children }: QrCustomizationPanelProps) {
  return (
    <div className="space-y-2">
      <p
        className="text-xs font-semibold uppercase tracking-widest px-1 mb-3"
        style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Syne, sans-serif' }}
      >
        Personalización
      </p>
      <Section title="Estilo de puntos y esquinas" icon="◼" defaultOpen>
        {children.style}
      </Section>
      <Section title="Colores" icon="◉">
        {children.colors}
      </Section>
      <Section title="Tamaño y márgenes" icon="↔">
        {children.size}
      </Section>
      <Section title="Corrección de errores" icon="⚡">
        {children.errorLevel}
      </Section>
      <Section title="Logo o imagen central" icon="▣">
        {children.logo}
      </Section>
    </div>
  );
}
