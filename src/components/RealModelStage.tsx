import React, { useEffect, useState } from 'react';
import { Eye, Layers, Plus, Sparkles } from 'lucide-react';
import { CategoryId, Product } from '../types';
import { formatPen } from '../data/catalog';
import { GarmentPhoto } from './GarmentPhoto';

const CATEGORY_LABEL: Record<CategoryId, string> = {
  mujer: 'Mujer',
  nina: 'Niña',
  hombre: 'Hombre',
  nino: 'Niño',
};

const CATEGORY_AVATAR: Record<CategoryId, string> = {
  mujer: 'images/hero-model-blusa.jpg',
  nina: 'images/looks/nina-broderie.jpg',
  hombre: 'images/model-hombre-look.jpg',
  nino: 'images/looks/nino-parque.jpg',
};

/**
 * Returns a real full-body photograph ONLY when the model is genuinely
 * photographed wearing that exact outfit combination (never pasting flat-lay stickers on a person).
 */
export function getExactPhotographedLook(
  category: CategoryId,
  topProductId?: string,
  bottomProductId?: string,
  outerwearProductId?: string | null
): string | null {
  const outId = outerwearProductId || null;

  /* MUJER (11 looks reales de estudio en modelo — 100% combinaciones base + capas curadas) */
  if (category === 'mujer') {
    if (!outId && topProductId === 'blusa-manga-abullonada') {
      if (bottomProductId === 'pantalon-wide-leg') {
        return 'images/model-look-universidad.jpg';
      }
      if (bottomProductId === 'pantalon-sastre-negro') {
        return 'images/model-look-trabajo.jpg';
      }
      if (bottomProductId === 'jean-straight-celeste') {
        return 'images/model-look-salida.jpg';
      }
      if (bottomProductId === 'falda-midi-plisada') {
        return 'images/looks/mujer-blusa-falda.jpg';
      }
    }
    if (!outId && topProductId === 'camisa-lino-mujer') {
      if (bottomProductId === 'pantalon-wide-leg') {
        return 'images/looks/mujer-camisa-wideleg.jpg';
      }
      if (bottomProductId === 'pantalon-sastre-negro') {
        return 'images/looks/mujer-camisa-sastre.jpg';
      }
      if (bottomProductId === 'jean-straight-celeste') {
        return 'images/looks/mujer-camisa-jean.jpg';
      }
      if (bottomProductId === 'falda-midi-plisada') {
        return 'images/looks/mujer-falda.jpg';
      }
    }
    if (
      topProductId === 'camisa-lino-mujer' &&
      bottomProductId === 'pantalon-sastre-negro' &&
      outId === 'blazer-estructurado-mujer'
    ) {
      return 'images/looks/mujer-ejecutivo.jpg';
    }
    if (topProductId === 'vestido-midi-camisero') {
      if (outId === 'casaca-denim-mujer') {
        return 'images/looks/mujer-vestido.jpg';
      }
      if (!outId) {
        return 'images/looks/mujer-vestido-solo.jpg';
      }
    }
  }

  /* HOMBRE (9 looks reales de estudio en modelo — 100% combinaciones base + bomber curado) */
  if (category === 'hombre') {
    if (!outId && topProductId === 'camisa-casual-algodon') {
      if (bottomProductId === 'pantalon-chino-hombre') {
        return 'images/model-hombre-look.jpg';
      }
      if (bottomProductId === 'pantalon-sastre-hombre') {
        return 'images/looks/hombre-formal.jpg';
      }
      if (bottomProductId === 'jean-straight-hombre') {
        return 'images/looks/hombre-camisa-jean.jpg';
      }
      if (bottomProductId === 'jogger-deportivo-hombre') {
        return 'images/looks/hombre-camisa-jogger.jpg';
      }
    }
    if (!outId && topProductId === 'polo-pima-hombre') {
      if (bottomProductId === 'pantalon-chino-hombre') {
        return 'images/looks/hombre-polo-chino.jpg';
      }
      if (bottomProductId === 'pantalon-sastre-hombre') {
        return 'images/looks/hombre-polo-sastre.jpg';
      }
      if (bottomProductId === 'jean-straight-hombre') {
        return 'images/looks/hombre-polo-jean.jpg';
      }
      if (bottomProductId === 'jogger-deportivo-hombre') {
        return 'images/looks/hombre-deportivo.jpg';
      }
    }
    if (
      topProductId === 'polo-pima-hombre' &&
      bottomProductId === 'jean-straight-hombre' &&
      outId === 'chaqueta-bomber-hombre'
    ) {
      return 'images/looks/hombre-bomber.jpg';
    }
  }

  /* NIÑA (6 looks reales de estudio en modelo — 100% combinaciones base + casaca denim curada) */
  if (category === 'nina') {
    if (!outId && topProductId === 'blusa-broderie-nina') {
      if (bottomProductId === 'falda-denim-nina') {
        return 'images/looks/nina-broderie.jpg';
      }
      if (bottomProductId === 'jogger-suave-nina') {
        return 'images/looks/nina-deportivo.jpg';
      }
    }
    if (!outId && topProductId === 'blusa-celeste-nina') {
      if (bottomProductId === 'falda-denim-nina') {
        return 'images/looks/nina-celeste.jpg';
      }
      if (bottomProductId === 'jogger-suave-nina') {
        return 'images/looks/nina-celeste-jogger.jpg';
      }
    }
    if (topProductId === 'vestido-vuelo-nina') {
      if (outId === 'casaca-denim-nina') {
        return 'images/looks/nina-vestido.jpg';
      }
      if (!outId) {
        return 'images/looks/nina-vestido-solo.jpg';
      }
    }
  }

  /* NIÑO (10 looks reales de estudio en modelo — 100% combinaciones base + bomber curado) */
  if (category === 'nino') {
    if (!outId && topProductId === 'polo-rayas-ninos') {
      if (bottomProductId === 'short-chino-nino') {
        return 'images/looks/nino-parque.jpg';
      }
      if (bottomProductId === 'jean-comodo-ninos') {
        return 'images/looks/nino-rayas-jean.jpg';
      }
      if (bottomProductId === 'jogger-deportivo-nino') {
        return 'images/looks/nino-rayas-jogger.jpg';
      }
    }
    if (!outId && topProductId === 'camisa-cuadros-nino') {
      if (bottomProductId === 'short-chino-nino') {
        return 'images/looks/nino-cuadros-short.jpg';
      }
      if (bottomProductId === 'jean-comodo-ninos') {
        return 'images/looks/nino-cuadros.jpg';
      }
      if (bottomProductId === 'jogger-deportivo-nino') {
        return 'images/looks/nino-cuadros-jogger.jpg';
      }
    }
    if (!outId && topProductId === 'polo-marino-nino') {
      if (bottomProductId === 'short-chino-nino') {
        return 'images/looks/nino-marino-short.jpg';
      }
      if (bottomProductId === 'jean-comodo-ninos') {
        return 'images/looks/nino-marino-jean.jpg';
      }
      if (bottomProductId === 'jogger-deportivo-nino') {
        return 'images/looks/nino-deportivo.jpg';
      }
    }
    if (
      topProductId === 'polo-rayas-ninos' &&
      bottomProductId === 'jean-comodo-ninos' &&
      outId === 'casaca-bomber-nino'
    ) {
      return 'images/looks/nino-bomber.jpg';
    }
  }

  return null;
}

