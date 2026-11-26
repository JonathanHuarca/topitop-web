import React from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Monitor,
  Smartphone,
  Store,
} from 'lucide-react';
import { PageRoute, Product } from '../types';
import { getProductById } from '../data/catalog';
import {
  AccentStrokes,
  FabricLayersIcon,
  FactoryIcon,
  GlobeOutlineIcon,
  OekoLeafIcon,
  PeruFlagBadge,
  PeruMapIcon,
} from './BrandIcons';

interface CalidadPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenQualityModal: (product: Product) => void;
  onOpenCertModal: (product: Product) => void;
}

export const CalidadPage: React.FC<CalidadPageProps> = ({
  onNavigate,
  onOpenQualityModal,
  onOpenCertModal,
}) => {
  const featuredProduct = getProductById('blusa-manga-abullonada');

  return (
    <div className="animate-fade-up">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F7F4F3] via-[#FAF8F7] to-[#F3EFF0] border-b border-neutral-200/60">
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#C8102E]/[0.05] blur-3xl"
          aria-hidden="true"
        />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1.5">
                <h1 className="font-display font-extrabold text-[40px] sm:text-[50px] lg:text-[54px] leading-[1.06] tracking-[-0.03em] text-[#141923]">
                  Calidad Topitop
                </h1>
                <p className="font-display font-extrabold text-[32px] sm:text-[40px] lg:text-[44px] leading-[1.08] tracking-[-0.025em] text-[#C8102E]">
                  Hecho para el Mundo
                </p>
              </div>

              <p className="text-[17px] sm:text-[18px] text-neutral-600 leading-relaxed max-w-[460px]">
                Mira dónde y cómo se hizo cada prenda, hecha en el Perú.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate({ name: 'producto', slug: featuredProduct.slug })
                  }
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C8102E] hover:bg-[#A50C24] text-white font-semibold text-[16px] shadow-[0_10px_24px_rgba(200,16,46,0.28)] hover:shadow-[0_12px_28px_rgba(200,16,46,0.36)] transition-all cursor-pointer active:scale-[0.98]"
                >
                  Ver ficha de calidad
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onNavigate({ name: 'combina', category: 'mujer' })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#141923] font-semibold text-[15px] border border-neutral-200 shadow-xs transition-all cursor-pointer"
                >
                  Combina tu look
                </button>
              </div>
            </div>

            {/* Right Floating Ficha de Calidad Preview Card */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                <AccentStrokes className="hidden sm:block w-8 h-8 absolute -top-4 -right-5 pointer-events-none" />

                <div
                  onClick={() =>
                    onNavigate({ name: 'producto', slug: featuredProduct.slug })
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onNavigate({
                        name: 'producto',
                        slug: featuredProduct.slug,
                      });
                    }
                  }}
                  className="group bg-white rounded-[26px] p-5 sm:p-6 shadow-[0_18px_48px_rgba(20,25,35,0.09)] border border-neutral-200/70 hover:border-[#C8102E]/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="font-display font-bold text-[19px] text-[#141923]">
                        Ficha de calidad
                      </h2>
                      <span className="text-[11px] font-mono text-neutral-400">
                        Ref. {featuredProduct.sku}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[#C8102E] group-hover:underline">
                      Ver trazabilidad →
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
                    <div className="sm:col-span-5">
                      <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#F4F1EE] border border-neutral-100">
                        <img
                          src="images/hero-model-blusa.jpg"
                          alt="Blusa manga abullonada Topitop"
                          className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-7 space-y-3.5">
                      <div className="flex items-center gap-3">
                        <PeruFlagBadge className="w-7 h-7 shrink-0" />
                        <span className="font-semibold text-[15px] text-[#141923]">
                          Hecho en el Perú
                        </span>
                      </div>

                      <div className="h-px bg-neutral-100" />

                      <div className="flex items-center gap-3">
                        <FactoryIcon className="w-7 h-7 shrink-0" />
                        <span className="text-[14.5px] text-neutral-700">
                          <strong className="font-semibold text-[#141923]">
                            Planta:
                          </strong>{' '}
                          Lima
                        </span>
                      </div>

                      <div className="h-px bg-neutral-100" />

                      <div className="flex items-center gap-3">
                        <FabricLayersIcon className="w-7 h-7 shrink-0" />
                        <div className="leading-snug">
                          <p className="text-[13.5px] font-semibold text-[#141923]">
                            Composición:
                          </p>
                          <p className="text-[13.5px] text-neutral-600">
                            100% algodón
                          </p>
                        </div>
                      </div>

                      <div className="h-px bg-neutral-100" />

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <OekoLeafIcon
                            className="w-7 h-7 shrink-0"
                            color="#16A34A"
                          />
                          <div className="leading-snug">
                            <p className="text-[13.5px] font-semibold text-[#141923]">
                              Certificación
                            </p>
                            <p className="text-[13.5px] text-neutral-600">
                              Oeko-Tex
                            </p>
                          </div>
                        </div>
                        <CheckCircle2 className="w-6 h-6 text-[#16A34A] shrink-0 fill-[#16A34A]/10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CADA PRENDA CUENTA CON NUESTRA CALIDAD */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        <h2 className="font-display font-extrabold text-[26px] sm:text-[32px] tracking-[-0.02em] text-[#141923] mb-7">
          Cada prenda cuenta con{' '}
          <span className="text-[#C8102E]">nuestra calidad</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-[0_6px_22px_rgba(20,25,35,0.04)] hover:shadow-[0_10px_28px_rgba(20,25,35,0.08)] transition-all flex flex-col">
            <div className="mb-4">
              <PeruMapIcon className="w-12 h-12" />
            </div>
            <h3 className="font-display font-bold text-[18px] text-[#141923] mb-1.5">
              Hecho en el Perú
            </h3>
            <p className="text-[14.5px] text-neutral-600 leading-relaxed">
              Diseño y producción con talento peruano y trazabilidad clara.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-[0_6px_22px_rgba(20,25,35,0.04)] hover:shadow-[0_10px_28px_rgba(20,25,35,0.08)] transition-all flex flex-col">
            <div className="mb-4">
              <FactoryIcon className="w-12 h-12" />
            </div>
            <h3 className="font-display font-bold text-[18px] text-[#141923] mb-1.5">
              Plantas en Lima y Chincha
            </h3>
            <p className="text-[14.5px] text-neutral-600 leading-relaxed">
              Producción moderna y responsable, indicando la planta de cada prenda.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenCertModal(featuredProduct)}
            className="text-left bg-white rounded-2xl p-6 border border-neutral-200/80 hover:border-[#009677]/50 shadow-[0_6px_22px_rgba(20,25,35,0.04)] hover:shadow-[0_10px_28px_rgba(20,25,35,0.08)] transition-all flex flex-col cursor-pointer group"
          >
            <div className="mb-4 flex items-center justify-between w-full">
              <OekoLeafIcon className="w-12 h-12" />
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#009677]/10 text-[#009677]">
                Ver sello
              </span>
            </div>
            <h3 className="font-display font-bold text-[18px] text-[#141923] mb-1.5 group-hover:text-[#009677] transition-colors">
              Certificación Oeko-Tex
            </h3>
            <p className="text-[14.5px] text-neutral-600 leading-relaxed">
              Garantiza textiles sin sustancias dañinas. Cuando no aplica, se indica expresamente.
            </p>
          </button>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-[0_6px_22px_rgba(20,25,35,0.04)] hover:shadow-[0_10px_28px_rgba(20,25,35,0.08)] transition-all flex flex-col">
            <div className="mb-4">
              <GlobeOutlineIcon className="w-12 h-12" />
            </div>
            <h3 className="font-display font-bold text-[18px] text-[#141923] mb-1.5">
              Fabricamos para marcas internacionales
            </h3>
            <p className="text-[14.5px] text-neutral-600 leading-relaxed">
              como Hugo Boss y Lacoste.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: EN TIENDA */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
        <div className="bg-[#F6F5F4] rounded-[28px] p-6 sm:p-8 lg:p-10 border border-neutral-200/70">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-3 space-y-2.5">
              <h2 className="font-display font-extrabold text-[28px] sm:text-[32px] tracking-[-0.02em] text-[#C8102E] leading-tight">
                En tienda
              </h2>
              <p className="text-[15.5px] text-neutral-700 leading-relaxed">
                Conoce la calidad y trazabilidad de tu prenda en más lugares.
              </p>
              <button
                type="button"
                onClick={() => onNavigate({ name: 'tiendas' })}
                className="inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-[#C8102E] hover:underline cursor-pointer"
              >
                Ubicar tiendas y QR por prenda
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  img: 'images/instore-tag-qr.jpg',
                  title: 'Etiqueta con QR',
                  desc: 'Vinculado a la ficha de cada SKU',
                },
                {
                  img: 'images/instore-probador-qr.jpg',
                  title: 'QR en probador',
                  desc: 'Revisa tela, origen y cuidados',
                },
                {
                  img: 'images/instore-asesor-tablet.jpg',
                  title: 'Tablet del asesor',
                  desc: 'Consulta asistida al instante',
                },
              ].map((card) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => onOpenQualityModal(featuredProduct)}
                  className="group relative rounded-2xl overflow-hidden bg-white shadow-sm border border-neutral-200/80 text-left cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="px-3.5 py-2.5 bg-white flex items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-[13.5px] text-[#141923] leading-tight">
                        {card.title}
                      </p>
                      <p className="text-[12px] text-neutral-500">{card.desc}</p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#C8102E] shrink-0">
                      Probar QR →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-2.5 bg-white px-5 py-2.5 rounded-full border border-neutral-200/90 shadow-xs text-[13.5px] sm:text-[14px] text-neutral-700">
              <AlertCircle className="w-4 h-4 text-[#C8102E] shrink-0" />
              <span>
                El QR complementa la experiencia en tienda;{' '}
                <strong className="font-semibold text-[#141923]">
                  en la web la ficha de transparencia aparece directo.
                </strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: COMBINA TU LOOK (Mujer, Hombre, Niño y Niña!) */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-7">
          <div>
            <h2 className="font-display font-extrabold text-[28px] sm:text-[34px] tracking-[-0.02em] text-[#141923]">
              Combina <span className="text-[#C8102E]">tu look</span>
            </h2>
            <p className="text-[16px] text-neutral-600 mt-1">
              Explora nuestras 4 categorías y combina prendas reales para armar múltiples outfits.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              label: 'Mujer',
              sub: 'Blusas, vestidos, faldas, pantalones y blazers',
              target: { name: 'combina', category: 'mujer' } as PageRoute,
              image: 'images/model-look-universidad.jpg',
            },
            {
              label: 'Niña',
              sub: 'Vestidos, faldas denim, blusas y casacas',
              target: { name: 'combina', category: 'nina' } as PageRoute,
              image: 'images/looks/nina-broderie.jpg',
            },
            {
              label: 'Hombre',
              sub: 'Camisas, polos, chinos, jeans y bomber',
              target: { name: 'combina', category: 'hombre' } as PageRoute,
              image: 'images/model-hombre-look.jpg',
            },
            {
              label: 'Niño',
              sub: 'Polos, camisas, shorts, jeans y casacas',
              target: { name: 'combina', category: 'nino' } as PageRoute,
              image: 'images/looks/nino-parque.jpg',
            },
          ].map((card) => (
            <div
              key={card.label}
              onClick={() => onNavigate(card.target)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onNavigate(card.target);
                }
              }}
              className="group bg-[#F7F6F5] rounded-[24px] p-4 border border-neutral-200/70 hover:border-[#C8102E]/35 hover:shadow-[0_14px_34px_rgba(20,25,35,0.08)] transition-all flex flex-col gap-3.5 cursor-pointer"
            >
              <div className="aspect-[4/4.2] rounded-2xl overflow-hidden bg-white border border-neutral-100">
                <img
                  src={card.image}
                  alt={`Looks ${card.label}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex flex-col items-start gap-2 px-1">
                <div>
                  <h3 className="font-display font-extrabold text-[22px] text-[#141923] leading-tight">
                    {card.label}
                  </h3>
                  <p className="text-[12.5px] text-neutral-500">{card.sub}</p>
                </div>
                <span className="mt-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C8102E] group-hover:bg-[#A50C24] text-white font-semibold text-[14.5px] shadow-sm transition-colors">
                  Ver looks
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-200/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[13.5px] text-neutral-600">
          <span className="inline-flex items-center gap-2 font-medium text-[#141923]">
            <Store className="w-4 h-4 text-[#C8102E]" />
            En tienda: QR único por referencia SKU
          </span>
          <span className="inline-flex items-center gap-2 font-medium text-[#141923]">
            <Monitor className="w-4 h-4 text-[#C8102E]" />
            En la web: ficha de trazabilidad directa
          </span>
          <span className="inline-flex items-center gap-2 font-medium text-[#141923]">
            <Smartphone className="w-4 h-4 text-[#C8102E]" />
            Looks combinables para Mujer, Niña, Hombre y Niño
          </span>
        </div>
      </section>
    </div>
  );
};
