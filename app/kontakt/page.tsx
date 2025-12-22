'use client';

import { ViewTransition } from 'react';
import { useActionState, useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { sendContactEmail, type ContactFormState } from './actions';
import { cn } from '@/lib/utils';
import { Form } from '@base-ui/react/form';
import { Input } from '@base-ui/react/input';
import { RadioGroup } from '@base-ui/react/radio-group';
import { Radio } from '@base-ui/react/radio';
import { Field } from '@base-ui/react/field';
import { Button as BaseButton } from '@base-ui/react/button';

const initialState: ContactFormState = {
  success: false,
};

function ContactForm({ onReset }: { onReset: () => void }) {
  const [state, formAction, isPending] = useActionState<
    ContactFormState,
    FormData
  >(sendContactEmail, initialState);
  const prevSubmittedRef = useRef(false);

  const submitted = state.submitted ?? false;
  const errors = state.errors ?? {};

  // Show toast on successful submission
  useEffect(() => {
    if (submitted && !prevSubmittedRef.current) {
      toast.success('Hvala vam!', {
        description:
          'Vaša poruka je uspešno poslata. Kontaktiraćemo vas uskoro.',
        duration: 5000,
      });
      prevSubmittedRef.current = true;

      // Reset form after showing toast
      const form = document.getElementById('contact-form') as HTMLFormElement;
      if (form) {
        form.reset();
      }
      // Reset the action state by remounting after a short delay
      const timeoutId = setTimeout(() => {
        onReset();
      }, 100);

      return () => clearTimeout(timeoutId);
    } else if (!submitted) {
      prevSubmittedRef.current = false;
    }
  }, [submitted, onReset]);

  return (
    <Form
      id='contact-form'
      action={formAction}
      className='flex w-full flex-col gap-4'
      errors={errors}
    >
      {/* Ime and Prezime - Two columns */}
      <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
        <Field.Root name='firstName'>
          <Input
            type='text'
            id='firstName'
            name='firstName'
            className={cn(
              'border-b-border text-foreground focus:border-b-ring w-full border-b bg-transparent px-4 py-3 transition-colors focus:outline-none',
              errors.firstName &&
                'border-destructive placeholder:text-destructive',
            )}
            placeholder='Ime'
          />
        </Field.Root>

        <Field.Root name='lastName'>
          <Input
            type='text'
            id='lastName'
            name='lastName'
            className={cn(
              'border-b-border text-foreground focus:border-b-ring w-full border-b bg-transparent px-4 py-3 transition-colors focus:outline-none',
              errors.lastName &&
                'border-destructive placeholder:text-destructive',
            )}
            placeholder='Prezime'
          />
        </Field.Root>
      </div>

      {/* Email - Full width */}
      <Field.Root name='email'>
        <Input
          type='email'
          id='email'
          name='email'
          className={cn(
            'border-b-border text-foreground focus:border-b-ring w-full border-b bg-transparent px-4 py-3 transition-colors focus:outline-none',
            errors.email && 'border-destructive placeholder:text-destructive',
          )}
          placeholder='Email'
        />
      </Field.Root>

      {/* Broj telefona - Full width */}
      <Field.Root name='phoneNumber'>
        <Input
          type='tel'
          id='phoneNumber'
          name='phoneNumber'
          className={cn(
            'border-b-border text-foreground focus:border-b-ring w-full border-b bg-transparent px-4 py-3 transition-colors focus:outline-none',
            errors.phoneNumber &&
              'border-destructive placeholder:text-destructive',
          )}
          placeholder='Broj telefona'
        />
      </Field.Root>

      {/* Poruka - Textarea with custom rounded corners */}
      <Field.Root name='message'>
        <Field.Label
          htmlFor='message'
          className={cn(
            'text-foreground mb-2 block text-sm font-medium',
            errors.message && 'text-destructive',
          )}
        >
          Poruka
        </Field.Label>
        <Field.Control
          id='message'
          name='message'
          render={props => (
            <textarea
              {...props}
              rows={6}
              className={cn(
                'border-border text-foreground focus:ring-ring w-full resize-none rounded-tl-[25px] rounded-br-[25px] border bg-white px-4 py-3 transition-shadow focus:ring-2 focus:outline-none',
                errors.message && 'border-destructive',
              )}
            />
          )}
        />
      </Field.Root>

      {/* Radio buttons for contact method */}
      <Field.Root name='contactMethod'>
        <RadioGroup
          name='contactMethod'
          required
          className={cn(errors.contactMethod && 'border-destructive')}
        >
          <div className='space-y-3'>
            <label className='flex cursor-pointer items-center gap-3'>
              <Radio.Root
                value='sms'
                className={cn(
                  'border-border bg-input focus:ring-brand-light relative h-5 w-5 cursor-pointer rounded-full border transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none',
                  'data-checked:border-input data-checked:bg-brand-light',
                  errors.contactMethod && 'border-destructive',
                )}
              >
                <Radio.Indicator className='absolute inset-0 flex items-center justify-center rounded-full'>
                  <span className='bg-brand-light h-2.5 w-2.5 rounded-full' />
                </Radio.Indicator>
              </Radio.Root>
              <span className='text-foreground'>Obavesti me putem sms-a</span>
            </label>
            <label className='flex cursor-pointer items-center gap-3'>
              <Radio.Root
                value='call'
                className={cn(
                  'border-border bg-input focus:ring-brand-light relative h-5 w-5 cursor-pointer rounded-full border transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none',
                  'data-checked:border-input data-checked:bg-brand-light',
                  errors.contactMethod && 'border-destructive',
                )}
              >
                <Radio.Indicator className='absolute inset-0 flex items-center justify-center rounded-full'>
                  <span className='bg-brand-light h-2.5 w-2.5 rounded-full' />
                </Radio.Indicator>
              </Radio.Root>
              <span className='text-foreground'>Obavesti me putem poziva</span>
            </label>
            <label className='flex cursor-pointer items-center gap-3'>
              <Radio.Root
                value='email'
                className={cn(
                  'border-border bg-input focus:ring-brand-light relative h-5 w-5 cursor-pointer rounded-full border transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none',
                  'data-checked:border-input data-checked:bg-brand-light',
                  errors.contactMethod && 'border-destructive',
                )}
              >
                <Radio.Indicator className='absolute inset-0 flex items-center justify-center rounded-full'>
                  <span className='bg-brand-light h-2.5 w-2.5 rounded-full' />
                </Radio.Indicator>
              </Radio.Root>
              <span className='text-foreground'>Obavesti me putem e-maila</span>
            </label>
          </div>
        </RadioGroup>
        {errors.contactMethod && (
          <Field.Error className='text-destructive mt-1 text-sm'>
            {errors.contactMethod}
          </Field.Error>
        )}
      </Field.Root>

      {/* Submit error */}
      {state.error && (
        <div className='bg-destructive/10 border-destructive/20 text-destructive rounded-lg border p-3 text-sm'>
          {state.error}
        </div>
      )}

      {/* Submit button */}
      <BaseButton
        nativeButton
        type='submit'
        disabled={isPending}
        className='bg-accent text-accent-foreground hover:bg-accent/90 w-full self-center rounded-full px-6 py-3 text-base font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:w-75'
      >
        {isPending ? 'Slanje...' : 'Pošalji'}
      </BaseButton>
    </Form>
  );
}

export default function Contact() {
  const [formKey, setFormKey] = useState(0);

  return (
    <ViewTransition>
      <main className='flex flex-1 flex-col justify-center gap-8 lg:gap-12'>
        <section className='flex flex-col items-center justify-center gap-8 px-4 py-8 lg:gap-12 lg:px-20 lg:py-12'>
          <div className='relative flex items-center justify-center'>
            <h1>Kontakt</h1>
          </div>

          <div className='flex w-full max-w-265 items-center justify-center'>
            <ContactForm
              key={formKey}
              onReset={() => setFormKey(prev => prev + 1)}
            />
          </div>
        </section>
      </main>
    </ViewTransition>
  );
}
