import type { Lang, Localized } from '../types'

/** Pakalpojumi: /pakalpojumi/ un /pakalpojumi/<slug>/. Dati vienuviet, komponentes tikai attēlo. */

/** Viena cenas daļa: summa eiro, vienreiz vai mēnesī. */
export type PricePart = { amount: number; monthly?: boolean }

export type Price = {
  /** "no €400": gala cenu nosauc pēc pirmās sarunas. */
  from?: boolean
  parts: PricePart[]
}

/** Plāns nosaukts pēc problēmas, ko tas atrisina. */
export type Plan = {
  id: string
  name: Localized
  solves: Localized
  price: Price
  priceNote?: Localized
  includes: Localized[]
  cta: Localized
}

export type Step = { title: Localized; body: Localized }
export type Faq = { q: Localized; a: Localized }

export type Service = {
  slug: string
  name: Localized
  /** Viena rinda pārskata kartītei. */
  pitch: Localized
  /** Cena pārskata kartītē. */
  cardPrice: Price
  seoTitle: Localized
  seoDescription: Localized
  /** Schema.org serviceType, angliski. */
  serviceType: string
  lead: Localized
  /** Godīga piezīme, kas jāpasaka pirms cenas. */
  honest?: { title: Localized; body: Localized }
  audience: Localized[]
  includes: Localized[]
  plans: Plan[]
  steps: Step[]
  faqs: Faq[]
}

export const SERVICES_PATH = '/pakalpojumi/'
export const serviceHref = (slug: string) => `${SERVICES_PATH}${slug}/`