/**
 * Fallback thumbnail photo for cart & cards.
 */
export function getCategoryModelPhoto(
  category: CategoryId,
  topProductId?: string,
  bottomProductId?: string,
  outerwearProductId?: string | null
): string {
  const exact = getExactPhotographedLook(
    category,
    topProductId,
    bottomProductId,
    outerwearProductId
  );
  if (exact) return exact;
  return CATEGORY_AVATAR[category];
}

interface RealModelStageProps {
  category: CategoryId;
  lookTitle: string;
  featuredLabel?: string;
  topProduct: Product;
  bottomProduct?: Product;
  outerwearProduct?: Product | null;
  pieces: {
    product: Product;
    colorHex: string;
    colorName: string;
  }[];
}

export const RealModelStage: React.FC<RealModelStageProps> = ({
  category,
  lookTitle,
  featuredLabel,
  topProduct,
  bottomProduct,
  outerwearProduct,
  pieces,
}) => {
  const isDress = topProduct.slot === 'dress';

  const exactModelPhoto = getExactPhotographedLook(
    category,
    topProduct.id,
    bottomProduct?.id,
    outerwearProduct?.id ?? null
  );

  // When an exact real photoshoot exists for this combination, show it by default;
  // when the user custom-combines any other garments, smoothly show the clean Editorial Outfit Lookbook!
  const [stageView, setStageView] = useState<'model' | 'lookbook'>(
    exactModelPhoto ? 'model' : 'lookbook'
  );

  useEffect(() => {
    setStageView(exactModelPhoto ? 'model' : 'lookbook');
  }, [exactModelPhoto, topProduct.id, bottomProduct?.id, outerwearProduct?.id]);

  const showingModelPhoto = stageView === 'model' && Boolean(exactModelPhoto);

  return (
    <div className="relative z-10 w-full max-w-[330px] flex flex-col items-center gap-3">
      {/* View Switcher when exact model photoshoot is available */}
      {exactModelPhoto && (
        <div className="inline-flex items-center bg-[#F5F4F3] p-1 rounded-full border border-neutral-200 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setStageView('model')}
            className={`px-3 py-1 rounded-full inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
              stageView === 'model'
                ? 'bg-white text-[#C8102E] shadow-2xs'
                : 'text-neutral-600'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            En modelo
          </button>
          <button
            type="button"
            onClick={() => setStageView('lookbook')}
            className={`px-3 py-1 rounded-full inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
              stageView === 'lookbook'
                ? 'bg-white text-[#C8102E] shadow-2xs'
                : 'text-neutral-600'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Vista conjunto
          </button>
        </div>
      )}

      {/* MAIN VISUAL STAGE */}
      <div className="relative w-[285px] sm:w-[310px] aspect-[3/4.05] rounded-[26px] overflow-hidden shadow-[0_16px_38px_rgba(20,25,35,0.12)] border-4 border-white bg-gradient-to-b from-[#FAF8F7] via-[#FBF9F9] to-[#F5EEF0]">
        {showingModelPhoto && exactModelPhoto ? (
          /* 100% REAL UNALTERED FULL-BODY STUDIO PHOTOGRAPH */
          <img
            key={exactModelPhoto}
            src={exactModelPhoto}
            alt={`Modelo ${CATEGORY_LABEL[category]} luciendo ${lookTitle}`}
            className="w-full h-full object-cover object-top animate-fade-up"
          />
        ) : (
          /* EDITORIAL STUDIO FLAT-LAY OUTFIT COMPOSITION (NO STICKERS ON BODY!) */
          <div className="relative w-full h-full flex flex-col items-center justify-center px-5 pt-14 pb-6">
            {/* Soft blush studio spotlight behind garments */}
            <div
              className="pointer-events-none absolute inset-x-6 top-16 bottom-10 rounded-full bg-[#FCECEF]/75 blur-xl"
              aria-hidden="true"
            />

            {isDress ? (
              /* Dress + optional styled outerwear */
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  key={`dress-${topProduct.id}`}
                  src={topProduct.cutoutImage}
                  alt={topProduct.name}
                  className={`relative z-10 object-contain drop-shadow-[0_14px_22px_rgba(20,25,35,0.16)] animate-fade-up transition-all duration-300 ${
                    outerwearProduct
                      ? 'max-h-[82%] max-w-[74%] -translate-x-5'
                      : 'max-h-[88%] max-w-[85%]'
                  }`}
                />
                {outerwearProduct && (
                  <img
                    key={`out-dress-${outerwearProduct.id}`}
                    src={outerwearProduct.cutoutImage}
                    alt={outerwearProduct.name}
                    className="absolute right-0 top-[14%] z-20 max-h-[54%] max-w-[56%] object-contain rotate-[4deg] drop-shadow-[0_14px_20px_rgba(20,25,35,0.22)] animate-fade-up"
                  />
                )}
              </div>
            ) : (
              /* Cohesive Vertical Head-to-Toe Outfit Styling (Top + Bottom + Optional Outerwear) */
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                {/* Upper Garment + Optional Layered Jacket */}
                <div className="relative w-full h-[46%] flex items-center justify-center z-20">
                  <img
                    key={`top-${topProduct.id}`}
                    src={topProduct.cutoutImage}
                    alt={topProduct.name}
                    className={`max-h-[104%] object-contain drop-shadow-[0_10px_18px_rgba(20,25,35,0.15)] animate-fade-up transition-all duration-300 ${
                      outerwearProduct
                        ? 'max-w-[66%] -translate-x-7'
                        : 'max-w-[78%]'
                    }`}
                  />
                  {outerwearProduct && (
                    <img
                      key={`out-${outerwearProduct.id}`}
                      src={outerwearProduct.cutoutImage}
                      alt={outerwearProduct.name}
                      className="absolute right-0 top-0 max-h-[108%] max-w-[62%] object-contain rotate-[4deg] drop-shadow-[0_14px_22px_rgba(20,25,35,0.22)] animate-fade-up"
                    />
                  )}
                </div>

                {/* Bottom Garment positioned naturally right below the waist */}
                {bottomProduct && (
                  <div className="relative w-full h-[54%] -mt-3 flex items-start justify-center z-10">
                    <img
                      key={`bot-${bottomProduct.id}`}
                      src={bottomProduct.cutoutImage}
                      alt={bottomProduct.name}
                      className={`object-contain drop-shadow-[0_12px_20px_rgba(20,25,35,0.16)] animate-fade-up ${
                        bottomProduct.subcategory === 'Shorts' ||
                        bottomProduct.subcategory === 'Faldas'
                          ? 'max-h-[78%] max-w-[76%] mt-1'
                          : 'max-h-[100%] max-w-[76%]'
                      }`}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Top Header Bar inside Stage */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-1.5 pointer-events-none z-30">
          <span className="pl-1 pr-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#141923] shadow-xs inline-flex items-center gap-1.5">
            <img
              src={CATEGORY_AVATAR[category]}
              alt={CATEGORY_LABEL[category]}
              className="w-5 h-5 rounded-full object-cover object-top border border-black/10"
            />
            {CATEGORY_LABEL[category]}
          </span>

          {showingModelPhoto ? (
            featuredLabel ? (
              <span className="px-2.5 py-1 rounded-full bg-[#C8102E] text-white text-[10.5px] font-bold shadow-xs">
                {featuredLabel}
              </span>
            ) : null
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-[#141923]/85 text-white text-[10px] font-semibold inline-flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#FCA5A5]" />
              Combinación en vivo
            </span>
          )}
        </div>
      </div>

      {/* Clear Dedicated Summary Strip of Combined Clothing Pieces */}
      <div className="w-full bg-white rounded-2xl p-3 border border-neutral-200/85 shadow-[0_8px_24px_rgba(20,25,35,0.06)]">
        <div className="flex items-center justify-between gap-2 mb-2 px-0.5">
          <span className="text-[11.5px] font-display font-bold text-[#141923] truncate">
            Conjunto armado · {lookTitle}
          </span>
          <span className="text-[10.5px] font-bold text-[#C8102E] shrink-0">
            {pieces.length} {pieces.length === 1 ? 'prenda' : 'prendas'}
          </span>
        </div>

        <div className="flex items-stretch justify-center gap-1.5">
          {pieces.map((item, idx) => (
            <React.Fragment key={item.product.id}>
              {idx > 0 && (
                <div className="flex items-center justify-center text-neutral-300 shrink-0">
                  <Plus className="w-3.5 h-3.5" />
                </div>
              )}
              <div className="flex-1 min-w-0 rounded-xl bg-[#FAF9F8] border border-neutral-200/75 p-2 flex flex-col items-center text-center">
                <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
                  <GarmentPhoto
                    product={item.product}
                    preferFlatLay
                    className="max-w-full max-h-full"
                  />
                </div>
                <p className="text-[10px] font-bold text-[#141923] truncate w-full mt-1 leading-tight">
                  {item.product.name}
                </p>
                <span className="inline-flex items-center gap-1 text-[9px] text-neutral-500 mt-0.5 max-w-full">
                  <span
                    className="w-2 h-2 rounded-full border border-black/15 shrink-0"
                    style={{ backgroundColor: item.colorHex }}
                  />
                  <span className="truncate">{item.colorName}</span>
                </span>
                <span className="text-[10px] font-extrabold text-[#C8102E] mt-0.5">
                  {formatPen(item.product.price)}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
