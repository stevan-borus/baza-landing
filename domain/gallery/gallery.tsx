import { GalleryImage } from '@/domain/gallery/gallery-schema';

const galleryImages: GalleryImage[] = Array.from({ length: 32 }, (_, i) => ({
  id: `gallery-${i + 1}`,
  src: `/gal/galerija-${i + 1}.webp`,
  alt: `Galerija ${i + 1}`,
}));

export async function getGalleryImages() {
  return galleryImages;
}

export async function getGalleryImageById(id: string) {
  const image = galleryImages.find(img => img.id === id);
  if (!image) {
    return null;
  }
  return image;
}

export async function getGalleryImageIds() {
  return galleryImages.map(img => img.id);
}
