import { z } from 'zod';

export const contactFormDataSchema = z.object({
  firstName: z.string().min(1, 'Ime je obavezno'),
  lastName: z.string().min(1, 'Prezime je obavezno'),
  email: z.email('Neispravan format e-maila'),
  phoneNumber: z.string().min(1, 'Broj telefona je obavezan'),
  message: z.string().min(1, 'Poruka je obavezna'),
  contactMethod: z.enum(['sms', 'call', 'email'], {
    error: 'Izaberi jednu opciju',
  }),
});

export type ContactFormData = z.infer<typeof contactFormDataSchema>;
