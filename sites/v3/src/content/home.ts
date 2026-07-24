/**
 * Local content for the homepage (Slovenian).
 *
 * Single source of truth for the marketing copy. Each section component reads
 * its slice from here (and accepts prop overrides for reuse on other pages).
 *
 * Copy is grounded in COPY.md (5-persona buyer panel). The cardinal rule:
 * NEVER claim "brez posegov v inštalacije", the install is wireless-first but
 * needs MINIMAL, clean electrical work (relays into existing wiring). Saying
 * otherwise is false and kills trust. We lead with that honesty instead.
 */

export const homeContent = {
  hero: {
    title: "Pametna avtomatizacija za dom in pisarno, brez razbijanja sten",
    subtitle:
      "Luči, senčila, ogrevanje, varnost in poraba: vse v eni aplikaciji. Krmilne module vgradimo v vašo obstoječo napeljavo (minimalni, čisti električni poseg), naprave povežemo brezžično. Hitra vgradnja, brez invazivnih gradbenih del. Rešitve za stanovanja, hiše in poslovne prostore.",
    priceLabel: "Že od",
    price: "2.500 €",
    primaryCta: { label: "Brezplačen posvet in ponudba", href: "/kontakt/" },
    secondaryCta: { label: "Doživetje doma", href: "/dozivetje/" },
    badges: [
      "Brez razbijanja sten",
      "Vgradnja v nekaj dneh",
      "Vaš sistem ostane vaš",
      "24-mesečna garancija",
    ],
  },

  honesty: {
    title: "Pošteno o tem, kaj naredimo v vašem domu",
    intro:
      "Pametni dom ne nastane »iz zraka«. Da luči, vtičnice in senčila postanejo pametni, usposobljen elektro-monter vgradi releje (npr. Shelly) v vašo obstoječo napeljavo, za stikala in v elektro omarico. To je edini električni poseg.",
    leadIn: "Kaj to pomeni za vas:",
    points: [
      "Brez razbijanja sten, brez dolbenja.",
      "Posege opravi usposobljen monter, po standardih, z računom in garancijo.",
      "Večino domov zaključimo v nekaj dneh.",
      "Po vgradnji za seboj pospravimo, dom ostane tak, kot je bil.",
    ],
  },

  trust: {
    title: "Delujemo z napravami, ki jim zaupate",
    note: "Odprt ekosistem, brez vezanosti na enega proizvajalca.",
  },

  why: {
    title: "Kaj se spremeni v vašem vsakdanu",
    items: [
      {
        icon: "shield",
        title: "Vedno veste, kaj se dogaja doma",
        text: "Pametna ključavnica, video zvonec in senzorji vas obvestijo: kdo je pred vrati, ali so okna zaprta, ali so otroci prišli domov, kjer koli ste.",
      },
      {
        icon: "bolt",
        title: "Nižji računi",
        text: "Avtomatika senčil, ogrevanja in luči ter nadzor porabe znižajo stroške. Na ogledu pošteno povemo, kje prihranek je in kje ga ni. Enako velja za pisarno: HVAC po urniku, samodejni izklop luči in nadzor porabe zmanjšajo poslovne stroške brez posega v infrastrukturo.",
      },
      {
        icon: "tablet-smartphone",
        title: "Vse na enem mestu",
        text: "Konec petih aplikacij in predala daljincev. Vse, od luči do kamer, v eni preprosti aplikaciji, ki jo zna uporabljati vsa družina.",
      },
      {
        icon: "repeat",
        title: "Dom, ki se prilagodi vam",
        text: "Prizori za jutro, večer in odhod od doma poskrbijo, da se stvari zgodijo same, brez naprezanja, brez razmišljanja.",
      },
    ],
  },

  comparison: {
    title: "Inteligenca žičnega sistema, brez prenove končanega doma",
    footnote: "Ni vam treba izbirati med lepo dokončanim in resnično pametnim domom.",
    wireless: {
      label: "Signapps: brezžično z minimalnim posegom",
      points: [
        "Releji v obstoječo napeljavo, brez razbijanja sten",
        "Primeren za že zgrajen ali opremljen dom",
        "Vgradnja v 1–2 dni",
        "Odprt sistem (Home Assistant): poljubne znamke",
        "Razširljiv: nove naprave za vas dodamo in nastavimo, kadar koli",
        "Sistem ostane vaš, brez vezanosti",
      ],
    },
    wired: {
      label: "Klasični žični sistem (KNX/Loxone)",
      points: [
        "Nova ožičenja, dolbenje, gradbena dela",
        "Smiselno le med gradnjo ali prenovo",
        "Vgradnja tedne",
        "Zaprt sistem, vezan na enega proizvajalca",
        "Nadgradnja je drag poseg specialista",
        "Vezani na vgraditelja",
      ],
    },
  },

  ecosystem: {
    title: "Odprt sistem, zgrajen na Home Assistant",
    subtitle:
      "Home Assistant je odprt nadzorni center vašega doma. Povezuje naprave vodilnih znamk prek Wi-Fi, Zigbee in Bluetooth LE. Matter in Thread sta v pripravi.",
  },

  steps: {
    title: "V 3 korakih do pametnega doma",
    items: [
      {
        n: "01",
        title: "Brezplačen posvet in ogled",
        text: "Skupaj pregledamo vaše želje in prostor (stanovanje, hiša ali poslovni prostor) ter pripravimo predlog rešitve in ponudbo, vnaprej in pisno.",
      },
      {
        n: "02",
        title: "Vgradnja v nekaj dneh",
        text: "Naprave povežemo brezžično, krmilne module vgradimo z minimalnim, čistim električnim posegom, brez invazivnih gradbenih del.",
      },
      {
        n: "03",
        title: "Predaja in podpora",
        text: "Pokažemo vam uporabo, nastavimo prizore in avtomatizacije po meri ter ostanemo na voljo za podporo, za dom ali ekipo v pisarni.",
      },
    ],
  },

  moments: {
    title: "Dom, ki ga že poznate, le pametnejši",
    subtitle:
      "Ne prodajamo futuristične vizije. Pokažemo, kako avtomatizacija živi v resničnih prostorih: jutro, večer, odhod, gosti.",
    items: [
      {
        caption: "Spalnica, ko se luči in senčila prilagodijo sami",
        imageKey: "bedroom-evening" as const,
      },
      {
        caption: "Ena aplikacija za celoten dom",
        imageKey: "living-room-ambient" as const,
      },
      {
        caption: "Prizori za večer, kuhinjo ali goste",
        imageKey: "kitchen-dining" as const,
      },
    ],
  },

  experienceTeaser: {
    title: "Prehodite skozi pameten dom",
    subtitle:
      "Na strani Doživetje si oglejte, kako avtomatizacije delujejo v resničnih prostorih, od jutranje svetlobe do večernih prizorov.",
    cta: { label: "Doživetje pametnega doma", href: "/dozivetje/" },
  },

  pricingTeaser: {
    eyebrow: "Cenik",
    title: "Trije paketi: od hitre rešitve do doma po meri",
    subtitle:
      "Pametni dom lahko naredimo hitro in ugodno, ali pa si vzamemo čas in ga skrojimo povsem po vas. Vsi paketi vključujejo brezplačen posvet in ogled lokacije, vgradnjo z minimalnim, čistim električnim posegom in 24-mesečno garancijo. Pakete prilagodimo stanovanjem, hišam in poslovnim prostorom.",
    packages: [
      {
        name: "Osnovni",
        tagline: "Hitro in preprosto",
        text: "Za tiste, ki želijo pametne ključne stvari v enem ali dveh prostorih, brez odvečnega zapletanja.",
      },
      {
        name: "Napredni",
        tagline: "Celovit pameten dom",
        text: "Za celotno stanovanje ali manjšo hišo, z ogrevanjem, varnostjo in avtomatizacijami po meri.",
      },
      {
        name: "Premium",
        tagline: "Po meri, do potankosti",
        text: "Za večje in zahtevnejše domove: rešitev popolnoma po meri, brez vnaprej določenega obsega.",
      },
    ],
    note: "Točno ponudbo pripravimo po brezplačnem posvetu in ogledu, vnaprej in pisno. Brez skritih stroškov, brez naročnine, strojno opremo imate v lasti. Delamo za stanovanja, hiše in pisarne.",
    cta: { label: "Poglej celoten cenik", href: "/cenik/" },
  },

  pricing: {
    eyebrow: "Cenik",
    title: "Trije paketi: od hitre rešitve do doma po meri",
    subtitle:
      "Pametni dom lahko naredimo hitro in ugodno, ali pa si vzamemo čas in ga skrojimo povsem po vas. Vsi paketi vključujejo brezplačen posvet in ogled lokacije, vgradnjo z minimalnim, čistim električnim posegom in 24-mesečno garancijo. Pakete prilagodimo stanovanjem, hišam in poslovnim prostorom.",
    tiers: [
      {
        name: "Osnovni",
        tagline: "Hitro in preprosto",
        bestFor: "Za tiste, ki želijo pametne ključne stvari brez odvečnega zapletanja.",
        price: "od 2.500 €",
        priceNote: "vgradnja v nekaj dneh",
        features: [
          "1–2 prostora oz. ključne točke (luči, vtičnice, senčila)",
          "Standardna, preverjena postavitev",
          "Vse v eni aplikaciji",
          "Osnovni prizori (jutro / večer / odhod)",
          "Brezplačen posvet, ogled in svetovanje",
          "24-mesečna garancija na naprave",
        ],
        example:
          "Primer obsega: pametna razsvetljava in senčila v dnevni sobi + vhod (vozlišče + ~5 naprav).",
        featured: false,
        cta: { label: "Povprašaj", href: "/kontakt/" },
      },
      {
        name: "Napredni",
        tagline: "Celovit pameten dom",
        bestFor: "Za stanovanje ali manjšo hišo, ki naj postane resnično pametna.",
        price: "od 8.000 €",
        priceNote: "vgradnja v nekaj dneh",
        features: [
          "Vse v osnovnem paketu",
          "Celotno stanovanje / manjša hiša",
          "Avtomatizacije po meri (ogrevanje, senčila, razsvetljava)",
          "Varnost: pametna ključavnica, video zvonec, senzorji",
          "Nadzor in optimizacija porabe",
          "Prizori, prilagojeni vašim navadam",
          "Prednostna podpora po vgradnji",
        ],
        example:
          "Primer obsega: luči, senčila in ogrevanje v celotnem 2–3 sobnem stanovanju + pametna ključavnica in video zvonec.",
        featured: true,
        badge: "Najbolj priljubljeno",
        cta: { label: "Najbolj priljubljeno – povprašaj", href: "/kontakt/" },
      },
      {
        name: "Premium",
        tagline: "Po meri, do potankosti",
        bestFor: "Za večje in zahtevnejše domove, kjer šteje vsak detajl.",
        price: "od 15.000 €",
        priceNote: "izvedba po dogovoru",
        features: [
          "Vse v naprednem paketu",
          "Povsem prilagodljivo: rešitev zasnujemo od začetka, po vaših željah",
          "Napredne avtomatike in prizori po meri",
          "Integracija dodatnih sistemov (multimedija, klima, vrata, kamere)",
          "Fazna izvedba in usklajevanje z izvajalci",
          "Osebni stik in dolgoročna podpora",
        ],
        example: "Brez vnaprej določenega obsega, vse skrojimo po vašem domu in željah.",
        featured: false,
        cta: { label: "Dogovori se za posvet", href: "/kontakt/" },
      },
    ],
    note: "Cene so okvirne in odvisne od velikosti doma ter števila naprav. Točno ponudbo pripravimo po brezplačnem posvetu in ogledu lokacije, vnaprej in pisno. Brez skritih stroškov, brez naročnine, strojno opremo imate v lasti. Začnete lahko manjše in sistem kadar koli razširite, saj ponujamo tudi nadgradnje obstoječih sistemov. Delamo za stanovanja, hiše in pisarne.",
  },

  faq: {
    title: "Imate vprašanja?",
    items: [
      {
        q: "Ali morate razbijati stene ali posegati v napeljavo?",
        a: "Sten ne razbijamo in invazivnih gradbenih del ni. Je pa potreben minimalen električni poseg: usposobljen elektro-monter vgradi krmilne module (releje) v vašo obstoječo napeljavo, za stikala in v elektro omarico. Čisto, hitro, z garancijo in računom.",
      },
      {
        q: "Kdo opravi električna dela in ali je varno?",
        a: "Električni del opravi usposobljen elektro-monter po veljavnih standardih. Za vse izdamo račun in garancijo.",
      },
      {
        q: "Ali sistem deluje brez interneta?",
        a: "Da. Sistem teče lokalno na osnovi Home Assistant. Osnovne funkcije (luči, scene, ključavnice) delujejo tudi ob izpadu interneta.",
      },
      {
        q: "Kaj se zgodi z mojimi podatki?",
        a: "Sistem deluje lokalno v vašem domu. Niste vezani na tuj oblak.",
      },
      {
        q: "Ali plačujem naročnino?",
        a: "Ne. Aplikacija je brezplačna in strojno opremo imate v lasti.",
      },
      {
        q: "Ali sem vezan na vas?",
        a: "Ne. Sistem je odprt (Home Assistant) in razširljiv s poljubnimi združljivimi napravami. Razporeditev nadzorne plošče prilagajate sami (povleci in spusti). Strojno opremo imate v lasti.",
      },
      {
        q: "Kaj če se kaj pokvari?",
        a: "Pokličete nas. Nudimo podporo po vgradnji in 24-mesečno garancijo na naprave.",
      },
      {
        q: "Koliko časa traja vgradnja?",
        a: "Čas vgradnje je odvisen od vaših želja. Manjši projekti so lahko končani v nekaj dneh, večji pa v nekaj tednih.",
      },
      {
        q: "Ali avtomatizirate tudi pisarne ali poslovne prostore?",
        a: "Da. Isti odprt sistem (Home Assistant) postavimo v pisarne, sejne sobe in manjše poslovne prostore: upravljanje razsvetljave po urniku, HVAC glede na zasedenost, dostopna kontrola in nadzor porabe. Brezplačen posvet je prvi korak.",
      },
    ],
  },

  // Mnenja strank. Poštenostno pravilo: nikoli ne prikažemo izmišljenega
  // mnenja. Vnosi z `placeholder: true` so označbe mesta, komponenta jih
  // odfiltrira in namesto njih pokaže odkrito opombo (`emptyNote`), dokler
  // ne dodamo resničnih, potrjenih mnenj strank.
  testimonials: {
    title: "Kaj pravijo naše stranke",
    subtitle:
      "Zbiramo mnenja prvih strank. Ko bodo potrjena, jih objavimo tukaj, brez olepševanja.",
    emptyNote:
      "Smo mlada ekipa in mnenja strank šele zbiramo. Raje kot izmišljene citate boste tukaj videli le resnične izkušnje, takoj ko jih stranke potrdijo. Do takrat vam z veseljem posredujemo reference na posvetu.",
    items: [
      {
        placeholder: true,
        quote: "",
        author: "",
        location: "",
      },
    ],
  },

  finalCta: {
    title: "Pametna avtomatizacija za dom in pisarno, že danes",
    subtitle:
      "Rezervirajte brezplačen posvet, da pripravimo rešitev po meri vašega doma ali poslovnega prostora.",
    cta: { label: "Brezplačen posvet in ponudba", href: "/kontakt/" },
  },
} as const;

export type HomeContent = typeof homeContent;