export const services: Service[] = [
  {
    slug: 'majaslapa',
    name: { lv: 'Jauna mājaslapa', en: 'New website' },
    pitch: {
      lv: 'Ātra, skaidra mājaslapa mazam uzņēmumam Jelgavā un Zemgalē.',
      en: 'A fast, clear website for a small business in Jelgava and Zemgale.',
    },
    cardPrice: { from: true, parts: [{ amount: 400 }] },
    seoTitle: {
      lv: 'Mājaslapas izstrāde Jelgavā mazam uzņēmumam · no €400',
      en: 'Websites for small businesses in Jelgava, Latvia · from €400',
    },
    seoDescription: {
      lv:
        'Uztaisu ātru mājaslapu uzņēmumam Jelgavā un Zemgalē: vienas lapas vietne no €400 ' +
        'vai līdz 5 lapām ar vienkāršu admin paneli no €850. Domēns uz tava vārda.',
      en:
        'I build fast websites for small businesses in Jelgava and Zemgale: a one-page site ' +
        'from €400, or up to 5 pages with a simple admin from €850. The domain is in your name.',
    },
    serviceType: 'Website design and development',
    lead: {
      lv:
        'Tavs uzņēmums ir tikai Facebook? Vai vecā lapa ir lēna un neērta telefonā? ' +
        'Uztaisu jaunu mājaslapu: ātru, skaidru un tādu, ko atrod Google. Visu tehnisko daru es.',
      en:
        'Is your business only on Facebook? Or is the old site slow and awkward on a phone? ' +
        'I’ll build a new one: fast, clear and easy to find on Google. I handle all the technical parts.',
    },
    audience: [
      {
        lv: 'Maziem uzņēmumiem Jelgavā un Zemgalē: kafejnīcām, saloniem, servisiem, amatniekiem.',
        en: 'Small businesses in Jelgava and Zemgale: cafés, salons, repair shops, craftspeople.',
      },
      {
        lv: 'Ja tev ir tikai Facebook lapa, un klienti nevar ātri atrast cenas vai darba laiku.',
        en: 'If you only have a Facebook page, and customers can’t quickly find prices or opening hours.',
      },
      {
        lv: 'Ja vecā lapa ir lēna, slikti izskatās telefonā vai to nevar nomainīt.',
        en: 'If the old site is slow, looks bad on a phone, or nobody can change it.',
      },
    ],
    includes: [
      {
        lv: 'Savs domēns uz tava vārda. Tas pieder tev, nevis man.',
        en: 'Your own domain, registered in your name. You own it, not me.',
      },
      {
        lv: 'Visu iestatu pats: domēnu, serveri un drošu savienojumu (HTTPS).',
        en: 'I set everything up: the domain, the server and a secure connection (HTTPS).',
      },
      {
        lv: 'Vispirms telefonam, pēc tam datoram.',
        en: 'Designed for phones first, then for desktop.',
      },
      {
        lv: 'Ātra ielāde, arī ar lēnu internetu.',
        en: 'Loads fast, even on a slow connection.',
      },
      {
        lv: 'Iestatīta Google meklēšanai.',
        en: 'Set up for Google search.',
      },
      {
        lv: 'Gatava aptuveni 2–4 nedēļās.',
        en: 'Ready in about 2–4 weeks.',
      },
    ],
    plans: [
      {
        id: 'vienas-lapas',
        name: { lv: 'Vienas lapas mājaslapa', en: 'One-page website' },
        solves: {
          lv: 'Kad uzņēmumam ir tikai Facebook lapa.',
          en: 'For a business that only has a Facebook page.',
        },
        price: { from: true, parts: [{ amount: 400 }] },
        includes: [
          {
            lv: 'Viena ātra lapa: ko tu dari, cenas vai pakalpojumi',
            en: 'One fast page: what you do, prices or services',
          },
          { lv: 'Darba laiks, karte un kontakti', en: 'Opening hours, a map and contacts' },
          {
            lv: 'Google draudzīga: tevi atrod pēc nosaukuma un vietas',
            en: 'Google-friendly: people find you by name and place',
          },
        ],
        cta: { lv: 'Pieteikt vienas lapas mājaslapu', en: 'Request a one-page website' },
      },
      {
        id: 'uznemuma',
        name: { lv: 'Uzņēmuma mājaslapa', en: 'Business website' },
        solves: {
          lv: 'Kad ar vienu lapu nepietiek, un tekstus gribi mainīt pats.',
          en: 'When one page isn’t enough and you want to change the texts yourself.',
        },
        price: { from: true, parts: [{ amount: 850 }] },
        includes: [
          {
            lv: 'Līdz ~5 lapām: piemēram, sākums, pakalpojumi, cenas, par mums, kontakti',
            en: 'Up to ~5 pages: for example home, services, prices, about, contact',
          },
          {
            lv: 'Vienkāršs admin panelis: tekstus un bildes maini pats',
            en: 'A simple admin: change texts and photos yourself',
          },
          { lv: 'Vispirms telefonam, ātra', en: 'Mobile-first and fast' },
          { lv: 'Iestatīta Google meklēšanai', en: 'Set up for Google search' },
        ],
        cta: { lv: 'Pieteikt uzņēmuma mājaslapu', en: 'Request a business website' },
      },
    ],
    steps: [
      {
        title: { lv: 'Saruna', en: 'A short talk' },
        body: {
          lv: 'Pastāsti par uzņēmumu un to, kas vajadzīgs. Pēc tam nosaucu precīzu cenu un termiņu.',
          en: 'Tell me about the business and what you need. Then I give you an exact price and date.',
        },
      },
      {
        title: { lv: 'Makets', en: 'A first look' },
        body: {
          lv: 'Uztaisu pirmo skatu. Tu pasaki, kas der un kas jāmaina.',
          en: 'I make a first version. You tell me what works and what to change.',
        },
      },
      {
        title: { lv: 'Izstrāde', en: 'Building' },
        body: {
          lv: 'Uzbūvēju lapu, ielieku tavus tekstus un bildes, iestatu domēnu.',
          en: 'I build the site, add your texts and photos, and set up the domain.',
        },
      },
      {
        title: { lv: 'Palaišana', en: 'Launch' },
        body: {
          lv: 'Lapa ir tiešsaistē. Tālāk par serveri rūpējos es.',
          en: 'The site goes live. From then on I look after the server.',
        },
      },
    ],
    faqs: [
      {
        q: { lv: 'Cik ilgi tas aizņem?', en: 'How long does it take?' },
        a: {
          lv: 'Parasti 2–4 nedēļas. Visātrāk iet, ja teksti un bildes jau ir gatavi.',
          en: 'Usually 2–4 weeks. It goes fastest when the texts and photos are ready.',
        },
      },
      {
        q: { lv: 'Kam pieder domēns?', en: 'Who owns the domain?' },
        a: {
          lv:
            'Tev. Domēnu reģistrēju uz tava vārda. Ja kādreiz gribēsi strādāt ar citu ' +
            'izstrādātāju, domēns paliek tev.',
          en:
            'You do. I register the domain in your name. If you ever want to work with another ' +
            'developer, the domain stays with you.',
        },
      },
      {
        q: { lv: 'Kāpēc cena ir „no”?', en: 'Why does the price say “from”?' },
        a: {
          lv:
            'Cena ir atkarīga no satura un funkcijām. Pēc pirmās sarunas nosaucu precīzu ' +
            'summu, un tikai tad sāku darbu.',
          en:
            'The price depends on the content and features. After our first talk I give you ' +
            'an exact figure, and only then do I start.',
        },
      },
      {
        q: { lv: 'Vai hostings ir iekļauts?', en: 'Is hosting included?' },
        a: {
          lv:
            'Hostings ir atsevišķi, caur maniem plāniem: Pamata €15/mēn vai Plus €35/mēn. ' +
            'Lapa strādā uz mana servera ES, un es par to rūpējos.',
          en:
            'Hosting is separate, through my plans: Basic €15/month or Plus €35/month. ' +
            'The site runs on my server in the EU, and I look after it.',
        },
      },
      {
        q: { lv: 'Kas man pašam jādara?', en: 'What do I need to do?' },
        a: {
          lv: 'Iedot tekstus un bildes un pateikt, kas patīk. Visu tehnisko izdaru es.',
          en: 'Send the texts and photos and tell me what you like. I do all the technical work.',
        },
      },
    ],
  },
  {
    slug: 'parcelsana',
    name: { lv: 'Pārcelšana no Wix vai Tilda', en: 'Move from Wix or Tilda' },
    pitch: {
      lv: 'Maksā platformai katru mēnesi, bet lapa tev nepieder? Pārceļu to pie tevis.',
      en: 'Paying a platform every month and still don’t own your site? I’ll move it to you.',
    },
    cardPrice: { from: true, parts: [{ amount: 300 }] },
    seoTitle: {
      lv: 'Mājaslapas pārcelšana no Wix vai Tilda · Jelgava · no €300',
      en: 'Move your website off Wix or Tilda · Latvia · from €300',
    },
    seoDescription: {
      lv:
        'Pārceļu mājaslapu no Wix vai Tilda uz tavu domēnu: tas pats saturs un izskats, ' +
        'ātrāka lapa, un tā pieder tev. No €300 vai bez maksas ar Hostings Plus uz 12 mēnešiem. Jelgava.',
      en:
        'I move websites off Wix or Tilda to your own domain: same content and look, a faster ' +
        'site, and you own it. From €300, or free with a 12-month Hosting Plus plan.',
    },
    serviceType: 'Website migration',
    lead: {
      lv:
        'Tu maksā platformai katru mēnesi, bet lapa tev tik un tā nepieder. ' +
        'Pārceļu to uz tavu domēnu un savu serveri: tas pats saturs, tas pats izskats, tikai ātrāk.',
      en:
        'You pay a platform every month, and the site still isn’t yours. ' +
        'I move it to your own domain and my server: the same content, the same look, only faster.',
    },
    honest: {
      title: { lv: 'Godīgi par pārcelšanu', en: 'To be honest' },
      body: {
        lv:
          'Wix lapu eksportēt nevar. Tilda to ļauj tikai dārgākajā plānā, un tad kods ir ' +
          'smags un grūti uzturams. Tāpēc es lapu uzbūvēju no jauna ar to pašu saturu un ' +
          'izskatu. Tā kļūst ātrāka, un beidzot tā pieder tev.',
        en:
          'A Wix site can’t be exported. Tilda only allows it on its most expensive plan, ' +
          'and the exported code is heavy and hard to maintain. So I rebuild the site with the ' +
          'same content and look. It gets faster, and it’s finally yours.',
      },
    },
    audience: [
      {
        lv: 'Tev ir lapa Wix, Tilda vai līdzīgā platformā, un tu par to maksā katru mēnesi.',
        en: 'Your site is on Wix, Tilda or a similar platform, and you pay for it every month.',
      },
      {
        lv: 'Gribi lapu, kas pieder tev, nevis platformai.',
        en: 'You want a site that belongs to you, not to the platform.',
      },
      {
        lv: 'Lapa ir lēna vai neērta telefonā.',
        en: 'The site is slow or awkward on a phone.',
      },
    ],
    includes: [
      {
        lv: 'Lapu uzbūvēju no jauna ar to pašu saturu un izskatu',
        en: 'I rebuild the site with the same content and look',
      },
      { lv: 'Pārnesu visus tekstus un bildes', en: 'I move over all texts and photos' },
      {
        lv: 'Vecās adreses pāradresēju uz jaunajām, lai Google un klienti neatduras pret kļūdu',
        en: 'Old addresses redirect to the new ones, so Google and customers don’t hit errors',
      },
      { lv: 'Domēns uz tava vārda', en: 'The domain in your name' },
      { lv: 'Ātrāka lapa, vispirms telefonam', en: 'A faster, mobile-first site' },
    ],
    plans: [
      {
        id: 'parcelsana',
        name: { lv: 'Pārcelšana no platformas', en: 'Platform move' },
        solves: {
          lv: 'Kad maksā par platformu, bet gribi, lai lapa būtu tava.',
          en: 'When you pay for a platform but want the site to be yours.',
        },
        price: { from: true, parts: [{ amount: 300 }] },
        priceNote: {
          lv: 'Vai bez maksas, ja izvēlies Hostings Plus uz 12 mēnešiem.',
          en: 'Or free when you choose Hosting Plus for 12 months.',
        },
        includes: [
          { lv: 'Tas pats saturs un izskats', en: 'The same content and look' },
          { lv: 'Pāradresācijas no vecajām adresēm', en: 'Redirects from the old addresses' },
          { lv: 'Domēns uz tava vārda', en: 'The domain in your name' },
        ],
        cta: { lv: 'Pieteikt lapas pārcelšanu', en: 'Request a site move' },
      },
    ],
    steps: [
      {
        title: { lv: 'Apskatu tavu lapu', en: 'I look at your site' },
        body: {
          lv: 'Atsūti saiti. Pasaku, cik tas maksās un cik ilgi aizņems.',
          en: 'Send me the link. I tell you what it will cost and how long it will take.',
        },
      },
      {
        title: { lv: 'Uzbūvēju no jauna', en: 'I rebuild it' },
        body: {
          lv: 'Uztaisu to pašu lapu uz sava servera. Tu to redzi pirms palaišanas.',
          en: 'I build the same site on my server. You see it before it goes live.',
        },
      },
      {
        title: { lv: 'Pārslēdzu domēnu', en: 'I switch the domain' },
        body: {
          lv: 'Kad viss der, domēns sāk rādīt jauno lapu.',
          en: 'When everything is right, the domain starts showing the new site.',
        },
      },
      {
        title: { lv: 'Atsakies no platformas', en: 'You cancel the platform' },
        body: {
          lv: 'Kad jaunā lapa strādā, vari atteikt Wix vai Tilda abonementu.',
          en: 'Once the new site is running, you can cancel your Wix or Tilda subscription.',
        },
      },
    ],
    faqs: [
      {
        q: { lv: 'Kāpēc nevar vienkārši eksportēt?', en: 'Why not just export the site?' },
        a: {
          lv:
            'Wix neļauj lapu lejupielādēt tā, lai tā strādātu citur. Tilda to ļauj tikai ' +
            'dārgākajā plānā, un kods ir smags. Tāpēc uzbūvēju no jauna: vairāk darba man, ' +
            'bet rezultāts ir ātrāks un pilnībā tavs.',
          en:
            'Wix doesn’t let you download a site that works elsewhere. Tilda only allows it ' +
            'on its top plan, and the code is heavy. So I rebuild it: more work for me, but ' +
            'the result is faster and fully yours.',
        },
      },
      {
        q: { lv: 'Vai lapa izskatīsies tāpat?', en: 'Will the site look the same?' },
        a: {
          lv: 'Jā, saturs un izskats paliek tie paši. Ja gribi, pa ceļam varam ko uzlabot.',
          en: 'Yes, the content and look stay the same. If you like, we can improve things along the way.',
        },
      },
      {
        q: { lv: 'Kā tas var būt bez maksas?', en: 'How can it be free?' },
        a: {
          lv:
            'Ja izvēlies Hostings Plus uz 12 mēnešiem (€35/mēn), pārcelšanu atsevišķi neņemu. ' +
            'Tā ir daļa no sadarbības.',
          en:
            'If you choose Hosting Plus for 12 months (€35/month), I don’t charge for the move. ' +
            'It’s part of working together.',
        },
      },
      {
        q: { lv: 'Vai lapa kādu laiku nestrādās?', en: 'Will the site be down for a while?' },
        a: {
          lv:
            'Nē. Vecā lapa strādā, kamēr jaunā nav gatava. Domēnu pārslēdzu tikai tad, ' +
            'kad viss ir pārbaudīts.',
          en:
            'No. The old site keeps running until the new one is ready. I only switch the ' +
            'domain once everything has been checked.',
        },
      },
      {
        q: { lv: 'Kas notiks ar manu domēnu?', en: 'What happens to my domain?' },
        a: {
          lv:
            'Ja domēns jau ir uz tava vārda, tas tāds arī paliek. Ja tas ir reģistrēts caur ' +
            'platformu, palīdzu to pārnest uz tava vārda.',
          en:
            'If the domain is already in your name, it stays that way. If it was registered ' +
            'through the platform, I help you move it into your name.',
        },
      },
    ],
  },
  {
    slug: 'hostings',
    name: { lv: 'Hostings un uzturēšana', en: 'Hosting and maintenance' },
    pitch: {
      lv: 'Tava lapa uz mana servera ES. Es rūpējos, lai tā strādā.',
      en: 'Your site on my server in the EU. I make sure it keeps running.',
    },
    cardPrice: { from: true, parts: [{ amount: 15, monthly: true }] },
    seoTitle: {
      lv: 'Mājaslapas hostings un uzturēšana Jelgavā · no €15/mēn',
      en: 'Website hosting and maintenance, Latvia · from €15/month',
    },
    seoDescription: {
      lv:
        'Hostings un uzturēšana uz mana servera ES: HTTPS, ikdienas rezerves kopijas, ' +
        'uzraudzība un ikmēneša atskaite. Pamata €15/mēn, Plus €35/mēn. Jelgava un visa Latvija.',
      en:
        'Hosting and maintenance on my own server in the EU: HTTPS, daily backups, uptime ' +
        'monitoring and a monthly report. Basic €15/month, Plus €35/month.',
    },
    serviceType: 'Website hosting and maintenance',
    lead: {
      lv:
        'Lapa nav uztaisīta un aizmirsta. Tā ir jāhostē, jāsargā un laiku pa laikam jāmaina. ' +
        'To daru es, uz sava servera Eiropas Savienībā, par skaidru cenu katru mēnesi.',
      en:
        'A website isn’t done once it’s built. It needs hosting, protecting and the odd change. ' +
        'I do that on my own server in the EU, for a clear price every month.',
    },
    audience: [
      {
        lv: 'Tev ir lapa, ko uztaisīju vai pārcēlu es.',
        en: 'You have a site I built or moved for you.',
      },
      {
        lv: 'Negribi domāt par serveriem, atjauninājumiem un rezerves kopijām.',
        en: 'You don’t want to think about servers, updates and backups.',
      },
      {
        lv: 'Gribi vienu cilvēku, kam uzrakstīt, kad kaut kas jāmaina.',
        en: 'You want one person to write to when something needs changing.',
      },
    ],
    includes: [
      {
        lv: 'Serveris Eiropas Savienībā, ko pats uzstādīju un uzturu',
        en: 'A server in the EU that I set up and maintain myself',
      },
      {
        lv: 'Viens cilvēks, kas zina tavu lapu',
        en: 'One person who knows your site',
      },
      { lv: 'Skaidra cena katru mēnesi', en: 'A clear price every month' },
    ],
    plans: [
      {
        id: 'pamata',
        name: { lv: 'Pamata', en: 'Basic' },
        solves: {
          lv: 'Kad lapai vienkārši jāstrādā, un labojumi vajadzīgi reti.',
          en: 'When the site just needs to run and changes are rare.',
        },
        price: { parts: [{ amount: 15, monthly: true }] },
        priceNote: {
          lv: 'Labojumi €25 katrs (neliela izmaiņa līdz ~30 min). Lielāki darbi pēc tāmes vai €30/h.',
          en: 'Edits €25 each (a small change up to ~30 min). Bigger work by quote or €30/h.',
        },
        includes: [
          { lv: 'Hostings uz mana servera ES', en: 'Hosting on my server in the EU' },
          { lv: 'HTTPS (drošs savienojums)', en: 'HTTPS (a secure connection)' },
          { lv: 'Ikdienas rezerves kopijas', en: 'Daily backups' },
          {
            lv: 'Uzraudzība: uzzinu pirmais, ja lapa nestrādā',
            en: 'Uptime monitoring: I know first if the site is down',
          },
          {
            lv: 'Ikmēneša atskaite: apmeklētāji un darbības laiks',
            en: 'A monthly report: visitors and uptime',
          },
        ],
        cta: { lv: 'Pieteikt Pamata hostingu', en: 'Request Basic hosting' },
      },
      {
        id: 'plus',
        name: { lv: 'Plus', en: 'Plus' },
        solves: {
          lv: 'Kad gribi, lai lapu atrastu Google, un labojumi vajadzīgi bieži.',
          en: 'When you want to be found on Google and need changes often.',
        },
        price: { parts: [{ amount: 35, monthly: true }] },
        priceNote: {
          lv: 'Papildu labojumi €25 katrs. Lielāki darbi pēc tāmes vai €30/h.',
          en: 'Extra edits €25 each. Bigger work by quote or €30/h.',
        },
        includes: [
          { lv: 'Viss no Pamata plāna', en: 'Everything in Basic' },
          { lv: '2 nelieli labojumi mēnesī iekļauti', en: '2 small edits a month included' },
          { lv: 'Google Business profila uzturēšana', en: 'Google Business profile upkeep' },
          {
            lv: 'Atskaitē arī tava vieta Google meklēšanā',
            en: 'Your Google ranking in the monthly report',
          },
        ],
        cta: { lv: 'Pieteikt Plus hostingu', en: 'Request Plus hosting' },
      },
    ],
    steps: [
      {
        title: { lv: 'Izvēlies plānu', en: 'Pick a plan' },
        body: {
          lv: 'Pamata vai Plus. Ja nezini, kurš der, pajautā.',
          en: 'Basic or Plus. If you’re not sure which fits, just ask.',
        },
      },
      {
        title: { lv: 'Palaižu lapu', en: 'I move the site in' },
        body: {
          lv: 'Uzlieku lapu uz sava servera un iestatu HTTPS, kopijas un uzraudzību.',
          en: 'I put the site on my server and set up HTTPS, backups and monitoring.',
        },
      },
      {
        title: { lv: 'Katru mēnesi atskaite', en: 'A report every month' },
        body: {
          lv: 'Redzi, cik cilvēku lapu apmeklēja un vai tā visu laiku strādāja.',
          en: 'You see how many people visited and whether the site stayed up.',
        },
      },
      {
        title: { lv: 'Raksti, kad vajag', en: 'Write when you need something' },
        body: {
          lv: 'Jauna cena, darba laiks vai bilde? Uzraksti, un es to nomainu.',
          en: 'A new price, opening hours or a photo? Write to me and I change it.',
        },
      },
    ],
    faqs: [
      {
        q: { lv: 'Kas ir „neliels labojums”?', en: 'What counts as a “small edit”?' },
        a: {
          lv: 'Izmaiņa līdz ~30 minūtēm: jauna cena, darba laiks, bilde vai teksta rindkopa.',
          en: 'A change of up to ~30 minutes: a new price, opening hours, a photo or a paragraph.',
        },
      },
      {
        q: { lv: 'Kur atrodas serveris?', en: 'Where is the server?' },
        a: {
          lv:
            'Eiropas Savienībā. To uzstādīju un uzturu pats, tāpat kā šo vietni un savu ' +
            'pasta serveri.',
          en:
            'In the European Union. I set it up and maintain it myself, like this site and ' +
            'my own mail server.',
        },
      },
      {
        q: { lv: 'Ko nozīmē uzraudzība?', en: 'What does monitoring mean?' },
        a: {
          lv:
            'Sistēma regulāri pārbauda, vai lapa atveras. Ja ne, es par to uzzinu uzreiz un ' +
            'sāku labot.',
          en:
            'A system checks regularly that the site opens. If it doesn’t, I find out straight ' +
            'away and start fixing it.',
        },
      },
      {
        q: { lv: 'Kas ir Google Business profils?', en: 'What is a Google Business profile?' },
        a: {
          lv:
            'Tā ir tava uzņēmuma kartīte Google meklēšanā un kartēs: adrese, darba laiks, ' +
            'bildes. Plus plānā es to uzturu aktuālu.',
          en:
            'It’s your business card in Google Search and Maps: address, opening hours, ' +
            'photos. On the Plus plan I keep it up to date.',
        },
      },
      {
        q: { lv: 'Ko es redzēšu atskaitē?', en: 'What’s in the report?' },
        a: {
          lv:
            'Cik cilvēku apmeklēja lapu un vai tā visu mēnesi strādāja. Plus plānā arī to, ' +
            'kurā vietā tu esi Google meklēšanā.',
          en:
            'How many people visited and whether the site was up all month. On Plus, also ' +
            'where you rank in Google search.',
        },
      },
    ],
  },
  {
    slug: 'portfolio',
    name: { lv: 'Portfolio lapa radošajiem', en: 'Portfolio site for creatives' },
    pitch: {
      lv: 'Tīrs portfolio māksliniekiem, dizaineriem un studentiem adresē vards.protu.lv.',
      en: 'A clean portfolio for artists, designers and students at yourname.protu.lv.',
    },
    cardPrice: { parts: [{ amount: 79 }, { amount: 5, monthly: true }] },
    seoTitle: {
      lv: 'Portfolio lapa māksliniekiem un dizaineriem · no €79',
      en: 'Portfolio website for artists and designers · from €79',
    },
    seoDescription: {
      lv:
        'Tīra portfolio lapa māksliniekiem, dizaineriem un studentiem adresē vards.protu.lv: ' +
        '€79 vienreiz + €5/mēn vai €129 ar pirmo gadu. Izstrādāts Jelgavā, piemērs: anda.protu.lv.',
      en:
        'A clean portfolio site for artists, designers and students at yourname.protu.lv: ' +
        '€79 once + €5/month, or €129 including the first year. Example: anda.protu.lv.',
    },
    serviceType: 'Portfolio website',
    lead: {
      lv:
        'Tavi darbi ir labi, bet tie ir izkaisīti pa Instagram, Behance un mapēm. ' +
        'Salieku tos vienā tīrā lapā ar tavu vārdu adresē, ko vari iedot jebkuram.',
      en:
        'Your work is good, but it’s scattered across Instagram, Behance and folders. ' +
        'I put it on one clean page with your name in the address, ready to send to anyone.',
    },
    audience: [
      {
        lv: 'Māksliniekiem, ilustratoriem un dizaineriem.',
        en: 'Artists, illustrators and designers.',
      },
      {
        lv: 'Studentiem, kas piesakās praksei, darbam vai studijām.',
        en: 'Students applying for internships, jobs or courses.',
      },
      {
        lv: 'Ikvienam, kam vajag vienu saiti uz saviem labākajiem darbiem.',
        en: 'Anyone who needs one link to their best work.',
      },
    ],
    includes: [
      {
        lv: 'Tīrs dizains, kurā galvenie ir tavi darbi',
        en: 'A clean design where your work comes first',
      },
      {
        lv: 'Ātra ielāde, arī ar daudz bildēm',
        en: 'Loads fast, even with lots of images',
      },
      { lv: 'Labi izskatās telefonā', en: 'Looks good on a phone' },
      {
        lv: '1 atjauninājums ceturksnī iekļauts (līdz 5 jauniem darbiem vai teksta izmaiņām)',
        en: '1 update per quarter included (up to 5 new works or text changes)',
      },
      { lv: 'Papildu atjauninājums €10', en: 'Extra updates €10 each' },
      {
        lv: 'Savs domēns (vards.lv) arī iespējams: + domēna cena (~€15 gadā)',
        en: 'Your own domain (yourname.lv) is possible: + the domain cost (~€15 a year)',
      },
    ],
    plans: [
      {
        id: 'pa-menesiem',
        name: { lv: 'Pa mēnešiem', en: 'Pay monthly' },
        solves: {
          lv: 'Kad gribi sākt ar mazāku summu.',
          en: 'When you’d rather start with a smaller amount.',
        },
        price: { parts: [{ amount: 79 }, { amount: 5, monthly: true }] },
        priceNote: {
          lv: '€79 vienreiz, pēc tam €5 mēnesī.',
          en: '€79 once, then €5 a month.',
        },
        includes: [
          { lv: 'Portfolio adresē vards.protu.lv', en: 'Portfolio at yourname.protu.lv' },
          { lv: '1 atjauninājums ceturksnī', en: '1 update per quarter' },
        ],
        cta: { lv: 'Pieteikt portfolio pa mēnešiem', en: 'Request a portfolio, paid monthly' },
      },
      {
        id: 'gads',
        name: { lv: 'Gads uzreiz', en: 'First year up front' },
        solves: {
          lv: 'Kad gribi samaksāt vienreiz un gadu par to nedomāt.',
          en: 'When you’d rather pay once and not think about it for a year.',
        },
        price: { parts: [{ amount: 129 }] },
        priceNote: {
          lv: 'Iekļauts pirmais gads. Pēc tam €5 mēnesī.',
          en: 'Includes the first year. After that, €5 a month.',
        },
        includes: [
          { lv: 'Portfolio adresē vards.protu.lv', en: 'Portfolio at yourname.protu.lv' },
          { lv: '1 atjauninājums ceturksnī', en: '1 update per quarter' },
          { lv: '€10 lētāk nekā pa mēnešiem', en: '€10 less than paying monthly' },
        ],
        cta: { lv: 'Pieteikt portfolio ar pirmo gadu', en: 'Request a portfolio, first year included' },
      },
    ],
    steps: [
      {
        title: { lv: 'Atsūti darbus', en: 'Send your work' },
        body: {
          lv: 'Bildes, īsu tekstu par sevi un kontaktus.',
          en: 'Images, a short text about you and your contacts.',
        },
      },
      {
        title: { lv: 'Uztaisu lapu', en: 'I build the page' },
        body: {
          lv: 'Sakārtoju darbus un uztaisu lapu, kas der tavam stilam.',
          en: 'I arrange the work and build a page that suits your style.',
        },
      },
      {
        title: { lv: 'Lapa ir tiešsaistē', en: 'It goes live' },
        body: {
          lv: 'Adresē vards.protu.lv vai tavā domēnā.',
          en: 'At yourname.protu.lv or on your own domain.',
        },
      },
      {
        title: { lv: 'Atjauno reizi ceturksnī', en: 'Refresh it each quarter' },
        body: {
          lv: 'Atsūti jaunus darbus, un es tos ielieku.',
          en: 'Send new work, and I add it.',
        },
      },
    ],
    faqs: [
      {
        q: { lv: 'Kas ir viens atjauninājums?', en: 'What is one update?' },
        a: {
          lv: 'Līdz 5 jauniem darbiem vai teksta izmaiņām. Viens katrā ceturksnī ir iekļauts, katrs nākamais maksā €10.',
          en: 'Up to 5 new works or text changes. One per quarter is included; each extra one is €10.',
        },
      },
      {
        q: { lv: 'Kura maksājuma iespēja ir izdevīgāka?', en: 'Which way of paying is cheaper?' },
        a: {
          lv: 'Ja paliec vismaz gadu, €129 ir lētāk: pa mēnešiem pirmais gads izmaksā €79 + 12 × €5 = €139.',
          en: 'If you stay at least a year, €129 is cheaper: monthly, the first year costs €79 + 12 × €5 = €139.',
        },
      },
      {
        q: { lv: 'Vai varu izmantot savu domēnu?', en: 'Can I use my own domain?' },
        a: {
          lv: 'Jā, piemēram vards.lv. Tad klāt nāk domēna cena, aptuveni €15 gadā.',
          en: 'Yes, for example yourname.lv. Then the domain cost is added, about €15 a year.',
        },
      },
      {
        q: { lv: 'Esmu students. Vai tas der man?', en: 'I’m a student. Is this for me?' },
        a: {
          lv: 'Jā. Portfolio palīdz pieteikties praksei, darbam vai studijām, un šis ir lēts veids, kā sākt.',
          en: 'Yes. A portfolio helps when you apply for internships, jobs or courses, and this is a cheap way to start.',
        },
      },
    ],
  },
]

