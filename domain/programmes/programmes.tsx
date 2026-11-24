import Link from 'next/link';
import { FAQItem } from '@/domain/faq/faq-schema';
import {
  Programme,
  ProgrammeScheduleItem,
} from '@/domain/programmes/programmes-schema';
import { studio } from '@/domain/studio/studio';

const reformerThreeTimesWeekly: ProgrammeScheduleItem = {
  frequency: '3 puta nedeljno',
  days: [
    {
      day: 'Ponedeljak',
      timeSlots: [
        '06:30 - 07:30',
        '07:30 - 08:30',
        '09:00 - 10:00',
        '10:00 - 11:00',
        '16:00 - 17:00',
        '17:00 - 18:00',
        '18:00 - 19:00',
        '19:00 - 20:00',
      ],
    },
    {
      day: 'Sreda',
      timeSlots: [
        '06:30 - 07:30',
        '07:30 - 08:30',
        '09:00 - 10:00',
        '10:00 - 11:00',
        '17:00 - 18:00',
        '18:00 - 19:00',
        '19:00 - 20:00',
      ],
    },
    {
      day: 'Petak',
      timeSlots: [
        '06:30 - 07:30',
        '07:30 - 08:30',
        '09:00 - 10:00',
        '10:00 - 11:00',
        '16:00 - 17:00',
        '17:00 - 18:00',
        '18:00 - 19:00',
        '19:00 - 20:00',
      ],
    },
  ],
  terms: 12,
  price: '15.000RSD',
};

const reformerTwiceWeekly: ProgrammeScheduleItem = {
  frequency: '2 puta nedeljno',
  days: [
    {
      day: 'Utorak',
      timeSlots: [
        '06:30 - 07:30',
        '07:30 - 08:30',
        '17:00 - 18:00',
        '18:00 - 19:00',
        '19:00 - 20:00',
      ],
    },
    {
      day: 'Četvrtak',
      timeSlots: [
        '06:30 - 07:30',
        '07:30 - 08:30',
        '17:00 - 18:00',
        '18:00 - 19:00',
        '19:00 - 20:00',
      ],
    },
  ],
  terms: 8,
  price: '11.000RSD',
};

export const reformerSchedule = [reformerThreeTimesWeekly, reformerTwiceWeekly];

// Duo and personal training are booked with the studio rather than from a
// timetable; every programme page offers them.
export const privatePackages = {
  duo: { terms: 12, price: '23.000 RSD' },
  personal: { terms: 12, price: '30.000 RSD' },
};

// The timetable writes "15.000RSD"; running text reads "15.000 RSD", with a
// non-breaking space so a narrow line never strands "RSD" on its own.
function spacedPrice(price: string) {
  return price.replace(/(\d)RSD$/, '$1 RSD');
}

function priceValue(price: string) {
  return Number(price.replace(/\D/g, ''));
}

export function weekdaysOf(item: ProgrammeScheduleItem) {
  return item.days.map(day => day.day.toLowerCase()).join(', ');
}

const lowestReformerPackage = [...reformerSchedule].sort(
  (a, b) => priceValue(a.price) - priceValue(b.price),
)[0];

const { opens, closes } = studio.openingHours;

