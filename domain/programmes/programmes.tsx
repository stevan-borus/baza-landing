import { Programme } from '@/domain/programmes/programmes-schema';

const programmes: Programme[] = [
  {
    id: 'reformer-pilates',
    title: 'Reformer pilates',
    image: '/reformer-pilates.webp',
    mobileImage: '/reformer-pilates-mobile.webp',
    imagePosition: 'object-center',
    excerpt:
      'Sigurno najtraženiji trening danas, pilates na reformeru je trening koji će probuditi svaki vaš mišić i podsetiti vas koliko je telo snažno i moćno.',
    schedule: [
      {
        frequency: '3 puta nedeljno',
        days: [
          {
            day: 'Ponedeljak',
            timeSlots: [
              '06:30 - 07:30',
              '07:30 - 08:30',
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
              '10:00 - 11:00',
              '16:30 - 17:30',
              '17:30 - 18:30',
              '18:30 - 19:30',
              '19:30 - 20:30',
            ],
          },
          {
            day: 'Petak',
            timeSlots: [
              '06:30 - 07:30',
              '07:30 - 08:30',
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
      },
      {
        frequency: '2 puta nedeljno',
        days: [
          {
            day: 'Utorak',
            timeSlots: ['06:30 - 07:30', '17:00 - 18:00'],
          },
          {
            day: 'Četvrtak',
            timeSlots: ['06:30 - 07:30', '17:00 - 18:00'],
          },
        ],
        terms: 8,
        price: '11.000RSD',
      },
    ],
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
          svaki pokret i izađete sa osmehom na licu. Jer pilates se ne završava
          na treningu!
        </span>
        <span>
          Kako polaznici ističu, glavni benefiti pilatesa se vide i kada
          napustite studio - vaše držanje će biti bolje, vaši obrasci disanja
          unapređeni a um smiren, fokusiran i spreman za nove izazove.
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
      'Za sve one koji vole izazove, dinamične treninge a opet teže preciznom pokretu, fokusu na svaki mišić i fleksibilnosti.',
    schedule: [
      {
        frequency: '3 puta nedeljno',
        days: [
          {
            day: 'Ponedeljak',
            timeSlots: ['17:00 - 18:00'],
          },
          {
            day: 'Sreda',
            timeSlots: ['19:30 - 20:30'],
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
          Za sve one koji vole izazove, dinamične treninge a opet teže preciznom
          pokretu, fokusu na svaki mišić i fleksibilnosti, Energy pilates
          program je tu da vam to ispuni.
        </span>
        <span>
          Kombinujući trening snage kao osnov za izgradnju mišića, elemente kick
          boksa za podizanje samopouzdanja, kardio vežbe za poboljšanje
          kondicije i pilates na reformeru za stabilnost i aktivaciju dubokih
          mišića, ovaj program pažljivo osmišljenih intenzivnih treniga će vam
          omogućiti da testirate i pomerite svoje granice. Instruktori su tu da
          vam pomognu da otkrijete svoju snagu.
        </span>
      </>
    ),
  },
  {
    id: 'moms-minis',
    title: 'Moms&Minis',
    image: '/moms-minis.webp',
    mobileImage: '/moms-minis-mobile.webp',
    imagePosition: 'object-center xl:object-[center_20%]',
    excerpt:
      'Osluškujući potrebe roditelja, Moms and Minis je program osmišljen tako da u isto vreme mame i deca treniraju, ali različite stvari!',
    schedule: [
      {
        frequency: '2 puta nedeljno',
        days: [
          {
            day: 'Utorak',
            timeSlots: ['18:00 - 19:00', '19:00 - 20:00'],
          },
          {
            day: 'Četvrtak',
            timeSlots: ['18:00 - 19:00', '19:00 - 20:00'],
          },
        ],
        terms: 8,
        price: '15.000RSD',
      },
    ],
    description: (
      <>
        <span>
          Osluškujući potrebe roditelja, Moms and Minis je program osmišljen
          tako da u isto vreme mame i deca treniraju, ali različite stvari!
        </span>
        <span>
          Dok mame treniraju na reformerima, deca razvijaju svoje vijuge kroz
          radionice koje prate NTC program učenja. Ovaj program za decu obuhvata
          psihomotorne vežbe koje stimulišu kognitivni razvoj dece i odvijaju se
          kroz igru. Na ovaj, način, u Bazi i mame i deca provode kvalitetno
          ispunjeno vreme radeći na fizičkom i ali i psihološkom aspektu
          zdravlja.
        </span>
        <span>
          Rad sa decom je poveren jednoj od osnivačica Baze koja je prošla obuku
          NTC učenja ali i &quot;obuku roditeljstva&quot; što joj omogućava da
          stečena znanja lako primeni u praksi.
        </span>
      </>
    ),
    additionalInfo: (
      <>
        <span>
          Ntc radionice su uključene u paket. Cena ostaje nepromenjena bez
          obzira da li dolazite sa jednim detetom ili sa više dece.
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
          BAZA je mislila na vas i stoga smo osmilili sistem kroz koji vas
          bezbedno sprovodimo do vaše forme na reformeru. U našem timu su
          iskusni fizioterapeuti koji su tu da prevashodno urade dijagnostiku i
          procenu a onda i da pomognu instruktorima da prilagode trening svakoj
          od vas.
        </span>
        <span>Zato bez straha, čekamo vas da pomeramo granice!</span>
      </>
    ),
  },
];

export async function getProgrammes() {
  return programmes.map(({ id, title, image, imagePosition, excerpt }) => ({
    id,
    title,
    image,
    imagePosition,
    excerpt,
  }));
}

export async function getProgrammeById(id: string) {
  const programme = programmes.find(p => p.id === id);
  if (!programme) {
    return null;
  }
  return {
    id: programme.id,
    title: programme.title,
    image: programme.image,
    mobileImage: programme.mobileImage,
    imagePosition: programme.imagePosition,
    excerpt: programme.excerpt,
    description: programme.description,
    additionalInfo: programme.additionalInfo,
    schedule: programme.schedule,
  };
}

export async function getProgrammeIds() {
  return programmes.map(p => p.id);
}
