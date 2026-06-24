/**
 * Technology content (Slovenian) for /tehnologije/.
 *
 * This is the "deep" technical page. COPY.md §11 says to keep the jargon
 * (Home Assistant, Matter, Thread, local control, no lock-in) OFF the main
 * marketing pages and concentrate it here — for the technical buyer who wants
 * to know exactly what's under the hood and that they own it.
 *
 * Brands + connectivity reuse the single source of truth in `lib/brand.ts`
 * (the `ecosystem` export), so this file holds only the prose around them.
 */
export const technologyContent = {
  intro:
    "Pod pokrovom je odprt, lokalen sistem, ki ga imate v lasti. Tukaj pošteno razložimo, na čem gradimo, kako naprave komunicirajo in zakaj niste vezani na nas ali na enega proizvajalca.",

  // The open, local hub — the heart of the pitch for the technical buyer.
  hub: {
    eyebrow: "Nadzorni center",
    title: "Home Assistant — odprt in lokalen",
    text: "Srce sistema je Home Assistant, odprtokodna platforma, ki teče lokalno v vašem domu. Naprave različnih proizvajalcev poveže pod eno streho, brez obvezne oblačne storitve in brez naročnine.",
  },

  // Engineer trust levers (from the persona panel): open · local · you own it.
  pillars: {
    eyebrow: "Zakaj odprt sistem",
    title: "Trije razlogi, da ostane vaš",
    items: [
      {
        icon: "sliders",
        title: "Odprt — brez vezanosti",
        text: "Gradimo na Home Assistant in standardnih napravah (Shelly, Aqara, Hue …). Niste ujeti v zaprt sistem enega proizvajalca — naprave lahko zamenjate ali nadgradite.",
      },
      {
        icon: "shield",
        title: "Lokalen — deluje brez interneta",
        text: "Osnovne funkcije (luči, scene, ključavnice) tečejo lokalno in delujejo tudi ob izpadu interneta. Vaši podatki ostanejo doma, ne v tujem oblaku.",
      },
      {
        icon: "sparkles",
        title: "Vaš — strojno opremo imate v lasti",
        text: "Strojna oprema je vaša, sistem je vaš. Brez naročnine za uporabo. Po vgradnji vas podpiramo, a niste odvisni od nas, da dom deluje.",
      },
    ],
  },

  brands: {
    eyebrow: "Naprave",
    title: "Znamke, ki jih povezujemo",
    text: "Združljive, preverjene naprave vodilnih proizvajalcev — izberemo prave za vaš dom in proračun.",
  },

  connectivity: {
    eyebrow: "Povezljivost",
    title: "Kako naprave komunicirajo",
    text: "Naprave povezujemo prek Wi-Fi in Bluetooth LE. Standarda Matter in Thread, ki obljubljata še boljšo združljivost med proizvajalci, dodajamo, ko bosta v sistemu zrela.",
  },

  // Our custom dashboard — same honest framing as /funkcionalnosti, but with
  // the technical detail surfaced here.
  dashboard: {
    eyebrow: "Naša nadzorna plošča",
    title: "Oblikovan vmesnik nad odprtim sistemom",
    text: "Nad Home Assistant postavimo svojo, oblikovano nadzorno ploščo s tipiziranimi karticami (luči, senzorji, ogrevanje, kamere). Razporeditev urejate sami (povleci in spusti), nove naprave pa za vas dodamo in pravilno nastavimo — da ostane vmesnik pregleden in dosleden.",
  },

  // Be precise about scope — the engineer persona rewards honesty here.
  honest: {
    eyebrow: "Pošteno",
    title: "Kaj to pomeni v praksi",
    points: [
      "Releje (npr. Shelly) vgradimo v vašo obstoječo napeljavo — minimalen, čist električni poseg, brez razbijanja sten.",
      "Električni del opravi usposobljen monter po veljavnih standardih, z računom in garancijo.",
      "Nove naprave morajo biti združljive s sistemom — pred nakupom svetujemo, kaj se splača.",
      "Matter in Thread označujemo pošteno kot »kmalu«, dokler nista zanesljivo podprta.",
    ],
  },
} as const;

export type TechnologyContent = typeof technologyContent;
