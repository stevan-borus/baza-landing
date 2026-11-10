import { OptimizedImage } from '@/components/optimized-image';
import { ProgrammeCard } from '@/components/programme-card';
import { Button } from '@/components/button';
import { TrackedExternalLink } from '@/components/tracked-external-links';
import { getProgrammes } from '@/domain/programmes/programmes';
import { studio } from '@/domain/studio/studio';
import type { Metadata } from 'next';
import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: { absolute: 'Reformer pilates Novi Sad | Baza Pilates studio' },
  description:
    'Baza Pilates je studio za reformer pilates u Novom Sadu, u Futoškoj 33. Reformer, Energy, Golden age i Moms&Minis programi, podrška fizioterapeuta i besplatan probni trening.',
  alternates: {
    canonical: '/',
  },
};

const programmeSummaries: Record<string, string> = {
  'reformer-pilates':
    'najtraženiji trening, za snagu, balans i fokus na svaki pokret, dva ili tri puta nedeljno.',
  'energy-pilates':
    'za one koje vole dinamične i izazovne treninge, a i dalje teže preciznom pokretu i fleksibilnosti.',
  'golden-age-pilates':
    'reformer pilates za zrelije godine, prilagođen povredama i bolovima koji neretko dolaze sa godinama.',
  strongher:
    'funkcionalni trening snage, jer je snaga neizostavni deo ženskog zdravlja.',
};

