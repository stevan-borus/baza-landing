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
            .email-value {
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
            className='email-container mx-auto max-w-2xl rounded-lg shadow-sm'
            style={{
              backgroundColor: colors.light.card,
              fontFamily:
                "'Metropolis', 'Metropolis Fallback', system-ui, sans-serif",
              padding: '32px',
            }}
          >
            <Heading
              className='email-heading mb-8 border-b-2 pb-4 text-2xl font-bold'
              style={{
                color: colors.light.foreground,
                borderColor: colors.light.brand,
              }}
            >
              Nova poruka sa kontakt forme
            </Heading>

            <Section className='mt-6 space-y-4'>
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
                <span
                  className='email-value'
                  style={{ color: colors.light.foreground }}
                >
                  {firstName}
                </span>
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
                <span
                  className='email-value'
                  style={{ color: colors.light.foreground }}
                >
                  {lastName}
                </span>
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
                <span
                  className='email-value'
                  style={{ color: colors.light.foreground }}
                >
                  {email}
                </span>
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
                <span
                  className='email-value'
                  style={{ color: colors.light.foreground }}
                >
                  {phoneNumber}
                </span>
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
                <span
                  className='email-value'
                  style={{ color: colors.light.foreground }}
                >
                  {contactMethodLabels[contactMethod]}
                </span>
              </Text>
            </Section>

            <Section
              className='email-section mt-10 rounded-md'
              style={{
                backgroundColor: colors.light.muted,
                padding: '20px',
              }}
            >
              <Heading
                as='h2'
                className='email-section-heading mt-0 mb-4 text-xl font-semibold'
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
