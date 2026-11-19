import React from 'react';
import { PageRoute } from '../types';
import { TopitopLogo } from './BrandIcons';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast }) => {
  return (
    <footer className="bg-[#FAF9F8] border-t border-neutral-200/80 mt-14">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <button
              type="button"
              onClick={() => onNavigate({ name: 'calidad' })}
              className="cursor-pointer"
            >
              <TopitopLogo />
            </button>
            <p className="mt-3 text-xs text-neutral-500 leading-relaxed max-w-[200px]">
              Moda hecha en el Perú con estándares internacionales de exportación.
            </p>
          </div>

          {/* Compra */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#141923] mb-3">Compra</h4>
            <ul className="space-y-2 text-[13px] text-neutral-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'categoria', category: 'mujer' })}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Mujer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'categoria', category: 'hombre' })}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Hombre
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'categoria', category: 'ninos' })}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Niños
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'combina', category: 'mujer' })}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer font-medium text-[#C8102E]"
                >
                  Combina tu look
                </button>
              </li>
            </ul>
          </div>

          {/* Nosotros */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#141923] mb-3">Nosotros</h4>
            <ul className="space-y-2 text-[13px] text-neutral-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'calidad' })}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Calidad Topitop
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'calidad' })}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Sostenibilidad
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onShowToast('Bolsa de talento Topitop Perú disponible en www.topitop.pe')}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Trabaja con nosotros
                </button>
              </li>
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#141923] mb-3">Ayuda</h4>
            <ul className="space-y-2 text-[13px] text-neutral-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ name: 'tiendas' })}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Tiendas y QR
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onShowToast('Cambios y devoluciones gratis hasta por 30 días en tienda.')}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Cambios y devoluciones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onShowToast('Consulta nuestros términos y políticas de privacidad.')}
                  className="hover:text-[#C8102E] transition-colors cursor-pointer"
                >
                  Términos y condiciones
                </button>
              </li>
            </ul>
          </div>

          {/* Síguenos */}
          <div>
            <h4 className="font-display font-bold text-sm text-[#141923] mb-3">Síguenos</h4>
            <div className="flex items-center gap-3 text-neutral-700">
              {/* Instagram */}
              <button
                type="button"
                onClick={() => onShowToast('@topitop.oficial en Instagram')}
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:border-[#C8102E] hover:text-[#C8102E] transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-4 h-4">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </button>
              {/* TikTok */}
              <button
                type="button"
                onClick={() => onShowToast('@topitop.pe en TikTok')}
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:border-[#C8102E] hover:text-[#C8102E] transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07Z" />
                </svg>
              </button>
              {/* Facebook */}
              <button
                type="button"
                onClick={() => onShowToast('Topitop Perú en Facebook')}
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:border-[#C8102E] hover:text-[#C8102E] transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
                </svg>
              </button>
              {/* YouTube */}
              <button
                type="button"
                onClick={() => onShowToast('Topitop Perú en YouTube')}
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:border-[#C8102E] hover:text-[#C8102E] transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42a2.5 2.5 0 0 0-1.76 1.77C2 8.76 2 12 2 12s0 3.24.42 4.81a2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77C22 15.24 22 12 22 12s0-3.24-.42-4.81ZM10 15.15V8.85L15.45 12 10 15.15Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-200/70 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Topitop Perú — Calidad de exportación hecha en el Perú.</p>
          <p>www.topitop.pe</p>
        </div>
      </div>
    </footer>
  );
};
