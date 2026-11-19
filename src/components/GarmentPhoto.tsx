import React from 'react';
import { Product } from '../types';

interface GarmentPhotoProps {
  product: Product;
  preferFlatLay?: boolean;
  className?: string;
}

/**
 * Always renders crisp, realistic studio product photography — never SVG cartoons.
 */
export const GarmentPhoto: React.FC<GarmentPhotoProps> = ({
  product,
  preferFlatLay = true,
  className = 'w-full h-full',
}) => {
  const src = preferFlatLay
    ? product.flatLayImage
    : product.images[0] ?? product.flatLayImage;

  return (
    <img
      src={src}
      alt={product.name}
      loading="lazy"
      className={`${className} ${
        preferFlatLay ? 'object-contain garment-blend' : 'object-cover object-top'
      }`}
    />
  );
};
