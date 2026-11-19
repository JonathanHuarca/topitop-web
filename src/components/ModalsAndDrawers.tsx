import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  QrCode,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { CartItem, PageRoute, Product } from '../types';
import { PRODUCTS, formatPen } from '../data/catalog';
import {
  CareWashIcon,
  FabricLayersIcon,
  FactoryIcon,
  OekoTexBadge,
  PeruFlagBadge,
} from './BrandIcons';
import { GarmentPhoto } from './GarmentPhoto';
import { ProductQrCode } from './ProductQrCode';

/* ---------------- CART DRAWER ---------------- */

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClearCart: () => void;
  onShowToast: (msg: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemove,
  onClearCart,
  onShowToast,
}) => {
  const [checkedOut, setCheckedOut] = useState(false);

  if (!open) return null;

  const subtotal = items.reduce((s, it) => s + it.unitPrice * it.quantity, 0);
  const totalSavings = items.reduce(
    (s, it) =>
      s +
      (it.originalPrice ? (it.originalPrice - it.unitPrice) * it.quantity : 0),
    0
  );

  const handleCheckout = () => {
    setCheckedOut(true);
    setTimeout(() => {
      onClearCart();
      setCheckedOut(false);
      onClose();
      onShowToast(
        '¡Pedido confirmado! Recibirás tu boleta y ficha de trazabilidad por correo.'
      );
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <aside className="relative z-10 w-full max-w-[420px] bg-white h-full shadow-2xl flex flex-col">
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#C8102E]" />
            <h2 className="font-display font-bold text-[18px] text-[#141923]">
              Tu carrito ({items.reduce((a, b) => a + b.quantity, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-600 cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {checkedOut ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
              <CheckCircle2 className="w-14 h-14 text-[#16A34A]" />
              <h3 className="font-display font-bold text-xl text-[#141923]">
                ¡Gracias por tu compra!
              </h3>
              <p className="text-sm text-neutral-600 max-w-xs">
                Estamos preparando tu pedido hecho en el Perú.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#FDF2F4] flex items-center justify-center text-[#C8102E]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <p className="font-display font-bold text-[17px] text-[#141923]">
                Tu carrito está vacío
              </p>
              <p className="text-sm text-neutral-500 max-w-[260px]">
                Explora nuestras prendas o arma un look completo con 10% de
                descuento.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 p-3 rounded-2xl border border-neutral-200/80 bg-[#FAF9F8]"
              >
                <div className="w-[74px] h-[92px] rounded-xl overflow-hidden bg-white border border-neutral-100 shrink-0 flex items-center justify-center p-1">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-bold text-[14.5px] text-[#141923] leading-snug">
                        {item.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="text-neutral-400 hover:text-[#C8102E] cursor-pointer"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[12px] text-neutral-500 mt-0.5 line-clamp-2">
                      {item.subtitle}
                    </p>
                    {item.discountBadge && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#FDF2F4] text-[#C8102E] text-[10.5px] font-bold">
                        {item.discountBadge}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="inline-flex items-center border border-neutral-200 rounded-full bg-white">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-[#C8102E] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-[#C8102E] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      {item.originalPrice && (
                        <span className="block text-[11px] text-neutral-400 line-through">
                          {formatPen(item.originalPrice * item.quantity)}
                        </span>
                      )}
                      <span className="font-bold text-[14.5px] text-[#141923]">
                        {formatPen(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && !checkedOut && (
          <div className="p-5 border-t border-neutral-200 bg-white space-y-3">
            {totalSavings > 0 && (
              <div className="flex items-center justify-between text-xs font-semibold text-[#15803D] bg-[#F0FDF4] px-3.5 py-2 rounded-xl">
                <span>Descuento por look completo (-10%)</span>
                <span>-{formatPen(totalSavings)}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-[16px]">
              <span className="font-medium text-neutral-600">Total</span>
              <span className="font-display font-extrabold text-[20px] text-[#141923]">
                {formatPen(subtotal)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-full bg-[#C8102E] hover:bg-[#A50C24] text-white font-bold text-[15.5px] shadow-md transition-all cursor-pointer"
            >
              Finalizar compra
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

/* ---------------- QUALITY SHEET & LINKED QR MODAL ---------------- */

interface QualityPreviewModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenFullProduct: (slug: string, fromQr?: boolean) => void;
  onOpenCert: (product: Product) => void;
}

export const QualityPreviewModal: React.FC<QualityPreviewModalProps> = ({
  product,
  onClose,
  onOpenFullProduct,
  onOpenCert,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-[500px] max-h-[90vh] overflow-y-auto bg-white rounded-[26px] p-6 shadow-2xl border border-neutral-200 animate-fade-up">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E]">
              Calidad Topitop · Ref. {product.sku}
            </span>
            <h3 className="font-display font-extrabold text-[20px] text-[#141923]">
              Ficha de transparencia y QR
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF9F8] border border-neutral-100 mb-4">
          <div className="w-16 h-16 rounded-xl bg-white p-1 border border-neutral-100 shrink-0 flex items-center justify-center overflow-hidden">
            <GarmentPhoto product={product} preferFlatLay />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-[15px] text-[#141923] truncate">
              {product.name}
            </p>
            <p className="text-xs text-neutral-500">
              {product.style} · {product.season}
            </p>
            <p className="text-sm font-extrabold text-[#C8102E] mt-0.5">
              {formatPen(product.price)}
            </p>
          </div>
          <ProductQrCode slug={product.slug} sku={product.sku} size={64} />
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <PeruFlagBadge className="w-7 h-7 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#141923]">
                País de origen: {product.quality.originCountry}
              </p>
              <p className="text-xs text-neutral-500">
                Materias primas: {product.quality.rawMaterialsOrigin}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FactoryIcon className="w-7 h-7 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#141923]">
                Confección: Planta {product.quality.plant}
              </p>
              <p className="text-xs text-neutral-500">
                {product.quality.plantDetail}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FabricLayersIcon className="w-7 h-7 shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold text-[#141923]">
                Composición:
              </strong>{' '}
              {product.quality.composition}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <CareWashIcon className="w-7 h-7 shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold text-[#141923]">Cuidados:</strong>{' '}
              {product.quality.care}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF9F8] border border-neutral-200/80 text-xs text-neutral-600">
            <strong className="text-[#141923]">Proveedores:</strong>{' '}
            {product.quality.supplierInfo}
          </div>

          {product.quality.hasOekoTex && (
            <div className="p-3 rounded-2xl bg-[#F0FDF9] border border-[#009677]/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <OekoTexBadge />
                <div className="text-xs">
                  <p className="font-bold text-[#141923]">
                    Certificación Oeko-Tex
                  </p>
                  <p className="text-neutral-600">
                    Textiles libres de sustancias nocivas
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenCert(product);
                }}
                className="text-xs font-bold text-[#009677] hover:underline cursor-pointer shrink-0"
              >
                Ver detalle →
              </button>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenFullProduct(product.slug, true);
            }}
            className="flex-1 py-3 px-4 rounded-full bg-[#C8102E] hover:bg-[#A50C24] text-white font-semibold text-sm inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            Abrir ficha completa del QR
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- OEKO-TEX CERTIFICATE MODAL ---------------- */

interface CertificateModalProps {
  product: Product | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  product,
  onClose,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-[460px] bg-white rounded-[26px] p-6 shadow-2xl border border-neutral-200 animate-fade-up">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <OekoTexBadge className="px-3 py-2" />
            <div>
              <h3 className="font-display font-extrabold text-[19px] text-[#141923]">
                Certificación Oeko-Tex®
              </h3>
              <p className="text-xs text-[#009677] font-semibold">
                STANDARD 100 · Transparencia textil
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-neutral-600 leading-relaxed mb-4">
          {product.quality.oekoTexSummary}
        </p>

        <div className="rounded-2xl bg-[#F6FAF9] border border-[#009677]/20 p-4 space-y-2.5 text-[13px]">
          <div className="flex justify-between gap-2">
            <span className="text-neutral-500">Prenda / Referencia:</span>
            <strong className="text-[#141923] text-right">
              {product.name} ({product.sku})
            </strong>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-neutral-500">Planta productora:</span>
            <strong className="text-[#141923]">
              {product.quality.plant}, Perú
            </strong>
          </div>
          <div className="pt-1 border-t border-[#009677]/15">
            <span className="block text-neutral-500 mb-0.5">
              Estado de verificación por lote:
            </span>
            <span className="inline-flex items-start gap-1.5 font-medium text-[#141923]">
              <ShieldCheck className="w-4 h-4 text-[#009677] shrink-0 mt-0.5" />
              {product.quality.oekoTexStatus}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full py-3 rounded-full bg-[#141923] hover:bg-neutral-800 text-white font-semibold text-sm cursor-pointer"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

/* ---------------- SEARCH MODAL ---------------- */

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  open,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PRODUCTS.slice(0, 7);
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.style.toLowerCase().includes(q) ||
        p.season.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.quality.composition.toLowerCase().includes(q) ||
        p.quality.plant.toLowerCase().includes(q)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-[560px] bg-white rounded-[24px] shadow-2xl border border-neutral-200 overflow-hidden animate-fade-up">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar vestido, blazer, niña, niño, casaca, código TT-..."
            className="flex-1 text-[15px] text-[#141923] placeholder:text-neutral-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[380px] overflow-y-auto divide-y divide-neutral-100">
          {results.length === 0 ? (
            <p className="p-6 text-center text-sm text-neutral-500">
              No encontramos prendas para "{query}".
            </p>
          ) : (
            results.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  onClose();
                  setQuery('');
                  onNavigate({ name: 'producto', slug: p.slug });
                }}
                className="w-full px-5 py-3 flex items-center gap-3.5 hover:bg-[#FAF9F8] transition-colors text-left cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F7F6F5] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <GarmentPhoto product={p} preferFlatLay />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-display font-bold text-sm text-[#141923] truncate">
                      {p.name}
                    </p>
                    <span className="text-[10.5px] font-mono text-neutral-400 shrink-0">
                      {p.sku}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 truncate">
                    {p.subcategory} · {p.style} · Planta {p.quality.plant} ·{' '}
                    {p.quality.composition}
                  </p>
                </div>
                <span className="font-bold text-sm text-[#C8102E] shrink-0">
                  {formatPen(p.price)}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

/* ---------------- TOAST ---------------- */

export const ToastBanner: React.FC<{ message: string | null }> = ({
  message,
}) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 z-50 animate-toast">
      <div className="px-5 py-3 rounded-full bg-[#141923] text-white text-sm font-medium shadow-xl flex items-center gap-2.5 max-w-[90vw]">
        <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};
