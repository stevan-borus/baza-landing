import { FAQItem } from '@/domain/faq/faq-schema';

const faqs: FAQItem[] = [
  {
    question: 'Šta je reformer pilates?',
    answer:
      'Reformer pilates je forma pilatesa koja se izvodi na specijalnoj spravi koja se zove reformer. Sprava izgleda kao krevet s pokretnom platformom, oprugama, trakama i naslonima, što omogućava veliki broj kontrolisanih i preciznih vežbi.',
  },
  {
    question: 'Da li je reformer pilates pogodan za početnike?',
    answer:
      'Da, vežbe je lako prilagoditi svima, a instruktor kontroliše intenzitet preko opruga i položaja tela.',
  },
  {
    question: 'Koliko često treba trenirati?',
    answer:
      'Idealno je 2-3 puta nedeljno. Redovan trening je ključ za napredak i vidljive rezultate.',
  },
  {
    question: 'Da li je reformer pilates bezbedan za osobe s povredama?',
    answer:
      'Da, pod nadzorom iskusnog instruktora ili fizioterapeuta. Reformer je odličan za rehabilitaciju, ali je važno prethodno proceniti stanje i prilagoditi vežbe.',
  },
  {
    question: 'Da li je potrebna posebna oprema?',
    answer:
      'Ne. Dovoljna je sportska odeća koja omogućava slobodu pokreta; trenira se najčešće bos ili u pilates čarapama.',
  },
  {
    question: 'Koliko brzo se vide rezultati?',
    answer:
      'Prvi efekti se često osete već nakon nekoliko treninga (bolje držanje, pokretljivost), a vidljive promene obično dolaze nakon 6-10 nedelja redovnog vežbanja.',
  },
  {
    question: 'Koja je razlika između mat i reformer pilatesa?',
    answer:
      'Mat pilates se izvodi na prostirci i koristi težinu sopstvenog tela, dok Reformer pilates koristi spravu s oprugama za veći izazov, podršku i precizniju kontrolu pokreta.',
  },
  {
    question: 'Da li reformer pilates pomaže pri mršavljenju?',
    answer:
      'Može doprineti mršavljenju, ubrzati metabolizam i unaprediti držanje, ali najbolje rezultate daje u kombinaciji sa zdravom ishranom.',
  },
];

export async function getFAQs() {
  return faqs;
}
