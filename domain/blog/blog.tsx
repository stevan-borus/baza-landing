import Link from 'next/link';
import type { ReactNode } from 'react';
import { BlogPost } from '@/domain/blog/blog-schema';
import { reformerSchedule } from '@/domain/programmes/programmes';
import { studio } from '@/domain/studio/studio';

// A section title reads as a bold lead at body size: the global h2 is sized
// for page headings, which would compete with the post title.
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-bold'>{title}</h2>
      {children}
    </div>
  );
}

const blogPosts: BlogPost[] = [
  {
    id: 'sta-je-reformer-pilates',
    title: 'Šta je reformer pilates?',
    subtitle: 'Baza Pilates tim',
    author: 'Sertifikovane instruktorke reformer pilatesa',
    date: '24.11.2026.',
    image: '/gal/galerija-3.webp',
    excerpt:
      'Kako radi reformer, sprava sa oprugama, po čemu se razlikuje od mat pilatesa, kome odgovara i kako izgleda prvi čas reformer pilatesa u Novom Sadu.',
    content: (
      <>
        <span>
          Reformer pilates je jedan od najtraženijih treninga danas, ali mnogi
          reformer prvi put vide tek kada uđu u studio. Sprava sa kolicima,
          oprugama i trakama izgleda neobično, pa je prirodno da se zapitate šta
          se na njoj zapravo radi i da li je to trening za vas. U ovom tekstu
          objašnjavamo kako reformer radi, odakle potiče, po čemu se razlikuje
          od pilatesa na prostirci, šta donosi, kome odgovara i kako izgleda
          prvi čas.
        </span>

        <Section title='Kako izgleda i kako radi reformer'>
          <span>
            Reformer je sprava sa pokretnom platformom, koja se zove kolica (na
            engleskom carriage). Kolica su za okvir sprave vezana oprugama
            različite jačine. Na jednom kraju sprave je šipka za stopala, o koju
            se odgurujete nogama ili rukama, a na drugom su trake koje držite
            rukama ili u koje stavljate stopala. Na kolicima ležite, sedite,
            klečite ili stojite, zavisno od vežbe.
          </span>
          <span>
            Opruge su srce reformera, jer istovremeno daju otpor i podršku. Kod
            nekih vežbi opruge otežavaju pokret, pa mišići rade protiv njihovog
            otpora. Kod drugih vam daju oslonac i pomažu da pokret izvedete
            pravilno, u punom obimu. Instruktorka bira jačinu opruga i položaj
            tela za svaku vežbu i tako istu vežbu čini lakšom ili zahtevnijom.
            Zato je reformer pogodan i za početnike i za oporavak od povrede, a
            iskusnim vežbačicama i dalje može da bude izazov.
          </span>
        </Section>

        <Section title='Kratka istorija'>
          <span>
            Reformer je osmislio Džozef Pilates (Joseph Pilates), tvorac metode
            koja nosi njegovo ime, u prvoj polovini 20. veka. Princip sprave
            ostao je isti do danas: pokretna platforma, opruge koje daju otpor i
            podršku i pažnja usmerena na precizan, kontrolisan pokret.
          </span>
        </Section>

        <Section title='Reformer ili mat pilates'>
          <span>
            Pilates se radi na prostirci, što se zove mat pilates, ili na
            spravama kao što je reformer. Mat pilates koristi težinu sopstvenog
            tela: vi ste istovremeno i opterećenje i oslonac. Reformer tome
            dodaje opruge. Trening zato može da bude izazovniji, a u isto vreme
            daje više podrške tamo gde je potrebna. Kontrola pokreta je
            preciznija, a instruktorka jačinom opruga određuje koliko će pokret
            biti težak i koliko podrške dobijate. Oba načina imaju svoje mesto,
            a razlika je u tome koliko izazova i podrške vam sprava daje.
          </span>
          <span>
            Ako ste već radili mat pilates, mnoge vežbe će vam biti poznate. Na
            reformeru ih izvodite uz otpor opruga i na kolicima koja se
            pomeraju, pa i poznat pokret traži više kontrole i stabilnosti.
          </span>
        </Section>

        <Section title='Šta donosi redovan trening'>
          <span>
            Reformer pilates ne menja telo preko noći, ali redovan trening
            donosi promene koje se osete i van studija.
          </span>
          <span>
            Držanje. Vežbe jačaju mišiće koji drže kičmu i ramena, a polaznice
            često ističu da im je držanje bolje i van studija.
          </span>
          <span>
            Snaga dubokih mišića trupa. Dok se kolica pomeraju, duboki mišići
            stomaka, leđa i karlice rade da telo ostane stabilno i poravnato.
          </span>
          <span>
            Pokretljivost. Opruge omogućavaju da pokret izvedete kontrolisano i
            u punom obimu, pa telo vremenom postaje pokretljivije.
          </span>
          <span>
            Disanje i fokus. Svaki pokret prati dah, a precizne vežbe traže punu
            pažnju. Zato mnogi trening završe smireniji i fokusiraniji nego što
            su ga počeli.
          </span>
        </Section>

        <Section title='Kome odgovara reformer pilates'>
          <span>
            Pošto se intenzitet podešava za svaku osobu, reformer pilates
            odgovara različitim telima i ciljevima. Početnicima ne treba
            prethodno iskustvo, jer opruge daju podršku dok uče pokret. Onima
            koji se oporavljaju od povrede ili imaju bol u leđima reformer može
            da pomogne, uz prethodnu procenu stanja: trening ne zamenjuje
            lečenje, ali se vežbe prilagođavaju stanju. Sportistima i aktivnima
            je dobra dopuna osnovnom treningu.
          </span>
          <span>
            Za zrelije godine u Bazi postoji program{' '}
            <Link href='/programi/golden-age-pilates' className='underline'>
              Golden age pilates
            </Link>
            , reformer pilates prilagođen povredama i bolovima. Ko želi
            dinamičniji trening, može da izabere{' '}
            <Link href='/programi/energy-pilates' className='underline'>
              Energy pilates
            </Link>
            .
          </span>
        </Section>

        <Section title='Koliko često trenirati'>
          <span>
            Idealno je trenirati 2 do 3 puta nedeljno. Prvi efekti, poput boljeg
            držanja i pokretljivosti, često se osete posle nekoliko treninga, a
            vidljive promene obično dolaze posle 6 do 10 nedelja redovnog
            vežbanja. Redovan trening je ključ napretka: bolje je vežbati
            redovno nego povremeno trenirati visokim intenzitetom.
          </span>
          <span>
            Grupni paketi reformer pilatesa u Bazi prate taj ritam:{' '}
            {reformerSchedule
              .map(
                item =>
                  `${item.frequency} sa ${item.terms} termina`,
              )
              .join(' ili ')}
            .
          </span>
        </Section>

        <Section title='Kako izgleda prvi čas'>
          <span>
            Na prvi čas dođite u sportskoj odeći koja ne sputava pokret. Na
            reformeru se trenira bos ili u pilates čarapama, pa vam patike nisu
            potrebne. Instruktorka vam podešava opruge i položaj tela i vodi vas
            kroz vežbe korak po korak. Ako imate povredu ili bol, recite joj to
            pre početka, kako bi vežbe prilagodila vama. Grupni trening traje
            sat vremena.
          </span>
          <span>
            Prvi, probni trening je besplatan, a termin zakazujete preko{' '}
            <Link href='/kontakt' className='underline'>
              stranice za kontakt
            </Link>
            .
          </span>
        </Section>

        <Section title='Reformer pilates u Bazi'>
          <span>
            U Baza Pilates studiju u Futoškoj 33 u Novom Sadu reformer pilates
            se trenira od ponedeljka do petka, od {studio.openingHours.opens} do{' '}
            {studio.openingHours.closes}. Treninge vode sertifikovane
            instruktorke reformer pilatesa, a u timu su i tri
            fizioterapeutkinje:{' '}
            <Link href='/nas-tim/snezana-kragovic' className='underline'>
              Snežana Kragović
            </Link>
            , viši fizioterapeut i sertifikovana instruktorka metode Balanced
            Body, koja pilates drži 18 godina,{' '}
            <Link href='/nas-tim/isidora-nikolic' className='underline'>
              Isidora Nikolić
            </Link>
            , koja se posebno bavi zdravljem žena tokom trudnoće i nakon
            porođaja, i{' '}
            <Link href='/nas-tim/suzana-bosnjakovic' className='underline'>
              Suzana Bošnjaković
            </Link>
            , sa posebnom stručnošću u radu sa profesionalnim sportistima. Jedna
            od osnivačica studija,{' '}
            <Link href='/nas-tim/danica-piper' className='underline'>
              Danica Piper
            </Link>
            , takođe je sertifikovana instruktorka reformer pilatesa. Tim
            upotpunjuju nutricionistkinja i pedijatarka, a sve ih možete
            upoznati na stranici{' '}
            <Link href='/nas-tim' className='underline'>
              Naš tim
            </Link>
            .
          </span>
          <span>
            Termine i cene paketa pogledajte na stranici{' '}
            <Link href='/programi/reformer-pilates' className='underline'>
              Reformer pilates
            </Link>
            , a odgovore na druga pitanja na stranici{' '}
            <Link href='/vasa-pitanja' className='underline'>
              Vaša pitanja
            </Link>
            . Prvi, probni trening je besplatan, pa reformer možete da isprobate
            pre nego što se odlučite.
          </span>
        </Section>
      </>
    ),
  },
  // {
  //   id: 'milica-gardasevic',
  //   title: 'Moja baza',
  //   subtitle: 'Milica Gardašević',
  //   author: 'Olimpijska skakačica u dalj',
  //   date: '12.06.2025.',
  //   image: '/blog-1.webp',
  //   excerpt: 'Moja baza',
  //   content: (
  //     <>
  //       <span>
  //         Atletika je sport brzine, snage i izdržljivosti, ali vrhunski
  //         rezultati ne zavise samo od sprinteva, skokova ili bacanja. Temelj
  //         svakog atletskog uspeha je stabilno, snažno i svesno telo. Iz drugog
  //         ugla lako je fokusirati se na spektakularne performanse - brzinu,
  //         snagu, skokove i medalje. Međutim, osnova svega toga često je
  //         nevidljiva: BAZNI trening. Sigurno ste čuli već ovaj izraz, ali šta je
  //         zapravo &apos;baza&apos; u našem, sportskom, rečniku?
  //       </span>
  //       <span>
  //         Bazni trening podrazumeva rad na stabilnosti, snazi „centra“ tela
  //         (core), pokretljivosti i koordinaciji - elementima koji čine telo
  //         spremnim da efikasno i sigurno izvede sve specifične sportske pokrete.
  //         Bez jake baze, telo postaje podložno povredama, a umor se brže javlja.
  //         Sve što pokušavam da, kroz karijeru, izbegnem. Prednosti baznog
  //         treninga su pre svega prevencija od povreda, brži oporavak i samim tim
  //         dugovečnost u sportu kojoj težim. Za mene, rad na bazi nije dodatak
  //         nego osnov i ključ za bolji rezultat.
  //       </span>
  //       <span>
  //         U sportu, kao i u životu, čvrsta osnova omogućava stabilan i siguran
  //         rast. Bazni trening je upravo ta osnova.
  //       </span>
  //       <span>Jaka baza = jak sportista</span>
  //     </>
  //   ),
  // },
  {
    id: 'olja-piper',
    title: 'Baza zdrave ishrane',
    subtitle: 'Olja Piper',
    author: 'Doktor medicine i sertifikovani nutricionista',
    date: '21.12.2025.',
    image: '/blog-2.webp',
    excerpt: 'Baza zdrave ishrane',
    content: (
      <>
        <span>Šta zapravo znači zdrava ishrana?</span>
        <span>
          U eri kada nas sa svih strana bombarduju savetima o „najboljem“ načinu
          ishrane, lako je steći utisak da postoji univerzalna formula koja važi
          za sve. Međutim, istina je potpuno drugačija: zdrava ishrana nije
          jedinstven plan, već individualni pristup zasnovan na našem telu,
          godinama, metabolizmu, životnim navikama i zdravstvenom stanju. Koliko
          puta ste do sada čuli &quot;samo kalorijski deficit, 2g proteina po
          kilogramu telesne mase, 4-5 obroka u toku dana i sigurno ćeš dobiti
          rezultat&quot;? Da li je to nešto što zaista pomaže?
        </span>
        <span>
          Ne postoji univerzalna dijeta, postoji samo pravi pristup. Nekome
          odgovara da jede 5 obroka u toku dana na svakih 2,5-3h, nekome
          odgovara 4 obroka na 4h. Nečije potrebe su 0,8g proteina po kilogramu
          telesne mase na dan nekome, a nekome 2g. Za nekoga je jedna namirnica
          lek dok je za druge toksin. Zašto ? Zato što nismo svi isti. Naše telo
          nema iste potrebe kada imamo 18, 29 ili 50 godina. Nisu iste potrebe
          kod osobe sa insulinskom rezistencijom, sportiste, trudnice ili nekog
          ko radi noćne smene. Tu upravo počinje zdrava ishrana - slušanje
          sopstvenog tela, a ne tuđeg režima. Najvažnije je imati holistički
          pristup, uzeti u obzir vaše emocije, san, broj radnih sati,
          zdravstveno stanje a ne brojati kalorije.
        </span>
        <span>
          Hrana oblikuje naše ponašanje i emocije, utiče na nivo energije tokom
          dana, koncentraciju, produktivnost, utiče na naše raspoloženje, nivo
          tolerancije na stres , osećaj sreće, kvalitet sna, sposobnost oporavka
          i motivaciju. Hrana nije sve što unesemo na usta, hrana je ono što
          zapravo hrani naše telo.
        </span>
        <span>
          Ono što zapravo čini BAZU zdrave ishrane koja poboljšava varenje,
          ubrzava metabolizam, smanjuje nadutost i povećava nivo energije u toku
          dana jeste pravilno kombinovanje namirnica, raznovrsnost namirnica,
          dovoljna količina vlakana, tečnosti, izbegavanje obrade hrane kao i
          slušanje signala gladi i sitosti. Zlatno pravilo kombinovanja
          namirnica jeste ne kombinovati tri vrste proteina u jednom obroku
          (meso+jaja+mlečni proizvodi) jer zahtevaju različite enzime i vreme
          razgradnje. Ne kombinovati meso sa namirnicama bogatim skrobom i
          mahunarkama jer zahtevaju različite uslove u želudcu što dovodi do
          usporenog varenja, nadimanja i osećaja umora posle jela, šećer u krvi
          brže skače, posledično dolazi do usporavanja metabolizma. Menjanjem
          temperature namirnica, zamrzavanjem ili prženjem, dolazi do promena
          hemijskih struktura pa tako ista namirnica pripremljena na različite
          načine može se iz zdrave pretvoriti u toksičnu te je zato bitan način
          pripreme određenih namirnica. Vlakna pomažu da se održi dobra crevna
          flora, obezbeđuju pravilno varenje smanjuju holesterol u krvi,
          usporavaju apsorpciju šećera u krvi i usporavaju oslobađanje istog u
          krvotok. Raznovrsna ishrana je neophodna kako bismo uneli dovoljnu
          količinu proteina, masti, ugljenih hidrata i vlakana.
        </span>
        <span>
          Zdrava ishrana nije stroga dijeta, već životni stil koji poštuje vaše
          telo. Najbolji plan ishrane je onaj koji vam daje energiju,
          stabilizuje raspoloženje, održiv je dugoročno i uklapa se u vaš način
          života. Pravo zdravlje podrazumeva ravnotežu u vašem telu, mislima i
          tanjiru. Zdrava ishrana ne može podrazumevati restrikciju i brojanje
          kalorije, već balans između potreba tela, ciljeva i uživanja!
        </span>
      </>
    ),
  },
];

export async function getBlogPosts() {
  return blogPosts.map(
    ({ id, title, subtitle, author, date, image, excerpt }) => ({
      id,
      title,
      subtitle,
      author,
      date,
      image,
      excerpt,
    }),
  );
}

export async function getBlogPostById(id: string) {
  const post = blogPosts.find(p => p.id === id);
  if (!post) {
    return null;
  }
  return post;
}

export async function getBlogPostIds() {
  return blogPosts.map(p => p.id);
}
