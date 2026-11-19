import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface ProductQrCodeProps {
  slug: string;
  sku: string;
  size?: number;
  className?: string;
}

export function buildProductQrUrl(slug: string): string {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${window.location.origin}/#/producto/${slug}?source=qr`;
  }
  return `https://www.topitop.pe/#/producto/${slug}?source=qr`;
}

export const ProductQrCode: React.FC<ProductQrCodeProps> = ({
  slug,
  sku,
  size = 112,
  className = '',
}) => {
  const [svgMarkup, setSvgMarkup] = useState<string>('');
  const url = buildProductQrUrl(slug);

  useEffect(() => {
    let active = true;
    QRCode.toString(url, {
      type: 'svg',
      margin: 1,
      width: size,
      color: {
        dark: '#141923',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((svg) => {
        if (active) setSvgMarkup(svg);
      })
      .catch(() => {
        if (active) setSvgMarkup('');
      });
    return () => {
      active = false;
    };
  }, [url, size]);

  return (
    <div
      className={`inline-flex flex-col items-center justify-center rounded-xl bg-white p-1.5 border border-neutral-200 ${className}`}
      title={`QR vinculado a ${sku} (${url})`}
      aria-label={`Código QR de trazabilidad para la prenda ${sku}`}
    >
      {svgMarkup ? (
        <div
          style={{ width: size, height: size }}
          className="[&>svg]:w-full [&>svg]:h-full"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      ) : (
        <div
          style={{ width: size, height: size }}
          className="bg-neutral-100 rounded-md animate-pulse"
        />
      )}
    </div>
  );
};
