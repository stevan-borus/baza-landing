import { GalleryImage } from '@/domain/gallery/gallery-schema';

const galleryImages: GalleryImage[] = [
  {
    id: 'gallery-1',
    src: '/gallery-1.jpg',
    alt: 'Galerija 1',
  },
  {
    id: 'gallery-2',
    src: '/gallery-2.jpg',
    alt: 'Galerija 2',
  },
  {
    id: 'gallery-3',
    src: '/gallery-3.jpg',
    alt: 'Galerija 3',
  },
  {
    id: 'gallery-4',
    src: '/gallery-4.jpg',
    alt: 'Galerija 4',
  },
];

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