const reformerGuide = (
  <>
    <h2>Šta je reformer pilates</h2>
    <p className='text-center text-xl'>
      Reformer pilates je pilates koji se radi na reformeru, spravi sa pokretnom
      platformom (kolicima), oprugama različite jačine, trakama i šipkom za
      stopala. Spravu je osmislio Džozef Pilates (Joseph Pilates) u prvoj
      polovini 20. veka. Opruge istovremeno daju otpor i podršku, pa ista vežba
      može da bude zahtevna za iskusnu vežbačicu i bezbedna za nekoga ko tek
      počinje.
    </p>
    <p className='text-center text-xl'>
      Za razliku od mat pilatesa, koji se radi na prostirci sa težinom
      sopstvenog tela, reformer daje više izazova, više podrške i precizniju
      kontrolu pokreta. Kako sprava radi, odakle potiče i šta možete da
      očekujete od prvog časa, opisali smo u tekstu{' '}
      <Link href='/blog/sta-je-reformer-pilates' className='underline'>
        Šta je reformer pilates?
      </Link>
    </p>

    <h2>Kome odgovara reformer pilates</h2>
    <p className='text-center text-xl'>
      Instruktorka za svaku vežbu podešava jačinu opruga i položaj tela, pa se
      isti trening prilagođava različitim telima i ciljevima. Reformer pilates
      odgovara:
    </p>
    <ul className='mx-auto flex max-w-3xl list-disc flex-col gap-3 pl-6 text-xl'>
      <li>
        početnicima, jer vam ne treba prethodno iskustvo: opruge daju podršku
        dok učite pokret;
      </li>
      <li>
        onima koji se oporavljaju od povrede ili imaju bol u leđima, uz
        prethodnu procenu stanja i vežbe prilagođene njima. U timu Baze su tri
        fizioterapeutkinje:{' '}
        <Link href='/nas-tim/snezana-kragovic' className='underline'>
          Snežana Kragović
        </Link>
        , viši fizioterapeut i sertifikovana instruktorka metode Balanced Body,
        koja pilates drži 18 godina,{' '}
        <Link href='/nas-tim/isidora-nikolic' className='underline'>
          Isidora Nikolić
        </Link>
        , diplomirani fizioterapeut i instruktorka, posebno usmerena na zdravlje
        žena tokom trudnoće i nakon porođaja, i{' '}
        <Link href='/nas-tim/suzana-bosnjakovic' className='underline'>
          Suzana Bošnjaković
        </Link>
        , diplomirani fizioterapeut;
      </li>
      <li>
        sportistima i aktivnima, jer uz njihov osnovni trening jača duboke
        mišiće trupa i pomaže im da poboljšaju pokretljivost. Suzana Bošnjaković
        je posebnu stručnost razvila upravo u radu sa profesionalnim
        sportistima;
      </li>
      <li>
        trudnicama: u programu{' '}
        <Link href='/programi/prenatal-pilates' className='underline'>
          Prenatal
        </Link>{' '}
        reformer pilates se prilagođava trudnoći, a vodi ga fizioterapeutkinja
        Isidora Nikolić;
      </li>
      <li>
        osobama u zrelijim godinama: program{' '}
        <Link href='/programi/golden-age-pilates' className='underline'>
          Golden age pilates
        </Link>{' '}
        je reformer pilates prilagođen povredama i bolovima koje godine znaju da
        donesu;
      </li>
      <li>
        onima koji žele dinamičniji trening: za njih je{' '}
        <Link href='/programi/energy-pilates' className='underline'>
          Energy pilates
        </Link>
        , a za funkcionalni trening snage{' '}
        <Link href='/programi/strongher' className='underline'>
          StrongHer
        </Link>
        .
      </li>
    </ul>

    <h2>Kako izgleda prvi trening u Bazi</h2>
    <p className='text-center text-xl'>
      Prvi, probni trening je besplatan. Termin zakazujete preko{' '}
      <Link href='/kontakt' className='underline'>
        stranice za kontakt
      </Link>
      .
    </p>
    <p className='text-center text-xl'>
      Ponesite sportsku odeću koja ne sputava pokret. Na reformeru se trenira
      bos ili u pilates čarapama, pa vam patike nisu potrebne. Grupni trening
      traje sat vremena. Pre vežbe instruktorka vam podešava opruge i pokazuje
      položaj tela, a tokom treninga vas vodi kroz svaki pokret. Ako imate
      povredu ili bol, recite joj to pre početka, kako bi vežbe prilagodila
      vama.
    </p>

    <h2>Koliko često trenirati</h2>
    <p className='text-center text-xl'>
      Idealno je trenirati 2 do 3 puta nedeljno. Prvi efekti, poput boljeg
      držanja i pokretljivosti, često se osete posle nekoliko treninga, a
      vidljive promene obično dolaze posle 6 do 10 nedelja redovnog vežbanja.
    </p>
    <p className='text-center text-xl'>
      Zato grupne termine nudimo u dva ritma:{' '}
      {reformerThreeTimesWeekly.frequency} (
      {weekdaysOf(reformerThreeTimesWeekly)}) i {reformerTwiceWeekly.frequency}{' '}
      ({weekdaysOf(reformerTwiceWeekly)}). Treninzi se održavaju od ponedeljka
      do petka, od {opens} do {closes}, pa termin možete da uklopite pre posla,
      preko dana ili uveče. Ako niste sigurni koji ritam vam odgovara, pitajte
      instruktorku na probnom treningu.
    </p>

    <h2>Koliko košta reformer pilates u Novom Sadu</h2>
    <p className='text-center text-xl'>
      U Baza Pilates studiju u Futoškoj 33 reformer pilates plaćate po paketu
      termina:
    </p>
    <ul className='mx-auto flex max-w-3xl list-disc flex-col gap-3 pl-6 text-xl'>
      {reformerSchedule.map(item => (
        <li key={item.frequency}>
          grupni trening {item.frequency} ({weekdaysOf(item)}): {item.terms}{' '}
          termina za {spacedPrice(item.price)};
        </li>
      ))}
      <li>
        duo trening: {privatePackages.duo.terms} termina za{' '}
        {privatePackages.duo.price};
      </li>
      <li>
        personalni trening: {privatePackages.personal.terms} termina za{' '}
        {privatePackages.personal.price}.
      </li>
    </ul>
    <p className='text-center text-xl'>
      Raspored svih grupnih termina nalazi se u{' '}
      <Link href='#cenovnik' className='underline'>
        cenovniku
      </Link>{' '}
      ispod. Za duo i personalni trening kontaktirajte nas, pa ćemo zajedno
      pronaći termin. Prvi, probni trening je besplatan, tako da reformer možete
      da isprobate pre nego što izaberete paket. Odgovore na opšta pitanja o
      pilatesu naći ćete i na stranici{' '}
      <Link href='/vasa-pitanja' className='underline'>
        Vaša pitanja
      </Link>
      .
    </p>
  </>
);

