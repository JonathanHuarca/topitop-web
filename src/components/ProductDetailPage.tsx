import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Factory,
  Globe2,
  Info,
  MapPin,
  QrCode,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';
import { PageRoute, Product, SizeCode } from '../types';
import { PRODUCTS, formatPen, getProductBySlug } from '../data/catalog';
import {
  CareWashIcon,
  FabricLayersIcon,
  FactoryIcon,
  OekoTexBadge,
  PeruFlagBadge,
} from './BrandIcons';
import { GarmentPhoto } from './GarmentPhoto';
import { ProductQrCode, buildProductQrUrl } from './ProductQrCode';

interface ProductDetailPageProps {
  slug: string;
  fromQr?: boolean;
  onNavigate: (route: PageRoute) => void;
  onAddProduct: (product: Product, size: SizeCode, colorName: string) => void;
  onOpenCertModal: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

const CATEGORY_LABELS = {
  mujer: 'Mujer',
  nina: 'Niña',
  hombre: 'Hombre',
  nino: 'Niño',
};

const BAR_COLORS = ['#C8102E', '#24344D', '#009677', '#D49B35'];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug,
  fromQr = false,
  onNavigate,
  onAddProduct,
  onOpenCertModal,
  onShowToast,
}) => {
  const product = getProductBySlug(slug);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColorId, setSelectedColorId] = useState(product.defaultColorId);
  const [selectedSize, setSelectedSize] = useState<SizeCode>(
    product.sizes.includes('M') ? 'M' : product.sizes[0]
  );
  const [mobileFichaOpen, setMobileFichaOpen] = useState(true);

  useEffect(() => {
    setActiveImgIdx(0);
    setSelectedColorId(product.defaultColorId);
    setSelectedSize(product.sizes.includes('M') ? 'M' : product.sizes[0]);
  }, [product]);

  useEffect(() => {
    if (fromQr) {
      const el = document.getElementById('ficha-transparencia');
      if (el) {
        setTimeout(
          () => el.scrollIntoView({ behavior: 'smooth', block: 'start' }),
          150
        );
      }
    }
  }, [fromQr, slug]);

  const activeColor =
    product.colors.find((c) => c.id === selectedColorId) ?? product.colors[0];
  const currentStock = product.stockBySize[selectedSize] ?? 3;
  const gallery =
    product.images.length > 0 ? product.images : [product.flatLayImage];

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  const navCatalogCategory =
    product.category === 'nino' || product.category === 'nina'
      ? 'ninos'
      : product.category;

  const qrUrl = buildProductQrUrl(product.slug);

  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12 animate-fade-up">
      {fromQr && (
        <div className="mb-5 px-4 py-3 rounded-2xl bg-[#F0FDF9] border border-[#009677]/30 flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2.5 text-[#0F5132]">
            <QrCode className="w-5 h-5 text-[#009677] shrink-0" />
            <span>
              Llegaste desde el <strong>código QR vinculado</strong> a la
              referencia <strong className="font-mono">{product.sku}</strong>.
              Aquí tienes la ficha completa de composición, fabricación y
              trazabilidad.
            </span>
          </div>
          <a
            href="#ficha-transparencia"
            className="text-xs font-bold text-[#009677] hover:underline"
          >
            Ir a trazabilidad ↓
          </a>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="text-[13px] text-neutral-500 mb-6 flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => onNavigate({ name: 'calidad' })}
          className="hover:text-[#C8102E] transition-colors cursor-pointer"
        >
          Inicio
        </button>
        <span>›</span>
        <button
          type="button"
          onClick={() =>
            onNavigate({
              name: 'categoria',
              category: navCatalogCategory,
              kidSub:
                product.category === 'nino' || product.category === 'nina'
                  ? product.category
                  : undefined,
            })
          }
          className="hover:text-[#C8102E] transition-colors cursor-pointer"
        >
          {CATEGORY_LABELS[product.category]}
        </button>
        <span>›</span>
        <span>{product.subcategory}</span>
        <span>›</span>
        <span className="font-semibold text-neutral-800">{product.name}</span>
      </nav>

      {/* MAIN PRODUCT SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="md:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {gallery.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
              {gallery.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setActiveImgIdx(i)}
                  className={`w-[72px] sm:w-[82px] aspect-[3/4] rounded-xl overflow-hidden bg-[#F7F6F5] border-2 shrink-0 transition-all cursor-pointer ${
                    activeImgIdx === i
                      ? 'border-[#C8102E] shadow-xs'
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} vista ${i + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 aspect-[4/4.2] rounded-[24px] overflow-hidden bg-[#FAF9F8] border border-neutral-200/70 flex items-center justify-center relative p-4">
            <img
              src={gallery[activeImgIdx] ?? gallery[0]}
              alt={product.name}
              className="w-full h-full object-contain garment-blend rounded-xl"
            />
            <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11.5px] font-bold text-[#141923] border border-neutral-200/70 shadow-2xs">
              {product.style} · {product.season}
            </span>
          </div>
        </div>

        <div className="md:col-span-5 space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500 mb-1.5">
              <span className="font-mono font-semibold bg-[#F5F4F3] text-[#141923] px-2.5 py-0.5 rounded-md">
                Ref. {product.sku}
              </span>
              <span>·</span>
              <span>{product.subcategory}</span>
            </div>
            <h1 className="font-display font-extrabold text-[28px] sm:text-[32px] tracking-[-0.025em] text-[#141923] leading-tight">
              {product.name}
            </h1>
            <p className="text-[13.5px] text-neutral-600 mt-1">
              <strong>Modelo y diseño:</strong> {product.modelDesign}
            </p>
            <p className="font-display font-extrabold text-[26px] text-[#141923] mt-2">
              {formatPen(product.price)}
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="text-[14px] text-neutral-600">
              Color:{' '}
              <strong className="font-semibold text-[#141923]">
                {activeColor.name}
              </strong>
            </p>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => {
                const selected = c.id === selectedColorId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColorId(c.id)}
                    title={c.name}
                    aria-label={`Color ${c.name}`}
                    className={`w-8 h-8 rounded-full transition-all cursor-pointer ${
                      selected
                        ? 'ring-2 ring-offset-2 ring-[#C8102E] scale-105'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: c.hex,
                      border: `1px solid ${c.border ?? 'rgba(0,0,0,0.14)'}`,
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-medium text-neutral-700">Talla:</p>
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#15803D]">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                Talla {selectedSize}: {currentStock} disponibles
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((sz) => {
                const active = sz === selectedSize;
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[50px] h-[44px] px-3 rounded-xl font-bold text-[15px] border transition-all cursor-pointer ${
                      active
                        ? 'border-[#141923] bg-[#141923] text-white shadow-xs'
                        : 'border-neutral-300 bg-white text-[#141923] hover:border-[#C8102E]'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-1 space-y-3">
            <button
              type="button"
              onClick={() => onAddProduct(product, selectedSize, activeColor.name)}
              className="w-full py-4 px-6 rounded-full bg-[#C8102E] hover:bg-[#A50C24] text-white font-bold text-[16px] inline-flex items-center justify-center gap-2.5 shadow-[0_10px_24px_rgba(200,16,46,0.28)] transition-all cursor-pointer active:scale-[0.99]"
            >
              <ShoppingCart className="w-5 h-5" />
              Agregar al carrito
            </button>

            <button
              type="button"
              onClick={() =>
                onNavigate({
                  name: 'combina',
                  category: product.category,
                })
              }
              className="w-full py-3 px-5 rounded-full bg-[#FDF2F4] hover:bg-[#FCE4E9] text-[#C8102E] font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Combinar en Combina tu look (-10% look completo)
            </button>
          </div>

          <p className="text-[14px] text-neutral-600 leading-relaxed">
            {product.description}
          </p>

          {/* Mobile Accordion */}
          <div className="md:hidden border border-neutral-200 rounded-2xl overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setMobileFichaOpen((v) => !v)}
              className="w-full px-4 py-3.5 flex items-center justify-between font-display font-bold text-[16px] text-[#141923] bg-[#FAF9F8]"
            >
              <span>Ficha de calidad y transparencia</span>
              {mobileFichaOpen ? (
                <ChevronUp className="w-5 h-5 text-neutral-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-neutral-600" />
              )}
            </button>
            {mobileFichaOpen && (
              <div className="p-4 space-y-3 text-sm">
                <p>
                  <strong>Referencia:</strong>{' '}
                  <span className="font-mono">{product.sku}</span>
                </p>
                <p>
                  <strong>País de origen:</strong> {product.quality.originCountry}
                </p>
                <p>
                  <strong>Confección:</strong> {product.quality.plantDetail}
                </p>
                <p>
                  <strong>Composición:</strong> {product.quality.composition}
                </p>
                <p>
                  <strong>Procedencia de materias primas:</strong>{' '}
                  {product.quality.rawMaterialsOrigin}
                </p>
                <p>
                  <strong>Cuidados:</strong> {product.quality.care}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DIRECT WEB TRANSPARENCY, COMPOSITION & TRACEABILITY */}
      <section id="ficha-transparencia" className="mt-12 space-y-6">
        <div className="bg-white rounded-[24px] p-6 lg:p-7 border border-neutral-200/90 shadow-[0_8px_28px_rgba(20,25,35,0.05)]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
            <div>
              <h2 className="font-display font-extrabold text-[22px] sm:text-[24px] text-[#141923]">
                Ficha de calidad, transparencia y trazabilidad
              </h2>
              <p className="text-[13.5px] text-neutral-500 mt-0.5">
                Acceso directo en la web sin necesidad de escanear QR · Ref.{' '}
                <strong className="font-mono text-[#141923]">
                  {product.sku}
                </strong>
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] bg-[#F0FDF4] border border-[#22C55E]/25 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              Datos verificables y transparentes
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x divide-neutral-200/80 text-center pb-6 border-b border-neutral-200/70">
            <div className="px-3 flex flex-col items-center gap-2">
              <PeruFlagBadge className="w-9 h-9" />
              <div className="leading-snug">
                <p className="font-semibold text-[13.5px] text-[#141923]">
                  País de origen
                </p>
                <p className="text-[13px] text-neutral-600">
                  {product.quality.originCountry}
                </p>
              </div>
            </div>

            <div className="px-3 flex flex-col items-center gap-2">
              <FactoryIcon className="w-9 h-9" />
              <div className="leading-snug">
                <p className="font-semibold text-[13.5px] text-[#141923]">
                  Confección
                </p>
                <p className="text-[13px] text-neutral-600">
                  Planta {product.quality.plant}
                </p>
              </div>
            </div>

            <div className="px-3 flex flex-col items-center gap-2">
              <FabricLayersIcon className="w-9 h-9" />
              <div className="leading-snug">
                <p className="font-semibold text-[13.5px] text-[#141923]">
                  Composición
                </p>
                <p className="text-[13px] text-neutral-600">
                  {product.quality.composition}
                </p>
              </div>
            </div>

            <div className="px-3 flex flex-col items-center gap-2">
              <CareWashIcon className="w-9 h-9" />
              <div className="leading-snug">
                <p className="font-semibold text-[13.5px] text-[#141923]">
                  Cuidados
                </p>
                <p className="text-[12.5px] text-neutral-600">
                  {product.quality.care}
                </p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 px-3 flex flex-col items-center gap-1.5">
              {product.quality.hasOekoTex ? (
                <>
                  <OekoTexBadge />
                  <p className="font-semibold text-[13px] text-[#141923]">
                    Certificación Oeko-Tex
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenCertModal(product)}
                    className="inline-flex items-center gap-1 text-[12.5px] font-bold text-[#C8102E] hover:underline cursor-pointer"
                  >
                    Ver detalle <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <>
                  <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-600 text-[11px] font-bold">
                    SIN SELLO DECLARADO
                  </span>
                  <p className="text-[12px] text-neutral-500">
                    Certificación Oeko-Tex no registrada para esta referencia.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-5">
              <div className="bg-[#FAF9F8] rounded-2xl p-4 sm:p-5 border border-neutral-200/70">
                <h3 className="font-display font-bold text-[15.5px] text-[#141923] mb-3">
                  Materiales y porcentajes de composición textil
                </h3>
                <div className="w-full h-3 rounded-full overflow-hidden flex bg-neutral-200 mb-3">
                  {product.quality.materials.map((m, idx) => (
                    <div
                      key={m.name}
                      style={{
                        width: `${m.percentage}%`,
                        backgroundColor: BAR_COLORS[idx % BAR_COLORS.length],
                      }}
                      title={`${m.percentage}% ${m.name}`}
                    />
                  ))}
                </div>
                <div className="space-y-2">
                  {product.quality.materials.map((m, idx) => (
                    <div
                      key={m.name}
                      className="flex flex-wrap items-center justify-between gap-2 text-[13.5px]"
                    >
                      <span className="inline-flex items-center gap-2 font-semibold text-[#141923]">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{
                            backgroundColor:
                              BAR_COLORS[idx % BAR_COLORS.length],
                          }}
                        />
                        {m.percentage}% {m.name}
                      </span>
                      <span className="text-neutral-600 text-[12.5px]">
                        Procedencia: {m.origin}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[13.5px]">
                <div className="rounded-2xl p-4 border border-neutral-200/80 bg-white space-y-1">
                  <p className="font-bold text-[#141923] flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#C8102E]" />
                    Procedencia de materias primas
                  </p>
                  <p className="text-neutral-600 leading-relaxed">
                    {product.quality.rawMaterialsOrigin}
                  </p>
                </div>

                <div className="rounded-2xl p-4 border border-neutral-200/80 bg-white space-y-1">
                  <p className="font-bold text-[#141923] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C8102E]" />
                    Lugar donde se confeccionó
                  </p>
                  <p className="text-neutral-600 leading-relaxed">
                    {product.quality.plantDetail}
                  </p>
                </div>

                <div className="rounded-2xl p-4 border border-neutral-200/80 bg-white space-y-1">
                  <p className="font-bold text-[#141923] flex items-center gap-2">
                    <Factory className="w-4 h-4 text-[#C8102E]" />
                    Proceso de fabricación
                  </p>
                  <p className="text-neutral-600 leading-relaxed">
                    {product.quality.manufacturingProcess}
                  </p>
                </div>

                <div className="rounded-2xl p-4 border border-neutral-200/80 bg-white space-y-1">
                  <p className="font-bold text-[#141923] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#C8102E]" />
                    Información de proveedores
                  </p>
                  <p className="text-neutral-600 leading-relaxed">
                    {product.quality.supplierInfo}
                  </p>
                </div>

                <div className="sm:col-span-2 rounded-2xl p-4 border border-neutral-200/80 bg-white space-y-1">
                  <p className="font-bold text-[#141923] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#009677]" />
                    Condiciones de producción y certificaciones
                  </p>
                  <p className="text-neutral-600 leading-relaxed">
                    {product.quality.productionConditions}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#FAF8F7] rounded-2xl p-5 border border-neutral-200/80 flex flex-col items-center text-center justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#C8102E] bg-[#FDF2F4] px-2.5 py-1 rounded-full mb-2">
                  <QrCode className="w-3.5 h-3.5" />
                  QR complementario
                </span>
                <h3 className="font-display font-bold text-[16px] text-[#141923]">
                  Código QR de esta prenda
                </h3>
                <p className="text-[12.5px] text-neutral-600 mt-1">
                  Vinculado exclusivamente a{' '}
                  <strong className="font-mono text-[#141923]">
                    {product.sku}
                  </strong>
                  . Al escanearlo redirige directo a esta ficha.
                </p>
              </div>

              <ProductQrCode slug={product.slug} sku={product.sku} size={136} />

              <div className="w-full space-y-2">
                <p className="text-[11px] font-mono text-neutral-500 truncate px-2">
                  {qrUrl}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(qrUrl).catch(() => {});
                    }
                    onShowToast(`Enlace QR de ${product.sku} copiado`);
                  }}
                  className="w-full py-2 px-4 rounded-full bg-white hover:bg-neutral-100 border border-neutral-300 text-xs font-bold text-[#141923] transition-colors cursor-pointer"
                >
                  Copiar enlace QR de esta prenda
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200/80">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <div>
                <h3 className="font-display font-extrabold text-[19px] text-[#141923]">
                  Trazabilidad del producto: recorrido paso a paso
                </h3>
                <p className="text-[13px] text-neutral-500">
                  Desde la procedencia de sus materiales hasta el punto de venta.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11.5px] text-neutral-500">
                <Info className="w-3.5 h-3.5 text-[#C8102E]" />
                Cuando un dato no está disponible, se indica expresamente.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {product.quality.traceability.map((step, idx) => (
                <div
                  key={step.stage}
                  className="relative bg-[#FAF9F8] rounded-2xl p-4 border border-neutral-200/80 flex flex-col justify-between gap-2.5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="w-7 h-7 rounded-full bg-[#C8102E] text-white font-display font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      {step.verified ? (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Declarado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          <AlertCircle className="w-3 h-3" />
                          Dato parcial
                        </span>
                      )}
                    </div>
                    <h4 className="font-display font-bold text-[14px] text-[#141923]">
                      {step.stage.replace(/^\d+\.\s*/, '')}
                    </h4>
                    <p className="text-[12.5px] font-semibold text-[#C8102E] mt-0.5">
                      {step.location}
                    </p>
                    <p className="text-[12.5px] text-neutral-600 mt-1.5 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-14 pt-8 border-t border-neutral-200/70">
          <h3 className="font-display font-extrabold text-[22px] text-[#141923] mb-5">
            También te puede gustar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedProducts.map((rel) => (
              <button
                key={rel.id}
                type="button"
                onClick={() => onNavigate({ name: 'producto', slug: rel.slug })}
                className="group text-left bg-white rounded-2xl p-4 border border-neutral-200/80 hover:border-[#C8102E]/40 shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <div className="aspect-[4/4] rounded-xl bg-[#F8F7F6] p-4 flex items-center justify-center overflow-hidden mb-3">
                  <GarmentPhoto product={rel} preferFlatLay />
                </div>
                <span className="text-[11px] font-mono text-neutral-400">
                  {rel.sku}
                </span>
                <p className="font-display font-bold text-[15px] text-[#141923] group-hover:text-[#C8102E]">
                  {rel.name}
                </p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-bold text-[15px] text-[#141923]">
                    {formatPen(rel.price)}
                  </span>
                  <span className="text-[11.5px] font-medium text-[#009677]">
                    Planta {rel.quality.plant}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
