import Link from 'next/link';
import Image from 'next/image';
import Instagram from '@/resources/icons/instagram';
import Tiktok from '@/resources/icons/tiktok';
import Facebook from '@/resources/icons/facebook';

export function Footer() {
  return (
    <footer className='bg-brand text-brand-foreground flex flex-col gap-6 px-4 py-6 md:flex-row md:justify-between md:px-20 md:py-8'>
      {/* Mobile: Logo and Social Media at top */}
      {/* Desktop: Kontakt section on left */}
      <section className='order-1 flex flex-col items-center gap-6 md:order-2 md:justify-between'>
        <div className='relative h-11 w-27 md:h-25 md:w-60'>
          <Link href='/'>
            <Image
              src='/logo-white.png'
              alt='Baza Pilates Logo'
              fill
              className='object-cover'
              sizes='(max-width: 768px) 108px, 240px'
            />
          </Link>
        </div>

        <div className='flex justify-center gap-6 md:w-full md:justify-between md:px-11'>
          <a
            href='https://www.facebook.com/people/Baza-Pilates-Studio/61584067745610/#'
            target='_blank'
          >
            <Facebook className='text-brand-foreground size-6' />
          </a>
          <a href='https://www.instagram.com/bazapilates/' target='_blank'>
            <Instagram className='text-brand-foreground size-6' />
          </a>
          <a href='https://www.tiktok.com/@bazapilates' target='_blank'>
            <Tiktok className='text-brand-foreground size-6' />
          </a>
        </div>

        <a
          href='https://maps.app.goo.gl/ZptCRSMK9J5bjAYR9'
          target='_blank'
          className='text-brand-foreground hidden text-center text-base hover:underline md:block'
        >
          Prikaži na mapi
        </a>
      </section>

      {/* Mobile: Kontakt and Navigacija side by side */}
      <div className='order-2 flex justify-between gap-6 md:hidden'>
        <section className='flex flex-col gap-6'>
          <h3 className='text-brand-foreground text-xl font-bold uppercase'>
            Kontakt
          </h3>

          <div className='flex flex-col gap-3'>
            <div className='flex flex-col'>
              <p className='text-sm font-bold'>Adresa:</p>
              <a
                href='https://maps.app.goo.gl/ZptCRSMK9J5bjAYR9'
                target='_blank'
                className='text-brand-foreground text-base hover:underline'
              >
                Futoška 33, Novi Sad
              </a>
            </div>

            <div className='flex flex-col'>
              <p className='text-sm font-bold'>Telefon:</p>
              <a
                href='tel:+381600451316'
                className='text-brand-foreground text-base hover:underline'
              >
                +381600451316
              </a>
            </div>

            <div className='flex flex-col'>
              <p className='text-sm font-bold'>Email:</p>
              <a
                href='mailto:baza@gmail.com'
                className='text-brand-foreground text-base hover:underline'
              >
                baza@gmail.com
              </a>
            </div>
          </div>
        </section>

        <section className='flex flex-col gap-6'>
          <h3 className='text-brand-foreground text-xl font-bold uppercase'>
            Navigacija
          </h3>

          <div className='flex flex-col gap-3'>
            <Link
              href='/nas-tim'
              className='text-brand-foreground text-base hover:underline'
            >
              Naš tim
            </Link>
            <Link
              href='/programi'
              className='text-brand-foreground text-base hover:underline'
            >
              Programi
            </Link>
            <Link
              href='/blog'
              className='text-brand-foreground text-base hover:underline'
            >
              Blog
            </Link>
            <Link
              href='/kontakt'
              className='text-brand-foreground text-base hover:underline'
            >
              Kontakt
            </Link>
          </div>
        </section>
      </div>

      {/* Desktop: Kontakt section on left */}
      <section className='order-1 hidden flex-col gap-6 md:flex'>
        <h3 className='text-brand-foreground text-xl font-bold uppercase'>
          Kontakt
        </h3>

        <div className='flex flex-col gap-3'>
          <div className='flex flex-col'>
            <p className='text-sm font-bold'>Adresa:</p>
            <a
              href='https://maps.app.goo.gl/ZptCRSMK9J5bjAYR9'
              target='_blank'
              className='text-brand-foreground text-base hover:underline'
            >
              Futoška 33, Novi Sad
            </a>
          </div>

          <div className='flex flex-col'>
            <p className='text-sm font-bold'>Telefon:</p>
            <a
              href='tel:+381600451316'
              className='text-brand-foreground text-base hover:underline'
            >
              +381600451316
            </a>
          </div>

          <div className='flex flex-col'>
            <p className='text-sm font-bold'>Email:</p>
            <a
              href='mailto:bazapilates@gmail.com'
              className='text-brand-foreground text-base hover:underline'
            >
              bazapilates@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Desktop: Navigacija section on right */}
      <section className='order-3 hidden flex-col gap-6 md:flex'>
        <h3 className='text-brand-foreground text-xl font-bold uppercase'>
          Navigacija
        </h3>

        <div className='flex flex-col gap-3'>
          <Link
            href='/programi'
            className='text-brand-foreground text-base hover:underline'
          >
            Programi
          </Link>
          <Link
            href='/nas-tim'
            className='text-brand-foreground text-base hover:underline'
          >
            Naš tim
          </Link>
          <Link
            href='/blog'
            className='text-brand-foreground text-base hover:underline'
          >
            Blog
          </Link>
          <Link
            href='/kontakt'
            className='text-brand-foreground text-base hover:underline'
          >
            Kontakt
          </Link>
        </div>
      </section>

      {/* Mobile: Show on Map at bottom */}
      <div className='order-3 flex justify-center md:hidden'>
        <a
          href='https://maps.app.goo.gl/ZptCRSMK9J5bjAYR9'
          target='_blank'
          className='text-brand-foreground text-center text-base hover:underline'
        >
          Prikaži na mapi
        </a>
      </div>
    </footer>
  );
}
