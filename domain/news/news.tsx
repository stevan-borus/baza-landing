import { NewsArticle } from '@/domain/news/news-schema';

const newsArticles: NewsArticle[] = [
  // {
  //   id: '1',
  //   title: 'Radionica pilates tehnika',
  //   excerpt:
  //     'Organizujemo posebnu radionicu posvećenu naprednim pilates tehnikama i pravilnom izvođenju vežbi.',
  //   date: '12.06.2025.',
  //   image: '/novosti-rest.webp',
  //   content: (
  //     <>
  //       <span>
  //         Organizujemo posebnu radionicu posvećenu naprednim pilates tehnikama i
  //         pravilnom izvođenju vežbi.
  //       </span>
  //       <span>
  //         Radionica je namenjena svima koji žele da prodube svoje znanje i
  //         unaprede svoje veštine.
  //       </span>
  //       <span>
  //         Rezervišite svoje mesto na vreme jer je broj mesta ograničen.
  //       </span>
  //     </>
  //   ),
  // },
  // {
  //   id: '4',
  //   title: 'Novi programi u ponudi',
  //   excerpt:
  //     'Proširili smo našu ponudu sa novim programima prilagođenim različitim nivoima i potrebama.',
  //   date: '12.06.2025.',
  //   image: '/novosti-rest.webp',
  //   content: (
  //     <>
  //       <span>
  //         Proširili smo našu ponudu sa novim programima prilagođenim različitim
  //         nivoima i potrebama.
  //       </span>
  //       <span>
  //         Naši novi programi uključuju specijalizovane treninge za početnike,
  //         napredne vežbače i posebne grupe.
  //       </span>
  //       <span>
  //         Saznajte više o našim novim programima i pronađite onaj koji vam
  //         najbolje odgovara.
  //       </span>
  //     </>
  //   ),
  // },
  // {
  //   id: '2',
  //   title: 'Otvaranje novog studija',
  //   excerpt:
  //     'Sa ponosom najavljujemo otvaranje našeg novog studija sa najsavremenijom opremom.',
  //   date: '12.06.2025.',
  //   image: '/novosti-rest.webp',
  //   content: (
  //     <>
  //       <span>
  //         Sa ponosom najavljujemo otvaranje našeg novog studija sa
  //         najsavremenijom opremom.
  //       </span>
  //       <span>
  //         Novi studio nudi prostranije i modernije uslove za vežbanje, sa
  //         fokusom na vašu udobnost i rezultate.
  //       </span>
  //       <span>Dođite i iskusite razliku!</span>
  //     </>
  //   ),
  // },
  // {
  //   id: '3',
  //   title: 'Novi raspored termina od januara',
  //   excerpt:
  //     'Ažurirali smo raspored termina za novu godinu. Proverite naše nove termine i rezervišite svoje mesto.',
  //   date: '12.06.2025.',
  //   image: '/novosti-rest.webp',
  //   content: (
  //     <>
  //       <span>
  //         Ažurirali smo raspored termina za novu godinu. Proverite naše nove
  //         termine i rezervišite svoje mesto.
  //       </span>
  //       <span>
  //         Naš novi raspored nudi više fleksibilnosti i prilika za vežbanje tokom
  //         cele nedelje.
  //       </span>
  //       <span>
  //         Kontaktirajte nas za više informacija o dostupnim terminima.
  //       </span>
  //     </>
  //   ),
  // },
  // {
  //   id: '5',
  //   title: 'Novi član se pridružuje timu!',
  //   excerpt:
  //     'U studio nam se pridružila nova instruktorka koja donosi svežu energiju i strast prema vežbanju.',
  //   date: '12.06.2025.',
  //   image: '/novosti-1.webp',
  //   content: (
  //     <>
  //       <span>
  //         U studio nam se pridružila nova instruktorka koja donosi svežu
  //         energiju i strast prema vežbanju.
  //       </span>
  //       <span>
  //         Radujemo se što ćemo sa vama podeliti njeno iskustvo i znanje kroz
  //         naše zajedničke treninge.
  //       </span>
  //       <span>
  //         Pridružite nam se i doživite razliku koju nova perspektiva može doneti
  //         vašem pilates putovanju.
  //       </span>
  //     </>
  //   ),
  // },
];

export async function getNewsArticles() {
  return newsArticles.map(({ id, title, excerpt, date, image }) => ({
    id,
    title,
    excerpt,
    date,
    image,
  }));
}

export async function getNewsArticleById(id: string) {
  const article = newsArticles.find(a => a.id === id);
  if (!article) {
    return null;
  }
  return article;
}

export async function getNewsArticleIds() {
  return newsArticles.map(a => a.id);
}
