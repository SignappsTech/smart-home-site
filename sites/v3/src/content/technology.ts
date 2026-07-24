/**
 * Technology content (Slovenian) for /tehnologije/.
 *
 * This is the "deep" technical page. COPY.md §11 says to keep the jargon
 * (Home Assistant, Matter, Thread, local control, no lock-in) OFF the main
 * marketing pages and concentrate it here, for the technical buyer who wants
 * to know exactly what's under the hood and that they own it.
 *
 * Brands + connectivity reuse the single source of truth in `lib/brand.ts`
 * (the `ecosystem` export), so this file holds only the prose around them.
 */
export const technologyContent = {
  intro:
    "Pod pokrovom je odprt, lokalen sistem za dom ali poslovni prostor, ki ga imate v lasti. Tukaj pošteno razložimo, na čem gradimo, kako naprave komunicirajo in zakaj niste vezani na nas ali na enega proizvajalca.",

  // The open, local hub, the heart of the pitch for the technical buyer.
  hub: {
    title: "Home Assistant: odprt in lokalen",
    text: "Srce sistema je Home Assistant, odprtokodna platforma, ki teče lokalno v vašem domu ali pisarni. Naprave različnih proizvajalcev poveže pod eno streho, brez obvezne oblačne storitve in brez naročnine.",
  },

  // Engineer trust levers (from the persona panel): open · local · you own it.
  pillars: {
    title: "Sistem ostane vaš",
    items: [
      {
        icon: "unlock",
        title: "Odprt, brez vezanosti",
        text: "Gradimo na Home Assistant in standardnih napravah (Shelly, Aqara, Hue …). Niste ujeti v zaprt sistem enega proizvajalca: naprave lahko zamenjate ali nadgradite.",
      },
      {
        icon: "wifi-off",
        title: "Lokalen, deluje brez interneta",
        text: "Osnovne funkcije (luči, ključavnice, avtomatike) tečejo lokalno in delujejo tudi ob izpadu interneta. Vaši podatki ostanejo doma, ne v tujem oblaku.",
      },
      {
        icon: "database-plus",
        title: "Vaš, strojno opremo imate v lasti",
        text: "Strojna oprema je vaša, sistem je vaš. Brez naročnine za uporabo. Po vgradnji vas podpiramo, a niste odvisni od nas, da dom deluje.",
      },
    ],
  },

  brands: {
    title: "Znamke, ki jih povezujemo",
    text: "Združljive, preverjene naprave vodilnih proizvajalcev, izberemo prave glede na tip prostora (stanovanje, hiša, pisarna) in proračun.",
  },

  connectivity: {
    title: "Kako naprave komunicirajo",
    text: "Naprave povezujemo brezžično prek Wi-Fi, Zigbee in Bluetooth LE. Podpora za Matter in Thread, ki obljubljata še boljšo združljivost med proizvajalci, je v pripravi.",
  },

  // Our custom dashboard, same honest framing as /funkcionalnosti, but with
  // the technical detail surfaced here.
  dashboard: {
    title: "Oblikovan vmesnik nad odprtim sistemom",
    text: "Nad Home Assistant postavimo svojo, oblikovano nadzorno ploščo s tipiziranimi karticami (luči, senzorji, ogrevanje, kamere). Razporeditev urejate sami (povleci in spusti), nove naprave pa za vas dodamo in pravilno nastavimo, da ostane vmesnik pregleden in dosleden.",
  },

  // What a real install looks like, scope and expectations, not sales meta.
  honest: {
    title: "Kaj storimo v vašem domu",
    points: [
      "Releje (npr. Shelly) vgradimo v obstoječo napeljavo, za stikala in v elektro omarico. Edini električni poseg, brez razbijanja sten.",
      "Električni del opravi usposobljen monter po veljavnih standardih, z računom in garancijo.",
      "Naprave izberemo glede na vaš prostor (dom ali pisarno) in proračun. Pred nakupom svetujemo, kaj je združljivo in se splača.",
      "Po vgradnji vam pokažemo uporabo in ostajamo na voljo za podporo, za vsakodnevno delovanje pa niste odvisni od nas.",
    ],
  },
} as const;

export type TechnologyContent = typeof technologyContent;
