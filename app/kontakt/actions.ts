'use server';

import { Resend } from 'resend';
import {
  contactFormDataSchema,
  type ContactFormData,
} from '@/domain/contact/contact-schema';
import { ContactEmailTemplate } from '@/components/contact-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success: boolean;
  errors?: Record<string, string>;
  error?: string;
  submitted?: boolean;
};

export async function sendContactEmail(
  prevState: ContactFormState | null,
  formData: FormData,
): Promise<ContactFormState> {
  try {
    // Extract form data
    const data: ContactFormData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      message: formData.get('message') as string,
      contactMethod: formData.get('contactMethod') as 'sms' | 'call' | 'email',
    };

    // Validate the data
    const result = contactFormDataSchema.safeParse(data);

    if (!result.success) {
      const errors: Record<string, string> = {};

      result.error.issues.forEach(issue => {
        const path = issue.path;
        if (path.length > 0) {
          const fieldName = path[0].toString();
          // Only set the first error for each field
          if (!errors[fieldName]) {
            errors[fieldName] = issue.message;
          }
        }
      });

      return {
        success: false,
        errors,
      };
    }

    const validatedData = result.data;

    const emailResult = await resend.emails.send({
      from: 'Kontakt Forma <noreply@contact.bazapilates.com>',
      to: 'bazapilates@gmail.com',
      subject: `Nova poruka od ${validatedData.firstName} ${validatedData.lastName}`,
      react: ContactEmailTemplate({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phoneNumber: validatedData.phoneNumber,
        message: validatedData.message,
        contactMethod: validatedData.contactMethod,
      }),
    });

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return {
        success: false,
        error: 'Greška pri slanju e-maila',
      };
    }

    return {
      success: true,
      submitted: true,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }
    return {
      success: false,
      error: 'Došlo je do greške pri slanju poruke',
    };
  }
}
