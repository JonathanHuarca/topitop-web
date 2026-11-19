import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import {
  GarmentSeason,
  GarmentSlot,
  GarmentStyle,
  PageRoute,
  Product,
} from '../types';
import { PRODUCTS, formatPen } from '../data/catalog';
import { PeruFlagBadge } from './BrandIcons';
import { GarmentPhoto } from './GarmentPhoto';

interface CatalogPageProps {
  category: 'mujer' | 'hombre' | 'ninos';
  initialKidSub?: 'todos' | 'nino' | 'nina';
  onNavigate: (route: PageRoute) => void;
  onOpenQualityModal: (product: Product) => void;
}

const META = {
  mujer: {
    title: 'Colección Mujer',
    subtitle:
      'Blusas, camisas, vestidos, faldas, pantalones, jeans, blazers y casacas con fotografía real y ficha de trazabilidad.',
  },
  hombre: {
    title: 'Colección Hombre',
    subtitle:
      'Camisas, polos, chinos, pantalones formales, jeans, joggers y chaquetas confeccionados en Lima y Chincha.',
  },
  ninos: {
    title: 'Colección Infantil — Niña y Niño',
    subtitle:
      'Propuestas infantiles diferenciadas para niña y niño con prendas reales, cómodas y seguras.',
  },
};

const SLOT_FILTERS: { id: 'todos' | GarmentSlot; label: string }[] = [
  { id: 'todos', label: 'Todas las prendas' },
  { id: 'top', label: 'Polos, camisas y blusas' },
  { id: 'bottom', label: 'Pantalones, jeans, shorts y faldas' },
  { id: 'dress', label: 'Vestidos' },
  { id: 'outerwear', label: 'Casacas y blazers' },
];

