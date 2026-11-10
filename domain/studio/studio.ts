// One source of truth for the studio's public facts, read by the structured
// data and the home page.
export const studio = {
  name: 'Baza Pilates',
  url: 'https://bazapilates.com',
  telephone: '+381600451316',
  email: 'bazapilates@gmail.com',
  address: {
    streetAddress: 'Futoška 33',
    addressLocality: 'Novi Sad',
    postalCode: '21000',
    addressCountry: 'RS',
  },
  geo: {
    latitude: 45.2489331,
    longitude: 19.8304764,
  },
  mapUrl: 'https://maps.google.com/?cid=11764108408070187275',
  // The earliest and latest sessions across every programme schedule.
  openingHours: {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '06:30',
    closes: '20:00',
  },
  sameAs: [
    'https://www.instagram.com/bazapilates/',
    'https://www.tiktok.com/@bazapilates',
  ],
} as const;
