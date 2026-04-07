import { ReactNode } from 'react';

interface SectionProps {
  title: string;
  icon: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

function Section({ title, icon, defaultOpen = false, children }: SectionProps) {
  return (
    <details open={defaultOpen} className="group border border-gray-200 rounded-xl overflow-hidden">
      <summary className="flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer select-none">
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <span>{icon}</span>
          {title}
        </span>
        <svg
          className="chevron w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-4 py-4 bg-white">
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
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-1 mb-3">
        Personalización
      </h2>
      <Section title="Estilo de puntos y esquinas" icon="◼" defaultOpen={true}>
        {children.style}
      </Section>
      <Section title="Colores" icon="🎨">
        {children.colors}
      </Section>
      <Section title="Tamaño y márgenes" icon="↔">
        {children.size}
      </Section>
      <Section title="Corrección de errores" icon="⚡">
        {children.errorLevel}
      </Section>
      <Section title="Logo o imagen central" icon="🖼">
        {children.logo}
      </Section>
      <div className="pt-2">
        {children.export}
      </div>
    </div>
  );
}
