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
    <details open={defaultOpen} className="border-b border-gray-200 last:border-b-0">
      <summary className="flex items-center justify-between py-4 cursor-pointer select-none hover:text-indigo-700 transition-colors">
        <h3 className="text-base font-semibold text-gray-800 group-open:text-indigo-700 pr-4">
          {title}
        </h3>
        <svg
          className="chevron flex-shrink-0 w-5 h-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="pb-5 text-sm text-gray-600 leading-relaxed space-y-3">
        {children}
      </div>
    </details>
  );
}

export function SeoSection() {
  return (
    <article
      aria-label="Información sobre códigos QR"
      className="max-w-4xl mx-auto mt-16 px-4 sm:px-6"
    >
      <header className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Todo lo que necesitas saber sobre los códigos QR
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Guía completa: qué son, para qué sirven, cómo usarlos y por qué son esenciales hoy
        </p>
      </header>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 divide-y divide-gray-200">

        <AccordionItem title="¿Qué es un código QR?" defaultOpen={true}>
          <p>
            Un <strong>código QR</strong> (Quick Response code) es un tipo de código de barras bidimensional que puede almacenar
            grandes cantidades de información: URLs, texto, datos de contacto, información de pago y mucho más.
            Fue inventado en 1994 por la empresa japonesa Denso Wave para rastrear piezas de automóviles.
          </p>
          <p>
            A diferencia de los códigos de barras tradicionales (unidimensionales), los códigos QR almacenan
            información tanto en sentido horizontal como vertical, lo que les permite contener hasta <strong>7,089 caracteres
            numéricos o 4,296 alfanuméricos</strong>. Su estructura incluye patrones de posicionamiento en tres esquinas,
            módulos de datos y una zona de silencio alrededor del código.
          </p>
          <p>
            Hoy en día, cualquier teléfono inteligente puede escanear un código QR directamente desde la cámara,
            sin necesidad de aplicaciones adicionales, lo que los hace accesibles para todos.
          </p>
        </AccordionItem>

        <AccordionItem title="¿Por qué usar un generador de código QR gratuito?">
          <p>
            Un <strong>generador de código QR gratuito en línea</strong> como este te permite crear códigos QR
            profesionales sin costo y sin necesidad de registro. Los servicios de pago suelen ofrecer funciones
            que no necesitas para la mayoría de casos de uso cotidianos.
          </p>
          <ul className="list-disc list-inside space-y-1.5 ml-2">
            <li><strong>Sin registro:</strong> Genera y descarga al instante, sin crear cuentas</li>
            <li><strong>Sin marcas de agua:</strong> El QR generado es completamente tuyo</li>
            <li><strong>Privacidad:</strong> La generación ocurre en tu navegador, sin enviar datos a servidores</li>
            <li><strong>Personalización:</strong> Colores, estilos y logo para mantener coherencia de marca</li>
            <li><strong>Múltiples formatos:</strong> PNG para digital, JPG para documentos, con o sin fondo transparente</li>
          </ul>
        </AccordionItem>

        <AccordionItem title="¿Cómo funciona nuestro generador de código QR?">
          <p>
            Nuestro <strong>generador de código QR</strong> funciona completamente en tu navegador usando tecnología
            moderna de JavaScript. Al ingresar una URL, el algoritmo Reed-Solomon codifica los datos en una
            matriz de módulos (puntos) siguiendo el estándar ISO/IEC 18004.
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li><strong>Ingresa tu URL</strong> en el campo superior. La vista previa se actualiza en tiempo real.</li>
            <li><strong>Personaliza el diseño</strong>: elige el estilo de puntos, colores y esquinas.</li>
            <li><strong>Añade tu logo</strong> (opcional) para reforzar tu identidad de marca.</li>
            <li><strong>Ajusta el tamaño</strong> según tu necesidad: desde 150px para uso digital hasta 500px para impresión.</li>
            <li><strong>Descarga en PNG o JPG</strong> con un solo clic.</li>
          </ol>
          <p>
            La corrección de errores integrada permite que el código QR sea escaneable incluso si parte de él
            está dañado o cubierto (como cuando se coloca un logo en el centro).
          </p>
        </AccordionItem>

        <AccordionItem title="Casos de uso: QR para negocios y marketing digital">
          <p>
            Los <strong>códigos QR para negocios</strong> se han convertido en una herramienta indispensable en
            estrategias de marketing digital y físico. Su versatilidad los hace útiles en casi cualquier industria:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: '🍽', title: 'Restaurantes y hostelería', desc: 'Menús digitales, pedidos en mesa, reservaciones y valoraciones en Google.' },
              { icon: '🛍', title: 'Comercio minorista', desc: 'Páginas de producto, descuentos exclusivos, programas de lealtad y catálogos.' },
              { icon: '📅', title: 'Eventos y conferencias', desc: 'Check-in sin contacto, acceso a materiales, networking y encuestas post-evento.' },
              { icon: '💼', title: 'Tarjetas de presentación', desc: 'vCards digitales que se guardan automáticamente en el teléfono del contacto.' },
              { icon: '📱', title: 'Redes sociales', desc: 'Enlaza directamente a tu perfil de Instagram, LinkedIn, TikTok o cualquier red.' },
              { icon: '💳', title: 'Pagos y fintech', desc: 'QR de pago para transferencias inmediatas sin efectivo ni terminales.' },
              { icon: '📦', title: 'Logística y manufactura', desc: 'Rastreo de inventario, trazabilidad de productos y control de calidad.' },
              { icon: '📚', title: 'Educación', desc: 'Material didáctico, acceso a videos explicativos, formularios de asistencia.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-2.5 p-3 bg-gray-50 rounded-lg">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-gray-700 text-xs">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AccordionItem>

        <AccordionItem title="Buenas prácticas para diseñar códigos QR efectivos">
          <p>
            Un <strong>código QR bien diseñado</strong> no solo se ve profesional, sino que garantiza que sea
            escaneable en cualquier condición. Sigue estas recomendaciones:
          </p>
          <ul className="space-y-2.5">
            {[
              { title: 'Tamaño mínimo en impresión', desc: 'El QR debe medir al menos 2 cm × 2 cm para ser escaneable de forma fiable.' },
              { title: 'Contraste suficiente', desc: 'Usa colores oscuros sobre fondos claros. Evita combinaciones de bajo contraste como amarillo sobre blanco.' },
              { title: 'Zona de silencio', desc: 'Mantén un margen alrededor del QR de al menos 4 módulos. Nuestro ajuste de "margen" lo controla automáticamente.' },
              { title: 'Prueba antes de imprimir', desc: 'Siempre escanea el QR desde múltiples dispositivos y distancias antes de distribuirlo masivamente.' },
              { title: 'Nivel H con logo', desc: 'Si añades un logo central, usa nivel de corrección H (30% de recuperación) para compensar los datos ocultos.' },
              { title: 'URL corta', desc: 'Las URLs más cortas generan QR menos densos y más fáciles de escanear. Usa nuestro acortador de URL integrado.' },
            ].map((item) => (
              <li key={item.title} className="flex gap-2">
                <span className="text-indigo-500 font-bold flex-shrink-0">✓</span>
                <div>
                  <span className="font-semibold text-gray-700">{item.title}: </span>
                  <span className="text-gray-600">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </AccordionItem>

        <AccordionItem title="Niveles de corrección de errores explicados">
          <p>
            Los <strong>niveles de corrección de errores del código QR</strong> determinan qué porcentaje del código
            puede estar dañado, sucio u oculto y aun así ser leído correctamente. A mayor nivel, el QR es más
            resistente pero también más denso (más módulos):
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="text-left py-2 px-3 font-semibold text-indigo-800 border border-indigo-100">Nivel</th>
                  <th className="text-left py-2 px-3 font-semibold text-indigo-800 border border-indigo-100">Recuperación</th>
                  <th className="text-left py-2 px-3 font-semibold text-indigo-800 border border-indigo-100">Densidad</th>
                  <th className="text-left py-2 px-3 font-semibold text-indigo-800 border border-indigo-100">Uso recomendado</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { level: 'L — Bajo', recovery: '~7%', density: 'Baja', use: 'Pantallas digitales limpias' },
                  { level: 'M — Medio', recovery: '~15%', density: 'Media', use: 'Uso general, impresión básica' },
                  { level: 'Q — Alto', recovery: '~25%', density: 'Alta', use: 'Impresión profesional, exteriores' },
                  { level: 'H — Máximo', recovery: '~30%', density: 'Muy alta', use: 'QR con logo, entornos con polvo o daño' },
                ].map((row, i) => (
                  <tr key={row.level} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-2 px-3 border border-gray-200 font-semibold text-gray-700">{row.level}</td>
                    <td className="py-2 px-3 border border-gray-200 text-green-700 font-mono">{row.recovery}</td>
                    <td className="py-2 px-3 border border-gray-200 text-gray-600">{row.density}</td>
                    <td className="py-2 px-3 border border-gray-200 text-gray-600">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            El estándar QR fue creado por Denso Wave en 1994 y está definido por la norma internacional
            <strong> ISO/IEC 18004</strong>. Los QR son de dominio público, por lo que cualquiera puede
            generarlos libremente sin pagar licencias.
          </p>
        </AccordionItem>

      </div>
    </article>
  );
}