const reformerFaqs: FAQItem[] = [
  {
    question: 'Koliko košta reformer pilates u Bazi?',
    answer: `Grupni paket ${reformerThreeTimesWeekly.frequency} ima ${reformerThreeTimesWeekly.terms} termina i košta ${spacedPrice(reformerThreeTimesWeekly.price)}, a paket ${reformerTwiceWeekly.frequency} ima ${reformerTwiceWeekly.terms} termina i košta ${spacedPrice(reformerTwiceWeekly.price)}. Duo paket od ${privatePackages.duo.terms} termina košta ${privatePackages.duo.price}, a personalni od ${privatePackages.personal.terms} termina ${privatePackages.personal.price}.`,
  },
  {
    question: 'Da li je probni trening besplatan?',
    answer:
      'Da. Prvi, probni trening reformer pilatesa je besplatan, a termin zakazujete preko stranice Kontakt.',
  },
  {
    question: 'U koje dane i u koliko sati su termini?',
    answer: `Treninzi se održavaju od ponedeljka do petka, od ${opens} do ${closes}. Paket ${reformerThreeTimesWeekly.frequency} (${weekdaysOf(reformerThreeTimesWeekly)}) i paket ${reformerTwiceWeekly.frequency} (${weekdaysOf(reformerTwiceWeekly)}) imaju i jutarnje i večernje termine, a tačan raspored je u cenovniku na ovoj stranici.`,
  },
  {
    question: 'Koliko traje jedan trening?',
    answer:
      'Grupni trening reformer pilatesa traje sat vremena, pa su i termini u rasporedu po 60 minuta.',
  },
  {
    question: 'Šta da ponesem na prvi trening?',
    answer:
      'Dovoljna je sportska odeća koja ne sputava pokret. Na reformeru se trenira bos ili u pilates čarapama, pa vam patike nisu potrebne.',
  },
  {
    question: 'Mogu li da treniram ako imam povredu ili bol u leđima?',
    answer:
      'Uz povredu ili bol važno je da se stanje prethodno proceni i da se vežbe prilagode. Recite instruktorki za povredu pre prvog treninga. U timu Baze su tri fizioterapeutkinje: Snežana Kragović, Isidora Nikolić i Suzana Bošnjaković, a za zrelije godine postoji i program Golden age pilates, prilagođen povredama i bolovima.',
  },
  {
    question: 'Da li je bolje trenirati 2 ili 3 puta nedeljno?',
    answer: `Idealno je 2 do 3 puta nedeljno, a ključ napretka je redovnost: vidljive promene obično dolaze posle 6 do 10 nedelja redovnog vežbanja. Paket ${reformerThreeTimesWeekly.frequency} daje ${reformerThreeTimesWeekly.terms} termina za ${spacedPrice(reformerThreeTimesWeekly.price)}, a paket ${reformerTwiceWeekly.frequency} ${reformerTwiceWeekly.terms} termina za ${spacedPrice(reformerTwiceWeekly.price)}.`,
  },
];

