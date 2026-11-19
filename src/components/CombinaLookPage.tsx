import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  ShoppingCart,
  Shuffle,
} from 'lucide-react';
import {
  CategoryId,
  GarmentStyle,
  OccasionId,
  PageRoute,
  Product,
  SizeCode,
} from '../types';
import {
  LOOKS,
  PRODUCTS,
  computeLookPrice,
  formatPen,
  getProductById,
} from '../data/catalog';
import { AccentStrokes, QrCodeMini, WhatsAppIcon } from './BrandIcons';
import { GarmentPhoto } from './GarmentPhoto';
import { RealModelStage, getCategoryModelPhoto } from './RealModelStage';

interface CombinaLookPageProps {
  initialCategory?: CategoryId;
  initialLookId?: string;
  onNavigate: (route: PageRoute) => void;
  onAddProduct: (product: Product, size: SizeCode, colorName: string) => void;
  onAddLook: (
    lookTitle: string,
    items: { product: Product; size: SizeCode }[],
    discountPercent: number,
    previewImage: string
  ) => void;
  onOpenQualityModal: (product: Product) => void;
  onShowToast: (msg: string) => void;
}

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'mujer', label: 'Mujer' },
  { id: 'nina', label: 'Niña' },
  { id: 'hombre', label: 'Hombre' },
  { id: 'nino', label: 'Niño' },
];

const OCCASIONS: OccasionId[] = [
  'Todas',
  'Universidad',
  'Casual',
  'Trabajo',
  'Salida',
  'Deporte',
];

const STYLES: ('Todos' | GarmentStyle)[] = [
  'Todos',
  'Casual',
  'Deportivo',
  'Formal',
];

