'use client';

import { Dialog } from '@base-ui/react/dialog';
import { OptimizedImage } from '@/components/optimized-image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, ViewTransition } from 'react';

interface NewsImageDialogProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewsImageDialog({
  images,
  currentIndex,
  onIndexChange,
  open,
  onOpenChange,
}: NewsImageDialogProps) {
  const currentImage = images[currentIndex];
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  // Use refs to always have the latest values in the keyboard handler
  const currentIndexRef = useRef(currentIndex);
  const imagesLengthRef = useRef(images.length);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
    imagesLengthRef.current = images.length;
  }, [currentIndex, images.length]);

  const handlePrevious = () => {
    if (hasPrevious) {
      onIndexChange(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onIndexChange(currentIndex + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
    }

    const currentIdx = currentIndexRef.current;
    const totalImages = imagesLengthRef.current;

    if (e.key === 'ArrowLeft' && currentIdx > 0) {
      onIndexChange(currentIdx - 1);
    } else if (e.key === 'ArrowRight' && currentIdx < totalImages - 1) {
      onIndexChange(currentIdx + 1);
    } else if (e.key === 'Escape') {
      onOpenChange(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className='fixed inset-0 z-50 bg-black/70' />
        <Dialog.Popup
          onKeyDown={handleKeyDown}
          className='fixed inset-0 z-60 flex items-center justify-center p-4'
        >
          {/* Close button */}
          <Dialog.Close className='absolute top-4 right-4 z-70 rounded-md p-2 text-white transition-colors hover:text-white/80'>
            <span className='sr-only'>Zatvori</span>
            <X className='h-6 w-6' aria-hidden='true' />
          </Dialog.Close>

          {/* Image container */}
          <div className='relative h-full max-h-[90vh] w-full max-w-[90vw]'>
            <ViewTransition>
              <div className='relative h-full w-full'>
                <OptimizedImage
                  src={currentImage}
                  alt={`Novost slika ${currentIndex + 1}`}
                  fill
                  className='object-contain'
                  sizes='90vw'
                  loading='eager'
                  hidePlaceholder={true}
                />
              </div>
            </ViewTransition>

            {/* Previous button */}
            {hasPrevious && (
              <button
                onClick={handlePrevious}
                className='bg-brand text-brand-foreground hover:bg-brand/90 absolute top-1/2 left-2 z-70 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-colors md:h-10 md:w-10'
                aria-label='Prethodna slika'
              >
                <ChevronLeft className='size-4 md:size-5' />
              </button>
            )}

            {/* Next button */}
            {hasNext && (
              <button
                onClick={handleNext}
                className='bg-brand text-brand-foreground hover:bg-brand/90 absolute top-1/2 right-2 z-70 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-colors md:h-10 md:w-10'
                aria-label='Sledeća slika'
              >
                <ChevronRight className='size-4 md:size-5' />
              </button>
            )}
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
