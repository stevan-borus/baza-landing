'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Dialog } from '@base-ui/react/dialog';

const navigation = [
  { name: 'Programi', href: '/programi' },
  { name: 'Naš tim', href: '/nas-tim' },
  { name: 'Galerija', href: '/galerija' },
  { name: 'Novosti', href: '/novosti' },
  { name: 'Blog', href: '/blog' },
  { name: 'Vaša pitanja', href: '/vasa-pitanja' },
  { name: 'Kontakt', href: '/kontakt' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='bg-header border-border sticky top-0 z-50 border-b'>
      <nav className='flex w-full items-center justify-between px-4 py-4 lg:px-20'>
        {/* Logo */}
        <div className='flex lg:flex-1'>
          <Link href='/' className='-m-1.5 p-1.5'>
            <Image
              src='/baza-logo.png'
              alt='Baza Pilates Logo'
              width={108}
              height={44}
              priority
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className='hidden lg:flex lg:gap-x-8'>
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className='text-brand hover:text-brand/80 text-xl transition-colors'
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile menu with Base UI Dialog (styled as Sheet) */}
        <div className='flex lg:hidden'>
          <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <Dialog.Trigger className='text-brand -m-2.5 inline-flex items-center justify-center rounded-md p-2.5'>
              <span className='sr-only'>Open main menu</span>
              <Menu className='h-6 w-6' aria-hidden='true' />
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Backdrop className='bg-foreground/20 fixed inset-0 z-40 backdrop-blur-sm lg:hidden' />
              <Dialog.Popup className='bg-header border-border animate-in slide-in-from-top fixed top-0 right-0 left-0 z-50 border-b-2 shadow-xl duration-300 lg:hidden'>
                <div className='px-4 py-4'>
                  <div className='mb-6 flex items-center justify-between'>
                    <Link
                      href='/'
                      className='-m-1.5 p-1.5'
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Image
                        src='/baza-logo.png'
                        alt='Baza Pilates Logo'
                        width={108}
                        height={44}
                        priority
                      />
                    </Link>
                    <Dialog.Close className='text-brand -m-2.5 rounded-md p-2.5'>
                      <span className='sr-only'>Close menu</span>
                      <X className='h-6 w-6' aria-hidden='true' />
                    </Dialog.Close>
                  </div>
                  <div className='flow-root'>
                    <div className='divide-border -my-6 divide-y'>
                      <div className='space-y-2 py-6'>
                        {navigation.map(item => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className='text-brand hover:text-brand/80 block px-3 py-4 text-lg transition-colors'
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </nav>
    </header>
  );
}