export default async function Home() {
  const programmes = await getProgrammes();

  return (
    <>
      <main className='flex flex-1 flex-col justify-center gap-8 lg:gap-12'>
        <section className='relative h-120 w-full 2xl:h-150'>
          <div className='sm:hidden'>
            <OptimizedImage
              src='/home-banner-mobile.webp'
              alt='Grupni trening reformer pilatesa u Baza Pilates studiju u Novom Sadu'
              fill
              className='object-cover'
              sizes='(max-width: 640px) 640px, 640px'
              fetchPriority='high'
              loading='eager'
            />
          </div>

          <div className='hidden sm:block'>
            <OptimizedImage
              src='/home-banner.webp'
              alt='Grupni trening reformer pilatesa u Baza Pilates studiju u Novom Sadu'
              fill
              className='object-cover'
              sizes='100vw'
              fetchPriority='high'
              loading='eager'
            />
          </div>
        </section>

        <section className='flex flex-col gap-8 px-4 lg:gap-12 lg:px-20'>
          <h1>Reformer pilates u Novom Sadu</h1>

          <h2>Dobrodošli u Bazu</h2>

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
            nutricionistom, pedijatrom ili fizioterapeutom. Nastojimo da vam
            kroz sveobuhvatni pristup pomognemo da osvestite svoju snagu i
            iskoristite svoje potencijale. Ideja o Bazi je nastala iz jednog
            prijateljstva tri žene, dugogodišnjeg, snažnog i ispunjenog
            podrškom. Kroz život, sport, majčinstvo i karijeru uvidele smo
            značaj ,,bazne tačke’’, tog jednog mesta kom se vraćamo kako bismo
            se osećale bolje, lepše i jače. Danas to mesto delimo sa vama.
          </p>
        </section>

        <section className='relative flex items-center justify-center px-4 sm:mx-auto sm:px-0'>
          <div className='h-82 w-82 sm:h-80 sm:w-142'>
            <OptimizedImage
              src='/home-bottom.webp'
              alt='Tim Baza Pilates studija u Novom Sadu'
              fill
              className='object-cover'
              sizes='(max-width: 640px) 328px, 568px'
            />
          </div>
        </section>

        <section className='flex flex-col gap-8 px-4 lg:gap-12 lg:px-20'>
          <h2>Naši programi</h2>

          <p className='text-center text-xl'>
            U Bazi treniramo na reformerima, uz instruktore i fizioterapeuta.
          </p>

          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
            {programmes.map(programme => (
              <ProgrammeCard
                key={programme.id}
                id={programme.id}
                title={programme.title}
                subtitle={programme.subtitle}
                image={programme.image}
                imagePosition={programme.imagePosition}
              />
            ))}
          </div>
        </section>

        <section className='flex flex-col gap-8 px-4 lg:gap-12 lg:px-20'>
          <h2>Reformer pilates u Bazi</h2>

          <p className='text-center text-xl'>
            Reformer je sprava sa pokretnom platformom, oprugama i trakama koja
            omogućava veliki broj kontrolisanih i preciznih vežbi. Instruktorka
            jačinu opruga i položaj tela prilagođava svakoj vežbačici, zato je
            reformer pilates pogodan i za potpune početnike i za one koji se
            oporavljaju od povrede. Polaznice ističu da se rezultati vide i van
            studija: bolje držanje, pravilnije disanje i smireniji, fokusiraniji
            um.
          </p>

          <p className='text-center text-xl'>
            Treninge u Baza Pilates studiju u Novom Sadu vode sertifikovane
            instruktorke reformer pilatesa, a tim upotpunjuju
            fizioterapeutkinje, nutricionistkinja i pedijatarka.{' '}
            <Link href='/nas-tim/snezana-kragovic' className='underline'>
              Snežana Kragović
            </Link>
            , viši fizioterapeut i sertifikovana instruktorka metode Balanced
            Body, pilates drži već 18 godina.{' '}
            <Link href='/nas-tim/danica-piper' className='underline'>
              Danica Piper
            </Link>{' '}
            je sertifikovana instruktorka reformer pilatesa i jedna od
            osnivačica studija. Upoznajte{' '}
            <Link href='/nas-tim' className='underline'>
              ceo tim
            </Link>
            .
          </p>

          <h3 className='text-brand text-center text-xl font-bold lg:text-3xl'>
            Koji program je za vas
          </h3>

          <ul className='mx-auto flex max-w-3xl list-disc flex-col gap-3 pl-6 text-xl'>
            {programmes.map(programme => (
              <li key={programme.id}>
                <Link href={`/programi/${programme.id}`} className='underline'>
                  {programme.title}
                </Link>
                {programmeSummaries[programme.id] &&
                  `: ${programmeSummaries[programme.id]}`}
              </li>
            ))}
          </ul>

          <p className='text-center text-xl'>
            Treninzi se održavaju od ponedeljka do petka, od{' '}
            {studio.openingHours.opens} do {studio.openingHours.closes}. Termini
            i cene paketa za svaki program nalaze se na stranici programa, a
            odgovore na najčešća pitanja, od toga koliko često trenirati do toga
            da li je reformer bezbedan uz povredu, naći ćete na stranici{' '}
            <Link href='/vasa-pitanja' className='underline'>
              Vaša pitanja
            </Link>
            . Prvi, probni trening je besplatan.
          </p>
        </section>

        <section className='flex flex-col items-center gap-8 px-4 lg:gap-12 lg:px-20'>
          <h2>Gde se nalazimo</h2>

          <p className='text-center text-xl'>
            Baza Pilates studio nalazi se u Futoškoj 33 u Novom Sadu.
          </p>

          <address className='flex flex-col items-center gap-3 text-center text-xl not-italic'>
            <p>
              {studio.address.streetAddress}, {studio.address.postalCode}{' '}
              {studio.address.addressLocality}
            </p>
            <p>
              Ponedeljak – petak: {studio.openingHours.opens} –{' '}
              {studio.openingHours.closes}
            </p>
            <a href={`tel:${studio.telephone}`} className='hover:underline'>
              {studio.telephone}
            </a>
            <TrackedExternalLink
              href={studio.mapUrl}
              className='hover:underline'
              eventName='map_link_clicked'
              eventProperties={{ location: 'home' }}
            >
              Prikaži na mapi
            </TrackedExternalLink>
          </address>

          <Button
            href='/kontakt'
            className='text-lg lg:text-xl'
            trackEvent={{
              event: 'book_trial_clicked',
              properties: { source: 'home' },
            }}
          >
            Zakaži svoj BESPLATAN probni trening
          </Button>
        </section>
      </main>
    </>
  );
}
