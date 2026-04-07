export function Footer() {
  return (
    <footer
      className="mt-20 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.08)', backgroundColor: '#080808' }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-center space-y-1">
        <p
          className="font-syne text-sm font-medium"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          Generador de código QR gratuito
        </p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Sin registro · Sin marcas de agua · Estándar ISO/IEC 18004
        </p>
      </div>
    </footer>
  );
}