export const CatalogPage: React.FC<CatalogPageProps> = ({
  category,
  initialKidSub = 'todos',
  onNavigate,
  onOpenQualityModal,
}) => {
  const [kidSub, setKidSub] = useState<'todos' | 'nino' | 'nina'>(
    initialKidSub
  );
  const [slotFilter, setSlotFilter] = useState<'todos' | GarmentSlot>('todos');
  const [styleFilter, setStyleFilter] = useState<'Todos' | GarmentStyle>(
    'Todos'
  );
  const [seasonFilter, setSeasonFilter] = useState<'Todas' | GarmentSeason>(
    'Todas'
  );

  useEffect(() => {
    setKidSub(initialKidSub);
    setSlotFilter('todos');
    setStyleFilter('Todos');
    setSeasonFilter('Todas');
  }, [category, initialKidSub]);

  const items = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (category === 'ninos') {
        if (kidSub === 'todos' && p.category !== 'nino' && p.category !== 'nina') {
          return false;
        }
        if (kidSub !== 'todos' && p.category !== kidSub) return false;
      } else if (p.category !== category) {
        return false;
      }
      if (slotFilter !== 'todos' && p.slot !== slotFilter) return false;
      if (styleFilter !== 'Todos' && p.style !== styleFilter) return false;
      if (seasonFilter !== 'Todas' && p.season !== seasonFilter) return false;
      return true;
    });
  }, [category, kidSub, slotFilter, styleFilter, seasonFilter]);

  const meta = META[category];

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
        <span className="font-semibold text-neutral-800">{meta.title}</span>
      </nav>

      <div className="bg-gradient-to-r from-[#F7F4F3] to-[#FDF2F4] rounded-[26px] p-6 sm:p-8 border border-neutral-200/70 flex flex-col md:flex-row md:items-center justify-between gap-5 mb-6">
        <div>
          <h1 className="font-display font-extrabold text-[28px] sm:text-[36px] text-[#141923] tracking-[-0.025em]">
            {meta.title}
          </h1>
          <p className="text-[15px] text-neutral-600 mt-1 max-w-2xl">
            {meta.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onNavigate({
              name: 'combina',
              category:
                category === 'ninos'
                  ? kidSub === 'nino'
                    ? 'nino'
                    : 'nina'
                  : category,
            })
          }
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8102E] hover:bg-[#A50C24] text-white font-semibold text-[15px] shadow-sm transition-colors cursor-pointer self-start md:self-auto shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          Combinar looks ahora
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {category === 'ninos' && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'todos', label: 'Todos (Niña y Niño)' },
              { id: 'nina', label: 'Niña' },
              { id: 'nino', label: 'Niño' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setKidSub(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-bold border transition-all cursor-pointer ${
                kidSub === tab.id
                  ? 'bg-[#C8102E] text-white border-[#C8102E]'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#C8102E]/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="mb-7 space-y-3 bg-[#FAF9F8] p-4 rounded-2xl border border-neutral-200/70">
        <div className="flex flex-wrap items-center gap-2">
          {SLOT_FILTERS.filter(
            (sf) => !(category === 'hombre' && sf.id === 'dress')
          ).map((sf) => (
            <button
              key={sf.id}
              type="button"
              onClick={() => setSlotFilter(sf.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                slotFilter === sf.id
                  ? 'bg-[#141923] text-white border-[#141923]'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
              }`}
            >
              {sf.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-neutral-500">Estilo:</span>
            {(['Todos', 'Casual', 'Deportivo', 'Formal'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStyleFilter(st)}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  styleFilter === st
                    ? 'bg-[#FDF2F4] text-[#C8102E]'
                    : 'text-neutral-600 hover:bg-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-neutral-500">Temporada:</span>
            {(
              [
                'Todas',
                'Primavera - Verano',
                'Otoño - Invierno',
                'Todo el año',
              ] as const
            ).map((sea) => (
              <button
                key={sea}
                type="button"
                onClick={() => setSeasonFilter(sea)}
                className={`px-2.5 py-1 rounded-lg font-semibold cursor-pointer ${
                  seasonFilter === sea
                    ? 'bg-[#FDF2F4] text-[#C8102E]'
                    : 'text-neutral-600 hover:bg-white'
                }`}
              >
                {sea}
              </button>
            ))}
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-14 bg-[#FAF9F8] rounded-3xl border border-neutral-200">
          <p className="font-display font-bold text-lg text-[#141923]">
            No hay prendas con esa combinación de filtros
          </p>
          <button
            type="button"
            onClick={() => {
              setSlotFilter('todos');
              setStyleFilter('Todos');
              setSeasonFilter('Todas');
            }}
            className="mt-3 px-5 py-2 rounded-full bg-[#C8102E] text-white text-sm font-semibold cursor-pointer"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-[24px] p-4 border border-neutral-200/80 hover:border-[#C8102E]/40 shadow-[0_6px_20px_rgba(20,25,35,0.04)] hover:shadow-[0_12px_30px_rgba(20,25,35,0.08)] transition-all flex flex-col"
            >
              <button
                type="button"
                onClick={() =>
                  onNavigate({ name: 'producto', slug: product.slug })
                }
                className="relative aspect-[4/4] rounded-2xl overflow-hidden bg-[#FAF9F8] p-4 mb-4 cursor-pointer flex items-center justify-center"
              >
                <GarmentPhoto
                  product={product}
                  preferFlatLay
                  className="max-w-full max-h-full group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-semibold text-[#141923] shadow-xs">
                  <PeruFlagBadge className="w-4 h-4" />
                  Planta {product.quality.plant}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#141923]/80 text-white text-[10.5px] font-semibold">
                  {product.style}
                </span>
              </button>

              <div className="flex-1 flex flex-col justify-between px-1">
                <div>
                  <div className="flex items-center justify-between gap-2 text-[11.5px] text-neutral-500">
                    <span>
                      {product.subcategory} · {product.season}
                    </span>
                    <span className="font-mono text-neutral-400">
                      {product.sku}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ name: 'producto', slug: product.slug })
                    }
                    className="text-left font-display font-bold text-[18px] text-[#141923] group-hover:text-[#C8102E] transition-colors mt-0.5 cursor-pointer"
                  >
                    {product.name}
                  </button>
                  <p className="text-[12.5px] text-neutral-500 mt-0.5">
                    {product.quality.composition}
                  </p>
                  <p className="font-display font-extrabold text-[19px] text-[#141923] mt-1">
                    {formatPen(product.price)}
                  </p>

                  <div className="mt-2.5 flex items-center gap-1.5">
                    {product.colors.map((c) => (
                      <span
                        key={c.id}
                        title={c.name}
                        className="w-4 h-4 rounded-full border border-neutral-300"
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenQualityModal(product)}
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#15803D] hover:underline cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Ficha y QR
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      onNavigate({ name: 'producto', slug: product.slug })
                    }
                    className="text-[13px] font-bold text-[#C8102E] hover:underline cursor-pointer"
                  >
                    Ver trazabilidad →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
