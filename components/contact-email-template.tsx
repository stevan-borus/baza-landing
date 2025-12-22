import {
  Html,
  Tailwind,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Head,
} from '@react-email/components';

interface ContactEmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  contactMethod: 'sms' | 'call' | 'email';
}

const contactMethodLabels = {
  sms: 'SMS',
  call: 'Poziv',
  email: 'E-mail',
};

// Brand colors from globals.css
const colors = {
  light: {
    background: '#fdf7f4', // --background
    foreground: '#151e3f', // --foreground
    card: '#ffffff', // --card
    muted: '#f2ebe7', // --muted
    mutedForeground: '#5a6b8c', // --muted-foreground
    brand: '#2e5b42', // --brand
    accent: '#6e1644', // --accent
    border: '#e5d5cc', // --border
  },
  dark: {
    background: '#252525', // oklch(0.145 0 0) approximation
    foreground: '#fafafa', // oklch(0.985 0 0) approximation
    card: '#252525',
    muted: '#404040', // oklch(0.269 0 0) approximation
    mutedForeground: '#b3b3b3', // oklch(0.708 0 0) approximation
    brand: '#2e5b42', // Keep brand color consistent
    accent: '#6e1644', // Keep accent color consistent
    border: '#404040',
  },
};

export function ContactEmailTemplate({
  firstName,
  lastName,
  email,
  phoneNumber,
  message,
  contactMethod,
}: ContactEmailTemplateProps) {
  return (
    <Html>
      <Head>
        <style>{`
          @media (prefers-color-scheme: dark) {
            .email-body {
              background-color: ${colors.dark.background} !important;
            }
            .email-container {
              background-color: ${colors.dark.card} !important;
            }
            .email-heading {
              color: ${colors.dark.foreground} !important;
              border-color: ${colors.dark.brand} !important;
            }
            .email-text {
              color: ${colors.dark.mutedForeground} !important;
            }
            .email-text-strong {
              color: ${colors.dark.foreground} !important;
            }
            .email-section {
              background-color: ${colors.dark.muted} !important;
            }
            .email-section-heading {
              color: ${colors.dark.foreground} !important;
            }
            .email-section-text {
              color: ${colors.dark.mutedForeground} !important;
            }
          }
        `}</style>
      </Head>
      <Tailwind>
        <Body
          className='email-body font-sans'
          style={{ backgroundColor: colors.light.background }}
        >
          <Container
            className='email-container mx-auto max-w-2xl rounded-lg p-8 shadow-sm'
            style={{
              backgroundColor: colors.light.card,
              fontFamily:
                "'Metropolis', 'Metropolis Fallback', system-ui, sans-serif",
            }}
          >
            <Heading
              className='email-heading mb-6 border-b-2 pb-3 text-2xl font-bold'
              style={{
                color: colors.light.foreground,
                borderColor: colors.light.brand,
              }}
            >
              Nova poruka sa kontakt forme
            </Heading>

            <Section className='mt-5 space-y-3'>
              <Text
                className='email-text m-0'
                style={{ color: colors.light.mutedForeground }}
              >
                <strong
                  className='email-text-strong'
                  style={{ color: colors.light.foreground }}
                >
                  Ime:
                </strong>{' '}
                {firstName}
              </Text>
              <Text
                className='email-text m-0'
                style={{ color: colors.light.mutedForeground }}
              >
                <strong
                  className='email-text-strong'
                  style={{ color: colors.light.foreground }}
                >
                  Prezime:
                </strong>{' '}
                {lastName}
              </Text>
              <Text
                className='email-text m-0'
                style={{ color: colors.light.mutedForeground }}
              >
                <strong
                  className='email-text-strong'
                  style={{ color: colors.light.foreground }}
                >
                  Email:
                </strong>{' '}
                {email}
              </Text>
              <Text
                className='email-text m-0'
                style={{ color: colors.light.mutedForeground }}
              >
                <strong
                  className='email-text-strong'
                  style={{ color: colors.light.foreground }}
                >
                  Broj telefona:
                </strong>{' '}
                {phoneNumber}
              </Text>
              <Text
                className='email-text m-0'
                style={{ color: colors.light.mutedForeground }}
              >
                <strong
                  className='email-text-strong'
                  style={{ color: colors.light.foreground }}
                >
                  Način kontakta:
                </strong>{' '}
                {contactMethodLabels[contactMethod]}
              </Text>
            </Section>

            <Section
              className='email-section mt-8 rounded-md p-4'
              style={{ backgroundColor: colors.light.muted }}
            >
              <Heading
                as='h2'
                className='email-section-heading mt-0 mb-3 text-xl font-semibold'
                style={{ color: colors.light.foreground }}
              >
                Poruka:
              </Heading>
              <Text
                className='email-section-text m-0 leading-relaxed whitespace-pre-wrap'
                style={{ color: colors.light.mutedForeground }}
              >
                {message}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