const programmes: Programme[] = [
  {
    id: 'reformer-pilates',
    title: 'Reformer pilates',
    image: '/reformer-pilates.webp',
    mobileImage: '/reformer-pilates-mobile.webp',
    imagePosition: 'object-center',
    excerpt:
      'Sigurno najtraženiji trening danas, pilates na reformeru je trening koji će probuditi svaki vaš mišić i podsetiti vas koliko je telo snažno i moćno.',
    seoTitle: 'Reformer pilates Novi Sad: cene i termini',
    metaDescription: `Reformer pilates u Novom Sadu, Futoška 33: grupni treninzi 2 ili 3 puta nedeljno, paketi od ${spacedPrice(lowestReformerPackage.price)}, uz tim fizioterapeuta. Probni trening je besplatan.`,
    schedule: reformerSchedule,
    guide: reformerGuide,
    faqHeading: 'Česta pitanja o reformer pilatesu',
    faqs: reformerFaqs,
    description: (
      <>
        <span>
          Sigurno najtraženiji trening danas, pilates na reformeru je trening
          koji će probuditi svaki vaš mišić i podsetiti vas koliko je telo
          snažno i moćno.
        </span>
        <span>
          Trening se izvodi na spravama koje pružaju beskrajan diverzitet vežbi
          kroz koje će vas iskusni instruktori pažljivo voditi, dovodeći vašu
          formu na potpuno novi nivo. Pored aktivacije tela, pilates na
          reformerima je tu da vam pomogne da nađete balans, fokusirate se na
          svaki pokret i izađete sa osmehom na licu. Jer se pilates ne završava
          na treningu!
        </span>
        <span>
          Kako polaznici ističu, glavni benefiti pilatesa se vide i kada
          napustite studio - vaše držanje će biti bolje, vaši obrasci disanja
          unapređeni, a um smiren, fokusiran i spreman za nove izazove.
        </span>
      </>
    ),
  },
  {
    id: 'energy-pilates',
    title: 'Energy pilates',
    image: '/energy-pilates.webp',
    mobileImage: '/energy-pilates-mobile.webp',
    imagePosition: 'object-center xl:object-[center_30%]',
    excerpt:
      'Za sve one koji vole izazove, dinamične treninge, a opet teže preciznom pokretu, fokusu na svaki mišić i fleksibilnosti.',
    schedule: [
      {
        frequency: '3 puta nedeljno',
        days: [
          {
            day: 'Utorak',
            timeSlots: ['18:00 - 19:00'],
          },
          {
            day: 'Sreda',
            timeSlots: ['17:00 - 18:00'],
          },
          {
            day: 'Petak',
            timeSlots: ['17:00 - 18:00'],
          },
        ],
        terms: 12,
        price: '13.000RSD',
      },
    ],
    description: (
      <>
        <span>
          Za sve one koji vole izazove, dinamične treninge, a opet teže
          preciznom pokretu, fokusu na svaki mišić i fleksibilnosti, Energy
          pilates program je tu da vam to ispuni.
        </span>
        <span>
          Kombinujući trening snage kao osnov za izgradnju mišića, elemente kik
          boksa za podizanje samopouzdanja, kardio vežbe za poboljšanje
          kondicije i pilates na reformeru za stabilnost i aktivaciju dubokih
          mišića, ovaj program pažljivo osmišljenih intenzivnih treninga će vam
          omogućiti da testirate i pomerite svoje granice. Instruktori su tu da
          vam pomognu da otkrijete svoju snagu.
        </span>
      </>
    ),
  },
  {
    id: 'golden-age-pilates',
    title: 'Golden age pilates',
    image: '/golden-age.webp',
    mobileImage: '/golden-age-mobile.webp',
    imagePosition: 'object-center xl:object-[center_60%]',
    excerpt:
      'Za pilates koji se trenira na reformeru se kaže da je za sve uzraste. Mudre godine neretko donesu i poneku povredu ili bol i upravo ta stanja znaju da budu prepreka treningu. Ne i kod nas!',
    schedule: [
      {
        frequency: '2 puta nedeljno',
        days: [
          {
            day: 'Utorak',
            timeSlots: ['16:00 - 17:00'],
          },
          {
            day: 'Četvrtak',
            timeSlots: ['16:00 - 17:00'],
          },
        ],
        terms: 8,
        price: '11.000RSD',
      },
    ],
    description: (
      <>
        <span>
          Za pilates koji se trenira na reformeru se kaže da je za sve uzraste.
          Mudre godine neretko donesu i poneku povredu ili bol i upravo ta
          stanja znaju da budu prepreka treningu. Ne i kod nas!
        </span>
        <span>
          Baza je mislila na vas i stoga smo osmislili sistem kroz koji vas
          bezbedno sprovodimo do vaše forme na reformeru. U našem timu su
          iskusni fizioterapeuti koji su tu da prevashodno urade dijagnostiku i
          procenu, a onda i da pomognu instruktorima da prilagode trening svakoj
          od vas.
        </span>
        <span>Zato bez straha, čekamo vas da pomeramo granice!</span>
      </>
    ),
  },
  {
    id: 'strongher',
    title: 'StrongHer',
    subtitle: '(funkcionalni trening)',
    image: '/strongher.webp',
    mobileImage: '/strongher-mobile.webp',
    imagePosition: 'object-center',
    excerpt:
      'Trening snage je neizostavni deo ženskog zdravlja! I zato u Bazi kroz program StrongHer, gradimo snažno i funkcionalno telo.',
    schedule: [
      {
        frequency: '2 puta nedeljno',
        days: [
          {
            day: 'Ponedeljak',
            timeSlots: ['17:00 - 18:00'],
          },
          {
            day: 'Utorak',
            timeSlots: ['08:30 - 09:30'],
          },
          {
            day: 'Četvrtak',
            timeSlots: ['08:30 - 09:30', '18:00 - 19:00'],
          },
        ],
        terms: 8,
        price: '10.000RSD',
      },
    ],
    description: (
      <>
        <span>
          Trening snage je neizostavni deo ženskog zdravlja! I zato u Bazi kroz
          program StrongHer, gradimo snažno i funkcionalno telo.
        </span>
        <span>
          Trening se radi u malim grupama uz korišćenje tegova, kettelbella i
          drugih rekvizita koji nam omogućavaju dodatno opterećenje. Učimo
          pravilno izvođenje vežbi sa slobodnim tegovima i radimo na efikasnijim
          obrascima kretanja. Pored snage radimo i na izdržljivosti i mobilnosti
          kroz vežbe koje omogućavaju telu da se kreće slobodnije i da bolje
          koristi snagu.
        </span>
        <span>
          Kroz individualan pristup, opterećenje se prilagođava vašoj formi i
          zajedno pratimo vaš napredak.
        </span>
        <span>
          Cilj nije samo da budete snažnije, već da vaše telo bude
          funkcionalnije, spremnije i sigurnije u svemu što radite.
        </span>
      </>
    ),
  },
  // StrongHer 50+ is hidden until the studio agrees its copy. Uncomment to
  // show it again (and add it back to the home and /programi descriptions).
  // {
  //   id: 'strongher-50',
  //   title: 'StrongHer 50+',
  //   subtitle: '(funkcionalni trening)',
  //   image: '/strongher.webp',
  //   mobileImage: '/strongher-mobile.webp',
  //   imagePosition: 'object-center',
  //   excerpt:
  //     'StrongHer 50+ je funkcionalni trening snage za žene od 50 i više godina, jer je snaga važan deo ženskog zdravlja u svakom dobu.',
  //   // Two fixed groups: a member trains on both days of one pair, so the
  //   // pairs are listed separately rather than as one pick-any-two timetable.
  //   schedule: [
  //     {
  //       frequency: '2 puta nedeljno, prepodne',
  //       days: [
  //         { day: 'Ponedeljak', timeSlots: ['10:00 - 11:00'] },
  //         { day: 'Četvrtak', timeSlots: ['10:00 - 11:00'] },
  //       ],
  //       terms: 8,
  //       price: '10.000RSD',
  //     },
  //     {
  //       frequency: '2 puta nedeljno, uveče',
  //       days: [
  //         { day: 'Ponedeljak', timeSlots: ['18:00 - 19:00'] },
  //         { day: 'Sreda', timeSlots: ['18:00 - 19:00'] },
  //       ],
  //       terms: 8,
  //       price: '10.000RSD',
  //     },
  //   ],
  //   description: (
  //     <>
  //       <span>
  //         StrongHer 50+ je funkcionalni trening snage za žene od 50 i više
  //         godina, jer je snaga važan deo ženskog zdravlja u svakom dobu.
  //       </span>
  //       <span>
  //         To je program{' '}
  //         <Link href='/programi/strongher' className='underline'>
  //           StrongHer
  //         </Link>{' '}
  //         prilagođen ženama 50+. Trening se radi u malim grupama, uz tegove,
  //         kettlebell i druge rekvizite, a opterećenje se prilagođava formi svake
  //         od vas.
  //       </span>
  //       <span>
  //         Radimo na snazi, izdržljivosti i pokretljivosti, kako bi vam
  //         svakodnevni pokreti, poput penjanja uz stepenice, nošenja kesa ili
  //         ustajanja sa poda, bili lakši i sigurniji.
  //       </span>
  //       <span>
  //         Program vodi{' '}
  //         <Link href='/nas-tim/isidora-nikolic' className='underline'>
  //           Isidora Nikolić
  //         </Link>
  //         , diplomirani fizioterapeut, koja trening prilagođava vašim potrebama
  //         i zajedno sa vama prati vaš napredak.
  //       </span>
  //     </>
  //   ),
  // },
  {
    id: 'prenatal-pilates',
    title: 'Prenatal',
    subtitle: '(pilates za trudnice)',
    image: '/prenatal.webp',
    mobileImage: '/prenatal-mobile.webp',
    imagePosition: 'object-center lg:object-[center_35%]',
    excerpt:
      'Prenatal je reformer pilates prilagođen trudnoći, za buduće mame koje žele da i tokom trudnoće ostanu aktivne uz stručno vođen trening.',
    // Two fixed groups, listed separately for the same reason as StrongHer 50+.
    schedule: [
      {
        frequency: '2 puta nedeljno, prepodne',
        days: [
          { day: 'Utorak', timeSlots: ['09:00 - 10:00'] },
          { day: 'Četvrtak', timeSlots: ['09:00 - 10:00'] },
        ],
        terms: 8,
        price: '11.000RSD',
      },
      {
        frequency: '2 puta nedeljno, popodne',
        days: [
          { day: 'Ponedeljak', timeSlots: ['16:00 - 17:00'] },
          { day: 'Sreda', timeSlots: ['16:00 - 17:00'] },
        ],
        terms: 8,
        price: '11.000RSD',
      },
    ],
    description: (
      <>
        <span>
          Prenatal je reformer pilates prilagođen trudnoći, za buduće mame koje
          žele da i tokom trudnoće ostanu aktivne uz stručno vođen trening.
        </span>
        <span>
          Opruge reformera daju podršku tokom pokreta, a opterećenje se podešava
          prema tome kako se osećate i u kojoj ste fazi trudnoće. Radimo na
          držanju, disanju i pokretljivosti, kako biste se kroz promene koje
          trudnoća donosi kretale lakše i sa više poverenja u svoje telo.
        </span>
        <span>
          Program vodi{' '}
          <Link href='/nas-tim/isidora-nikolic' className='underline'>
            Isidora Nikolić
          </Link>
          , diplomirani fizioterapeut sa četiri godine iskustva u radu sa decom
          i odraslima. Završila je stručne edukacije iz vežbanja sa trudnicama i
          iz programa za žene nakon porođaja, sa posebnim fokusom na dijastazu i
          postepeni povratak snazi. Njen cilj je da vam kroz pokret, pravilno
          dozirano opterećenje, vežbe disanja i individualan pristup pomogne da
          se tokom trudnoće osećate snažno i sigurno u svom telu.
        </span>
        <span>Pre početka treninga posavetujte se sa svojim ginekologom.</span>
      </>
    ),
  },
];

export async function getProgrammes() {
  return programmes.map(
    ({ id, title, subtitle, image, imagePosition, excerpt }) => ({
      id,
      title,
      subtitle,
      image,
      imagePosition,
      excerpt,
    }),
  );
}

export async function getProgrammeById(id: string) {
  const programme = programmes.find(p => p.id === id);
  if (!programme) {
    return null;
  }
  return {
    id: programme.id,
    title: programme.title,
    subtitle: programme.subtitle,
    image: programme.image,
    mobileImage: programme.mobileImage,
    imagePosition: programme.imagePosition,
    excerpt: programme.excerpt,
    seoTitle: programme.seoTitle,
    metaDescription: programme.metaDescription,
    faqHeading: programme.faqHeading,
    description: programme.description,
    additionalInfo: programme.additionalInfo,
    guide: programme.guide,
    faqs: programme.faqs,
    schedule: programme.schedule,
  };
}

export async function getProgrammeIds() {
  return programmes.map(p => p.id);
}
