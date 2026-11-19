import React, { useState } from 'react';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import { PageRoute } from '../types';
import { TopitopLogo } from './BrandIcons';

interface NavbarProps {
  route: PageRoute;
  onNavigate: (route: PageRoute) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  route,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; target: PageRoute; isActive: boolean }[] = [
    {
      label: 'Mujer',
      target: { name: 'categoria', category: 'mujer' },
      isActive: route.name === 'categoria' && route.category === 'mujer',
    },
    {
      label: 'Hombre',
      target: { name: 'categoria', category: 'hombre' },
      isActive: route.name === 'categoria' && route.category === 'hombre',
    },
    {
      label: 'Niños',
      target: { name: 'categoria', category: 'ninos' },
      isActive: route.name === 'categoria' && route.category === 'ninos',
    },
    {
      label: 'Combina tu look',
      target: { name: 'combina', category: 'mujer' },
      isActive: route.name === 'combina',
    },
    {
      label: 'Calidad Topitop',
      target: { name: 'calidad' },
      isActive: route.name === 'calidad',
    },
    {
      label: 'Tiendas',
      target: { name: 'tiendas' },
      isActive: route.name === 'tiendas',
    },
  ];

  const handleNav = (target: PageRoute) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-[72px] flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="md:hidden p-2 -ml-2 text-neutral-700 hover:text-[#C8102E] transition-colors"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => handleNav({ name: 'calidad' })}
          className="cursor-pointer focus:outline-none"
          aria-label="Topitop Inicio"
        >
          <TopitopLogo />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Principal">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNav(item.target)}
              className={`relative py-2 text-[14px] lg:text-[15px] transition-colors cursor-pointer ${
                item.isActive
                  ? 'font-semibold text-[#C8102E]'
                  : 'font-medium text-neutral-700 hover:text-[#C8102E]'
              }`}
            >
              {item.label}
              {item.isActive && (
                <span className="absolute left-0 right-0 -bottom-[2px] h-[2.5px] rounded-full bg-[#C8102E]" />
              )}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-2 rounded-full text-neutral-700 hover:text-[#C8102E] hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Buscar prendas"
          >
            <Search className="w-[21px] h-[21px]" strokeWidth={1.9} />
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2 rounded-full text-neutral-700 hover:text-[#C8102E] hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Ver carrito de compras"
          >
            <ShoppingCart className="w-[22px] h-[22px]" strokeWidth={1.9} />
            <span className="absolute -top-0.5 -right-0.5 min-w-[19px] h-[19px] px-1 rounded-full bg-[#C8102E] text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 bg-white px-4 py-3 shadow-lg animate-fade-up">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.target)}
                className={`text-left px-3 py-2.5 rounded-xl text-[15px] transition-colors ${
                  item.isActive
                    ? 'bg-[#FDF2F4] text-[#C8102E] font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50 font-medium'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
