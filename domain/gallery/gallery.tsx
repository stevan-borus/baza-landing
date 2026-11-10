import { GalleryImage } from '@/domain/gallery/gallery-schema';

// One description per photo, in the order of /gal/galerija-1..32.webp.
const descriptions = [
  'Grupni trening Golden age pilatesa na reformerima uz instruktorku',
  'Mama sa ćerkom u Baza Pilates studiju',
  'Četiri vežbačice kleče na reformerima u Baza Pilates studiju u Novom Sadu',
  'Vežbačica leži na reformeru sa stopalima u trakama',
  'Vežbačice stoje na reformerima i rade sa pilates obručem',
  'Deca se igraju na podlozi u dečjem kutku studija',
  'Deca crtaju i igraju se u dečjoj sobi Baza Pilates studija',
  'Vežba na reformeru sa nogama ispruženim u trakama',
  'Instruktorka koriguje plank na reformeru tokom grupnog treninga',
  'Plank sa rukama na šipki reformera',
  'Istezanje preko šipke reformera ispod BAZA neonskog natpisa',
  'Stopala u trakama reformera, BAZA neon u pozadini',
  'Vežba sa malom pilates loptom',
  'Plank na reformeru u Baza Pilates studiju',
  'Bokserski udarci u fokuser na Energy pilates treningu',
  'Udarac nogom u fokuser na Energy pilates treningu',
  'Vežba sa TRX trakama na zidu studija',
  'Vežbačica drži pilates loptu iznad glave',
  'Dve vežbačice u bočnom istezanju na reformerima',
  'Tri vežbačice kleče na reformerima sa rukama na šipki',
  'Iskorak na reformeru pored BAZA neonskog natpisa',
  'Dve vežbačice rade iskorak sa pilates obručem',
  'Tim Baza Pilates studija sa devojčicom',
  'Instruktorka u razgovoru sa vežbačicama u studiju',
  'Dve vežbačice kleče na reformerima i vuku trake',
  'Dve nasmejane vežbačice ispod BAZA neonskog natpisa',
  'Istezanje preko šipke reformera, pogled odozgo',
  'Dve članice tima Baza Pilates studija',
  'Vežbačica oslonjena na šipku reformera',
  'Vežba stojeći na reformeru sa pilates obručem',
  'Tim Baza Pilates studija u Novom Sadu',
  'Vežba sa pilates obručem, krupni plan',
];

const galleryImages: GalleryImage[] = descriptions.map((alt, i) => ({
  id: `gallery-${i + 1}`,
  src: `/gal/galerija-${i + 1}.webp`,
  alt,
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
