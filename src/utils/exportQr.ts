import QRCodeStyling from 'qr-code-styling';

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadQr(
  qrInstance: QRCodeStyling,
  format: 'jpg' | 'png',
  bgColor: string,
  size: number
): Promise<void> {
  const extension = format === 'jpg' ? 'jpeg' : 'png';
  const blob = await qrInstance.getRawData(extension);

  if (!blob) throw new Error('No se pudo generar la imagen QR');

  if (format === 'jpg' && bgColor === 'transparent') {
    // JPG no soporta transparencia — compositar sobre canvas blanco
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.src = url;
    await new Promise<void>((res) => { img.onload = () => res(); });

    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, 0, 0, size, size);
    URL.revokeObjectURL(url);

    canvas.toBlob((jpgBlob) => {
      if (!jpgBlob) return;
      triggerDownload(jpgBlob, 'codigo-qr.jpg');
    }, 'image/jpeg', 0.95);
    return;
  }

  triggerDownload(blob, `codigo-qr.${format === 'jpg' ? 'jpg' : 'png'}`);
}
