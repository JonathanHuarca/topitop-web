import React, { useCallback, useEffect, useState } from 'react';
import {
  CartItem,
  CategoryId,
  PageRoute,
  Product,
  SizeCode,
} from './types';
import { computeLookPrice } from './data/catalog';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CalidadPage } from './components/CalidadPage';
import { CombinaLookPage } from './components/CombinaLookPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CatalogPage } from './components/CatalogPage';
import { TiendasPage } from './components/TiendasPage';
import {
  CartDrawer,
  CertificateModal,
  QualityPreviewModal,
  SearchModal,
  ToastBanner,
} from './components/ModalsAndDrawers';

function parseHashToRoute(): PageRoute {
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [pathPart, queryPart] = raw.split('?');
  const params = new URLSearchParams(queryPart ?? '');

  if (!pathPart || pathPart === 'calidad-topitop') return { name: 'calidad' };
  if (pathPart.startsWith('combina-tu-look')) {
    const [, cat] = pathPart.split('/');
    const validCats: CategoryId[] = ['mujer', 'nina', 'hombre', 'nino'];
    return {
      name: 'combina',
      category: validCats.includes(cat as CategoryId)
        ? (cat as CategoryId)
        : 'mujer',
    };
  }
  if (pathPart.startsWith('producto/')) {
    const slug = pathPart.slice('producto/'.length);
    return {
      name: 'producto',
      slug: slug || 'blusa-manga-abullonada',
      fromQr: params.get('source') === 'qr',
    };
  }
  if (pathPart.startsWith('categoria/')) {
    const [, cat, sub] = pathPart.split('/');
    if (cat === 'mujer' || cat === 'hombre' || cat === 'ninos') {
      return {
        name: 'categoria',
        category: cat,
        kidSub:
          sub === 'nino' || sub === 'nina' || sub === 'todos' ? sub : undefined,
      };
    }
  }
  if (pathPart === 'tiendas') return { name: 'tiendas' };
  return { name: 'calidad' };
}

function routeToHash(route: PageRoute): string {
  switch (route.name) {
    case 'calidad':
      return '#/calidad-topitop';
    case 'combina':
      return `#/combina-tu-look/${route.category ?? 'mujer'}`;
    case 'producto':
      return route.fromQr
        ? `#/producto/${route.slug}?source=qr`
        : `#/producto/${route.slug}`;
    case 'categoria':
      return route.kidSub
        ? `#/categoria/${route.category}/${route.kidSub}`
        : `#/categoria/${route.category}`;
    case 'tiendas':
      return '#/tiendas';
  }
}

export function App() {
  const [route, setRoute] = useState<PageRoute>(() => parseHashToRoute());
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [qualityModalProduct, setQualityModalProduct] =
    useState<Product | null>(null);
  const [certModalProduct, setCertModalProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const navigate = useCallback((next: PageRoute) => {
    setRoute(next);
    const nextHash = routeToHash(next);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    if (!(next.name === 'producto' && next.fromQr)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashToRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleAddProduct = useCallback(
    (product: Product, size: SizeCode, colorName: string) => {
      const itemKey = `prod-${product.id}-${size}-${colorName}`;
      setCart((prev) => {
        const existing = prev.find((i) => i.id === itemKey);
        if (existing) {
          return prev.map((i) =>
            i.id === itemKey ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [
          ...prev,
          {
            id: itemKey,
            type: 'product',
            title: product.name,
            subtitle: `Ref. ${product.sku} · Color: ${colorName} · Talla: ${size}`,
            image: product.flatLayImage,
            unitPrice: product.price,
            quantity: 1,
            productId: product.id,
          },
        ];
      });
      showToast(`${product.name} (Talla ${size}) agregado al carrito`);
    },
    [showToast]
  );

  const handleAddLook = useCallback(
    (
      lookTitle: string,
      items: { product: Product; size: SizeCode }[],
      discountPercent: number,
      previewImage: string
    ) => {
      const pricing = computeLookPrice(
        items.map((i) => i.product.price),
        discountPercent
      );
      const itemKey = `look-${items
        .map((i) => `${i.product.id}-${i.size}`)
        .join('_')}`;
      const summary = items
        .map((i) => `${i.product.name} (${i.size})`)
        .join(' + ');

      setCart((prev) => {
        const existing = prev.find((i) => i.id === itemKey);
        if (existing) {
          return prev.map((i) =>
            i.id === itemKey ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [
          ...prev,
          {
            id: itemKey,
            type: 'look',
            title: `Look completo: ${lookTitle}`,
            subtitle: summary,
            image: previewImage,
            unitPrice: pricing.discounted,
            originalPrice: pricing.original,
            discountBadge: `-${discountPercent}% por llevar el look`,
            quantity: 1,
          },
        ];
      });
      showToast(`Look completo agregado con -${discountPercent}% de descuento`);
      setCartOpen(true);
    },
    [showToast]
  );

  const handleUpdateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((it) =>
          it.id === id ? { ...it, quantity: it.quantity + delta } : it
        )
        .filter((it) => it.quantity > 0)
    );
  }, []);

  const handleRemoveCartItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#141923]">
      <Navbar
        route={route}
        onNavigate={navigate}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="flex-1">
        {route.name === 'calidad' && (
          <CalidadPage
            onNavigate={navigate}
            onOpenQualityModal={setQualityModalProduct}
            onOpenCertModal={setCertModalProduct}
          />
        )}

        {route.name === 'combina' && (
          <CombinaLookPage
            initialCategory={route.category ?? 'mujer'}
            initialLookId={route.lookId}
            onNavigate={navigate}
            onAddProduct={handleAddProduct}
            onAddLook={handleAddLook}
            onOpenQualityModal={setQualityModalProduct}
            onShowToast={showToast}
          />
        )}

        {route.name === 'producto' && (
          <ProductDetailPage
            slug={route.slug}
            fromQr={route.fromQr}
            onNavigate={navigate}
            onAddProduct={handleAddProduct}
            onOpenCertModal={setCertModalProduct}
            onShowToast={showToast}
          />
        )}

        {route.name === 'categoria' && (
          <CatalogPage
            category={route.category}
            initialKidSub={route.kidSub}
            onNavigate={navigate}
            onOpenQualityModal={setQualityModalProduct}
          />
        )}

        {route.name === 'tiendas' && (
          <TiendasPage
            onNavigate={navigate}
            onOpenQualityModal={setQualityModalProduct}
          />
        )}
      </main>

      <Footer onNavigate={navigate} onShowToast={showToast} />

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        onShowToast={showToast}
      />

      <QualityPreviewModal
        product={qualityModalProduct}
        onClose={() => setQualityModalProduct(null)}
        onOpenFullProduct={(slug, fromQr) =>
          navigate({ name: 'producto', slug, fromQr })
        }
        onOpenCert={(p) => setCertModalProduct(p)}
      />

      <CertificateModal
        product={certModalProduct}
        onClose={() => setCertModalProduct(null)}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={navigate}
      />

      <ToastBanner message={toast} />
    </div>
  );
}

export default App;
