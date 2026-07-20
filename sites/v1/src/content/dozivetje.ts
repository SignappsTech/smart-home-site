/**
 * Content for the /dozivetje ("experience") page — an immersive, scroll-driven
 * walk through a smart home where light and blinds respond to you.
 *
 * Copy is Slovenian, drawn from marketing/pitch.md (the real automation
 * catalogue). The cardinal honesty rule applies: never claim "brez posegov" —
 * it's wireless-first but needs minimal, clean electrical work. We say so.
 *
 * Each scene is one full-viewport moment. As the reader arrives, that scene's
 * automation "plays": lights rise from the sides, or blinds/shutters open or
 * close over a real room photo. The medium demonstrates the product.
 */

export type LightTemp = "warm" | "cool" | "night";
/** Which automation motion plays when the scene becomes active. */
export type SceneEffect =
  | "blinds-open" // shutters roll up to reveal the room + morning light
  | "blinds-close" // shutters roll down (film night / summer heat)
  | "light-rise" // light swells in from the sides
  | "flicker"; // lights pop on one-by-one (presence simulation)

export const dozivetje = {
  meta: {
    title: "Doživetje pametnega doma",
    description:
      "Sprehodite se skozi dom, ki se odzove na vas. Senčila se odprejo, luči se prižgejo same — tako kot v resničnem pametnem domu.",
  },

  hero: {
    kicker: "Doživetje",
    title: "Vaš dom se prebudi z vami.",
    subtitle:
      "Senčila se sama odprejo, luči zaživijo, prostor se umiri v pravi trenutek. Podrsajte navzdol in doživite dan v pametnem domu — od jutra do noči.",
    scrollHint: "Podrsajte za sprehod skozi dan",
  },

  /**
   * The scenes, in chronological order (a day in a smart home). `image` is a
   * real room photo under /public/assets/dozivetje/; `effect` is the automation
   * motion; `light` tints the glow; `from` is where the light enters ("left" /
   * "right" / "sides") — never top-down, so it never cuts off at a section edge.
   */
  scenes: [
    {
      id: "jutro",
      time: "06.45",
      light: "warm" as LightTemp,
      effect: "blinds-open" as SceneEffect,
      from: "sides" as const,
      image: "/assets/dozivetje/01-bedroom-morning.jpg",
      eyebrow: "Jutranja rutina",
      title: "Ob budilki se senčila počasi odprejo.",
      body:
        "Kopalnica se ogreje, glasba tiho steče, jutranja svetloba napolni sobo — vse samo, brez enega stikala.",
      devices: ["Senčila", "Ogrevanje po urniku", "Scena »Jutro«"],
    },
    {
      id: "zbujanje",
      time: "06.30",
      light: "warm" as LightTemp,
      effect: "light-rise" as SceneEffect,
      from: "left" as const,
      image: "/assets/dozivetje/02-bedroom-soft.jpg",
      eyebrow: "Zbujanje s svetlobo",
      title: "Luč posnema sončni vzhod.",
      body:
        "15 minut pred budilko se svetloba v spalnici postopoma svetli — nežno prebujanje, brez sunka in brez piska.",
      devices: ["Pametna razsvetljava", "Postopno svetlenje", "Simulacija vzhoda"],
    },
    {
      id: "prihod",
      time: "17.42",
      light: "warm" as LightTemp,
      effect: "light-rise" as SceneEffect,
      from: "right" as const,
      image: "/assets/dozivetje/03-hallway.jpg",
      eyebrow: "Prihod domov",
      title: "Odklenete vrata. Hodnik vas pričaka.",
      body:
        "Ključavnica prepozna vaš telefon, luč na vhodu in v hodniku se prižge, ogrevanje se dvigne na domačo temperaturo.",
      devices: ["Pametna ključavnica", "Senzor prisotnosti", "Scena »Prihod«"],
    },
    {
      id: "vecer",
      time: "20.10",
      light: "warm" as LightTemp,
      effect: "light-rise" as SceneEffect,
      from: "sides" as const,
      image: "/assets/dozivetje/04-living-dusk.jpg",
      eyebrow: "Sončni zahod",
      title: "Ob mraku se luči prižgejo same.",
      body:
        "Ne po fiksni uri, ampak glede na dejanski sončni zahod. Prostor se umiri v topel večer — točno takrat, ko je treba.",
      devices: ["Sledenje zahodu", "Topla svetloba", "Prizor »Večer«"],
    },
    {
      id: "film",
      time: "21.00",
      light: "night" as LightTemp,
      effect: "blinds-close" as SceneEffect,
      from: "sides" as const,
      image: "/assets/dozivetje/05-media-room.jpg",
      eyebrow: "Filmski večer",
      title: "Rečete »Film«. Soba postane kino.",
      body:
        "Platno se spusti, projektor se zažene, senčila se zaprejo in luči ugasnejo. Ena poteza — cel prizor.",
      devices: ["Motorizirana senčila", "Projektor + platno", "Prizor »Film«"],
    },
    {
      id: "poletje",
      time: "14.20",
      light: "cool" as LightTemp,
      effect: "blinds-close" as SceneEffect,
      from: "sides" as const,
      image: "/assets/dozivetje/06-bright-room.jpg",
      eyebrow: "Hladen dom poleti",
      title: "Vroč dan? Senčila zakrijejo okna sama.",
      body:
        "Ko sonce pripeka in v sobi ni nikogar, se senčila spustijo, da se prostor ne pregreje. Manj klime, nižji računi.",
      devices: ["Senzor temperature", "Samodejna senčila", "Meritev porabe"],
    },
    {
      id: "noc",
      time: "23.30",
      light: "night" as LightTemp,
      effect: "light-rise" as SceneEffect,
      from: "left" as const,
      image: "/assets/dozivetje/07-night-room.jpg",
      eyebrow: "Nočni način",
      title: "Ponoči luč sveti le toliko, kot je treba.",
      body:
        "Ob poti do kopalnice se prižge topla luč na 25 % — dovolj, da vidite, premalo, da bi vas zbudila.",
      devices: ["Nočni senzor gibanja", "25 % svetlost", "Topel odtenek"],
    },
    {
      id: "varnost",
      time: "02.00",
      light: "cool" as LightTemp,
      effect: "flicker" as SceneEffect,
      from: "sides" as const,
      image: "/assets/dozivetje/08-house-exterior.jpg",
      eyebrow: "Ko vas ni doma",
      title: "Dom je videti obljuden — tudi ko ni nikogar.",
      body:
        "Luči se naključno prižigajo in ugašajo, kot da je nekdo doma. Če senzor kaj zazna, vas dom obvesti na telefon.",
      devices: ["Simulacija prisotnosti", "Senzorji odprtja", "Obvestila na telefon"],
    },
    {
      id: "zdravje",
      time: "07.15",
      light: "cool" as LightTemp,
      effect: "light-rise" as SceneEffect,
      from: "right" as const,
      image: "/assets/dozivetje/09-bathroom.jpg",
      eyebrow: "Svež zrak",
      title: "Dom skrbi tudi za zrak, ki ga dihate.",
      body:
        "Senzor vlage sam vklopi ventilator po tuširanju, senzor CO₂ vas opozori, kdaj prezračiti. Zdravo, brez razmišljanja.",
      devices: ["Senzor vlage", "Senzor CO₂", "Samodejno prezračevanje"],
    },
  ],

  /** After the walk-through: the honest, grounding truth. */
  truth: {
    eyebrow: "Pošteno",
    title: "In to ni prihodnost. To vgradimo v vaš obstoječ dom.",
    body:
      "Brez razbijanja sten. Krmilne module vgradimo v vašo obstoječo napeljavo z minimalnim, čistim električnim posegom, naprave povežemo brezžično. Vaše »navadne« luči in naprave postanejo pametne — brez menjave.",
    points: [
      "Deluje lokalno, tudi ob izpadu interneta",
      "Odprt sistem, brez vezanosti na proizvajalca",
      "Vgradnja pogosto v 1–2 dneh, brez razbijanja sten",
    ],
  },

  cta: {
    title: "Želite tak dom?",
    subtitle:
      "Na brezplačnem ogledu skupaj pogledamo vaš prostor in pripravimo predlog — vnaprej in pisno.",
    primary: { label: "Brezplačen posvet", href: "/kontakt/" },
    secondary: { label: "Poglej cenik", href: "/cenik/" },
  },
} as const;

export type Dozivetje = typeof dozivetje;
