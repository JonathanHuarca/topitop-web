export type CategoryId = 'mujer' | 'nina' | 'hombre' | 'nino';

export type OccasionId = 'Todas' | 'Universidad' | 'Casual' | 'Trabajo' | 'Salida' | 'Deporte';

export type GarmentStyle = 'Casual' | 'Deportivo' | 'Formal';

export type GarmentSeason = 'Primavera - Verano' | 'Otoño - Invierno' | 'Todo el año';

export type GarmentSlot = 'top' | 'bottom' | 'dress' | 'outerwear';

export type SizeCode = 'XS' | 'S' | 'M' | 'L' | 'XL' | '4' | '6' | '8' | '10' | '12';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  border?: string;
}

export interface MaterialComponent {
  name: string;
  percentage: number;
  origin: string;
}

export interface TraceabilityStep {
  stage: string;
  location: string;
  detail: string;
  verified: boolean;
}

export interface QualitySheet {
  origin: string;
  originCountry: string;
  plant: 'Lima' | 'Chincha';
  plantDetail: string;
  composition: string;
  materials: MaterialComponent[];
  rawMaterialsOrigin: string;
  manufacturingProcess: string;
  supplierInfo: string;
  productionConditions: string;
  care: string;
  hasOekoTex: boolean;
  oekoTexStatus: string;
  oekoTexSummary: string;
  exportNote: string;
  traceability: TraceabilityStep[];
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  modelDesign: string;
  category: CategoryId;
  subcategory: string;
  slot: GarmentSlot;
  style: GarmentStyle;
  season: GarmentSeason;
  price: number;
  description: string;
  images: string[];
  flatLayImage: string;
  cutoutImage: string;
  colors: ProductColor[];
  defaultColorId: string;
  sizes: SizeCode[];
  stockBySize: Partial<Record<SizeCode, number>>;
  quality: QualitySheet;
  occasions: OccasionId[];
}

export interface Look {
  id: string;
  title: string;
  category: CategoryId;
  occasion: Exclude<OccasionId, 'Todas'>;
  style: GarmentStyle;
  topProductId: string;
  bottomProductId?: string;
  outerwearProductId?: string;
  discountPercent: number;
  featuredLabel?: string;
}

export interface CartItem {
  id: string;
  type: 'product' | 'look';
  title: string;
  subtitle: string;
  image: string;
  unitPrice: number;
  originalPrice?: number;
  discountBadge?: string;
  quantity: number;
  productId?: string;
  lookId?: string;
}

export type PageRoute =
  | { name: 'calidad' }
  | { name: 'combina'; category?: CategoryId; lookId?: string }
  | { name: 'producto'; slug: string; fromQr?: boolean }
  | { name: 'categoria'; category: 'mujer' | 'hombre' | 'ninos'; kidSub?: 'todos' | 'nino' | 'nina' }
  | { name: 'tiendas' };