/** Reāls piemērs portfolio lapai: Andas vietne un tās gadījuma izpēte. */
export const portfolioExample = {
  title: { lv: 'Piemērs: anda.protu.lv', en: 'Example: anda.protu.lv' },
  body: {
    lv:
      'Manas māsas Andas portfolio. Viņa ir spēļu māksliniece, un viņas lapa bija Canva. ' +
      'Pārcēlu to uz viņas pašas adresi un uztaisīju no jauna, un sākumlapa kļuva 16 reizes vieglāka.',
    en:
      'My sister Anda’s portfolio. She’s a game artist, and her site was on Canva. ' +
      'I moved it to her own address and rebuilt it, and the home page got 16 times lighter.',
  },
  image: '/work/anda/new-home-desktop.webp',
  imageAlt: { lv: 'Andas Viškas portfolio sākumlapa', en: 'Anda Viška’s portfolio home page' },
  caseHref: '/darbi/anda',
  caseLink: { lv: 'Lasīt Andas portfolio gadījuma izpēti', en: 'Read the Anda portfolio case study' },
  liveHref: 'https://anda.protu.lv',
  liveLink: { lv: 'Atvērt anda.protu.lv', en: 'Open anda.protu.lv' },
}

/** Pārskata lapa un kopīgie virsraksti. */
export const servicesPage = {
  title: { lv: 'Pakalpojumi', en: 'Services' },
  seoTitle: {
    lv: 'Mājaslapas, hostings un portfolio Jelgavā · Pakalpojumi',
    en: 'Websites, hosting and portfolios in Jelgava, Latvia · Services',
  },
  seoDescription: {
    lv:
      'Mājaslapu izstrāde, pārcelšana no Wix un Tilda, hostings un portfolio lapas Jelgavā ' +
      'un Zemgalē. Skaidras cenas: mājaslapa no €400, hostings no €15/mēn.',
    en:
      'Website design, moving off Wix and Tilda, hosting and portfolio sites in Jelgava and ' +
      'Zemgale, Latvia. Clear prices: a website from €400, hosting from €15/month.',
  },
  lead: {
    lv:
      'Mājaslapas, hostings un portfolio maziem uzņēmumiem un radošajiem Jelgavā, Zemgalē ' +
      'un visā Latvijā. Visu daru pats, no dizaina līdz serverim.',
    en:
      'Websites, hosting and portfolios for small businesses and creatives in Jelgava, ' +
      'Zemgale and across Latvia. I do it all myself, from design to the server.',
  },
  principlesTitle: { lv: 'Kā es strādāju', en: 'How I work' },
  principles: [
    {
      title: { lv: 'Domēns uz tava vārda', en: 'The domain is in your name' },
      body: {
        lv: 'Lapa un adrese pieder tev. Ja kādreiz aiziesi, tās paņem līdzi.',
        en: 'The site and its address belong to you. If you ever leave, you take them with you.',
      },
    },
    {
      title: { lv: 'Mans serveris ES', en: 'My own server in the EU' },
      body: {
        lv: 'Hostēju pats, uz servera, ko uzstādīju un uzturu. Tāpat kā šo vietni un savu pastu.',
        en: 'I host on a server I set up and maintain, just like this site and my own email.',
      },
    },
    {
      title: { lv: 'Viens cilvēks', en: 'One person' },
      body: {
        lv: 'Dizains, kods un serveris: ar visu strādāju es, tāpēc nekas nepazūd starp cilvēkiem.',
        en: 'Design, code and server: I handle all of it, so nothing gets lost between people.',
      },
    },
  ],
  see: { lv: 'Skatīt', en: 'See' },
  all: { lv: 'Visi pakalpojumi', en: 'All services' },
  next: { lv: 'Nākamais pakalpojums', en: 'Next service' },
  audienceTitle: { lv: 'Kam tas ir', en: 'Who it’s for' },
  includesTitle: { lv: 'Kas ir iekļauts', en: 'What’s included' },
  priceTitle: { lv: 'Cena', en: 'Price' },
  stepsTitle: { lv: 'Kā tas notiek', en: 'How it works' },
  faqTitle: { lv: 'Biežāk uzdotie jautājumi', en: 'Questions' },
  ctaNote: {
    lv: 'Pieteikums atver ziņas formu lapas apakšā. Atbildu pats.',
    en: 'The request opens the message form at the bottom of the page. I answer myself.',
  },
  /** Sākumlapas teaser zem pirmā skata — bez cenām. */
  teaserTitle: { lv: 'Vajag mājaslapu?', en: 'Need a website?' },
  teaserLead: {
    lv: 'Taisu mājaslapas un portfolio, pārceļu lapas no Wix un Tilda un pats tās hostēju.',
    en: 'I build websites and portfolios, move sites off Wix and Tilda, and host them myself.',
  },
  teaserLink: { lv: 'Skatīt pakalpojumus un cenas', en: 'See services and prices' },
}

/** /pakalpojumi/ → overview; /pakalpojumi/<slug>/ → service; citādi null. */
export function serviceRoute(path: string): { service: Service | null } | null {
  const m = path.match(/^\/pakalpojumi(?:\/([\w-]+))?\/?$/)
  if (!m) return null
  return { service: services.find((s) => s.slug === m[1]) ?? null }
}

/** "no €400", "€15/mēn", "€79 + €5/mēn". */
export function formatPrice(price: Price, lang: Lang) {
  const month = lang === 'lv' ? '/mēn' : '/month'
  const parts = price.parts.map((p) => `€${p.amount}${p.monthly ? month : ''}`).join(' + ')
  if (!price.from) return parts
  return `${lang === 'lv' ? 'no' : 'from'} ${parts}`
}