export const CombinaLookPage: React.FC<CombinaLookPageProps> = ({
  initialCategory = 'mujer',
  initialLookId,
  onNavigate,
  onAddProduct,
  onAddLook,
  onOpenQualityModal,
  onShowToast,
}) => {
  const [category, setCategory] = useState<CategoryId>(initialCategory);
  const [occasion, setOccasion] = useState<OccasionId>('Todas');
  const [styleFilter, setStyleFilter] = useState<'Todos' | GarmentStyle>('Todos');
  const [filterSize, setFilterSize] = useState<string>('Todas');

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  const filteredLooks = useMemo(() => {
    let list = LOOKS.filter((l) => l.category === category);
    if (occasion !== 'Todas') {
      const byOcc = list.filter((l) => l.occasion === occasion);
      if (byOcc.length > 0) list = byOcc;
    }
    if (styleFilter !== 'Todos') {
      const byStyle = list.filter((l) => l.style === styleFilter);
      if (byStyle.length > 0) list = byStyle;
    }
    return list.length > 0 ? list : LOOKS.filter((l) => l.category === category);
  }, [category, occasion, styleFilter]);

  const [lookIndex, setLookIndex] = useState(0);

  useEffect(() => {
    if (initialLookId) {
      const idx = filteredLooks.findIndex((l) => l.id === initialLookId);
      if (idx >= 0) {
        setLookIndex(idx);
        return;
      }
    }
    setLookIndex(0);
  }, [category, occasion, styleFilter, initialLookId, filteredLooks]);

  const activeLook =
    filteredLooks[lookIndex % filteredLooks.length] ?? LOOKS[0];

  const topOrDressCandidates = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => p.category === category && (p.slot === 'top' || p.slot === 'dress')
      ),
    [category]
  );

  const bottomCandidates = useMemo(
    () => PRODUCTS.filter((p) => p.category === category && p.slot === 'bottom'),
    [category]
  );

  const outerwearCandidates = useMemo(
    () =>
      PRODUCTS.filter((p) => p.category === category && p.slot === 'outerwear'),
    [category]
  );

  const [topProductId, setTopProductId] = useState(activeLook.topProductId);
  const [bottomProductId, setBottomProductId] = useState(
    activeLook.bottomProductId ?? bottomCandidates[0]?.id ?? 'pantalon-wide-leg'
  );
  const [outerwearProductId, setOuterwearProductId] = useState<string | null>(
    activeLook.outerwearProductId ?? null
  );

  useEffect(() => {
    setTopProductId(activeLook.topProductId);
    setBottomProductId(
      activeLook.bottomProductId ??
        bottomCandidates[0]?.id ??
        'pantalon-wide-leg'
    );
    setOuterwearProductId(activeLook.outerwearProductId ?? null);
  }, [activeLook, bottomCandidates]);

  const topProduct = getProductById(topProductId);
  const isDressMode = topProduct.slot === 'dress';
  const bottomProduct = getProductById(bottomProductId);
  const outerwearProduct = outerwearProductId
    ? getProductById(outerwearProductId)
    : null;

  const [topColorId, setTopColorId] = useState(topProduct.defaultColorId);
  const [bottomColorId, setBottomColorId] = useState(
    bottomProduct.defaultColorId
  );
  const [outerColorId, setOuterColorId] = useState(
    outerwearProduct?.defaultColorId ?? ''
  );

  const [topSize, setTopSize] = useState<SizeCode>(
    topProduct.sizes.includes('M') ? 'M' : topProduct.sizes[0]
  );
  const [bottomSize, setBottomSize] = useState<SizeCode>(
    bottomProduct.sizes.includes('M') ? 'M' : bottomProduct.sizes[0]
  );
  const [outerSize, setOuterSize] = useState<SizeCode>('M');

  useEffect(() => {
    setTopColorId(topProduct.defaultColorId);
    setTopSize(topProduct.sizes.includes('M') ? 'M' : topProduct.sizes[0]);
  }, [topProduct]);

  useEffect(() => {
    setBottomColorId(bottomProduct.defaultColorId);
    setBottomSize(
      bottomProduct.sizes.includes('M') ? 'M' : bottomProduct.sizes[0]
    );
  }, [bottomProduct]);

  useEffect(() => {
    if (outerwearProduct) {
      setOuterColorId(outerwearProduct.defaultColorId);
      setOuterSize(
        outerwearProduct.sizes.includes('M') ? 'M' : outerwearProduct.sizes[0]
      );
    }
  }, [outerwearProduct]);

  useEffect(() => {
    if (filterSize !== 'Todas') {
      const sz = filterSize as SizeCode;
      if (topProduct.sizes.includes(sz)) setTopSize(sz);
      if (bottomProduct.sizes.includes(sz)) setBottomSize(sz);
      if (outerwearProduct && outerwearProduct.sizes.includes(sz)) {
        setOuterSize(sz);
      }
    }
  }, [filterSize, topProduct, bottomProduct, outerwearProduct]);

  const topColorObj =
    topProduct.colors.find((c) => c.id === topColorId) ?? topProduct.colors[0];
  const bottomColorObj =
    bottomProduct.colors.find((c) => c.id === bottomColorId) ??
    bottomProduct.colors[0];
  const outerColorObj = outerwearProduct
    ? outerwearProduct.colors.find((c) => c.id === outerColorId) ??
      outerwearProduct.colors[0]
    : null;

  const bundleItems = useMemo(() => {
    const items: { product: Product; size: SizeCode }[] = [
      { product: topProduct, size: topSize },
    ];
    if (!isDressMode) {
      items.push({ product: bottomProduct, size: bottomSize });
    }
    if (outerwearProduct) {
      items.push({ product: outerwearProduct, size: outerSize });
    }
    return items;
  }, [
    topProduct,
    topSize,
    isDressMode,
    bottomProduct,
    bottomSize,
    outerwearProduct,
    outerSize,
  ]);

  const stagePieces = useMemo(() => {
    const list = [
      {
        product: topProduct,
        colorHex: topColorObj.hex,
        colorName: topColorObj.name,
      },
    ];
    if (!isDressMode) {
      list.push({
        product: bottomProduct,
        colorHex: bottomColorObj.hex,
        colorName: bottomColorObj.name,
      });
    }
    if (outerwearProduct && outerColorObj) {
      list.push({
        product: outerwearProduct,
        colorHex: outerColorObj.hex,
        colorName: outerColorObj.name,
      });
    }
    return list;
  }, [
    topProduct,
    topColorObj,
    isDressMode,
    bottomProduct,
    bottomColorObj,
    outerwearProduct,
    outerColorObj,
  ]);

  const pricing = computeLookPrice(
    bundleItems.map((b) => b.product.price),
    activeLook.discountPercent
  );

  const activePhotoSrc = getCategoryModelPhoto(
    category,
    topProduct.id,
    bottomProduct.id,
    Boolean(outerwearProduct)
  );

  const cycleTop = (dir: 1 | -1) => {
    const idx = topOrDressCandidates.findIndex((p) => p.id === topProduct.id);
    const next =
      (idx + dir + topOrDressCandidates.length) % topOrDressCandidates.length;
    setTopProductId(topOrDressCandidates[next].id);
  };

  const cycleBottom = (dir: 1 | -1) => {
    const idx = bottomCandidates.findIndex((p) => p.id === bottomProduct.id);
    const next =
      (idx + dir + bottomCandidates.length) % bottomCandidates.length;
    setBottomProductId(bottomCandidates[next].id);
  };

  const cycleOuterwear = (dir: 1 | -1) => {
    if (outerwearCandidates.length === 0) return;
    if (!outerwearProduct) {
      setOuterwearProductId(outerwearCandidates[0].id);
      return;
    }
    const idx = outerwearCandidates.findIndex(
      (p) => p.id === outerwearProduct.id
    );
    const next =
      (idx + dir + outerwearCandidates.length) % outerwearCandidates.length;
    setOuterwearProductId(outerwearCandidates[next].id);
  };

  const toggleOuterwear = () => {
    if (outerwearProduct) {
      setOuterwearProductId(null);
    } else if (outerwearCandidates.length > 0) {
      setOuterwearProductId(outerwearCandidates[0].id);
    }
  };

  const handleShuffleOutfit = () => {
    if (topOrDressCandidates.length > 0) {
      const randTop =
        topOrDressCandidates[
          Math.floor(Math.random() * topOrDressCandidates.length)
        ];
      setTopProductId(randTop.id);
    }
    if (bottomCandidates.length > 0) {
      const randBot =
        bottomCandidates[Math.floor(Math.random() * bottomCandidates.length)];
      setBottomProductId(randBot.id);
    }
    if (outerwearCandidates.length > 0 && Math.random() > 0.45) {
      const randOut =
        outerwearCandidates[
          Math.floor(Math.random() * outerwearCandidates.length)
        ];
      setOuterwearProductId(randOut.id);
    } else {
      setOuterwearProductId(null);
    }
  };

  const cycleLook = (dir: 1 | -1) => {
    setLookIndex(
      (prev) => (prev + dir + filteredLooks.length) % filteredLooks.length
    );
  };

  const handleShareWhatsApp = () => {
    const lines = bundleItems
      .map(
        (b) =>
          `• ${b.product.name} (${b.product.sku}, Talla ${b.size}) — ${formatPen(b.product.price)}`
      )
      .join('\n');
    const text = `¡Mira este outfit que armé en Topitop!\n${lines}\nLook completo (-${activeLook.discountPercent}%): ${formatPen(pricing.discounted)} (ahorras ${formatPen(pricing.savings)})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    onShowToast('¡Resumen del outfit copiado para compartir por WhatsApp!');
  };

  const otherLooks = useMemo(
    () =>
      LOOKS.filter(
        (l) => l.category === category && l.id !== activeLook.id
      ).slice(0, 3),
    [category, activeLook.id]
  );

  const rightCardProduct = isDressMode
    ? outerwearProduct ?? outerwearCandidates[0] ?? bottomProduct
    : bottomProduct;
  const rightCardIsOuterwear = isDressMode && outerwearCandidates.length > 0;
  const rightCardCandidates = rightCardIsOuterwear
    ? outerwearCandidates
    : bottomCandidates;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-10 animate-fade-up">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-neutral-500 mb-4 flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onNavigate({ name: 'calidad' })}
          className="hover:text-[#C8102E] transition-colors cursor-pointer"
        >
          Inicio
        </button>
        <span>›</span>
        <span className="font-medium text-neutral-800">Combina tu look</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-display font-extrabold text-[34px] sm:text-[42px] tracking-[-0.03em] text-[#141923] leading-tight">
          Combina <span className="text-[#C8102E]">tu look</span>
        </h1>
        <p className="text-[15.5px] sm:text-[16.5px] text-neutral-600 mt-1.5">
          Mira cómo se mezcla cada prenda de Topitop por categoría antes de
          comprar.
        </p>

        {/* 4 Category Tabs: Mujer | Niña | Hombre | Niño */}
        <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 bg-[#F5F4F3] p-1.5 rounded-full border border-neutral-200/70">
          {CATEGORIES.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-[14.5px] font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#C8102E] text-white shadow-sm'
                    : 'text-neutral-700 hover:text-[#141923] hover:bg-white/70'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Bar + Shuffle Outfit */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <div className="relative bg-white border border-neutral-200 rounded-2xl px-4 py-2 flex items-center gap-3 min-w-[160px] shadow-2xs">
          <div className="flex-1">
            <label
              htmlFor="occasion-select"
              className="block text-[11px] font-medium text-neutral-500 leading-none mb-0.5"
            >
              Ocasión
            </label>
            <select
              id="occasion-select"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value as OccasionId)}
              className="w-full appearance-none bg-transparent text-[13.5px] font-semibold text-[#141923] focus:outline-none cursor-pointer pr-5"
            >
              {OCCASIONS.map((occ) => (
                <option key={occ} value={occ}>
                  {occ}
                </option>
              ))}
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative bg-white border border-neutral-200 rounded-2xl px-4 py-2 flex items-center gap-3 min-w-[150px] shadow-2xs">
          <div className="flex-1">
            <label
              htmlFor="style-select"
              className="block text-[11px] font-medium text-neutral-500 leading-none mb-0.5"
            >
              Estilo
            </label>
            <select
              id="style-select"
              value={styleFilter}
              onChange={(e) =>
                setStyleFilter(e.target.value as 'Todos' | GarmentStyle)
              }
              className="w-full appearance-none bg-transparent text-[13.5px] font-semibold text-[#141923] focus:outline-none cursor-pointer pr-5"
            >
              {STYLES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative bg-white border border-neutral-200 rounded-2xl px-4 py-2 flex items-center gap-3 min-w-[140px] shadow-2xs">
          <div className="flex-1">
            <label
              htmlFor="size-filter-select"
              className="block text-[11px] font-medium text-neutral-500 leading-none mb-0.5"
            >
              Talla
            </label>
            <select
              id="size-filter-select"
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value)}
              className="w-full appearance-none bg-transparent text-[13.5px] font-semibold text-[#141923] focus:outline-none cursor-pointer pr-5"
            >
              <option value="Todas">Todas</option>
              {topProduct.sizes.map((sz) => (
                <option key={sz} value={sz}>
                  {sz}
                </option>
              ))}
            </select>
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
        </div>

        <button
          type="button"
          onClick={handleShuffleOutfit}
          className="px-4 py-2.5 rounded-2xl bg-[#141923] hover:bg-neutral-800 text-white text-[13.5px] font-semibold inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Shuffle className="w-4 h-4" />
          Combinar al azar
        </button>
      </div>

      {/* 3-COLUMN VISUAL OUTFIT STUDIO */}
      <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT CARD: TOP GARMENT OR DRESS */}
        <div className="lg:col-span-4 order-2 lg:order-1">
          <GarmentStudioCard
            slotLabel={isDressMode ? 'Vestido completo' : 'Prenda superior'}
            product={topProduct}
            candidates={topOrDressCandidates}
            onSelectProduct={setTopProductId}
            selectedColorId={topColorId}
            onSelectColor={setTopColorId}
            selectedSize={topSize}
            onSelectSize={setTopSize}
            onPrev={() => cycleTop(-1)}
            onNext={() => cycleTop(1)}
            onOpenQuality={() => onOpenQualityModal(topProduct)}
            onOpenProduct={() =>
              onNavigate({ name: 'producto', slug: topProduct.slug })
            }
            onAddToCart={() =>
              onAddProduct(topProduct, topSize, topColorObj.name)
            }
          />
        </div>

        {/* CENTER STAGE: FULL-BODY LOOKBOOK POSE + CLEAR COMBINED GARMENTS BOARD */}
        <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col items-center">
          <div className="relative w-full max-w-[365px] flex items-center justify-center py-1">
            <div
              className="absolute inset-x-4 top-6 bottom-36 rounded-full bg-[#FCECEF]"
              aria-hidden="true"
            />
            <AccentStrokes className="w-7 h-7 absolute top-5 right-4 z-10 pointer-events-none" />

            <button
              type="button"
              onClick={() => cycleLook(-1)}
              aria-label="Look anterior"
              className="absolute left-0 top-[34%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 hover:text-[#C8102E] hover:border-[#C8102E]/40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => cycleLook(1)}
              aria-label="Siguiente look"
              className="absolute right-0 top-[34%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 hover:text-[#C8102E] hover:border-[#C8102E]/40 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <RealModelStage
              category={category}
              lookTitle={activeLook.title}
              featuredLabel={activeLook.featuredLabel}
              topProduct={topProduct}
              bottomProduct={isDressMode ? undefined : bottomProduct}
              outerwearProduct={outerwearProduct}
              pieces={stagePieces}
            />
          </div>

          {/* Outerwear Layer Quick Toggle */}
          {outerwearCandidates.length > 0 && !isDressMode && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={toggleOuterwear}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                  outerwearProduct
                    ? 'bg-[#141923] text-white border-[#141923]'
                    : 'bg-white text-neutral-700 border-neutral-300 hover:border-[#C8102E]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                {outerwearProduct
                  ? `Quitar ${outerwearProduct.name}`
                  : '+ Agregar casaca / blazer'}
              </button>
              {outerwearProduct && outerwearCandidates.length > 1 && (
                <button
                  type="button"
                  onClick={() => cycleOuterwear(1)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F5F4F3] hover:bg-neutral-200 text-neutral-700 cursor-pointer"
                >
                  Cambiar capa →
                </button>
              )}
            </div>
          )}

          {/* Complete Look CTA + WhatsApp */}
          <div className="w-full max-w-[400px] mt-4 space-y-2.5">
            <button
              type="button"
              onClick={() =>
                onAddLook(
                  activeLook.title,
                  bundleItems,
                  activeLook.discountPercent,
                  activePhotoSrc
                )
              }
              className="w-full px-5 py-3.5 rounded-full bg-[#C8102E] hover:bg-[#A50C24] text-white shadow-[0_10px_26px_rgba(200,16,46,0.32)] transition-all cursor-pointer active:scale-[0.99] flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1"
            >
              <span className="inline-flex items-center gap-2 font-bold text-[15px]">
                <ShoppingCart className="w-4 h-4" />
                Comprar el look completo
              </span>
              <span className="opacity-50">|</span>
              <span className="font-extrabold text-[15.5px]">
                {formatPen(pricing.discounted)}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-[#C8102E] text-[11px] font-extrabold tracking-tight">
                -{activeLook.discountPercent}% por llevar el look
              </span>
            </button>

            <p className="text-center text-[12px] text-neutral-500">
              {bundleItems.length} prenda{bundleItems.length > 1 ? 's' : ''} ·
              Individual:{' '}
              <span className="line-through">{formatPen(pricing.original)}</span>{' '}
              · Ahorras{' '}
              <strong className="text-[#16A34A] font-semibold">
                {formatPen(pricing.savings)}
              </strong>
            </p>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full px-5 py-2.5 rounded-full bg-white hover:bg-[#F0FDF4] border-2 border-[#22C55E] text-[#15803D] font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5 text-[#22C55E]" />
              Compartir look por WhatsApp
            </button>
          </div>
        </div>

        {/* RIGHT CARD: BOTTOM GARMENT OR OUTERWEAR FOR DRESSES */}
        <div className="lg:col-span-4 order-3">
          <GarmentStudioCard
            slotLabel={
              rightCardIsOuterwear
                ? 'Capa exterior (casaca / blazer)'
                : 'Prenda inferior'
            }
            product={rightCardProduct}
            candidates={rightCardCandidates}
            onSelectProduct={(id) => {
              if (rightCardIsOuterwear) {
                setOuterwearProductId(id);
              } else {
                setBottomProductId(id);
              }
            }}
            selectedColorId={
              rightCardIsOuterwear
                ? outerColorId || rightCardProduct.defaultColorId
                : bottomColorId
            }
            onSelectColor={(id) => {
              if (rightCardIsOuterwear) {
                setOuterColorId(id);
                setOuterwearProductId(rightCardProduct.id);
              } else {
                setBottomColorId(id);
              }
            }}
            selectedSize={rightCardIsOuterwear ? outerSize : bottomSize}
            onSelectSize={rightCardIsOuterwear ? setOuterSize : setBottomSize}
            onPrev={() =>
              rightCardIsOuterwear ? cycleOuterwear(-1) : cycleBottom(-1)
            }
            onNext={() =>
              rightCardIsOuterwear ? cycleOuterwear(1) : cycleBottom(1)
            }
            onOpenQuality={() => onOpenQualityModal(rightCardProduct)}
            onOpenProduct={() =>
              onNavigate({ name: 'producto', slug: rightCardProduct.slug })
            }
            onAddToCart={() => {
              const colorObj =
                rightCardProduct.colors.find(
                  (c) =>
                    c.id ===
                    (rightCardIsOuterwear ? outerColorId : bottomColorId)
                ) ?? rightCardProduct.colors[0];
              onAddProduct(
                rightCardProduct,
                rightCardIsOuterwear ? outerSize : bottomSize,
                colorObj.name
              );
            }}
          />
        </div>
      </div>

      {/* OTRAS COMBINACIONES */}
      <section className="mt-14 pt-8 border-t border-neutral-200/70">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-extrabold text-[22px] sm:text-[26px] tracking-[-0.02em] text-[#141923]">
            Otras <span className="text-[#C8102E]">combinaciones</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {otherLooks.map((look) => {
            const top = getProductById(look.topProductId);
            const bottom = look.bottomProductId
              ? getProductById(look.bottomProductId)
              : null;
            const outer = look.outerwearProductId
              ? getProductById(look.outerwearProductId)
              : null;
            const secondary = bottom ?? outer;
            const pieces = [top, ...(secondary ? [secondary] : [])];
            const lookPrice = computeLookPrice(
              pieces.map((p) => p.price),
              look.discountPercent
            );
            const cardPhoto = getCategoryModelPhoto(
              look.category,
              look.topProductId,
              look.bottomProductId,
              Boolean(look.outerwearProductId)
            );

            return (
              <div
                key={look.id}
                onClick={() => {
                  setTopProductId(look.topProductId);
                  if (look.bottomProductId) {
                    setBottomProductId(look.bottomProductId);
                  }
                  setOuterwearProductId(look.outerwearProductId ?? null);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setTopProductId(look.topProductId);
                    if (look.bottomProductId) {
                      setBottomProductId(look.bottomProductId);
                    }
                    setOuterwearProductId(look.outerwearProductId ?? null);
                  }
                }}
                className="group bg-white rounded-2xl p-4 border border-neutral-200/80 hover:border-[#C8102E]/40 shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <div className="grid grid-cols-12 gap-3 mb-3.5">
                  <div className="col-span-7 aspect-[4/5] rounded-xl overflow-hidden bg-[#F5F3F1]">
                    <img
                      src={cardPhoto}
                      alt={look.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="col-span-5 flex flex-col gap-2">
                    <div className="flex-1 rounded-xl bg-[#FAFAFA] border border-neutral-100 p-1.5 flex items-center justify-center overflow-hidden">
                      <GarmentPhoto product={top} preferFlatLay />
                    </div>
                    {secondary && (
                      <div className="flex-1 rounded-xl bg-[#FAFAFA] border border-neutral-100 p-1.5 flex items-center justify-center overflow-hidden">
                        <GarmentPhoto product={secondary} preferFlatLay />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <div>
                    <span className="text-[10.5px] font-semibold uppercase tracking-wide text-neutral-400">
                      {look.style} · {look.occasion}
                    </span>
                    <h3 className="font-display font-bold text-[15px] text-[#141923] group-hover:text-[#C8102E] transition-colors">
                      {look.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-bold text-[15px] text-[#141923]">
                        {formatPen(lookPrice.discounted)}
                      </span>
                      <span className="text-[12px] text-neutral-400 line-through">
                        {formatPen(lookPrice.original)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    aria-label={`Agregar ${look.title} al carrito`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddLook(
                        look.title,
                        pieces.map((p) => ({
                          product: p,
                          size: p.sizes.includes('M') ? 'M' : p.sizes[0],
                        })),
                        look.discountPercent,
                        cardPhoto
                      );
                    }}
                    className="w-11 h-9 rounded-full bg-[#C8102E] hover:bg-[#A50C24] text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

interface GarmentStudioCardProps {
  slotLabel: string;
  product: Product;
  candidates: Product[];
  onSelectProduct: (id: string) => void;
  selectedColorId: string;
  onSelectColor: (id: string) => void;
  selectedSize: SizeCode;
  onSelectSize: (size: SizeCode) => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenQuality: () => void;
  onOpenProduct: () => void;
  onAddToCart: () => void;
}

const GarmentStudioCard: React.FC<GarmentStudioCardProps> = ({
  slotLabel,
  product,
  candidates,
  onSelectProduct,
  selectedColorId,
  onSelectColor,
  selectedSize,
  onSelectSize,
  onPrev,
  onNext,
  onOpenQuality,
  onOpenProduct,
  onAddToCart,
}) => {
  const stock = product.stockBySize[selectedSize] ?? 3;
  const canCycle = candidates.length > 1;

  return (
    <div className="bg-white rounded-[24px] p-5 border border-neutral-200/80 shadow-[0_8px_28px_rgba(20,25,35,0.05)] flex flex-col">
      <div className="flex items-start justify-between gap-2 mb-1">
        <div>
          <span className="inline-block text-[10.5px] font-bold uppercase tracking-wider text-neutral-500">
            {slotLabel}
          </span>
          <span className="block text-[11px] font-mono text-neutral-400">
            Ref. {product.sku}
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenQuality}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#FAF9F8] hover:bg-[#FDF2F4] border border-neutral-200 hover:border-[#C8102E]/35 text-[11px] font-semibold text-neutral-700 hover:text-[#C8102E] transition-colors cursor-pointer"
        >
          <QrCodeMini className="w-5 h-5 text-[#141923]" />
          <span className="leading-tight text-left">
            Ficha y
            <br />
            QR
          </span>
        </button>
      </div>

      {/* Main Real Studio Garment Photo + Prev/Next */}
      <div className="relative h-[205px] flex items-center justify-center my-1">
        {canCycle && (
          <>
            <button
              type="button"
              onClick={onPrev}
              aria-label="Prenda anterior"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-[#C8102E] hover:border-[#C8102E]/40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Siguiente prenda"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-[#C8102E] hover:border-[#C8102E]/40 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={onOpenProduct}
          className="h-full w-full px-9 flex items-center justify-center cursor-pointer group"
          title="Ver ficha completa de transparencia y trazabilidad"
        >
          <GarmentPhoto
            product={product}
            preferFlatLay
            className="max-h-[195px] w-auto group-hover:scale-105 transition-transform duration-300"
          />
        </button>
      </div>

      {/* 1-Click Photographic Garment Selector Strip */}
      {candidates.length > 1 && (
        <div className="mt-1 mb-2.5 flex items-center gap-2 overflow-x-auto pb-1">
          {candidates.map((cand) => {
            const selected = cand.id === product.id;
            return (
              <button
                key={cand.id}
                type="button"
                onClick={() => onSelectProduct(cand.id)}
                title={cand.name}
                className={`w-12 h-12 rounded-xl bg-[#FAF9F8] p-1 border-2 shrink-0 flex items-center justify-center transition-all cursor-pointer ${
                  selected
                    ? 'border-[#C8102E] shadow-xs bg-white'
                    : 'border-neutral-200 hover:border-neutral-400 opacity-80 hover:opacity-100'
                }`}
              >
                <GarmentPhoto
                  product={cand}
                  preferFlatLay
                  className="max-w-full max-h-full"
                />
              </button>
            );
          })}
        </div>
      )}

      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-[#F5F4F3] text-neutral-600">
            {product.style}
          </span>
          <span className="text-[10.5px] font-medium text-neutral-500">
            {product.quality.composition}
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenProduct}
          className="text-left font-display font-bold text-[17px] text-[#141923] hover:text-[#C8102E] transition-colors cursor-pointer"
        >
          {product.name}
        </button>
        <p className="font-display font-extrabold text-[19px] text-[#141923] mt-0.5">
          {formatPen(product.price)}
        </p>
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        {product.colors.map((c) => {
          const active = c.id === selectedColorId;
          return (
            <button
              key={c.id}
              type="button"
              title={c.name}
              onClick={() => onSelectColor(c.id)}
              className={`w-6 h-6 rounded-full transition-all cursor-pointer ${
                active
                  ? 'ring-2 ring-offset-2 ring-[#C8102E] scale-105'
                  : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: c.hex,
                border: `1px solid ${c.border ?? 'rgba(0,0,0,0.12)'}`,
              }}
              aria-label={`Color ${c.name}`}
            />
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-neutral-100 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-neutral-600">
              Talla:
            </span>
            <div className="relative">
              <select
                value={selectedSize}
                onChange={(e) => onSelectSize(e.target.value as SizeCode)}
                className="appearance-none bg-[#FAF9F8] border border-neutral-200 rounded-lg pl-3 pr-7 py-1 text-[13.5px] font-bold text-[#141923] focus:outline-none focus:border-[#C8102E] cursor-pointer"
              >
                {product.sizes.map((sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-neutral-500 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenProduct}
            className="text-[12px] font-semibold text-[#C8102E] hover:underline cursor-pointer"
          >
            Ver trazabilidad
          </button>
        </div>

        <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#15803D]">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] inline-block" />
          Talla {selectedSize}: {stock} disponibles
        </div>
      </div>

      <button
        type="button"
        onClick={onAddToCart}
        className="mt-4 w-full py-2.5 px-4 rounded-full bg-[#C8102E] hover:bg-[#A50C24] text-white font-semibold text-[14.5px] inline-flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-[0.98]"
      >
        <ShoppingCart className="w-4 h-4" />
        Agregar al carrito
      </button>
    </div>
  );
};
