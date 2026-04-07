function AccordionItem({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="border-b last:border-b-0"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <summary
        className="flex items-center justify-between py-4 cursor-pointer select-none transition-opacity duration-150 hover:opacity-80"
      >
        <h3
          className="font-syne font-semibold text-sm pr-4"
          style={{ color: 'rgba(255,255,255,0.8)' }}
        >
          {title}
        </h3>
        <svg
          className="chevron flex-shrink-0 w-4 h-4"
          style={{ color: 'rgba(255,255,255,0.2)' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="pb-5 text-sm leading-relaxed space-y-3" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {children}
      </div>
    </details>
  );
}

export function SeoSection() {
  return (
    <article
      aria-label="Información sobre códigos QR"
      className="max-w-4xl mx-auto mt-20 px-0"
    >
      <header className="text-center mb-8">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: '#d4b06a', fontFamily: 'Syne, sans-serif' }}
        >
          Guía completa
        </p>
        <h2
          className="font-syne font-bold text-xl sm:text-2xl tracking-tight"
          style={{ color: '#fff' }}
        >
          Todo lo que necesitas saber sobre los códigos QR
        </h2>
        <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Qué son, para qué sirven, cómo usarlos y por qué son esenciales
        </p>
      </header>

      <div
        className="rounded-2xl px-6"
        style={{
          backgroundColor: '#0d0d0d',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <AccordionItem title="¿Qué es un código QR?" defaultOpen>
          <p>
            Un <strong style={{ color: 'rgba(255,255,255,0.7)' }}>código QR</strong> (Quick Response code) es un tipo de código de barras
            bidimensional que puede almacenar grandes cantidades de información: URLs, texto, datos de contacto,
            información de pago y mucho más. Fue inventado en 1994 por la empresa japonesa Denso Wave.
          </p>
          <p>
            A diferencia de los códigos de barras tradicionales, los códigos QR almacenan información en sentido
            horizontal y vertical, permitiendo hasta <strong style={{ color: 'rgba(255,255,255,0.7)' }}>7,089 caracteres numéricos</strong>.
            Su estructura incluye patrones de posicionamiento en tres esquinas y una zona de silencio.
          </p>
          <p>
            Hoy cualquier smartphone puede escanearlos directamente desde la cámara, sin aplicaciones adicionales.
          </p>
        </AccordionItem>

        <AccordionItem title="¿Por qué usar un generador de código QR gratuito?">
          <p>
            Un <strong style={{ color: 'rgba(255,255,255,0.7)' }}>generador de código QR gratuito en línea</strong> te permite
            crear QR profesionales sin costo ni registro.
          </p>
          <ul className="space-y-1.5">
            {[
              ['Sin registro', 'Genera y descarga al instante, sin crear cuentas'],
              ['Sin marcas de agua', 'El QR generado es completamente tuyo'],
              ['Privacidad', 'La generación ocurre en tu navegador, sin enviar datos a servidores'],
              ['Personalización completa', 'Colores, estilos y logo para coherencia de marca'],
              ['Múltiples formatos', 'PNG para digital, JPG para documentos'],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-2">
                <span style={{ color: '#d4b06a' }}>·</span>
                <span>
                  <strong style={{ color: 'rgba(255,255,255,0.65)' }}>{title}:</strong> {desc}
                </span>
              </li>
            ))}
          </ul>
        </AccordionItem>

        <AccordionItem title="¿Cómo funciona nuestro generador de código QR?">
          <p>
            Funciona completamente en tu navegador usando tecnología moderna de JavaScript. Al ingresar una URL,
            el algoritmo Reed-Solomon codifica los datos en una matriz siguiendo el estándar ISO/IEC 18004.
          </p>
          <ol className="space-y-1.5 list-none">
            {[
              ['01', 'Ingresa tu URL', 'La vista previa se actualiza en tiempo real'],
              ['02', 'Personaliza el diseño', 'Estilo de puntos, colores y esquinas'],
              ['03', 'Añade tu logo', 'Opcional, para reforzar tu identidad de marca'],
              ['04', 'Ajusta el tamaño', 'De 150px para digital hasta 500px para impresión'],
              ['05', 'Descarga', 'PNG o JPG con un solo clic'],
            ].map(([num, title, desc]) => (
              <li key={num} className="flex gap-3">
                <span
                  className="font-mono font-bold text-xs mt-0.5 flex-shrink-0"
                  style={{ color: '#d4b06a' }}
                >
                  {num}
                </span>
                <span>
                  <strong style={{ color: 'rgba(255,255,255,0.65)' }}>{title}:</strong> {desc}
                </span>
              </li>
            ))}
          </ol>
        </AccordionItem>

        <AccordionItem title="Casos de uso: QR para negocios y marketing digital">
          <p>
            Los <strong style={{ color: 'rgba(255,255,255,0.7)' }}>códigos QR para negocios</strong> son una herramienta
            indispensable en estrategias de marketing digital y físico:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            {[
              ['🍽', 'Restaurantes', 'Menús digitales, pedidos en mesa, reservaciones'],
              ['🛍', 'Retail', 'Páginas de producto, descuentos, programas de lealtad'],
              ['📅', 'Eventos', 'Check-in sin contacto, acceso a materiales, networking'],
              ['💼', 'Tarjetas de presentación', 'vCards digitales guardadas automáticamente'],
              ['📱', 'Redes sociales', 'Enlace directo a Instagram, LinkedIn, TikTok'],
              ['💳', 'Pagos', 'Transferencias inmediatas sin efectivo ni terminales'],
              ['📦', 'Logística', 'Rastreo de inventario, trazabilidad, control de calidad'],
              ['📚', 'Educación', 'Material didáctico, videos explicativos, asistencia'],
            ].map(([icon, title, desc]) => (
              <div
                key={title}
                className="flex gap-2.5 p-2.5 rounded-lg"
                style={{ backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-lg flex-shrink-0">{icon}</span>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>{title}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem title="Buenas prácticas para diseñar códigos QR efectivos">
          <ul className="space-y-2.5">
            {[
              ['Tamaño mínimo en impresión', 'Al menos 2 cm × 2 cm para ser escaneable de forma fiable'],
              ['Contraste suficiente', 'Colores oscuros sobre fondos claros. Evita combinaciones de bajo contraste'],
              ['Zona de silencio', 'Mantén un margen de al menos 4 módulos alrededor del QR'],
              ['Prueba antes de imprimir', 'Escanea desde múltiples dispositivos y distancias antes de distribuir'],
              ['Nivel H con logo', 'Si añades un logo central, usa nivel de corrección H (30% de recuperación)'],
              ['URL corta', 'Las URLs más cortas generan QR menos densos y más fáciles de escanear'],
            ].map(([title, desc]) => (
              <li key={title} className="flex gap-2">
                <span className="font-bold flex-shrink-0 mt-0.5" style={{ color: '#d4b06a' }}>✓</span>
                <span>
                  <strong style={{ color: 'rgba(255,255,255,0.65)' }}>{title}: </strong>
                  {desc}
                </span>
              </li>
            ))}
          </ul>
        </AccordionItem>

        <AccordionItem title="Niveles de corrección de errores explicados">
          <p>
            Determinan qué porcentaje del código puede estar dañado y aun así ser leído correctamente:
          </p>
          <div className="overflow-x-auto mt-3 rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr style={{ backgroundColor: 'rgba(212,176,106,0.08)' }}>
                  {['Nivel', 'Recuperación', 'Densidad', 'Uso recomendado'].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2.5 px-3 font-semibold"
                      style={{ color: '#d4b06a', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['L — Bajo', '~7%', 'Baja', 'Pantallas digitales limpias'],
                  ['M — Medio', '~15%', 'Media', 'Uso general, impresión básica'],
                  ['Q — Alto', '~25%', 'Alta', 'Impresión profesional, exteriores'],
                  ['H — Máximo', '~30%', 'Muy alta', 'QR con logo, entornos con daño'],
                ].map((row, i) => (
                  <tr
                    key={row[0]}
                    style={{ borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : undefined }}
                  >
                    <td className="py-2 px-3 font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>{row[0]}</td>
                    <td className="py-2 px-3 font-mono" style={{ color: '#d4b06a' }}>{row[1]}</td>
                    <td className="py-2 px-3" style={{ color: 'rgba(255,255,255,0.4)' }}>{row[2]}</td>
                    <td className="py-2 px-3" style={{ color: 'rgba(255,255,255,0.4)' }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            El estándar QR está definido por la norma internacional <strong style={{ color: 'rgba(255,255,255,0.4)' }}>ISO/IEC 18004</strong>.
            Los QR son de dominio público, generables libremente sin licencias.
          </p>
        </AccordionItem>
      </div>
    </article>
  );
}
