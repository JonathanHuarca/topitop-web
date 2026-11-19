import React, { useState } from 'react';
import { ArrowRight, Clock, MapPin, QrCode, Smartphone } from 'lucide-react';
import { PageRoute, Product } from '../types';
import { PRODUCTS, STORES } from '../data/catalog';
import { ProductQrCode } from './ProductQrCode';

interface TiendasPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQualityModal: (product: Product) => void;
}

export const TiendasPage: React.FC<TiendasPageProps> = ({
  onNavigate,
}) => {
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const selectedProduct =
    PRODUCTS.find((p) => p.id === selectedProductId) ?? PRODUCTS[0];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 animate-fade-up">
      <nav className="text-[13px] text-neutral-500 mb-4 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onNavigate({ name: 'calidad' })}
          className="hover:text-[#C8102E] transition-colors cursor-pointer"
        >
          Inicio
        </button>
        <span>›</span>
        <span className="font-semibold text-neutral-800">Tiendas y QR</span>
      </nav>

      <div className="mb-8">
        <h1 className="font-display font-extrabold text-[32px] sm:text-[40px] tracking-[-0.025em] text-[#141923]">
          Nuestras <span className="text-[#C8102E]">Tiendas</span> y QR por prenda
        </h1>
        <p className="text-[16px] text-neutral-600 mt-1 max-w-2xl">
          En nuestras tiendas físicas cada etiqueta y probador incluye un código
          QR vinculado a la ficha exacta de la prenda. En la web puedes consultar
          la misma información directamente sin escanear.
        </p>
      </div>

      {/* Interactive QR Verification Simulator per Product */}
      <div className="mb-10 bg-[#FAF8F7] rounded-[26px] p-6 sm:p-7 border border-neutral-200/80 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C8102E] bg-[#FDF2F4] px-3 py-1 rounded-full">
            <QrCode className="w-3.5 h-3.5" />
            Integración QR vinculada por SKU
          </span>
          <h2 className="font-display font-extrabold text-[22px] text-[#141923]">
            Prueba el código QR individual de cualquier prenda
          </h2>
          <p className="text-sm text-neutral-600">
            Selecciona una prenda del catálogo para generar su código QR único y
            comprobar cómo redirige directamente a su ficha de trazabilidad.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="bg-white border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#141923] focus:outline-none focus:border-[#C8102E] max-w-full"
            >
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.sku} — {p.name} ({p.category})
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() =>
                onNavigate({
                  name: 'producto',
                  slug: selectedProduct.slug,
                  fromQr: true,
                })
              }
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C8102E] hover:bg-[#A50C24] text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
            >
              Simular escaneo QR
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col items-center justify-center text-center">
          <ProductQrCode
            slug={selectedProduct.slug}
            sku={selectedProduct.sku}
            size={128}
          />
          <p className="mt-2 text-xs font-mono font-semibold text-[#141923]">
            {selectedProduct.sku}
          </p>
        </div>
      </div>

      {/* Store cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {STORES.map((store) => (
          <div
            key={store.id}
            className="bg-white rounded-[22px] p-6 border border-neutral-200/80 shadow-[0_6px_22px_rgba(20,25,35,0.04)] flex flex-col justify-between gap-4"
          >
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#C8102E] bg-[#FDF2F4] px-2.5 py-1 rounded-full mb-2">
                {store.city}
              </span>
              <h2 className="font-display font-bold text-[20px] text-[#141923]">
                {store.name}
              </h2>
              <div className="mt-3 space-y-1.5 text-[14px] text-neutral-600">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C8102E] shrink-0" />
                  {store.address}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                  {store.hours}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center gap-2">
              {store.features.map((feat) => (
                <span
                  key={feat}
                  className="inline-flex items-center gap-1 text-xs font-medium bg-[#F6F5F4] text-neutral-700 px-3 py-1 rounded-full"
                >
                  <Smartphone className="w-3 h-3 text-[#C8102E]" />
                  {feat}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
