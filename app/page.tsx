import Image from 'next/image';
import { BLUR_DATA_URL } from '@/lib/image-utils';

export const dynamic = 'force-static';

export default function Home() {
  return (
    <>
      <main className='flex flex-1 flex-col justify-center gap-8 lg:gap-12'>
        <section className='relative h-120 w-full 2xl:h-150'>
          <div className='sm:hidden'>
            <Image
              src='/home-banner-mobile.webp'
              alt='Naslovna slika'
              fill
              className='object-cover'
              sizes='100vw'
              priority
              placeholder='blur'
              blurDataURL={BLUR_DATA_URL}
            />
          </div>

          <div className='hidden sm:block'>
            <Image
              src='/home-banner.webp'
              alt='Naslovna slika'
              fill
              className='object-cover'
              sizes='100vw'
              priority
              placeholder='blur'
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        </section>

        <section className='flex flex-col gap-8 px-4 lg:gap-12 lg:px-20'>
          <h1>Dobrodošli u Bazu</h1>

          <p className='text-center text-xl'>
            Baza je nastala iz želje da kreiramo mesto gde možete doći da
            trenirate ali i mesto na kom se međusobno osluškujemo, podržavamo i
            osnažujemo. Imajući u vidu da je vreme dragoceno, kada dođete u Bazu
            želimo da vam pružimo više od treninga i da vreme provedeno kod nas
            bude poklon vama, vašem telu i umu. Oslanjajući se na naše potrebe,
            kao profesionalne sportiskinje, majke, savremene žene, otvorile smo
            mesto gde možete odvojiti vreme samo za sebe ili doći sa vašim
            mališanima, jer znamo koliko to nekada znači, kao i mesto gde možete
            naučiti kako da pomognete svom telu kroz ishranu, posavetovati se
            nutricionistom, pedijatrom ili fizioterapeutom. Nastojimo da vam
            kroz sveobuhvatni pristup pomognemo da osvestite svoju snagu i
            iskoristite svoje potencijale.  Ideja o Bazi je nastala iz jednog
            prijateljstva tri žene, dugogodišnjeg, snažnog i ispunjenog
            podrškom. Kroz život, sport, majčinstvo i karijeru uvidele smo
            značaj ,,bazne tačke’’, tog jednog mesta kom se vraćamo kako bismo
            se osećale bolje, lepše i jače.  Danas to mesto delimo sa vama.
          </p>
        </section>

        <section className='relative flex items-center justify-center px-4 sm:mx-auto sm:px-0'>
          <div className='h-82 w-82 sm:h-80 sm:w-142'>
            <Image
              src='/home-bottom.webp'
              alt='Donja slika'
              fill
              className='object-cover'
              sizes='(max-width: 640px) 328px, 568px'
              placeholder='blur'
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        </section>
      </main>
    </>
  );
}
