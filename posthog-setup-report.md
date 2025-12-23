# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Baza Pilates Next.js application. The integration includes:

- **Client-side initialization** via `instrumentation-client.ts` (Next.js 16+ approach) with automatic pageview tracking and exception capture
- **Server-side tracking** for contact form submissions using `posthog-node` SDK
- **Reverse proxy configuration** in `next.config.ts` to route analytics through `/ingest` for better tracking reliability
- **Environment variables** configured in `.env` with `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`
- **User identification** on successful contact form submissions with email, name, phone, and contact preferences

## Events Implemented

| Event Name | Description | File Path |
|------------|-------------|-----------|
| `contact_form_submitted` | User successfully submitted the contact form | `app/kontakt/actions.ts` |
| `contact_form_error` | Contact form submission failed due to validation or server error | `app/kontakt/actions.ts` |
| `programme_clicked` | User clicked to view details of a specific pilates programme | `components/programme-card.tsx` |
| `book_trial_clicked` | User clicked the 'Book free trial training' CTA button | `components/programme-cta-buttons.tsx` |
| `contact_us_clicked` | User clicked the 'Contact us' button for duo/personal training inquiry | `components/programme-cta-buttons.tsx` |
| `team_member_clicked` | User clicked to view details of a specific team member | `components/team-member-card.tsx` |
| `faq_expanded` | User expanded an FAQ accordion item to read the answer | `components/faq-accordion.tsx` |
| `blog_post_clicked` | User clicked to read a specific blog post | `components/blog-post-card.tsx` |
| `news_article_clicked` | User clicked to read a specific news article | `components/news-article-card.tsx` |
| `gallery_image_clicked` | User clicked to view a gallery image in full size | `components/gallery-image-card.tsx` |
| `social_link_clicked` | User clicked on a social media link (Facebook, Instagram, TikTok) | `components/tracked-external-links.tsx` |
| `map_link_clicked` | User clicked to view the studio location on Google Maps | `components/tracked-external-links.tsx` |
| `mobile_menu_opened` | User opened the mobile navigation menu | `components/header.tsx` |

## Files Created/Modified

### New Files Created
- `instrumentation-client.ts` - PostHog client-side initialization
- `lib/posthog-server.ts` - Server-side PostHog client helper
- `components/programme-card.tsx` - Programme card with click tracking
- `components/programme-cta-buttons.tsx` - CTA buttons with event tracking
- `components/team-member-card.tsx` - Team member card with click tracking
- `components/faq-accordion.tsx` - FAQ accordion with expand tracking
- `components/blog-post-card.tsx` - Blog post card with click tracking
- `components/news-article-card.tsx` - News article card with click tracking
- `components/gallery-image-card.tsx` - Gallery image card with click tracking
- `components/tracked-external-links.tsx` - Social and map links with tracking

### Modified Files
- `.env` - Added PostHog environment variables
- `next.config.ts` - Added reverse proxy rewrites for PostHog
- `app/kontakt/actions.ts` - Added server-side event tracking
- `app/programi/page.tsx` - Using tracked programme cards
- `app/programi/[id]/page.tsx` - Using tracked CTA buttons
- `app/nas-tim/page.tsx` - Using tracked team member cards
- `app/vasa-pitanja/page.tsx` - Using tracked FAQ accordion
- `app/blog/page.tsx` - Using tracked blog post cards
- `app/novosti/page.tsx` - Using tracked news article cards
- `app/galerija/page.tsx` - Using tracked gallery image cards
- `components/footer.tsx` - Using tracked social and map links
- `components/header.tsx` - Added mobile menu tracking
- `components/button.tsx` - Added optional event tracking prop

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://eu.posthog.com/project/110652/dashboard/468298) - Main dashboard with all key metrics

### Insights
- [Contact Form Submissions](https://eu.posthog.com/project/110652/insights/79uvk4fK) - Tracks successful contact form submissions (key conversion metric)
- [Programme Interest Funnel](https://eu.posthog.com/project/110652/insights/z72WFLVZ) - Tracks user journey from viewing programmes to booking a trial
- [Social Media Engagement](https://eu.posthog.com/project/110652/insights/A0kSsYwm) - Tracks clicks on social media links by platform
- [Content Engagement](https://eu.posthog.com/project/110652/insights/LBtxAZIN) - Tracks user engagement with blog posts, news articles, and gallery
- [Contact Form Errors](https://eu.posthog.com/project/110652/insights/DWgJtHNT) - Monitors contact form errors to identify potential issues
